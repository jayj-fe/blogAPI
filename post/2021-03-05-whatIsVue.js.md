---
title: Vue.js란
author: Jay.J
date: 2021-03-05 15:44:39 +0900
categories: [VueJs]
tags: [javascript, vue.js]
math: true
mermaid: true
image: /blogAPI/assets/img/vuejs.png
---

## Vue.js 란 무엇인가?

Vue.js의 공식문서에서는 <b>'사용자 인터페이스를 만들기 위한 프로그레시브 프레임워크'</b> 라고 설명하고 있다.<br>
즉, 보여지는 화면을 만드는 자바스크립트 프레임워크 중의 하나이다.<br>
Vue.js는 진입장벽이 낮으며 쉽고 빠르게 개발을 할 수 있다는 것이 가장 큰 장점으로 가지고 있다.<br>

> <a href="https://kr.vuejs.org/v2/guide/index.html">Vue.js 공식사이트</a>

<br>

## 장점 및 특징

### 학습곡선이 낮다.

Vue.js는 웹 개발을 단순화하고 정리하기 위해 개발된 대중적인 자바스크립트 프론트엔드 프레임워크이다.<br>
수많은 프로젝트에서 AngularJS를 사용하여 구글을 위해 작업하던 Evan You에 의해 개발되었다.<br>
웹 UI 개발(컴포넌트, 선언형 UI, 핫 리로딩, 타임 트래블 디버깅 등)의 아이디어를 더 접근 가능하도록 만드는데 초점을 둔다.<br>
덜 독선적이도록 시도하고 있기 때문에 개발자들이 익히기에 더 쉽다.<br>
<br>
아래의 소스는 서로 비슷한 프레임워크인 React.js 와 Vue.js의 조건문에 대한 비교소스이다.

```js
// React

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);

```
> <a href="https://reactjs-kr.firebaseapp.com/docs/conditional-rendering.html">React.js 공식사이트-조건문</a>

```js
// Vue

<div id="app">
  <p v-if="isLoggedIn">Welcome back!</p>
  <p v-else>Please sign up.</p>
</div>

var app = new Vue({
  el: '#app',
  data: {
    isLoggedIn: true
  }
})

```
> <a href="https://kr.vuejs.org/v2/guide/#%EC%A1%B0%EA%B1%B4%EB%AC%B8%EA%B3%BC-%EB%B0%98%EB%B3%B5%EB%AC%B8">Vue.js 공식사이트-조건문</a>

사용자가 가상 DOM 개념에 익숙하지않고,<br>
JavaScript로 제어보다(렌더 함수) HTML의 형식이 조금 익숙하다면,<br>
다른 프레임워크보다 HTML의 기반의 템플릿 구문을 사용하는 Vue.js가 조금 더 진입장벽이 낮다고 생각한다.

<br>

### 컴포넌트기반의 프레임워크
컴포넌트 시스템은 Vue의 또 다른 중요한 개념이다.<br>

<img src="/assets/img/vue/components.png" alt="">
위 이미지와 같이 Vue는 DOM을 작은 단위로 쪼개어 개발하는 방식(최신개발동향)으로 유지보수와 재사용성이 높다.<br>
하지만 컴포넌트의 설계없이 무분별하게 생성한다면 컴포넌트간의 종속성이 사라지고, 복잡해져 재사용이 어려워질 수 있으므로 주의해야한다.

<br>

### MVVM 패턴

<img src="/assets/img/vue/mvvm.png" alt="">

MVVM 패턴은 Model, View, ViewModel로 구성되어있으며 Vue.js는 ViewModel 계층에 중점을 둔다.

#### Model
> 일반 자바 스크립트 객체

#### View
> 웹 페이지의 DOM(Document Object Model)

#### ViewModel

> 모든 View와 관련된 비즈니스 로직은 이 곳에 들어가게 되며 데이터를 잘 가공해서 View에서 뿌리기 쉬운 Model로 바꾸는 역할을 한다.<br>
> View가 데이터 바인딩(Data Binding)할 수 있는 속성과 명령으로 구성되어 있다.<br>
> 양방향 데이터 바인딩을 통해 View 와 Model 을 연결합니다 .<br>

#### MVVM패턴에서의 Vue의 역할

기존에는 데이터를 바인딩하기 위해서는 jQuery를 통한 DOM 조작을 했다.<br>

```js
// Jquery

<div id="app">
  <p id="data_name">데이터</p>
</div>

$("#data_name").val("데이터변경");
```

ViewModel의 역할을 하는 Vue를 통해 데이터 바인딩이 가능하고, 양방향 데이터 바인딩을 할 수 있다.<br>
Vue.js로 인하여 더이상 jQuery를 통한 DOM 조작이 필요하지 않다.<br>

```js
// Vue

<div id="app">
  <input v-model="msg" placeholder="여기를 수정하면 데이터도 변경됩니다">
  <p>{{ data_name }}</p>
</div>

var app = new Vue({
  el: '#app',
  data: {
    data_name: '양방향 데이터 바인딩'
  }
})

```


<br>

### Virtual DOM(가상 DOM)

가상 DOM에 알기위해 검색해보면 아래와 같이 쉽게 찾을 수 있다.<br>
<b>"Render하기 전 내용을 Virtual DOM에 그려서 미리 적용하고, 그 다음에 그려주는 역할을 한다."</b><br>
<br>
해당 내용을 자세히 알기 위해서는 브라우저의 동작원리를 알아야한다.

<img src="/assets/img/vue/webkitflow.png" alt="">

위 그림은 브라우저의 동작 순서이다.<br>
<br>
브라우저는 HTML을 전달받아, 이를 Parser(변환)하고 Node들로 이루어진, DOM Tree를 생성한다.<br>
그리고 CSS 파일과 각 노드들의 inline 스타일을 파싱하여 스타일을 입힌 Render Tree를 만든다.<br>
Render 트리가 만들어지면, Layout(화면에 위치)를 잡고 Painting 하여 화면이 출력된다.<br>
> Node : 문서 노드(document node), 요소 노드(element node), 텍스트 노드(text node) 등 HTML을 구성하는 모든 것들이다.

<br>
DOM의 변화가 생기면 브라우저는 Render Tree를 재생성하고, Layout을 다시 계산하고 Painting 하여 출력한다.<br>
이는 <span style='color:red'>브라우저의 잦은 렌더링을 유발하며</span>, DOM의 작은 변경점조차 이러한 렌더링 과정을 반복하기 때문에 효율성이 떨어지게 된다.

<br>
가상 DOM은 DOM이 생성되기 전, 이야기 했던 것처럼 미리 적용하고 그 다음 그려주는 역할을 한다.<br>

<img src="/assets/img/vue/elm-runtime-virtual-dom.svg" alt="">

가상 DOM에서의 변화는 가상의 DOM 에 미리 먼저 적용시키고 그 최종적인 결과만을 실제 DOM 으로 전달해준다.

<img src="/assets/img/vue/virtualdom.png" alt="">
> 빨간색부분이 변화가 있는 부분.

해당의 방식은 브라우저 내에서 발생하는 연산의 양을 줄이면서 성능이 개선된다.


<br>
<br>


## 참고 했던 자료 및 블로그
- <a href="https://kr.vuejs.org/">https://kr.vuejs.org/</a>
- <a href="https://ko.wikipedia.org/wiki/Vue.js">https://ko.wikipedia.org/wiki/Vue.js</a>
- <a href="https://velog.io/@jojo_devstory/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%ED%8C%A8%ED%84%B4-MVVM%EC%9D%B4-%EB%AD%98%EA%B9%8C">https://velog.io/@jojo_devstory/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%ED%8C%A8%ED%84%B4-MVVM%EC%9D%B4-%EB%AD%98%EA%B9%8C</a>
- <a href="https://www.howdy-mj.me/dom/what-is-dom/">https://www.howdy-mj.me/dom/what-is-dom/</a>
