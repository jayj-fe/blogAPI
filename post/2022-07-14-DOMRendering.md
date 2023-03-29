---
title: 브라우저의 동작원리
author: Jay.J
date: 2022-07-14 18:44:39 +0900
categories: [html]
tags: [html]
math: true
mermaid: true
image: /blogAPI/assets/img/html.png
---

<br>

최근 HTML 파일은 어떻게 브라우저에 그려지는지 질문을 받은 적이 있다.<br>
Vue를 공부하면서 브라우저의 동작원리에 대해서 잠깐 다룬적이 있었으나,<br>
정확히 알고 있지 않아서 답변을 할 수 없었고 이번 기회에 브라우저 렌더링 과정에 대해서 공부하고 정리해보려고 한다.

## 브라우저 렌더링 동작 과정

주소창에 url을 입력하고 접속하였을 때 브라우저는 해당 페이지에 대한 리소스를 서버에 요청한다.<br>
그 이후 브라우저의 렌더링 동작 과정은 5가지로 나눌 수 있다.

1. Parsing
2. Render Tree
3. Layout
4. Paint
5. Composite

<br>

<img src="/assets/img/vue/webkitflow.png" alt="">
> 브라우저의 동작 순서

### 1. Parsing

서버에서 받아온 리소스(HTML, CSS)의 문자는 브라우저가 바로 인식하지 못한다.<br>
그렇기에 문자를 해석하는 과정이 필요하며 그 과정에서 문자는 노드(Node)로 전환되고, 이 노드(Node)들로 구성된 Tree 구조가 형성된다.<br>
<br>
HTML 파일은 DOM(Document Object Model) Tree, CSS 파일은 CSSOM(CSS Object Model) Tree로 형성된다.

<img src="/assets/img/html/html_tree.gif" alt="">
> html의 DOM Tree

<br>
<hr>
<br>

### 2. Render Tree

Parsing 단계에서 생성된 DOM Tree와 CSSOM Tree를 매칭시켜서 Render Tree를 구성한다.<br>
Render Tree는 실제 화면에 그려질 Tree이다.

<img src="/assets/img/html/render_tree.avif" alt="">
> DOM Tree 와 CSSOM Tree가 합쳐진 Render Tree

<br>
<hr>
<br>

### 3. Layout

Render Tree의 구성이 완료되면 각 요소의 크기와 위치를 계산하는 Layout 단계를 실행된다.<br>
최상단의 노드부터 정확한 위치와 크기를 계산하며 Render Tree에 반영한다.

> 단위를 %로 지정했을 경우 Layout단계에서 %값을 계산하여 픽셀 단위로 변환한다.

<br>
<hr>
<br>

### 4. Paint

Layout단계를 걸쳐 정확한 값이 반영된 Render Tree를 브라우저 상의 실제 픽셀로 변환하며 그린다.<br>
해당 과정에서 변환되는 Tree의 각각의 Node들은 하나의 레이어가 아닌 여러 레이어로 관리된다.

<br>
<hr>
<br>

### 5. Composite

여러개로 나눠진 레이어를 합성하여 실제 화면에 나타낸다.<br>
이 과정을 끝으로 브라우저에서 웹 페이지를 볼 수 있다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://80000coding.oopy.io/5e01fc3b-6cf5-4aca-9c32-fb9cd5967115" target="_blank">https://80000coding.oopy.io/5e01fc3b-6cf5-4aca-9c32-fb9cd5967115</a>
- <a href="https://velog.io/@cherrycock/DOM%EA%B3%BC-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B3%BC%EC%A0%95" target="_blank">https://velog.io/@cherrycock/DOM%EA%B3%BC-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B3%BC%EC%A0%95</a>
- <a href="https://tecoble.techcourse.co.kr/post/2021-10-24-browser-rendering/" target="_blank">https://tecoble.techcourse.co.kr/post/2021-10-24-browser-rendering/</a>