---
title: Choosing the state structure
author: Jay.J
date: 2024-06-24 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Choosing the state structure
> State 구조 선택하기


### State 구조화 원칙

- <b>연관된 state 그룹화하기.</b><br>
두 개 이상의 state 변수를 항상 동시에 업데이트한다면, 단일 state 변수로 병합하는 것을 고려해라.

- <b>State의 모순 피하기.</b><br>
여러 state 조각이 서로 모순되고 “불일치”할 수 있는 방식으로 state를 구성하는 것은 실수가 발생할 여지를 만든다.

- <b>불필요한 state 피하기.</b><br>
렌더링 중에 컴포넌트의 props나 기존 state 변수에서 일부 정보를 계산할 수 있다면, 컴포넌트의 state에 해당 정보를 넣지 않아야 한다.

- <b>State의 중복 피하기.</b><br>
여러 상태 변수 간 또는 중첩된 객체 내에서 동일한 데이터가 중복될 경우 동기화를 유지하기가 어렵다.

- <b>깊게 중첩된 state 피하기.</b><br>
깊게 계층화된 state는 업데이트하기 쉽지 않다.<br>
가능하면 state를 평탄한 방식으로 구성하는 것이 좋습니다.

<br>

### 연관된 state 그룹화하기

```js
// 1. 한 개의 변수가 단일로 변수가 변경될 경우
const [x, setX] = useState(0);
const [y, setY] = useState(0);
// 2. 동시에 두 개의 state가 함께 변경될 경우
const [position, setPosition] = useState({ x: 0, y: 0 });
```
> 2번의 경우 ```setPosition({ ...position, x: 100 })``` 이용하여 하나만 변경도 가능하다.

<br>

### State의 모순 피하기

```js
// 모순을 만들 수 있는 방식
const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);

// 변경된 방식
const [status, setStatus] = useState('typing');

```
isSending과 isSent는 동시에 true가 되어서는 안되기 때문에,<br>
이 두 변수를 'typing'(초깃값), 'sending', 'sent' 세 가지 유효한 상태 중 하나를 가질 수 있는 status state 변수로 대체하는 것이 좋다.

<br>

### 불필요한 state 피하기

```js
// 불필요한 state 가 생성되는 방식
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');

// 변경된 방식
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

const fullName = firstName + ' ' + lastName;

```
렌더링 중에 항상 firstName과 lastName에서 fullName을 계산할 수 있기 때문에 state에서 제거해야한다.

### 📝 불필요한 state의 일반적인 예
```js
// 불필요한 state의 일반적인 예
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);

// 변경된 방식
function Message({ messageColor }) {
  const color = messageColor;
```

<br>

### State의 중복 피하기
<b>만일 state가 쉽게 업데이트하기에 너무 중첩되어 있다면, “평탄”하게 만드는 것을 고려하라.</b>
> 깊게 중복되어 있다면, 하나를 업뎃 하기 위에 엄청 장황한 코드를 써야 할 수 있음

<br>

### 깊게 중첩된 state 피하기
<b>만일 state가 쉽게 업데이트하기에 너무 중첩되어 있다면, “평탄”하게 만드는 것을 고려하라.</b>
> 깊게 중복되어 있다면, 하나를 업뎃 하기 위에 엄청 장황한 코드를 써야 할 수 있음


<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/choosing-the-state-structure" target="_blank">https://ko.react.dev/learn/choosing-the-state-structure</a>
 
