---
title: Keeping Components Pure
author: Jay.J
date: 2024-06-17 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Keeping Components Pure
> 컴포넌트 순수하게 유지하기
<br>

### 순수성: 공식으로서의 컴포넌트
컴퓨터 과학에서(특히 함수형 프로그래밍의 세계에서는) 순수 함수는 다음과 같은 특징을 지니고 있는 함수이다.
1. 자신의 일에 집중합니다. 함수가 호출되기 전에 존재했던 어떤 객체나 변수는 변경하지 않는다.
2. 같은 입력, 같은 출력 같은 입력이 주어졌다면 순수함수는 같은 결과를 반환해야 한다.

```js
// 예시
function double(number) {
  return 2 * number;
}
```
> React는 이러한 컨셉 기반에 설계되었다.<br>
> React는 작성되는 모든 컴포넌트가 순수 함수일 거라 가정한다.
<br>

### 사이드 이펙트: 의도하지(않은) 결과 
React의 렌더링 과정은 항상 순수해야 한다.<br/>
컴포넌트는 <b>렌더링하기 전에 존재했던 객체나 변수들을 변경하지 말고</b> 컴포넌트를 순수하지 않도록하는 JSX만 반환해야한다.

```js
let guest = 0;

function Cup() {
  // 나쁜 지점: 이미 존재했던 변수를 변경하고 있다!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}

// 결과값
// Tea cup for guest #2
// Tea cup for guest #4
// Tea cup for guest #6
```
> 컴포넌트 바깥에 선언된 guest라는 변수를 읽고 수정하고 있다.<br>
> 이건 컴포넌트가 여러번 불리면 다른 JSX를 생성한다는 것을 의미한다!

#### 수정된 코드
```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```
> 바깥에 선언된 변수 대신 프로퍼티로 넘겨준다.
<br>

### 지역 변형: 컴포넌트의 작은 비밀 
위의 예시에서 문제는 렌더링하는 동안 컴포넌트가 기존 변수를 변경했다는 것이다.<br>
그러나 <b>렌더링하는 동안 그냥 만든 변수와 객체를 변경하는 것은 전혀 문제가 없다</b>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}

```
<br>

### 부작용을 일으킬 수 있는 지점
화면을 업데이트하고, 애니메이션을 시작하고, 데이터를 변경하는 것을 <b>사이드 이펙트</b>라고 한다.<br>
<b>렌더링중에 발생하는 것이 아니라 “사이드에서” 발생하는 현상</b>이다.<br>
<br>
사이드 이펙트는 보통 이벤트 핸들러에 포함된다.
예를 들면 버튼을 클릭할 때 이벤트 핸들러가 실행된다.
이벤트 헨들러는 컴포넌트 내부에 정의되었다 하더라도 렌더링 중에는 실행되지 않는다!
그래서 이벤트 핸들러는 순수할 필요가 없다.
<br>
다른 옵션을 모두 사용했지만 사이드 이펙트에 적합한 이벤트 핸들러를 찾을 수 없는 경우에도,<br>
컴포넌트에서 useEffect 호출을 사용하여 반환된 JSX에 해당 이벤트 핸들러를 연결할 수 있다.
> 하지만 useEffect 접근 방식은 마지막 수단이 되어야 한다.

<br>

### 📝 리액트는 왜 순수함을 신경쓸까 ?

- <b><i>컴포넌트는 다른 환경에서도 실행될 수 있다.</i></b><br>
 예를 들어 서버에서 동일한 입력에 대해 동일한 결과를 반환하기 때문에 하나의 컴포넌트는 많은 사용자 요청을 처리할 수 있다.
- <b><i>입력이 변경되지 않은 컴포넌트 렌더링을 건너뛰어 성능을 향상</i></b>시킬 수 있다.<br>
순수 함수는 항상 동일한 결과를 반환하므로 캐시하기에 안전하다.
- 깊은 컴포넌트 트리를 <b><i>렌더링하는 도중에 일부 데이터가 변경되는 경우 React는 오래된 렌더링을 완료하는 데 시간을 낭비하지 않고 렌더링을 다시 시작할 수 있다.</i></b><br>
순수함은 언제든지 연산을 중단하는 것을 안전하게 하다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/keeping-components-pure" target="_blank">https://ko.react.dev/learn/keeping-components-pure</a>
 
