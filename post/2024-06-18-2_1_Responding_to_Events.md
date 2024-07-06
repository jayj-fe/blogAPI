---
title: Responding to Events
author: Jay.J
date: 2024-06-18 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Responding to Events
> 이벤트에 응답하기

<br>

### 이벤트 핸들러 추가하기
이벤트 핸들러 추가를 위해서는 먼저 함수를 정의하고 이를 적절한 JSX 태그에 prop 형태로 전달해야 한다.

```js
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```
>Button 컴포넌트 내부에 handleClick 함수를 선언한다.<br>
>해당 함수 내부 로직을 구현합니다. 이번에는 메시지를 표시하기 위해 alert를 사용한다.<br>
>```<button>``` JSX에 ```onClick={handleClick}```을 추가한다.

✔️ <b>이벤트 핸들러 특징</b>

- 주로 컴포넌트 내부에서 정의된다.
- handle로 시작하고 그 뒤에 이벤트명을 붙인 함수명을 가진다.

<br>

*&nbsp;위와 동일한 동작을 하는 코드
```js
<button onClick={function handleClick() {
    alert('You clicked me!');
}}>

<button onClick={() => {
    alert('You clicked me!');
}}>
```
<br>

### ⚠️주의

<table>
  <thead>
    <tr>
      <th scope="col">함수를 전달하기(올바른 예시)</th>
      <th scope="col">함수를 호출하기(잘못된 예시)</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td>
        &lt;button onClick={handleClick}&gt;
      </td>
      <td>
        &lt;button onClick={handleClick()}&gt;
      </td>
    </tr>
    <tr>
      <td>
        &lt;button onClick={() => alert('...')}&gt;
      </td>
      <td>
        &lt;button onClick={alert('...')}&gt;
      </td>
    </tr>
  </tbody>
</table>

> props 로 전달 되는 함수는 호출식으로 사용하면 안된다.<br>
> 호출식으로 사용할 시 클릭하여 실행되는 것이 아니라 호출할 때마다 실행된다. 

<br>

#### 이벤트 핸들러 내에서 Prop 읽기
이벤트 핸들러는 컴포넌트 내부에서 선언되기에 이들은 해당 컴포넌트의 prop에 접근할 수 있다.<br>

```js
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
      <AlertButton message="Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}
```

<br>

#### 이벤트 핸들러를 Prop으로 전달하기
부모 컴포넌트로 자식의 이벤트 핸들러를 지정할 수 있다.
```js
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Play "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
```
> PlayButton은 handlePlayClick을 Button 내 onClick prop으로 전달한다.<br>
> UploadButton은 () => alert('Uploading!')을 Button 내 onClick prop으로 전달한다.

<br>

#### 이벤트 핸들러 Prop 명명하기
```<button>```과 ```<div>``` 같은 빌트인 컴포넌트는 onClick과 같은 브라우저 이벤트 이름 만을 지원한다.<br>
그러나 사용자 정의 컴포넌트에서는 이벤트 핸들러 prop의 이름을 원하는 대로 명명할 수 있다.<br>
<br>
관습적으로 이벤트 핸들러 prop의 이름은 on으로 시작하여 대문자 영문으로 이어진다.

```js
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onSmash={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```
> onSmash 이라는 이름으로 호출하기

<br>

### 이벤트 전파
이벤트는 발생한 지점에서 시작하여 트리를 따라 위로 전달된다.
```js
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
```
> button을 클릭시 alert이 두 번 호출(자식, 부모) 된다.

### ⚠️주의
부여된 JSX 태그 내에서만 실행되는 onScroll을 제외한 React 내의 모든 이벤트는 전파된다

<br>

#### 전파 멈추기
e.stopPropagation()를 호출하여 이벤트를 전파를 멈출 수 있다.
```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```
> 1. React가 ```<button>```에 전달된 onClick 핸들러를 호출한다.
> 2. Button에 정의된 해당 핸들러는 다음을 수행한다.
> 3. e.stopPropagation()을 호출하여 이벤트가 더 이상 bubbling 되지 않도록 방지한다.
> 4. Toolbar 컴포넌트가 전달해 준 onClick 함수를 호출한다.
> 5. Toolbar 컴포넌트에서 정의된 위 함수가 버튼의 alert를 표시한다.
> 6. 전파가 중단되었으므로 부모인 ```<div>```의 onClick은 실행되지 않는다.

<br>

#### 전파의 대안으로 핸들러를 전달하기

```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```
> 전파를 활용하고 있지만 어떤 핸들러가 왜 실행되는 지 추적하는데 어려움을 겪고 있다면 이러한 접근법을 시도해 보시기 바란다.

<br>

#### 기본 동작 방지하기
일부 브라우저 이벤트는 그와 관련된 기본 브라우저 동작을 가진다.<br>
예로 ```<form>```의 제출 이벤트는 그 내부의 버튼을 클릭 시 페이지 전체를 리로드하는 것이 기본 동작이다.<br>
<br>
이러한 일이 발생하지 않도록 막기 위해 e.preventDefault()을 호출하여 기본 동작을 막을 수 있다.

```js
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```
<br>

<b>e.stopPropagation() and e.preventDefault() 두 개는 전혀 다른 역할을 한다</b>
- e.stopPropagation() : 부모 요소에서 발생하는 이벤트 방지
- e.preventDefault() : 브라우저 기본 동작 방지

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/responding-to-events" target="_blank">https://ko.react.dev/learn/responding-to-events</a>
 
