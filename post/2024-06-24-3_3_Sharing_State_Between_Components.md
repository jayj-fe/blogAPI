---
title: Sharing state between Components
author: Jay.J
date: 2024-06-24 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Sharing state between Components
> 컴포넌트 간 State 공유하기

### State 끌어올리기 예제

아래는 한 패널의 버튼을 눌러도 다른 패널에는 영향을 미치지 않고 독립적인 코드입니다.

```js
Accordion                                                                       
├─Panel
└─Panel
```
```js
import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}
```

<img src="/assets/img/react/react_state.png" alt="" style="max-width:700px">

### 한 번에 하나의 패널만 열리도록 변경하기
1. 자식 컴포넌트의 state를 제거한다.
2. 하드 코딩된 값을 공통 부모로부터 전달한다.
3. 공통 부모에 state를 추가하고 이벤트 핸들러와 함께 전달한다.

<br>

#### Step 1: 자식 컴포넌트에서 state 제거하기

Panel 에서 아래코드 삭제한다.
```js
const [isActive, setIsActive] = useState(false);
```

Panel의 prop 목록에 isActive를 추가한다.
```js
function Panel({ title, children, isActive }) {
```

<br>

#### Step 2: 하드 코딩된 데이터를 부모 컴포넌트로 전달하기

두 자식 컴포넌트의 가장 가까운 공통 부모 컴포넌트에 state를 두어 두 패널에 전달되도록 해야한다.
```js
import { useState } from 'react';

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={true}>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology" isActive={true}>
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}
```

<br>

#### Step 3: 공통 부모에 state 추가하기
Accordion에서 state를 관리하고,<br>
activeIndex가 0이면 첫 번째 패널이 활성화된 것이고, 1이면 두 번째 패널이 활성화된 것이다.

```js
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}
```

<img src="/assets/img/react/react_state2.png" alt="" style="max-width:700px">

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/sharing-state-between-components" target="_blank">https://ko.react.dev/learn/sharing-state-between-components</a>
 
