---
title: Passing Props to a Component
author: Jay.J
date: 2024-06-17 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Passing Props to a Component
> 컴포넌트에 props 전달하기
<br>

### 친숙한 props
props는 JSX 태그에 전달하는 정보이다.<br>
예를 들어, className, src, alt, width, height는 ```<img>``` 태그에 전달할 수 있다.

```js
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```

### 컴포넌트에 props 전달하기 

#### Step 1: 컴포넌트 내보내기
먼저, 부모 컴포넌트에서 몇몇 props를 전달한니다.<br>
예를 들어 person (객체)와 size (숫자)를 전달해 보겠다.

```js
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

#### Step 2: 자식 컴포넌트 내부에서 props 읽기
이러한 props는 function Avatar 바로 뒤에 있는 ({ 와 }) 안에 그들의 이름인 person, size 등을 쉼표로 구분함으로써 읽을 수 있다.<br>
이렇게 하면 부모 컴포넌트 코드 내에서 변수를 사용하는 것처럼 사용할 수 있다.

```js
function Avatar({ person, size }) {
  // person과 size는 이곳에서 사용가능합니다.
}
```
<br>

props를 사용하면 부모 컴포넌트와 자식 컴포넌트를 독립적으로 생각할 수 있다.<br>
예를 들어, Avatar 가 props를 어떻게 사용하는지 생각할 필요 없이  Profile의 person 또는 size props를 수정할 수 있다.<br>
마찬가지로 Profile을 보지 않고도 Avatar가 props를 사용하는 방식을 바꿀 수 있다.

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

### ⚠️주의

props를 선언할 때 ( 및 ) 안에  { 및 } 쌍을 놓치지 말자.
```js
function Avatar({ person, size }) {
  // ...
}
```
이 문법을 “구조 분해 할당”이라고 부르며 함수 매개 변수의 속성과 동등하다.
```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```
<br>

### prop의 기본값 지정하기
변수 바로 뒤에 = 과 함께 기본값을 넣어 구조 분해 할당을 해줄 수 있다.
```js
function Avatar({ person, size = 100 }) {
  // ...
}
```
> 이 기본값은 size prop이 없거나 size={undefined}로 전달될 때 사용된다.<br>
> 그러나 <b>size={null}  또는 size={0}으로 전달된다면, 기본값은 사용되지 않습니다</b>.

<br>

### JSX spread 문법으로 props 전달하기
```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```
위와 같은 코드는 아래처럼 줄일 수 있다.
```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```
이러한 코드는 "spread"문법이다.<br>
하지만 <b>spread 문법은 ⚠️제한적으로 사용해야된다.</b><br>
다른 모든 컴포넌트에 이 구문을 사용한다면 문제가 있는 것이다.

<br>

### 자식을 JSX로 전달하기
Props 안에 children이라는게 있고, children을 사용하여 JSX 를 받을 수 있다.

```js
import Avatar from './Avatar.js';
function Card({ children }) { // 이렇게 받으면 된다. 또는 props.children
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  // 아래 처럼 오픈 클로징 JSX 안에다가 넣으면 된다 (<Card> 안에 <Avatar>)
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```
<br>

### 시간에 따라 props가 변하는 방식
컴포넌트는 시간에 따라 props 를 계속 다르게 받을 수 있다.<br>
<br>
props는 컴퓨터 과학에서 <b>“변경할 수 없다”</b>라는 의미의 불변성을 가지고 있다.<br>
그러므로 컴포넌트가 props를 변경해야 하는 경우(예: 사용자의 상호작용이나 새로운 데이터에 대한 응답)에는 부모 컴포넌트에 다른 props, <b>즉 새로운 객체를 전달하도록 “요청” 해야한다</b><br>
<br>
그러면 이전의 props는 버려지고, 결국 자바스크립트 엔진은 기존 props가 차지했던 메모리를 회수하게 된다.

> ⚠️ “props 변경”을 시도하지 마세요 !<br>
> 선택한 색을 변경하는 등 사용자 입력에 반응해야 하는 경우에는 State: 컴포넌트의 메모리에서 배울 “set state”가 필요할 것이다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/passing-props-to-a-component" target="_blank">https://ko.react.dev/learn/passing-props-to-a-component</a>
 
