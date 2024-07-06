---
title: Render and Commit
author: Jay.J
date: 2024-06-19 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Render and Commit
> 렌더링 그리고 커밋

 UI를 요청하고 제공하는데까지 세 단계로 나눌 수 있다.<br>
 음식점이라고 상상하고 이 단계들을 표현해보겠다.

1. 렌더링 <b>트리거</b> (손님의 주문을 주방으로 전달)
2. 컴포넌트 <b>렌더링</b> (주방에서 주문 준비하기)
3. DOM에 <b>커밋</b> (테이블에 주문한 요리 내놓기)

<br>

<img src="/assets/img/react/i_rerender.png" alt="" style="max-width:500px">

<br>

### 1단계: 렌더링 트리거
컴포넌트 렌더링이 일어나는 데에는 두 가지 이유가 있다.

1. 컴포넌트의 초기 렌더링인 경우
2. 컴포넌트의 state가 업데이트된 경우

#### 초기 렌더링

앱을 시작할 때 초기 렌더링을 트리거해야 한다<br>
DOM 노드와 함께 ```createRoot```를 호출한 다음,<br>
해당 컴포넌트로 ```render 메서드```를 호출하면 이 작업이 완료된다.

```js
// index.js
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);

// Image.js
export default function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

#### State 업데이트 시 리렌더링
컴포넌트가 처음으로 렌더링 된 후에는 set 함수를 통해 상태를 업데이트하여 추가적인 렌더링을 트리거할 수 있다.<br>
(이것은 레스토랑의 손님이 첫 주문 이후에 갈증이나 배고픔의 상태에 따라 차, 디저트 등의 메뉴를 주문하는 것으로 상상해 볼 수 있다.)

<br>

<img src="/assets/img/react/i_rerender2.png" alt="" style="max-width:500px">

<br>

### 2단계: React 컴포넌트 렌더링
“렌더링”은 React에서 컴포넌트를 호출하는 것이다.
- <b>초기 렌더링에서</b> React는 루트 컴포넌트를 호출한다.
- <b>이후 렌더링에서</b> React는 state 업데이트가 일어나 렌더링을 트리거한 컴포넌트를 호출한다.

<br>

### 3단계: React가 DOM에 변경사항을 커밋
컴포넌트를 렌더링(호출)한 후 React는 DOM을 수정한다.
- <b>초기 렌더링의 경우</b> React는 appendChild() DOM API를 사용하여 생성한 모든 DOM 노드를 화면에 표시한다.
- <b>리렌더링의 경우</b> React는 필요한 최소한의 작업(렌더링하는 동안 계산된 것!)을 적용하여 DOM이 최신 렌더링 출력과 일치하도록 한다.

> React는 렌더링 간에 차이가 있는 경우에만 DOM 노드를 변경한다.



<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/render-and-commit" target="_blank">https://ko.react.dev/learn/render-and-commit</a>
 
