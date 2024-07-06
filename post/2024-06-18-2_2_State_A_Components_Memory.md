---
title: State A Components Memory
author: Jay.J
date: 2024-06-18 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## State: A Components Memory
> State: 컴포넌트의 기억 저장소

<br>

### 일반 변수로 충분하지 않은 경우
```js
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```
해당 코드는 handleClick 이벤트 핸들러가 지역 변수 index를 업데이트하고 있다.<br>
하지만 이러한 변화를 보이지 않게 하는 두 가지 이유가 있다.
- 지역 변수는 렌더링 간에 유지되지 않습니다<br>
React는 이 컴포넌트를 <b>두 번째로 렌더링할 때 지역 변수에 대한 변경 사항은 고려하지 않고 처음부터 렌더링</b> 한다.
- 지역 변수를 변경해도 렌더링을 일으키지 않습니다<br>
React는 <b>새로운 데이터로 컴포넌트를 다시 렌더링해야 한다는 것을 인식하지 못한다.</b>

<br>
<br>

컴포넌트를 새로운 데이터로 업데이트하기 위해선 다음 두 가지가 필요하다.
- 렌더링 사이에 데이터를 유지한다.
- React가 새로운 데이터로 컴포넌트를 렌더링하도록 유발한다.

<br>
<br>

```useState``` 훅은 이 두 가지를 제공한다.
- 렌더링 간에 데이터를 유지하기 위한 state 변수.
- 변수를 업데이트하고 React가 컴포넌트를 다시 렌더링하도록 유발하는 state setter 함수

<br>

### state 변수 추가하기 
1. 상단 선언.
```js
import { useState } from 'react';
```

2. 변수와 함수 지정.
```js
const [index, setIndex] = useState(0);
```

3. 함수 호출.
```js
function handleClick() {
  setIndex(index + 1);
}
```

4. 변경된 예제 코드
```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

<br>

#### 첫 번째 훅 만나기 
React에서 useState와 같이 <b>“use”로 시작하는 다른 모든 함수를 훅</b>이라고 한다.<br>
훅은 React가 <b>오직 렌더링 중일 때만 사용할 수 있는 특별한 함수</b>이다.

### ⚠️주의
훅(use로 시작하는 함수들)은 컴포넌트의 최상위 수준 또는 커스텀 훅에서만 호출할 수 있다.

<br>

#### useState 해부하기
useState를 호출하는 것은, React에 이 컴포넌트가 무언가를 기억하기를 원한다고 말하는 것이다.

### 📝 중요
이 쌍의 이름은 const [something, setSomething]과 같이 지정하는 것이 규칙이다.<br>
원하는 대로 이름을 지을 수 있지만, 규칙을 사용하면 프로젝트 전반에 걸쳐 상황을 더 쉽게 이해할 수 있다.

```js
const [ 이름, set이름] = useState(초기값);
```

컴포넌트가 렌더링될 때마다, useState는 다음 두 개의 값을 포함하는 배열을 제공한다.

1. 저장한 값을 가진 state 변수 (index).
2. state 변수를 업데이트하고 React에 컴포넌트를 다시 렌더링하도록 유발하는 state setter 함수 (setIndex).

<br>

### 컴포넌트에 여러 state 변수 지정하기
```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

### 📝 React는 어떤 state를 반환할지 어떻게 알 수 있을까?
리액트 내부적으로는 각 Component 마다 hook Array를 가지고 있고  current pair index(순서인 거 같다) 도 가지고 있다. <br>
처음 렌더되기전에는 current pair index=0; 그리고 useState 가 호출될때마다 current pair index 의 다음 인덱스를 넘겨준다. <br>

```js
// 이런식으로 가지고 있다.
const hookArr= [
  [state, setState], 
  [state1, setState1], 
  [state2, setState2], 
  …
]

// useState 가 컴포넌트에 불릴때마다 currentPairIdx++; 해서 보내준다.
let currentPairIdx = 0; 
```

```js
let componentHooks = [];
let currentHookIndex = 0;
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
  // hooksArr 에 있으면 currentHookIndex++ 하고 내보낸다
    currentHookIndex++;
    return pair;
  }
  pair = [initialState, setState]; //hookArr없으면 새로 만든다
  function setState(nextState) { //setState는 호이스팅 되서 바로위에 들어간다
    pair[0] = nextState;  //initialState 다음으로 바꾼다
    updateDOM(); // 렌더링 트리거.
  }
  componentHooks[currentHookIndex] = pair; //hookArr없으면 새로 만든 거를 hookArr 넣는다
  currentHookIndex++; //hookArr없으면 ++ 한다. 
  return pair;  //hookArr없으면 새로만든거 리턴한다
}
function Gallery() {
  // 각 useState 호출할 때 currentHookIndex++;
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  function handleNextClick() {
    setIndex(index + 1);
  }
  function handleMoreClick() {
    setShowMore(!showMore);
  }
  let sculpture = sculptureList[index];
  return {
    onNextClick: handleNextClick,// 함수 넘기기
    onMoreClick: handleMoreClick,// 함수 넘기기
    header: `${sculpture.name} by ${sculpture.artist}`//예제 데이터 넘기기,
    counter: `${index + 1} of ${sculptureList.length}` //state 넘기기 ,
    more: `${showMore ? 'Hide' : 'Show'} details`,// state 넘기기
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt
  };
}
function updateDOM() {
//렌더 될때 마다  currentHookIndex =0 으로 돌린다 . 
  currentHookIndex = 0;
  let output = Gallery();
  //각각 데이터 마다 html(혹은 JSX 여긴 확실하지 않음) 바인딩 해준다. 
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = '';
  } else {
    description.style.display = 'none';
  }
}
```
> 이해하지 않아도 React를 사용하는 데 문제는 없지만, 도움이 되는 사고방식으로서 유용할 수 있을 것이다.

<br>

### State는 격리되고 비공개로 유지된다
동일한 컴포넌트를 두 번 렌더링한다면 각 복사본은 완전히 격리된 state를 가진다.

APP.js
```js
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}
```
Gallery.js
```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <section>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </section>
  );
}
```

data.js
```js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

두 개의 갤러리가 state를 동기화하길 원한다면,<br>
React에서 올바른 방법은 <b>자식 컴포넌트에서 state를 제거하고 가장 가까운 공유 부모 컴포넌트에 추가하는 것</b>이다.

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/state-a-components-memory" target="_blank">https://ko.react.dev/learn/state-a-components-memory</a>
 
