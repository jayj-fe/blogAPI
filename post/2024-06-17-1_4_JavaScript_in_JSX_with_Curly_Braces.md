---
title: Render_and_Commit
author: Jay.J
date: 2024-06-17 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Render_and_Commit
> 렌더링 그리고 커밋
<br>

### 따옴표로 문자열 전달하기
<br>
1. 문자열 어트리뷰트를 JSX에 전달하려면 작은따옴표나 큰따옴표로 묶어야 한다.<br>

```js
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

<br>
2. 어트리뷰트를 JSX에 동적으로 전달하려면 중괄호로 묶어야 한다.<br>

```js
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

### 중괄호 사용하기: JavaScript 세계로 연결하는 창
{ } 사이에서 JavaScript를 사용할 수 있다

```js
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}

```
```js
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}

```
<br>

### 중괄호를 사용하는 곳
1. JSX 태그 안의 문자:
```js
<h1>{name}'s To Do List</h1>
```
2. = 바로 뒤에 오는 어트리뷰트:
```js
src={avatar}
```
<br>

### ”이중 중괄호” 사용하기: JSX의 CSS와 다른 객체

JSX에는 문자열, 숫자 및 기타 JavaScript 표현식뿐만 아니라 객체를 전달할 수도 있다.<br>
또한 객체는 { name: "Hedy Lamarr", inventions: 5 }처럼 중괄호로 표시된다.<br>
따라서 JSX에서 객체를 전달하려면 person={{ name: "Hedy Lamarr", inventions: 5 }}와 같이 다른 중괄호 쌍으로 객체를 감싸야 한다.

```js
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```
> {{ 및 }} 는 특별한 문법이 아니다. JSX 중괄호 안에 들어 있는 JavaScript 객체이다.

### ⚠️주의

인라인 style 프로퍼티는 캐멀 케이스로 작성된다.<br>
예를 들어 HTML에서의 ```<ul style="background-color: black">```은 컴포넌트에서 ```<ul style={{ backgroundColor: 'black' }}>```로 작성된다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/javascript-in-jsx-with-curly-braces" target="_blank">https://ko.react.dev/learn/javascript-in-jsx-with-curly-braces</a>
 
