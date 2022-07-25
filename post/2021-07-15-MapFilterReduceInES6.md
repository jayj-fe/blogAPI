---
title: ES6의 Map Filter Reduce 함수들
author: Jay.J
date: 2021-07-15 18:44:39 +0900
categories: [javascript]
tags: [javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

<br>

## ES6의 Map Filter Reduce 함수들

map, filter, reduce 함수 모두 ES6에서 추가된 함수로써, 배열(Array)에서 결과를 도출하고자 할 때 사용된다.<br>
기존의 for문을 이용하여 loop 돌면서 결과를 도출했던 방식보다 유용하고 간결하게 사용할 수 있을 것으로 생각하며,<br>
3개의 함수를 알아보고 정리하려고 한다.

<br>

## Map

map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환한다.

### 구문

```js
arr.map(callback(currentValue[, index[, array]])[, thisArg])
```

### 사용법

```js
const numbers = [1, 2, 3];
const doubles = numbers.map( (num) => num * 2 );

console.log(doubles);
```
> 결과값 : (3) [2, 4, 6]

<br>

## Filter

filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환한다.

### 구문

```js
arr.filter(callback(element[, index[, array]])[, thisArg])
```

### 사용법

```js
const arr = ['abc', 'abcd', 'abcde', 'abcdef', 'abcdefg'];
const result = arr.filter( (ele) => {
    return ele.length >= 5;
})
console.log(result);
```
> 결과값 : (3) ['abcde', 'abcdef', 'abcdefg']


```js
const answerSheet = ['abcd', 'abcd', 'abcdf', 'abcdef', 'abcdefg'];
const answer = ['abc', 'abcd', 'abcde', 'abcdef', 'abcdefg'];

const grading = answer.filter( (ele, idx) => {
    return ele === answerSheet[idx];
})
console.log(grading);
```
> 결과값 : (3) ['abcd', 'abcdef', 'abcdefg']

<br>

## Reduce

reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환한다.

### 구문

```js
arr.reduce(callback[, initialValue])
```

### 작동 방식

```js
// 예제
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue;
});
```

해당 예제는 아래와 같이 작동된다.

<img src="/assets/img/javascript/reduce.JPG" alt="">

### 사용법

```js
const total = [ 0, 1, 2, 3 ].reduce(
    ( accumulator, currentValue ) => accumulator + currentValue,
    0
);
console.log(total)
```
> 결과값 : 6

reduce는 응용해서 사용할 방법이 많지만, 개인적으로 아직 완벽하게 이해되지않고 사용해야할 타이밍에 떠오르지 않아 다양하게 활용하지 못하고 있다.<br>
reduce를 잘 활용한다면, map, filter를 대체하여 광범위하게 사용할 수 있을 것으로 생각된다.


<br>
<br>

## 참고 했던 자료 및 블로그

- <a href="https://miiingo.tistory.com/365" target="_blank">https://miiingo.tistory.com/365</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="_blank">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" target="_blank">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce</a>