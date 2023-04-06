---
title: Web Component
author: Jay.J
date: 2022-10-21 18:44:39 +0900
categories: [html, javascript]
tags: [html, javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/html.png
---

<br>

최근 어플리케이션 시장이 점점 커지고 복잡해지면서 컴포넌트 기반의 프레임워크들이 등장하였다.<br>
복잡한 소프트웨어들을 간단한 부분들로 나눠서 개발하는 방식으로 대표적으로 React, Vue, Angluar등의 자바스크립트 프레임워크들이 있다<br>

최근에는 자바스크립트의 프레임워크이 인기가 많아지면서 관심을 받고 있는데<br>
그 기반인 웹 컴포넌트에 대해서 알아보려고 한다.

## Web Component란

컴포넌트(Component)란 기능을 다른 코드로부터 분리된 재사용이 가능한 독립적인 모듈을 뜻한다.<br>
컴포넌트 기반 프로그래밍을 하면 마치 레고 블록처럼 이미 만들어진 컴포넌들을 조합하여 화면을 구성할 수 있다.<br>

<img src="/assets/img/html/webComponent.jpg" alt="">

<br>
웹 컴포넌트는 이러한 컴포넌트 기반 프로그래밍을 웹에서도 적용할 수 있도록 W3C에서 새로 정한 규격이다.<br>

<br>

## Web Component의 규격

- <b>Custom Elememts</b> : HTML에 새로운 HTML/DOM 요소를 정의할 수 있는 JavaScript API.
- <b>Shadow DOM</b> : DOM과 스타일을 캡슐화하여 메인으로부터 독립적으로 스크립트와 스타일을 처리할 수 있도록 한다.
- <b>HTML Template</b> : HTML 마크업 템플릿의 저장소로 사용된다.

> 위의 3가지 규격을 함께 사용하는 것이 가장 이상적이지만, 사용하고 싶은 부분만 선택적으로 사용하는 것도 가능하다.

<br><hr><br>

### Custom Elememts

<b>HTML에 새로운 HTML/DOM 요소를 정의할 수 있는 JavaScript API.</b><br>
&lt;div&gt; 대신 &lt;current-time&gt;처럼 적절한 이름의 태그를 사용할 수 있다.
HTML Element와 Javascript Class를 한 몸으로 만들어 준다.<br>

<img src="/assets/img/html/customElements.JPG" alt="">

<br><hr><br>

### Shadow DOM

<b>DOM과 스타일을 캡슐화하여 메인으로부터 독립적으로 스크립트와 스타일을 처리할 수 있도록 한다.</b><br>
shadow DOM 내부의 어떤 코드도 <b style="color:red">외부에 영향을 줄 수 없도록</b> 캡슐화한다.<br>

<img src="/assets/img/html/shadowDOM.JPG" alt="">

#### Virtual DOM vs Shadow DOM 

<b>'Virtual DOM'</b><br>
DOM을 좀더 추상화시킨 자바스크립트 객체<br>
매번 실제 DOM에 접근하여 조작하는 대신에, DOM의 상태를 메모리에 저장하고 변경 전과 변경 후의 상태를 비교한 뒤 DOM에 변경이 있을 때만 해당 변경을 반영한다.

<b>'Shadow DOM'</b><br>
DOM의 구조를 가지고 있으나, 외부에 노출되지 않은 DOM<br>
DOM의 구조를 캡슐화할 때 사용하며 외부의 style은 적용되지 않는다.<br>
shadow DOM을 추가하거나 접근하기 위해서는 별도의 방법이 필요하다.<br>

<img src="/assets/img/html/shadowdom.svg" alt="" style="max-width:500px">
> Dom과 분리된 shadow dom을 만들어서 Dom과 연결시켜준다.

<br><hr><br>

### HTML Template

<b>HTML 마크업 템플릿의 저장소로 사용된다.</b><br>
&lt;template&gt;이라는 태그를 가진 요소를 통하여 javascript로 element를 생성한다.

```HTML
<template id="helloWorld">
	<h1>Hello, world!</h1>
</template>
```

<br><hr><br>

### 3가지 규격을 이용하여 사용한 Web Component

<img src="/assets/img/html/webComponentCode.JPG" alt="">

<br>

## Web Component의 사용 이유

- 유지보수 및 재사용을 위한 모듈화
- 다른 컴포넌트와 충돌을 막기 위한 캡슐화
- Vendor lock-in 방지
> 특정 기술에 크게 의존하여, 다른 시스템으로 갈아타기 어려운 상황

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://velog.io/@hustle-dev/%EC%9B%B9-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90" target="_blank">https://velog.io/@hustle-dev/%EC%9B%B9-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90</a>
- <a href="https://hanamon.kr/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-component%EB%9E%80/" target="_blank">https://hanamon.kr/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-component%EB%9E%80/</a>
- <a href="https://hong-jh.tistory.com/entry/WebComponent-%EC%8D%A8%EC%95%BC%ED%95%A0%EA%B9%8C" target="_blank">https://hong-jh.tistory.com/entry/WebComponent-%EC%8D%A8%EC%95%BC%ED%95%A0%EA%B9%8C</a>
- <a href="https://kyu.io/%EC%9B%B9-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B82-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%97%98%EB%A6%AC%EB%A8%BC%ED%8A%B8custom-element" target="_blank">https://kyu.io/%EC%9B%B9-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B82-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%97%98%EB%A6%AC%EB%A8%BC%ED%8A%B8custom-element</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM" target="_blank">https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM</a>
