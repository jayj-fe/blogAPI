---
title: Reacting to Input with State
author: Jay.J
date: 2024-06-24 08:11:39 +0900
categories: [javascript, ReactJs]
tags: [javascript, ReactJs]
math: true
mermaid: true
image: /blogAPI/assets/img/react.png
---

<br>

## Reacting to Input with State
> State를 사용해 Input 다루기

### 선언형 UI와 명령형 UI

<table>
  <caption>선언형 UI와 명령형 UI 비교</caption>
  <thead>
    <tr>
      <th scope='col'>명령형 UI</th>
      <th scope='col'>선언형 UI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
       - 폼에 무언가를 입력하면 “제출” 버튼이 활성화된다.<br>
       - ”제출” 버튼을 누르면 폼과 버튼이 비활성화되고 스피너가 나타난다.<br>
       - 네트워크 요청이 성공하면 폼은 숨겨질 것이고 “감사합니다.” 메시지가 나타난다.<br>
       - 네트워크 요청이 실패하면 오류 메시지가 보일 것이고 폼은 다시 활성화된다.
      </td>
      <td>
        - 컴포넌트의 다양한 시각적 state를 확인한다.<br>
        - 무엇이 state 변화를 트리거하는지 알아낸다.<br>
        - useState를 사용해서 메모리의 state를 표현한다.<br>
        - 불필요한 state 변수를 제거한다.<br>
        - state 설정을 위해 이벤트 핸들러를 연결한다.
      </td>
    </tr>
    <tr>
      <td>
       → 여기서 이걸 누르면,<br>
       그래서 눌렀을때 반응을보고 이걸 하고,<br>
       다음 액션에서 이걸하고… 
      </td>
      <td>
        이 state 에서는 UI type 1를 보여줘<br>
        다른 state 에서는 UI type 2 를 보여줘
      </td>
    </tr>
  </tbody>
</table>

<br>

### 첫 번째: 컴포넌트의 다양한 시각적 state 확인하기

먼저 사용자가 볼 수 있는 UI의 모든 “state”를 시각화해야 한다.
- Empty: 폼은 비활성화된 “제출” 버튼을 가지고 있다.
- Typing: 폼은 활성화된 “제출” 버튼을 가지고 있다.
- Submitting: 폼은 완전히 비활성화되고 스피너가 보인다.
- Success: 폼 대신에 “감사합니다” 메시지가 보인다.
- Error: “Typing” state와 동일하지만 오류 메시지가 보인다.

```js
export default function Form({
  // 'submitting', 'error', 'success'로 한 번 변경해보세요:
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={
          status === 'submitting'
        } />
        <br />
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
          <p className="Error">
            Good guess but a wrong answer. Try again!
          </p>
        }
      </form>
      </>
  );
}
```

### 📝 많은 시각적 state를 한 번에 보여주기
#### App.js
```js
import Form from './Form.js';

let statuses = [
  'empty',
  'typing',
  'submitting',
  'success',
  'error',
];

export default function App() {
  return (
    <>
      {statuses.map(status => (
        <section key={status}>
          <h4>Form ({status}):</h4>
          <Form status={status} />
        </section>
      ))}
    </>
  );
}
```

#### Form.js
```js
export default function Form({ status }) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <form>
      <textarea disabled={
        status === 'submitting'
      } />
      <br />
      <button disabled={
        status === 'empty' ||
        status === 'submitting'
      }>
        Submit
      </button>
      {status === 'error' &&
        <p className="Error">
          Good guess but a wrong answer. Try again!
        </p>
      }
    </form>
  );
}
```
> “살아있는 스타일가이드(living styleguides)” 또는 “스토리북(storybooks)“

<br>

### 두 번째: 무엇이 state 변화를 트리거하는지 알아내기

두 종류의 인풋 유형으로 state 변경을 트리거할 수 있다.

1. 버튼을 누르거나, 필드를 입력하거나, 링크를 이동하는 것 등의 <b>휴먼 인풋</b>
2. 네트워크 응답이 오거나, 타임아웃이 되거나, 이미지를 로딩하거나 하는 등의 <b>컴퓨터 인풋</b>

두 가지 경우 모두 <b>UI를 업데이트하기 위해서는 state 변수를 설정</b>해야 한다. <br>
지금 만들고 있는 폼의 경우 몇 가지 입력에 따라 state를 변경해야 한다.

- 텍스트 인풋을 변경하면 (휴먼) 텍스트 상자가 비어있는지 여부에 따라 state를 Empty에서 Typing 으로 또는 그 반대로 변경해야 한다.
- 제출 버튼을 클릭하면 (휴먼) Submitting state를 변경해야 한다.
- 네트워크 응답이 성공적으로 오면 (컴퓨터) Success state를 변경해야 한다.
- 네트워크 요청이 실패하면 (컴퓨터) 해당하는 오류 메시지와 함께 Error state를 변경해야 한다.

<br>

### 세 번째: 메모리의 state를 useState로 표현하기
state는 “움직이는 조각”이다. <b>“움직이는 조각”은 적을수록 좋다</b>

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

<br>

### 네 번째: 불필요한 state 변수를 제거하기
state가 사용자에게 유효한 UI를 보여주지 않는 경우를 방지하는 것이다

- <b>state가 역설을 일으키지는 않는가?</b><Br>
예를 들면 isTyping과 isSubmitting이 동시에 true일 수는 없다.<br>
이러한 역설은 보통 state가 충분히 제한되지 않았음을 의미한다.<br>
여기에는 두 boolean에 대한 네 가지 조합이 있지만 오직 유효한 state는 세 개뿐이다.<br>
이러한 “불가능한” state를 제거하기 위해 세 가지 값 'typing', 'submitting', 'success'을 하나의 status로 합칠 수 있다.

- <b>다른 state 변수에 이미 같은 정보가 담겨있진 않는가?</b><br>
isEmpty와 isTyping은 동시에 true가 될 수 없다.<br>
이를 각각의 state 변수로 분리하면 싱크가 맞지 않거나 버그가 발생할 위험이 있다.<br>
이 경우에는 운이 좋게도 isEmpty를 지우고 answer.length === 0으로 체크할 수 있다.

- <b>다른 변수를 뒤집었을 때 같은 정보를 얻을 수 있진 않는가?</b><br>
isError는 error !== null로도 대신 확인할 수 있기 때문에 필요하지 않다.

#### 정리 후 남은 변수
```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
```

<br>

### 다섯 번째: state 설정을 위해 이벤트 핸들러를 연결하기
```js
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // 네트워크에 접속한다고 가정해봅시다.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

<br>
<br>

## 참고 했던 자료 및 블로그  
 - <a href="https://ko.react.dev/learn/reacting-to-input-with-state" target="_blank">https://ko.react.dev/learn/reacting-to-input-with-state</a>
 
