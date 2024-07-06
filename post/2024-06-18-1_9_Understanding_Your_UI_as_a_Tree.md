---
title: Understanding Your UI as a Tree
author: Jay.J
date: 2024-06-17 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Understanding Your UI as a Tree
> 트리로서 UI 이해하기
<br>

### 트리로서의 UI
데이터와 UI를 그릴때 트리구조가 많이 사용된다.
- html → DOM
- css → CSSOM 

모바일도 마찬가지로 계층구조를 트리로 만들어준다.

<br>

<img src="/assets/img/react/ui_tree.png" alt="" style="max-width:500px">

> React는 컴포넌트로부터 UI 트리를 생성한다.<br>
> 위 예제 그림은 UI 트리는 DOM을 렌더링하는 데 사용됩니다.

<br>
브라우저와 모바일 플랫폼처럼 React도 React 앱의 컴포넌트 간의 관계를 관리하고 모델링하기 위해 트리 구조를 사용한다. <br>
<b>트리는 데이터가 흐르는 방식과 렌더링 및 앱 크기를 최적화하는 방법을 이해하는 데 유용한 도구</b>이다.

<br>

### 렌더 트리 
컴포넌트의 주요 특징은 다른 컴포넌트의 컴포넌트를 구성하는 것이다.<br>
컴포넌트를 중첩하면 부모 컴포넌트와 자식 컴포넌트의 개념이 생기며, 각 부모 컴포넌트는 다른 컴포넌트의 자식이 될 수 있다.<br>
<br>
React을 렌더링할 때, 렌더 트리라고 알려진 트리로 계층관계, 중첩관계을 모델링 할 수 있다.
<br>
```js
<!-- App.js -->
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}
```
```js
<!-- FancyText.js -->
export default function FancyText({title, text}) {
  return title
    ? <h1 className='fancy title'>{text}</h1>
    : <h3 className='fancy cursive'>{text}</h3>
}
```
```js
<!-- InspirationGenerator.js -->
import * as React from 'react';
import quotes from './quotes';
import FancyText from './FancyText';

export default function InspirationGenerator({children}) {
  const [index, setIndex] = React.useState(0);
  const quote = quotes[index];
  const next = () => setIndex((index + 1) % quotes.length);

  return (
    <>
      <p>Your inspirational quote is:</p>
      <FancyText text={quote} />
      <button onClick={next}>Inspire me again</button>
      {children}
    </>
  );
}
```
```js
<!-- Copyright.js -->
export default function Copyright({year}) {
  return <p className='small'>©️ {year}</p>;
}

```
```js
<!-- quotes.js -->
export default [
  "Don’t let yesterday take up too much of today.” — Will Rogers",
  "Ambition is putting a ladder against the sky.",
  "A joy that's shared is a joy made double.",
  ];
```
<br>
<img src="/assets/img/react/render_tree.png" alt="" style="max-width:500px">

우리는 위의 렌더 트리를 구성할 수 있다.<br>
<br>
트리는 App, FancyText, Copyright 등의 노드(컴포넌트)로 구성되어 있다.<br>
React 렌더 트리에서 루트 노드는 앱의 Root 컴포넌트이며 위 경우 루트 컴포넌트는 React가 렌더링하는 첫 번째 컴포넌트인 App.js이다.<br>
트리의 각 화살표는 부모 컴포넌트에서 자식 컴포넌트를 가리킨다.

<br>

### 📝 렌더 트리에 HTML 태그는 어디에 있나 ?

렌더 트리는 React는 컴포넌트로만 구성되어 있고, UI 프레임워크로서 React는 플랫폼에 독립적이다.<br>
따라서 웹에서는 HTML 를 생성해야하지만, 모바일 앱이나 데스크탑에서는 다른걸로 생성 되어한다.<br>
그렇기에 플랫폼 UI 기본 요소는 React의 일부가 아니며 React는 어떻게 만들지만 제공한다. 

<br>


위 코드에서 조건부로 렌더링 할 수 있도록 몇몇 파일을 추가 및 수정했다.
```js
<!-- InspirationGenerator.js -->
import * as React from 'react';
import quotes from './quotes';
import FancyText from './FancyText';

export default function InspirationGenerator({children}) {
  const [index, setIndex] = React.useState(0);
  const quote = quotes[index];
  const next = () => setIndex((index + 1) % quotes.length);

  return (
    <>
      <p>Your inspirational quote is:</p>
      <FancyText text={quote} />
      <button onClick={next}>Inspire me again</button>
      {children}
    </>
  );
}
```
```js
export default function Color({value}) {
  return <div className="colorbox" style={{backgroundColor: value}} />
}
```
<br>
<img src="/assets/img/react/render_tree2.png" alt="" style="max-width:500px">

> 조건부 렌더링을 사용하면, 서로 다른 렌더링에서 렌더 트리가 다른 컴포넌트를 렌더링할 수 있다.

렌더 트리가 렌더링 단계마다 다를 수 있지만,<br>
이 트리는 React 앱에서 최상위 컴포넌트와 리프 컴포넌트가 무엇인지를 식별하는 데 도움이 된다.

- 최상위 컴포넌트는 루트 컴포넌트에 가장 가까운 컴포넌트이며, 그 아래의 모든 컴포넌트의 렌더링 성능에 영향을 미치며, 가장 복잡성이 높다.
- 리프 컴포넌트는 트리의 맨 아래에 있으며 자식 컴포넌트가 없으며 자주 다시 렌더링 된다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/understanding-your-ui-as-a-tree" target="_blank">https://ko.react.dev/learn/understanding-your-ui-as-a-tree</a>
 
