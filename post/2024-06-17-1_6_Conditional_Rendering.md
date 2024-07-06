---
title: Conditional Rendering
author: Jay.J
date: 2024-06-17 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Conditional Rendering
> 조건부 렌더링
<br>

### 조건부로 JSX 반환하기
```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```
> isPacked prop이 true이면 이 코드는 다른 JSX 트리를 반환한다.

<br>

### 조건부로 null을 사용하여 아무것도 반환하지 않기
```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```
> isPacked가 true라면 컴포넌트는 아무것도 반환하지 않지만, false라면 JSX가 반환될 것이다.

<br>

### 조건부로 JSX 포함시키기

#### 일반 조건부
```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

#### 삼항 조건 연산자 ( ? : )
```js
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

#### 더 많은 줄을 반환할 때 괄호 사용.
```js
return (
  <li className="item">
    {isPacked ? (
      <del>
        {name + ' ✔'}
      </del>
    ) : (
      name
    )}
  </li>
);
```

#### 논리 연산자
```js
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

### ⚠️주의

<b> &&의 왼쪽에 숫자를 두지 마세요. </b><br>
조건을 테스트하기 위해 JavaScript는 자동으로 왼쪽을 부울로 변환한다.<br>
왼쪽이 0이면 전체 식이 (0)을 얻게 되고 false로 조건부를 랜더링 한다.<br>
예를 들어 ```0 (false) && 출력``` 이라면 아무것도 랜더링 되지 않는다.<br>
<br>

### 변수에 조건부로 JSX를 할당하기
```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}
```

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/conditional-rendering" target="_blank">https://ko.react.dev/learn/conditional-rendering</a>
 
