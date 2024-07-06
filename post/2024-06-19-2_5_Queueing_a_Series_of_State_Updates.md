---
title: Queueing a Series of State Updates
author: Jay.J
date: 2024-06-19 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Queueing a Series of State Updates
> state 업데이트 큐

### React state batches 업데이트
```setNumber(number + 1)```를 세 번 호출하므로 “+3” 버튼을 클릭하면 세 번 증가할 것으로 예상할 수 있다.

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

이전 세션에서 기억할 수 있듯이 각 렌더링의 state 값은 고정되어 있으므로,<br>
첫 번째 렌더링의 이벤트 핸들러의 number 값은 ```setNumber(1)```을 몇 번 호출하든 항상 0 이다.<br>

하지만 여기에는 한가지 요인이 더 있다<br>
<b>React는 state 업데이트를 하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다린다.<br>
이 때문에 리렌더링은 모든 ```setNumber()``` 호출이 완료된 이후에만 일어난다.</b>

<br>
이는 음식점에서 주문받는 웨이터를 생각해 볼 수 있다.<br>
웨이터는 첫 번째 요리를 말하자마자 주방으로 달려가지 않는다!<br>
대신 주문이 끝날 때까지 기다렸다가 주문을 변경하고, 심지어 테이블에 있는 다른 사람의 주문도 받는다.<br>

<br>

이렇게 하면 <b>너무 많은 리렌더링이 발생하지 않고도 여러 컴포넌트에서 나온 다수의 state 변수를 업데이트</b>할 수 있다.<br>
하지만 이는 <b>이벤트 핸들러와 그 안에 있는 코드가 완료될 때까지 Ui가 업데이트되지 않는다는 의미</b>이기도 하다.<br>
<b><i>batching</i></b>라고도 하는 이 동작은 React 앱을 훨씬 빠르게 실행할 수 있게 해준다.<br>
또한 일부 변수만 업데이트된 “반쯤 완성된” 혼란스러운 렌더링을 처리하지 않아도 된다.<br>
<br>
<b>React는 클릭과 같은 여러 의도적인 이벤트에 대해 batch를 수행하지 않으며</b>, 각 클릭은 개별적으로 처리된다.

<br>

### 다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트하기

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```
React가 이벤트 핸들러를 수행하는 동안 여러 코드를 통해 작동하는 방식은 다음과 같다.

1. ```setNumber(n => n + 1)```: n => n + 1 함수를 큐에 추가한다.
2. ```setNumber(n => n + 1)```: n => n + 1 함수를 큐에 추가한다.
3. ```setNumber(n => n + 1)```: n => n + 1 함수를 큐에 추가한다.

<br>

<table>
  <caption>queued update table</caption>
  <thead>
    <tr>
      <th scope='col'>queued update</th>
      <th scope='col'>n</th>
      <th scope='col'>returns</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>n => n + 1</td>
      <td>0</td>
      <td>0 + 1 = 1</td>
    </tr>
    <tr>
      <td>n => n + 1</td>
      <td>1</td>
      <td>1 + 1 = 2</td>
    </tr>
    <tr>
      <td>n => n + 1</td>
      <td>2</td>
      <td>2 + 1 = 3</td>
    </tr>
  </tbody>
</table>

> React는 3을 최종 결과로 저장하고 useState에서 반환한다.

<br>

### state를 교체한 후 업데이트하면 어떻게 되나?
```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}
```
React가 이벤트 핸들러를 수행하는 동안 여러 코드를 통해 작동하는 방식은 다음과 같다.

1. ```setNumber(number + 5)``` : number는 0이므로 setNumber(0 + 5) 이다. React는 큐에 “5로 바꾸기” 를 추가한다.
2. ```setNumber(n => n + 1)``` : n => n + 1는 업데이터 함수이다. React는 해당 함수를 큐에 추가한다.

<table>
  <caption>queued update table</caption>
  <thead>
    <tr>
      <th scope='col'>queued update</th>
      <th scope='col'>n</th>
      <th scope='col'>returns</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"replace with 5"</td>
      <td>0 (unused)</td>
      <td>5</td>
    </tr>
    <tr>
      <td>n => n + 1</td>
      <td>5</td>
      <td>5 + 1 = 6</td>
    </tr>
  </tbody>
</table>

> React는 6을 최종 결과로 저장하고 useState에서 반환한다.

### 📝 중요
```setState(5)```가 실제로는 ```setState(n => 5)```처럼 동작하지만 n이 사용되지 않는다!
<br>

### 업데이트 후 state를 바꾸면 어떻게 되나?
```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
      }}>Increase the number</button>
    </>
  )
}
```
React가 이벤트 핸들러를 수행하는 동안 여러 코드를 통해 작동하는 방식은 다음과 같다.

1. ```setNumber(number + 5)```: number 는 0 이므로 ```setNumber(0 + 5)```입니다. React는 “5로 바꾸기” 를 큐에 추가한다.
2. ```setNumber(n => n + 1)```: n => n + 1 는 업데이터 함수이다. React는 이 함수를 큐에 추가한다.
3. ```setNumber(42)```: React는 “42로 바꾸기” 를 큐에 추가한다.

<table>
  <caption>queued update table</caption>
  <thead>
    <tr>
      <th scope='col'>queued update</th>
      <th scope='col'>n</th>
      <th scope='col'>returns</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"replace with 5"</td>
      <td>0 (unused)</td>
      <td>5</td>
    </tr>
    <tr>
      <td>n => n + 1</td>
      <td>5</td>
      <td>5 + 1 = 6</td>
    </tr>
    <tr>
      <td>"replace with 42"</td>
      <td>6 (unused)</td>
      <td>42/td>
    </tr>
  </tbody>
</table>

> React는 42를 최종 결과로 저장하고 useState에서 반환한다.

<br>

### ✔️ 결론
- 업데이터 함수 (예. n => n + 1) 가 큐에 추가된다.
- 다른 값 (예. 숫자 5) 은 큐에 “5로 바꾸기”를 추가하며, 이미 큐에 대기 중인 항목은 무시한다.

<br>

### 📝 명명규칙
업데이터 함수 인수의 이름은 해당 state 변수의 첫 글자로 지정하는 것이 일반적이다.
```js
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```
> 좀 더 자세한 코드를 선호하는 경우 ```setEnabled(enabled => !enabled)```와 같이 전체 state 변수 이름을 반복하거나,<br>
> ```setEnabled(prevEnabled => !prevEnabled)```와 같은 접두사를 사용하는 것이 널리 사용되는 규칙이다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/queueing-a-series-of-state-updates" target="_blank">https://ko.react.dev/learn/queueing-a-series-of-state-updates</a>
 
