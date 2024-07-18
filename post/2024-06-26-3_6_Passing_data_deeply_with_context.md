---
title: Passing data deeply with context
author: Jay.J
date: 2024-06-26 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Passing data deeply with context
> Context를 사용해 데이터를 깊게 전달하기

### Props 전달하기의 문제점
Props 전달하기는 UI 트리를 통해 명시적으로 데이터를 사용하는 컴포넌트에 전달하는 훌륭한 방법이다.

<b>“Prop drilling”</b> : <br>
<img src="/assets/img/react/passing_data_prop_drilling.png" alt="" style="max-width:500px">

어떤 prop을 트리를 통해 깊이 전해줘야 하거나, 많은 컴포넌트에서 같은 prop이 필요한 경우에 장황해진다.<br>
데이터가 필요한 여러 컴포넌트의 가장 가까운 공통 조상은 트리 상 높이 위치할 수 있다.

<br>

### Context: Props 전달하기의 대안

```js
// App.js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Heading level={2}>Heading</Heading>
      <Heading level={3}>Sub-heading</Heading>
      <Heading level={4}>Sub-sub-heading</Heading>
      <Heading level={5}>Sub-sub-sub-heading</Heading>
      <Heading level={6}>Sub-sub-sub-sub-heading</Heading>
    </Section>
  );
}

or

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js
// Heading.js
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```
```js
// Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

<br>

### 같은 Section 컴포넌트에 동일한 Heading 크기 정하기
```js
<Section level={3}>
  <Heading>About</Heading>
  <Heading>Photos</Heading>
  <Heading>Videos</Heading>
</Section>
```

- Context를 생성한다. (제목 레벨을 위한 것이므로 LevelContext라고 이름 정한다)
- 데이터가 필요한 컴포넌트에서 context를 사용한다. (Heading에서는 LevelContext를 사용한다)
- 데이터를 지정하는 컴포넌트에서 context를 사용한다. (Section에서는 LevelContext를 제공한다)

<br>

<img src="/assets/img/react/passing_data_prop_drilling2.png" alt="" style="max-width:500px">

<br>

#### 1단계: Context 생성하기
```js
// LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(1);
```
<br>

#### 2단계: Context 사용하기
React에서 useContext Hook과 생성한 Context를 가져온다.
```js
// Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

// export default function Heading({ level, children }) {
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```
<br>

#### 3단계: Context 제공하기
LevelContext를 자식들에게 제공하기 위해 context provider로 감싸준다.

```js
// Section.js
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```
> Section 내의 어떤 컴포넌트가 LevelContext를 요구하면 UI 트리에서 가장 가까운 level을 주라고 알려준다.

#### 전체코드

```js
// App.js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js
// Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```
```js
// Section.js
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

```js
// LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

<br>

### 같은 컴포넌트에서 context를 사용하며 제공하기
Section은 위의 Section에서 level을 읽고 자동으로 level + 1을 아래로 전달할 수 있다

```js
// App.js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js
// Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

### 📝 중요
위 코드는 하위 컴포넌트가 context를 오버라이드 할 수 있는 방법을 시각적으로 보여주기 때문에 제목 레벨을 사용한다<br>
하지만 context는 다른 많은 상황에서도 유용하다. 현재 색상 테마, 현재 로그인된 사용자 등 전체 하위 트리에 필요한 정보를 전달할 수 있다.

<br>

### Context로 중간 컴포넌트 지나치기
이 작업을 위해 아무것도 하지 않아도 된다.<br>
Section은 트리에 대한 context를 지정하므로 아무 곳에나 <Heading>을 삽입할 수 있으며 알맞은 크기를 가진다.<br>
<br>
Context의 작동 방식은 CSS 속성 상속을 연상시킨다.<br>
CSS에서 ```<div>```에 대해 color: blue를 지정할 수 있으며, 중간에 있는 다른 DOM 노드가 color: green으로 재정의하지 않는 한 그 안의 모든 DOM 노드가 그 색상을 상속한다.<br>
마찬가지로, <b>React에서 위에서 가져온 어떤 context를 재정의하는 유일한 방법은 자식들을 다른 값을 가진 context provider로 래핑하는 것</b>이다.

<br>

### Context를 사용하기 전에 고려할 것

- <b>Props 전달하기로 시작하기.</b><br>

- <b>컴포넌트를 추출하고 JSX를 children으로 전달하기.</b><br>
<br>

### Context 사용 예시

- <b>테마 지정하기: </b><br>
사용자가 모양을 변경할 수 있는 애플리케이션의 경우에 (e.g. 다크 모드) context provider를 앱 최상단에 두고 시각적으로 조정이 필요한 컴포넌트에서 context를 사용할 수 있다.

- <b>현재 계정: </b><br>
로그인한 사용자를 알아야 하는 컴포넌트가 많을 수 있으므로 Context에 놓으면 트리 어디에서나 편하게 알아낼 수 있다.<br>
일부 애플리케이션에서는 동시에 여러 계정을 운영할 수도 있다(e.g. 다른 사용자로 댓글을 남기는 경우).><br>
이런 경우에는 UI의 일부를 서로 다른 현재 계정 값을 가진 provider로 감싸 주는 것이 편리하다.
- <b>라우팅: </b><br>
대부분의 라우팅 솔루션은 현재 경로를 유지하기 위해 내부적으로 context를 사용한다.<br>
이것이 모든 링크의 활성화 여부를 “알 수 있는” 방법이다. 라우터를 만든다면 같은 방식으로 하고 싶을 것입니다.<
- <b>상태 관리: </b><br>
애플리케이션이 커지면 결국 앱 상단에 수많은 state가 생기게 된다.<br>
아래 멀리 떨어진 많은 컴포넌트가 그 값을 변경하고싶어할 수 있다.<br>
흔히 reducer를 context와 함께 사용하는 것은 복잡한 state를 관리하고 번거로운 작업 없이 멀리 있는 컴포넌트까지 값을 전달하는 방법이다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/passing-data-deeply-with-context" target="_blank">https://ko.react.dev/learn/passing-data-deeply-with-context</a>
 
