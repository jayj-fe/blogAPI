---
title: Updating Arrays In State
author: Jay.J
date: 2024-06-19 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Updating Arrays In State
> 배열 State 업데이트하기

### 변경하지 않고 배열 업데이트하기
객체와 마찬가지로 React state에서 배열은 읽기 전용으로 처리해야 한다.<br>
즉 ```arr[0] = 'bird'```처럼 배열 내부의 항목을 재할당해서는 안 되며 ```push()```나 ```pop()```같은 함수로 배열을 변경해서는 안된다.<br>
<br>
배열을 업데이트할 때마다 ```filter()```나 ```map()```을 이용하여 새 배열을 state 설정 함수에 전달해야 한다.
<br>

<table>
  <caption>Updating Arrays In State</caption>
  <thead>
    <tr>
      <th scope='col'></th>
      <th scope='col'>비선호(배열을 변경)</th>
      <th scope='col'>선호(새 배열을 반환)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>추가</td>
      <td>push, unshift</td>
      <td>concat, [...arr] 전개 연산자</td>
    </tr>
    <tr>
      <td>제거</td>
      <td>pop, shift, splice</td>
      <td>filter, slice</td>
    </tr>
    <tr>
      <td>교체</td>
      <td>splice, arr[i] = ... 할당</td>
      <td>map</td>
    </tr>
    <tr>
      <td>정렬</td>
      <td>reverse, sort</td>
      <td>배열을 복사한 이후 처리</td>
    </tr>
  </tbody>
</table>

### ⚠️주의
- slice를 사용하면 배열 또는 그 일부를 복사할 수 있다.
- splice는 배열을 <b>변경</b>한다. (항목을 추가하거나 제거한다.)
> React에서는, state의 객체나 배열을 변경하지 않는 게 좋기 때문에 slice를 훨씬 더 자주 사용하게 될 것이다.

#### 배열에 항목 추가하기

<b>전개 연산자를 이용한 추가</b>
```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setName('');
        <!-- 전개 연산자를 이용한 추가 -->
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```
<br>

#### 배열에서 항목 제거하기

<b>filter 함수를 이용한 제거</b>
```js
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                <!-- filter 함수를 이용한 제거 -->
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```
<br>

#### 배열 변환하기

<b>map 함수를 이용한 변환</b>
```js
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    // map 함수를 이용한 변환
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // 변경시키지 않고 반환한다.
        return shape;
      } else {
        // 50px 아래로 이동한 새로운 원을 반환한다.
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // 새로운 배열로 리렌더링합니다.
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        Move circles down!
      </button>
      {shapes.map(shape => (
        <div style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}
```
<br>

#### 배열 내 항목 교체하기

<b>map 함수를 이용한 교체</b>
```js
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    // map 함수를 이용한 교체
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // 클릭된 counter를 증가시킨다.
        return c + 1;
      } else {
        // 변경되지 않은 나머지를 반환한다.
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}
```
<br>

#### 배열에 항목 삽입하기

<b>slice 함수를 이용한 삽입</b>
```js
import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // 모든 인덱스가 될 수 있다.
    // slice 함수를 이용한 삽입
    const nextArtists = [
      // 삽입 지점 이전 항목
      ...artists.slice(0, insertAt),
      // 새 항목
      { id: nextId++, name: name },
      // 삽입 지점 이후 항목
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```
<br>

#### 배열에 기타 변경 적용하기

<b>별도의 함수를 이용한 변경 적용</b>
```js
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  // 별도의 함수를 이용한 변경 적용
  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        Reverse
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
```
> JavaScript의 reverse() 및 sort() 함수는 원본 배열을 변경시키므로 직접 사용할 수 없다.
<br>

#### 배열 내부의 객체 업데이트하기
중첩된 state를 업데이트할 때, 업데이트하려는 지점부터 최상위 레벨까지의 복사본을 만들어야 한다.

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // 변경된 *새* 객체를 만들어 반환한다.
        return { ...artwork, seen: nextSeen };
      } else {
        // 변경시키지 않고 반환한다.
        return artwork;
      }
    }));
  }

  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) {
        // 변경된 *새* 객체를 만들어 반환한다.
        return { ...artwork, seen: nextSeen };
      } else {
        // 변경시키지 않고 반환한다.
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```
<br>

#### Immer로 간결한 업데이트 로직 작성하기

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourArtworks, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourArtworks}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```


<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/updating-arrays-in-state" target="_blank">https://ko.react.dev/learn/updating-arrays-in-state</a>
 
