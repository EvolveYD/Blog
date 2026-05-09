'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const COLOR_SUFFIX: Record<string, string> = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
};

type Option = {
  label: string;
  text: string;
};

type Question = {
  id: number;
  question: string;
  options: Option[];
  answer: string;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: '五四运动爆发于哪一年？',
    options: [
      { label: 'A', text: '1917年' },
      { label: 'B', text: '1919年' },
      { label: 'C', text: '1921年' },
      { label: 'D', text: '1927年' },
    ],
    answer: 'B',
    explanation: '五四运动于1919年5月4日在北京爆发，因巴黎和会上中国外交的失败而引发。',
  },
  {
    id: 2,
    question: '五四运动的导火索是什么？',
    options: [
      { label: 'A', text: '辛亥革命失败' },
      { label: 'B', text: '袁世凯称帝' },
      { label: 'C', text: '巴黎和会上中国外交的失败' },
      { label: 'D', text: '日本发动侵华战争' },
    ],
    answer: 'C',
    explanation: '1919年巴黎和会上，列强将德国在山东的权益转让给日本，中国外交失败直接引发了五四运动。',
  },
  {
    id: 3,
    question: '五四运动最初由哪个群体发起？',
    options: [
      { label: 'A', text: '工人群体' },
      { label: 'B', text: '商人群体' },
      { label: 'C', text: '北京学生' },
      { label: 'D', text: '农民群体' },
    ],
    answer: 'C',
    explanation: '五四运动由北京大学等13所高校的学生率先发起，他们于5月4日在天安门前集会游行。',
  },
  {
    id: 4,
    question: '五四运动标志着什么的开端？',
    options: [
      { label: 'A', text: '旧民主主义革命' },
      { label: 'B', text: '新民主主义革命' },
      { label: 'C', text: '社会主义革命' },
      { label: 'D', text: '国民革命' },
    ],
    answer: 'B',
    explanation: '五四运动标志着中国新民主主义革命的开端，无产阶级开始登上政治舞台。',
  },
  {
    id: 5,
    question: '"外争主权，内惩国贼"中的"国贼"主要指谁？',
    options: [
      { label: 'A', text: '李鸿章、曾国藩、左宗棠' },
      { label: 'B', text: '曹汝霖、章宗祥、陆宗舆' },
      { label: 'C', text: '段祺瑞、冯国璋、张作霖' },
      { label: 'D', text: '慈禧太后、袁世凯、张勋' },
    ],
    answer: 'B',
    explanation: '"国贼"指亲日派官僚曹汝霖（交通总长）、章宗祥（驻日公使）、陆宗舆（币制局总裁），他们在对日交涉中丧权辱国。',
  },
  {
    id: 6,
    question: '五四运动后期的主力转变为什么？',
    options: [
      { label: 'A', text: '学生群体' },
      { label: 'B', text: '农民阶级' },
      { label: 'C', text: '工人阶级' },
      { label: 'D', text: '民族资产阶级' },
    ],
    answer: 'C',
    explanation: '6月3日后，上海工人罢工、商人罢市，工人阶级成为运动主力，运动中心从北京转移到上海。',
  },
  {
    id: 7,
    question: '五四运动促进了哪种思想在中国的广泛传播？',
    options: [
      { label: 'A', text: '三民主义' },
      { label: 'B', text: '马克思主义' },
      { label: 'C', text: '无政府主义' },
      { label: 'D', text: '实用主义' },
    ],
    answer: 'B',
    explanation: '五四运动后，马克思主义在中国得到广泛传播，各类马克思主义研究团体相继成立，为中国共产党的诞生奠定了思想基础。',
  },
  {
    id: 8,
    question: '五四运动与以往革命运动相比，最突出的特点是？',
    options: [
      { label: 'A', text: '由资产阶级领导' },
      { label: 'B', text: '仅限于学生参与' },
      { label: 'C', text: '彻底地不妥协地反帝反封建' },
      { label: 'D', text: '以武装斗争为主要形式' },
    ],
    answer: 'C',
    explanation: '五四运动表现出彻底的不妥协的反帝反封建精神，这是以往历次革命运动所不具备的鲜明特点。',
  },
  {
    id: 9,
    question: '每年的哪一天被定为中国青年节以纪念五四运动？',
    options: [
      { label: 'A', text: '3月5日' },
      { label: 'B', text: '5月4日' },
      { label: 'C', text: '7月1日' },
      { label: 'D', text: '10月1日' },
    ],
    answer: 'B',
    explanation: '1939年，陕甘宁边区西北青年救国联合会规定5月4日为中国青年节。中华人民共和国成立后，正式将5月4日定为中国青年节。',
  },
  {
    id: 10,
    question: '五四运动中，北京学生提出的口号不包括以下哪一项？',
    options: [
      { label: 'A', text: '外争主权，内惩国贼' },
      { label: 'B', text: '废除二十一条' },
      { label: 'C', text: '还我青岛' },
      { label: 'D', text: '联俄、联共、扶助农工' },
    ],
    answer: 'D',
    explanation: '"联俄、联共、扶助农工"是1924年孙中山提出的三大政策，并非五四运动时期的口号。前三个都是五四运动中的核心口号。',
  },
];

const TOTAL = QUESTIONS.length;

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex) / TOTAL) * 100;
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuestion.answer;
  const hasAnswered = selectedAnswer !== null;

  const handleSelectAnswer = useCallback((label: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(label);
    if (label === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  }, [hasAnswered, currentQuestion.answer]);

  const handleNext = useCallback(() => {
    if (currentIndex < TOTAL - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  }, [currentIndex]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  }, []);

  if (finished) {
    const percentage = Math.round((score / TOTAL) * 100);
    let grade: string;
    let gradeColor: string;
    let gradeText: string;
    if (percentage === 100) {
      grade = '🏆 满分成就！';
      gradeColor = 'text-yellow-500';
      gradeText = '你对五四运动的历史了如指掌，堪称史学达人！';
    } else if (percentage >= 80) {
      grade = '🎉 非常棒！';
      gradeColor = 'text-green-500';
      gradeText = '你对五四运动有深入的了解，继续保持！';
    } else if (percentage >= 60) {
      grade = '👍 不错哦！';
      gradeColor = 'text-blue-500';
      gradeText = '基础知识掌握得还行，再回顾一下可以更好！';
    } else {
      grade = '📚 继续加油！';
      gradeColor = 'text-orange-500';
      gradeText = '五四运动的历史值得深入学习，再来一次吧！';
    }

    return (
      <div className="quiz-bg-wrapper">
      <main className="flex flex-col items-center justify-center p-6">
        <div className="quiz-card w-full max-w-lg text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${gradeColor}`}>{grade}</h1>
          <p className="text-lg mb-2">
            得分：<span className="quiz-score-highlight font-bold">{score}</span> / {TOTAL}
          </p>
          <div className="quiz-progress-bar-bg mb-2">
            <div
              className={`quiz-progress-bar-fill ${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-blue-500' : 'bg-orange-500'}`}
              style={{ width: `${percentage}%`, transition: 'width 0.8s ease-out' }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{percentage}% 正确率</p>
          <p className="quiz-result-text mb-8">{gradeText}</p>

          <div className="flex gap-4 justify-center">
            <button onClick={handleRetry} className="quiz-btn-primary px-6 py-2 rounded transition-colors">
              再来一次
            </button>
            <Link href="/" className="quiz-btn-outline px-6 py-2 rounded transition-colors">
              返回首页
            </Link>
          </div>
        </div>
      </main>
      </div>
    );
  }

  return (
    <div className="quiz-bg-wrapper">
    <main className="flex flex-col items-center justify-center p-6">
      <div className="quiz-card w-full max-w-lg">
        <div className="quiz-card-header">
          <div className="quiz-progress-meta">
            <span>第 {currentIndex + 1} / {TOTAL} 题</span>
            <span>得分 {score}</span>
          </div>
          <div className="quiz-progress-bar-bg">
            <div
              className="quiz-progress-bar-fill bg-blue-500"
              style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
            />
          </div>
          <span className="quiz-question-badge mt-4 inline-block">
            第 {currentIndex + 1} 题
          </span>
          <h2 className="quiz-question-title mt-2">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="quiz-card-body">
          <div className="space-y-3">
            {currentQuestion.options.map(option => {
              const colorSuffix = COLOR_SUFFIX[option.label];
              let btnClass = `quiz-option quiz-option-${colorSuffix}`;

              if (option.label === currentQuestion.answer && hasAnswered) {
                btnClass += ' quiz-option-correct';
              } else if (option.label === selectedAnswer && hasAnswered) {
                btnClass += ' quiz-option-wrong';
              } else if (hasAnswered) {
                btnClass += ' quiz-option-dimmed';
              }

              return (
                <button
                  key={option.label}
                  onClick={() => handleSelectAnswer(option.label)}
                  disabled={hasAnswered}
                  className={btnClass}
                >
                  <span className={`quiz-option-label quiz-option-label-${colorSuffix}`}>
                    {option.label}
                  </span>
                  <span className="text-[0.95rem]">{option.text}</span>
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div className="mt-5 animate-[fadeIn_0.3s_ease-out]">
              <div className={`p-4 rounded-lg border text-sm ${isCorrect ? 'quiz-explanation-correct' : 'quiz-explanation-wrong'}`}>
                <p className={`font-semibold mb-1.5 text-[0.95rem] ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {isCorrect ? '✅ 回答正确！' : '❌ 回答错误'}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="quiz-btn-primary w-full mt-4 px-6 py-2.5 rounded-lg transition-colors text-center font-medium"
              >
                {currentIndex < TOTAL - 1 ? '下一题 →' : '查看结果 🎯'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
    </div>
  );
}
