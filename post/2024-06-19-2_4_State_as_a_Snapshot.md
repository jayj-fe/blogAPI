---
title: State as a Snapshot
author: Jay.J
date: 2024-06-19 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## State as a Snapshot
> 스냅샷으로서의 State

### state를 설정하면 렌더링이 동작한다
클릭과 같은 사용자 이벤트에 반응하여 사용자 인터페이스가 직접 변경된다고 생각할 수 있다.

```js
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
```
버튼을 클릭하면 다음과 같은 일이 발생한다.

1. onSubmit 이벤트 핸들러가 실행된다.
2. ```setIsSent(true)```가 isSent를 true로 설정하고 새로운 렌더링을 큐에 넣는다.
3. React는 새로운 isSent값에 따라 컴포넌트를 다시 렌더링한다.

### 렌더링은 그 시점의 스냅샷을 찍는다
<b>“렌더링”이란 React가 컴포넌트, 즉 함수를 호출한다는 뜻</b>이다.<br>
해당 함수에서 <b>반환하는 JSX는 시간상 UI의 스냅샷<i>(return JSX === snapshot of UI)</i></b>과 같다.<br>
prop, 이벤트 핸들러, 로컬 변수는 모두 렌더링 당시의 state를 사용해 계산된다.<br>
<br>
사진이나 동영상 프레임과 달리 반환하는 UI “스냅샷”은 대화형이다.<br>
여기에는 입력에 대한 응답으로 어떤 일이 일어날지 지정하는 이벤트 핸들러와 같은 로직이 포함된다.<br>
그러면 React는 이 스냅샷과 일치하도록 화면을 업데이트하고 이벤트 핸들러를 연결한다.<br>
결과적으로 버튼을 누르면 JSX의 클릭 핸들러가 발동된다.<br>
<br>
React가 컴포넌트를 다시 렌더링할 때.
1. React가 함수를 다시 호출한다.
2. 함수가 새로운 JSX 스냅샷을 반환한다.
3. 그러면 React가 함수가 반환한 스냅샷과 일치하도록 화면을 업데이트한다.

<br>

<img src="/assets/img/react/snapshot_01.png" alt="" style="max-width:700px">

<br>
state는 실제로 함수 외부에 마치 선반에 있는 것처럼 React 자체에 “존재”한다.

<br>

<img src="/assets/img/react/snapshot_02.png" alt="" style="max-width:700px">

<br>

### State가 어떻게 작동하는지 보여주는 간단한 실험

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
> state를 설정하면 다음 렌더링에 대해서만 변경된다.<br>
> 첫 번째 렌더링에서 number는 0 이였다.<br>
> 따라서 해당 렌더링의 onClick 핸들러에서 ```setNumber(number + 1)```가 호출된 후에도 number의 값은 여전히 0이다.

<br>
위 버튼의 클릭 핸들러가 React에 지시하는 작업은 다음과 같다.

1. ```setNumber(number + 1)```에서 number는 0이므로 ```setNumber(0 + 1)``` 이다.
- React는 다음 렌더링에서 number를 1로 변경할 준비를 한다.
2. ```setNumber(number + 1)```에서 number는 0이므로 ```setNumber(0 + 1)``` 이다.
- React는 다음 렌더링에서 number를 1로 변경할 준비를 한다.
3. ```setNumber(number + 1)```에서 number는 0이므로 ```setNumber(0 + 1)``` 이다.
- React는 다음 렌더링에서 number를 1로 변경할 준비를 한다.

<br>

```setNumber(number + 1)```를 세 번 호출했지만, 이 렌더링에서 이벤트 핸들러에서 number는 항상 0이므로 state를 1로 세 번 설정한다.<br>
이것이 이벤트 핸들러가 완료된 후 React가 컴포넌트 안의 number 를 3이 아닌 1로 다시 렌더링하는 이유이다.

<br>

### 시간 경과에 따른 State

#### 아래 예제에서 Alert()에 어떤 숫자를 표시할까❓

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```

답은 0 이다.<br>
위에서 설명한 것과 동일하게 <b>이벤트 핸들러에서 number는 0 이기 때문</b>이다.<br>

<br>

#### setTimeout을 걸었을 때는 Alert()에 어떤 숫자를 표시할까❓

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

답은 0 이다<br>
React에 저장된 state는 <b>경고창이 실행될 때 변경되었을 수 있지만,</b><br>
사용자가 상호작용한 시점에 <b>state 스냅샷을 사용하는 건 이미 예약되어 있던 것</b>이다!<br>
<br>
<b>state 변수의 값은 이벤트 핸들러의 코드가 비동기적이더라도 렌더링 내에서 절대 변경되지 않는다.</b>


<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/state-as-a-snapshot" target="_blank">https://ko.react.dev/learn/state-as-a-snapshot</a>
 
