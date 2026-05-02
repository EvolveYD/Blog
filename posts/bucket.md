---
title: "桶排序"
date: "2026-05-02"
description: "桶排序上架！"
tags: ["学习笔记"]
---
```cpp
#include<bits/stdc++.h>
using namespace std;

void bucketSort(vector<float>& arr) {
    int n = arr.size();
    if (n <= 1) return;
    
    // 1. 创建n个桶
    vector<vector<float>> buckets(n);
    
    // 2. 将元素分配到桶中
    for (int i = 0; i < n; i++) {
        int bucketIndex = n * arr[i];  // 假设数据在[0,1)范围内
        buckets[bucketIndex].push_back(arr[i]);
    }
    
    // 3. 对每个桶内进行排序
    for (int i = 0; i < n; i++) {
        sort(buckets[i].begin(), buckets[i].end());
    }
    
    // 4. 合并所有桶
    int index = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index++] = buckets[i][j];
        }
    }
}
```