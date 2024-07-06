---
title: Writing Markup with JSX
author: Jay.J
date: 2024-06-17 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Writing Markup with JSX
> 첫번째 컴포넌트
<br>

### JSX: JavaScript에 마크업 넣기
원래의 Web은 HTML, CSS, JavaScript를 기반으로써,<br>
HTML로 내용을, CSS로 디자인을, JavaScript로 로직을 작성하면서 각각 별도의 파일로 관리했다.<br>
<br>
그러나 Web이 더욱 인터랙티브해지면서 로직이 내용을 결정하는 경우가 많아졌고, 그래서 JavaScript가 HTML을 담당하게 되었다 !<br>
이것이 바로 React에서 <b>렌더링 로직과 마크업이 같은 위치(컴포넌트)에 함께 있게 된 이유</b>이다. 
<br>
로직과 마크업이 공존하면 서로 싱크를 맞추기가 수월하다.<br>
그리고 각 컨포넌트의 렌더링 로직/html 을 분리해서 관리 할 수 있어서 서로 관여를 없앨 수 있다.<br>
React 컴포넌트는 JSX라는 확장된 문법을 사용하여 마크업을 나타낸다.

> JSX와 React는 서로 다른 별개의 개념이다.<br>
> 종종 함께 사용되기도 하지만 독립적으로 사용할 수도 있다.<br>
> JSX는 확장된 문법이고, React는 JavaScript 라이브러리입니다.

<br>

### JSX의 규칙

#### 1. 하나의 루트 엘리먼트로 반환하기.

```js

div, section 등 부모 태그 사용.

<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  />
  <ul>
    ...
  </ul>
</div>

Or 빈태그 사용.

<>
  <h1>Hedy Lamarr's Todos</h1>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  />
  <ul>
    ...
  </ul>
</>

```
> 이 빈 태그를 Fragment라고 하며, Fragments는 브라우저상의 HTML 트리 구조에서 흔적을 남기지 않고 그룹화해 준다.

#### 📝 왜 여러 JSX 태그를 하나로 감싸줘야 할까요?

JSX는 HTML처럼 보이지만 내부적으로는 일반 JavaScript 객체로 변환된다.<br>
하나의 배열로 감싸지 않은 하나의 함수에서는 두 개의 객체를 반환할 수 없다.<br>
따라서 또 다른 태그나 Fragment로 감싸지 않으면 두 개의 JSX 태그를 반환할 수 없다.

<br>

#### 2. 모든 태그는 닫아주기

JSX에서는 태그를 명시적으로 닫아야 한다.<br>
&lt;img&gt;처럼 자체적으로 닫아주는 태그는 반드시 &lt;img /&gt; 형태로 작성해야 한다.

```js
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  />
</>

```
<br>

#### 3. <del>거의</del> 대부분 캐멀 케이스로!

JSX에서 작성된 어트리뷰트는 JavaScript 객체의 키가 된다.<br>
JavaScript는 변수명에 제한이 있다. 예를 들면, 변수명에 대시를 포함하거나 class처럼 예약어를 사용할 수 없다.<br>
그렇기 때문에 캐멀 케이스로 작성되어야 한다.

```js
  <img
    className="photo" // class ➡️ className
  />
</>

```
> 모든 어트리뷰트는 React DOM 엘리먼트에서 찾을 수 있습니다. &nbsp;<a href="https://ko.react.dev/reference/react-dom/components/common" target="_blank">바로가기</a>

<br>

### ⚠️주의

역사적인 이유로, aria-*와 data-*의 어트리뷰트는 HTML에서와 동일하게 대시를 사용하여 작성한다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/writing-markup-with-jsx" target="_blank">https://ko.react.dev/learn/writing-markup-with-jsx</a>
 
