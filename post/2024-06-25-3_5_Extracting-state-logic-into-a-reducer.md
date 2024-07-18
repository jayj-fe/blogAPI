---
title: Extracting state logic into a Reducer
author: Jay.J
date: 2024-06-25 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Extracting state logic into a Reducer
> State를 보존하고 초기화하기

### reducer를 사용하여 state 로직 통합하기
컴포넌트가 복잡해지면 컴포넌트의 state가 업데이트되는 다양한 경우를 한눈에 파악하기 어려워질 수 있다.<br>
복잡성를 줄이고 접근성을 높이기 위해서, 컴포넌트 내부에 있는 state 로직을 컴포넌트 외부의 <b>“reducer”</b>라고 하는 단일 함수로 옮길 수 있다.

<br>

세가지 단계를 걸쳐 useState에서 useReducer로 변경할 수 있다.

1. state를 설정하는 것에서 action을 dispatch 함수로 전달하는 것으로 바꾸기.
2. reducer 함수 작성하기.
3. 컴포넌트에서 reducer 사용하기.

<br>

#### 1단계: state를 설정하는 것에서 action을 dispatch 함수로 전달하는 것으로 바꾸기

reducer를 사용한 state 관리는 state 직접 설정하는 것과 약간 다르다.<br>
state를 설정하여 React에게 <b>“무엇을 할 지”</b>를 지시하는 대신, 이벤트 핸들러에서 “action”을 전달하여 <b>“사용자가 방금 한 일”</b>을 지정한다. 

```js
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId
  });
}
```
- 사용자가 “Add” 를 눌렀을 때 호출되는 handleAddTask(text)
- 사용자가 task를 토글하거나 “저장”을 누르면 호출되는 handleChangeTask(task)
- 사용자가 “Delete” 를 누르면 호출되는 handleDeleteTask(taskId)

> dispatch 함수에 넣어준 객체를 “action” 이라고 한다.

### 📝 중요
action 객체는 어떤 형태든 될 수 있다.<br>
그렇지만 발생한 일을 설명하는 문자열 type 을 넘겨주고 이외의 정보는 다른 필드에 담아서 전달하도록 작성하는 게 일반적이다.

ex : 
```js
dispatch({
  // 컴포넌트마다 다른 값
  type: 'what_happened',
  // 다른 필드는 이곳에
});
```

<br>

#### 2단계: reducer 함수 작성하기
reducer 함수는 state에 대한 로직을 넣는 곳이다.<br>
현재의 state 값과 action 객체, 이렇게 두 개의 인자를 받고 다음 state 값을 반환한다.

```js
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

<br>

#### 3단계: 컴포넌트에서 reducer 사용하기
React에서 useReducer hook을 불러와, 컴포넌트에 tasksReducer를 연결한다.

```js
import { useReducer } from 'react';
```
```js
// 아래 코드를 변경한다.
// const [tasks, setTasks] = useState(initialTasks);
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```


```js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];

```

<br>

### useState와 useReducer 비교하기

- <b>코드 크기: </b><br>
일반적으로 useState를 사용하면, 미리 작성해야 하는 코드가 줄어든다.<br>
useReducer를 사용하면 reducer 함수 그리고 action을 전달하는 부분 둘 다 작성해야 한다.<br>
하지만 여러 이벤트 핸들러에서 비슷한 방식으로 state를 업데이트하는 경우, useReducer를 사용하면 코드의 양을 줄이는 데 도움이 될 수 있다.

- <b>가독성: </b><br>
useState로 간단한 state를 업데이트하는 경우 가독성이 좋은 편이다.<br>
그렇지만 더 복잡한 구조의 state를 다루게 되면 컴포넌트의 코드 양이 더 많아져 한눈에 읽기 어려워질 수 있다.<br>
이 경우 useReducer를 사용하면 업데이트 로직이 어떻게 동작하는지와 이벤트 핸들러를 통해서 무엇이 발생했는지 구현한 부분을 명확하게 구분할 수 있다.

- <b>디버깅: </b><br>
useState를 사용하며 버그를 발견했을 때, 왜, 어디서 state가 잘못 설정됐는지 찾기 어려울 수 있다.<br>
useReducer를 사용하면, 콘솔 로그를 reducer에 추가하여 state가 업데이트되는 모든 부분과 왜 해당 버그가 발생했는지(어떤 action으로 인한 것인지)를 확인할 수 있다.<br>
각 action이 올바르게 작성되어 있다면, 버그를 발생시킨 부분이 reducer 로직 자체에 있다는 것을 알 수 있다.<br>
그렇지만 useState를 사용하는 경우보다 더 많은 코드를 단계별로 실행해서 디버깅 해야 하는 점이 존재한다.

- <b>테스팅: </b><br>
reducer는 컴포넌트에 의존하지 않는 순수 함수이다.<br>
이는 reducer를 독립적으로 분리해서 내보내거나 테스트할 수 있다는 것을 의미한다.<br>
일반적으로 더 현실적인 환경에서 컴포넌트를 테스트하는 것이 좋지만, 복잡한 state를 업데이트하는 로직의 경우 reducer가 특정 초기 state 및 action에 대해 특정 state를 반환한다고 생각하고 테스트하는 것이 유용할 수 있다.

<br>

### reducer 잘 작성하기

- <b>Reducers는 반드시 순수해야 한다.</b><br>
 state updater functions와 비슷하게, reducer는 렌더링 중에 실행된다! (action은 다음 렌더링까지 대기한다.) <br>
 reducer는 objects와 arrays을 변이 없이 업데이트해야한다.

- <b>각 action은 데이터 안에서 여러 변경들이 있더라도 하나의 사용자 상호작용을 설명해야한다.</b><br>
모든 action을 reducer에 기록하면 어떤 상호작용이나 응답이 어떤 순서로 일어났는지 재구성할 수 있을 만큼 로그가 명확해야 한다. 

<br>

### Immer로 간결한 reducer 작성하기
```js
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex(t =>
        t.id === action.task.id
      );
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];
```

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/extracting-state-logic-into-a-reducer" target="_blank">https://ko.react.dev/learn/extracting-state-logic-into-a-reducer</a>
 
