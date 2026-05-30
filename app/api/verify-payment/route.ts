import { NextRequest, NextResponse } from 'next/server';

const CODE_HASH = process.env.PAYMENT_CODE_HASH || '';
const SECRET = process.env.PAYMENT_SECRET || '';
const COOKIE_NAME = 'paid_access';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmacSign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function createCookie(codeHash: string): Promise<string> {
  const payload = `paid:${codeHash}:${Date.now()}`;
  const signature = await hmacSign(payload);
  return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

async function verifyCookie(cookie: string): Promise<boolean> {
  const parts = cookie.split('.');
  if (parts.length !== 2) return false;

  const [encodedPayload, signature] = parts;
  const payload = Buffer.from(encodedPayload, 'base64url').toString();
  const expectedSig = await hmacSign(payload);

  if (signature !== expectedSig) return false;

  // Check the code hash hasn't changed (user paid with old code after code rotation)
  const payloadParts = payload.split(':');
  if (payloadParts[0] !== 'paid') return false;

  return true;
}

export async function POST(request: NextRequest) {
  if (!CODE_HASH || !SECRET) {
    return NextResponse.json({ ok: false, error: '服务器未配置支付验证' }, { status: 500 });
  }

  const body = await request.json();
  const code = body.code?.trim();
  if (!code) {
    return NextResponse.json({ ok: false, error: '请输入验证码' }, { status: 400 });
  }

  const inputHash = await sha256(code);
  if (inputHash !== CODE_HASH) {
    return NextResponse.json({ ok: false, error: '验证码错误' }, { status: 401 });
  }

  const cookieValue = await createCookie(inputHash);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });

  return response;
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) {
    return NextResponse.json({ paid: false });
  }

  const valid = await verifyCookie(cookie);
  return NextResponse.json({ paid: valid });
}
