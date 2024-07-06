---
title: Updating Objects in State
author: Jay.J
date: 2024-06-19 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Updating Objects in State
> 객체 State 업데이트하기

### 변경이란?
State에는 모든 종류의 자바스크립트 값을 저장할 수 있다.

```js
const [x, setX] = useState(0);
setX(5);
```
x에 들어가는 값들은 변경할 수 없거나 “읽기 전용”을 의미하는 “불변성”을 가진다.<br/>
값을 교체 하기 위해서는 리렌더링이 필요한다.(<b>setX를 이용</b>)<br/>
x state는 0에서 5로 바뀌었지만, 숫자 0 자체 는 바뀌지 않았다.<br/>
숫자, 문자열, 불리언과 같이 자바스크립트에 정의되어 있는 원시 값들은 변경할 수 없다.

<br>

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```
기술적으로 객체 자체 의 내용은 바꿀 수 있다.<br>
이것을 <b>변경(mutation)</b>이라고 한다.

```js
position.x = 5;
```
위 코드와 같이 기술적으로 객체의 내용을 변경할 수 있으나,<Br>
리액트에서는 <b>변경하지말고 교체(setState)</b>를 해야한다.

<br>

### State를 읽기 전용인 것처럼 다뤄라
<b>state에 저장한 자바스크립트 객체는 어떤 것이라도 읽기 전용</b>인 것처럼 다루어야 한다.

```js
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  )
}
```
위 코드에 ```onPionterMove```함수에서 position 객체의 값을 ```setPosition```을 이용한 교체가 아닌 ```pointer.x = e.clientX```의 방식으로 변경을 하고 있다.<br>
위 코드를 실행시키면 변경을 하기 때문에 리렌더링이 발생하지 않는 문제가 생긴다.

```js
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```
변경에서 교체로 방식을 바꾸면 빨간 포인트가 따라오는 걸 확인할 수 있다.

### 📝 지역 변경은 괜찮다.
```js
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```
> 변경은 이미 state에 존재하는 객체를 변경할 때만 문제가 된다<br>
> 방금 만든 객체를 수정하는 것은 아직 다른 코드가 해당 객체를 참조하지 않기 때문에 괜찮습니다.

<br>

### 전개 문법으로 객체 복사하기

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```
 ...객체 전개 구문을 사용하여 각각 복사하지 않고도 모든 프로퍼티를 복사할 수 있다.
 > setPerson({ <b>...person</b>, firstName: e.target.value });

### 📝 여러 필드에 단일 이벤트 핸들러 사용하기
```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```
> [ 와 ] 괄호를 객체 정의 안에 사용하여 동적 이름을 가진 프로퍼티를 명시할 수 있다

<br>

### 중첩된 객체 갱신하기
```js
setPerson({
  ...person, // 다른 필드 복사
  artwork: { // artwork 교체
    ...person.artwork, // 동일한 값 사용
    city: 'New Delhi' // 하지만 New Delhi!
  }
});
```
<br>

### Immer로 간결한 갱신 로직 작성하기
state가 깊이 중첩되어있다면 평탄화를 고려해라.<br>
만약 state 구조를 바꾸고 싶지 않다면, 중첩 전개할 수 있는 더 간편한 방법이 있다.<br>
Immer는 편리하고, 변경 구문을 사용할 수 있게 해주며 복사본 생성을 도와주는 인기 있는 라이브러리이다. 

```js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    // Immer 라이브러리
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```
Immer를 사용하기 위해서는,<br>

1. ```package.json```에 dependency로 use-immer를 추가하세요
2. ```npm install```을 실행하세요
3. ```import { useState } from 'react'```를 ```import { useImmer } from 'use-immer'```로 교체하세요.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/updating-objects-in-state" target="_blank">https://ko.react.dev/learn/updating-objects-in-state</a>
 
