---
title: Your First Component
author: Jay.J
date: 2024-06-17 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Importing and Exporting Components
> 컴포넌트 import 및 export 하기
<br>

### Root 컴포넌트란

App.js 라는 파일이 대부분 만들어지고 이게 루트이며, 모든 컴포넌트는 이런 루트 안에 존재하게된다.<br/>
만약 Next.js 같은 프레임워크일 경우, 매 페이지 마다 Root component 가 달라진다.

<br>

### 컴포넌트를 import 하거나 export 하는 방법

1. 컴포넌트를 추가할 JS 파일을 생성한다.
2. 새로 만든 파일에서 함수 컴포넌트를 export 한다.
> default 또는 named export 방식을 사용한다.
3. 컴포넌트를 사용할 파일에서 import 한다.
> 적절한 방식을 선택해서 default 또는 named로 import 한다.

```js
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

### 📝 Note

가끔 .js와 같은 파일 확장자가 없을 때도 있다.

```js
import Gallery from './Gallery';
```
> React에서는 './Gallery.js' 또는 './Gallery' 둘 다 사용할 수 있지만 전자의 경우가 native ES Modules 사용 방법에 더 가깝다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/importing-and-exporting-components" target="_blank">https://ko.react.dev/learn/importing-and-exporting-components</a>
 
