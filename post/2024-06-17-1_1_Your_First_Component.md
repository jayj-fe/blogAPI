---
title: Your First Component
author: Jay.J
date: 2024-06-17 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Your First Component
> 첫번째 컴포넌트
<br>

### 컴포넌트: UI 구성 요소 

React에서의 컴포넌트 : 마크업, CSS, JavaScript를 앱의 재사용 가능한 사용자 정의 UI 요소.<br>
컴포넌트를 작성, 순서 지정 및 중첩하여 전체 페이지를 디자인할 수 있다.

<br>

### 컴포넌트 정의하기

React 컴포넌트는 마크업으로 뿌릴 수 있는 JavaScript 함수이다. <br/>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}

```

<br>

#### Step 1: 컴포넌트 내보내기
export 를 이용하여 내보낸다.<br>
```js
export default functionName(){},  
export const functionName = ()=>{}
```

#### Step 2: 함수 정의하기
```js
functionName(){}
const functionName = ()=>{}
```
> *&nbsp;React 컴포넌트는 일반 JavaScript 함수이지만, 이름은 <b>대문자</b>로 시작해야 하며 그렇지 않으면 작동하지 않습니다!

#### Step 3: 마크업 추가하기
이 컴포넌트는 src 및 alt 속성을 가진 <img /> 태그를 반환한다.<br>
&lt;img /&gt;는 HTML처럼 작성되었지만 실제로는 JavaScript이다<br>
이 구문을 JSX라고 하며, JavaScript 안에 마크업을 삽입할 수 있다.

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;

return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<br>

### 컴포넌트 사용하기
컴포넌트를 정의했으므로 다른 컴포넌트 안에 중첩할 수 있다.<br>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

> &lt;section&gt;은 소문자이므로 React는 HTML태그를 가리킨다고 이해한다.<br>
> &lt;Profile /&gt;은 대문자 p로 시작하므로 React는 Profile이라는 컴포넌트를 사용하고자 한다고 이해한다.

#### 브라우저에 표시되는 내용
```js
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### ⚠️주의

컴포넌트는 다른 컴포넌트를 렌더링할 수 있지만, 그 정의를 중첩해서는 안된다.
```js
export default function Gallery() {
  // 🔴 절대 컴포넌트 안에 다른 컴포넌트를 정의하면 안 됩니다!
  function Profile() {
    // ...
  }
  // ...
}
```

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/your-first-component" target="_blank">https://ko.react.dev/learn/your-first-component</a>
 
