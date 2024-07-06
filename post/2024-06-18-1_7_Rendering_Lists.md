---
title: Rendering Lists
author: Jay.J
date: 2024-06-17 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Rendering Lists
> 리스트 렌더링
<br>

### 배열을 데이터로 렌더링하기

#### 1. 데이터를 배열로 만든다.
```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

#### 2. people의 요소를 새로운 JSX 노드 배열인 listItems에 매핑한다.
```js
const listItems = people.map(person => <li>{person}</li>);
```

#### 3. ```<ul>```로 래핑된 컴포넌트의 listItems를 반환한다.
```js
return <ul>{listItems}</ul>;
```

#### 4. 최종 코드
```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}

```

### 배열의 항목들을 필터링하기
데이터들은 훨씬 더 구조화될 수 있다.

```js
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```

위 데이터에서 profession이 'chemist'인 데이터만 출력하고 싶을 땐 아래 순서와 같이 만들 수 있다.

#### 1. people에서 filter()를 호출해 person.profession === 'chemist'로 필터링해서 “chemist”로만 구성된 새로운 배열 chemists를 생성한다.
```js
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```

#### 2. 이제 chemists를 매핑한다.
```js
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```

#### 3. 마지막으로 컴포넌트에서 listItems를 반환한다.
```js
return <ul>{listItems}</ul>;
```

#### 4. 최종코드
```js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

### ⚠️주의

화살표 함수는 암시적으로 => 바로 뒤에 식을 반환하기 때문에 return 문이 필요하지 않다.<br>
하지만 <b>=> 뒤에 { 중괄호가 오는 경우 return을 명시적으로 작성해야 한다.</b>

<br>

### key를 사용해서 리스트 항목을 순서대로 유지하기
각 배열 항목에 다른 항목 중에서 <b>고유하게 식별할 수 있는 문자열 또는 숫자를 key로 지정</b>해야 한다.

### ❗중요
```map()``` 호출 내부의 JSX 엘리먼트에는 항상 key가 필요하다!

```js
const listItems = people.map(person =>
  <li key={person.id}>
    <img
      src={getImageUrl(person)}
      alt={person.name}
    />
    <p>
      <b>{person.name}</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
    </p>
  </li>
);
```
> ```<></>```을 사용할 경우 key를 전달할 수 없으므로,<br>
> ```<div>``` 또는 ```<Fragment>``` 문법을 사용해야 한다.
<br>

### key를 가져오는 곳 
1. 데이터베이스의 데이터: 본질적으로 고유한 데이터베이스 key/ID를 사용
2. 로컬에서 생성된 데이터: ```crypto.randomUUID()``` 또는 ```uuid``` 같은 패키지를 이용하여 유니크한 key 생성

<br>

### key 규칙
1. key는 형제 간에 고유해야 한다.
> 같은 key를 다른 배열의 JSX 노드에 동일한 key를 사용해도 괜찮다.
2. key는 변경되어서는 안 된다.
> 랜더링중에 key를 생성해서는 안된다.

### React에 key가 필요한 이유는 무엇인가요
컬렉션에서 각 컴포넌트에 key를 설정하여 위치나 데이터가 변경되더라도 React가 각 컴포넌트를 추적할 수 있도록 하는 이유와 방법이다.


### ⚠️주의

만약 ```key```를 지정하지 않으면, 인덱스를 사용한다.<br>
하지만 항목이 삽입되거나 삭제되어 배열의 순서가 바뀌면 버그가 발생할 수 있다.<br>
되도록 인덱스가 아닌 고유한 키를 사용해야된다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/rendering-lists" target="_blank">https://ko.react.dev/learn/rendering-lists</a>
 
