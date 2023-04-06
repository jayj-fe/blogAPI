---
title: Vue에서 사용하는 SEO
author: Jay.J
date: 2022-09-04 18:44:39 +0900
categories: [html, VueJs]
tags: [html, vue.js]
math: true
mermaid: true
image: /blogAPI/assets/img/vuejs.png
---

<br>

최근 들어 SPA로 구현된 사이트가 증가하고 있다.<br>
하지만 SPA 검색엔진에 잘 노출이 되지 않아 사이트에 많은 사람들이 방문하지 못하는 문제들이 생기고 있다.<br>
SPA에서의 SEO는 어떻게 해결하는 지 포스팅하려고 한다.

## MPA와 SPA의 차이

SEO를 어떻게 해결하는 방법이 있는 지 알아보기 전에, MPA와 SPA에 대해서 알아야한다.

## MPA

MPA(Multiple Page Application)는 여러 개(Multiple)의 Page로 구성된 Application이다.<br>
전통적인 방식으로 페이지를 요청할 때마다 정적 리소스가 다운로드된다. <b>매번 전체 페이지가 다시 렌더링</b> 된다.<br>
MPA를 SSR(Server Side Rendering) 방식으로 렌더링한다고 말한다.<br>
<br>

<img src="/assets/img/html/MPA.webp" alt="">
> MPA의 SSR 방식

<br>

<img src="/assets/img/html/MPA.JPG" alt="">
> 페이지가 이동되면 모든 리소스를 다운 받는다.

### MPA 장점

1. <b>첫 페이지의 로딩 빠르다.</b><br>
해당 페이지의 정적 리소스만 요청하여 받기 때문에 사이트 첫 페이지의 로딩이 SPA보다 짧다.

2. <b>SEO 관점에서 유리하다.</b><br>
MPA는 완성된 형태의 HTML 파일을 서버로부터 전달받는다.<br>
따라서 검색엔진이 페이지를 크롤링하기에 적합하다.

### MPA 단점

1. <b>페이지 이동 시 페이지 로딩 속도가 느리다.</b><br>
불필요한 정적 리소스도 중복해서 가져오기 때문에 페이지 이동시 로딩이 느리다.

2. <b>사용자 경험이 부자연스럽다.</b><br>
전체 페이지를 업데이트 하기 때문에 페이지 이동마다 ‘깜빡’ 거림이 있다.

<br>
<hr>
<br>

## SPA

한 개(Single)의 Page로 구성된 Application이다.<br>
클라이언트가 서버에 최초로 요청을 하게 되면 사이트의 모든 필요한 정적 리소스를 가져오고 다음 요청에는 <b>AJAX를 이용해 변경에 필요한 부분만 가져온다.</b><br>
이러한 방식을 <b>CSR(Client-Side Rendering) 방식</b>이라고 하며, SPA는 기본적으로 CSR 방식으로 구현된다.<br>
Angular, React, Vue 등의 프론트엔드 기술들이 SPA방식을 구현하기 위한 프레임워크이다.<br>

<br>

<img src="/assets/img/html/SPA.webp" alt="">
> SPA의 CSR 방식

<br>

<img src="/assets/img/html/SPA.JPG" alt="">
> 페이지가 이동되어도 필요한 부분만 서버에 요청하여 가져온다.

### SPA 장점

1. <b>페이지 이동 시 페이지 로딩 속도가 빠르다.</b><br>
사용자의 요청에 대해 필요한 부분만 서버에서 가져오기 때문에 페이지 이동 간에 딜레이가 거의 없다.

2. <b>사용자 경험이 자연스럽다.</b><br>
전체 페이지를 업데이트 할 필요가 없기 때문에 빠르고 ‘깜빡’ 거림이 없다.

### SPA 단점

1. <b>최초 페이지 로딩속도가 느리다.</b><br>
클라이언트가 최초로 서버에 요청할 때 모든 데이터를 가져오기 때문에 상대적으로 최초 요청에서 속도가 MPA에 비해 상대적으로 느리다.

2. <b>SEO에 적합하지 않을 수 있습니다.</b><br>
SPA는 완성된 형태의 HTML 파일을 서버로 전달 받지 않고, Javascript를 통하여 페이지를 구현하는 방식이기 때문이다.<br>
<img src="/assets/img/html/spa_seo_problem.JPG" alt="">

<br>
<hr>
<br>

## SPA에서 SEO 문제가 되는 이유

<b>모든 SPA가 CSR은 아니다.</b><br>
따라서 SPA에서의 SEO가 문제가 되는 것이 아닌 CSR방식에서 SEO가 문제가 된다.<br>
CSR은 빈 페이지를 먼저 노출하고 자바스크립트로 View를 그리는데,<br>
View를 생성하기 전까지는 검색 엔진 크롤러의 데이터 수집이 제한적이기 때문에 상대적으로 검색 엔진이 이해하는 정보가 부족해 SEO에 유리하지 않게 된다.<br>
반대로 전통적인 SSR은 View를 서버에서 렌더링해 제공하기 때문에(View를 먼저 그리기 때문에) 상대적으로 SEO에 유리해져 사용자 유입이 많을 것이다.<br>
또한 SPA는 하나의 페이지를 기반으로 하기 때문에 모든 페이지에서 동일한 메타 데이터를 사용한다. 이러한 점도 SEO에서 유리하지 않다.

<br>

## SPA에서 SEO 해결방법

### 1. SSR (Server Side Rendering) 방식의 SPA 구축
SSR 프레임워크로는 React의 Next.js, Vue의 Nuxt, Angular의 Angular Universal 등이 있다.
<br>

### 2. 동적 렌더링 (Dynamic Rendering)
동적 렌더링은 서버에서 요청하는 자가 사람인지 크롤러인지 판단하여 사람에게는 HTML과 js 등을 제공하고 크롤러에게는 사전에 렌더링된 HTML 버전의 페이지를 보여주는 방식이다.<br>
동적 렌더링을 하는 방법으로는 react-helmet, prerender-spa-plugin, prerender.io, puppeteer, rendertron 등이 있다.
<br>

### 3. History API
경로를 지정해주고 봇이 페이지를 읽을 수 있도록 하기 위해 HTML5의 History API 사용을 권장한다.<br>
HTML5의 History API를 사용하면 이전, 이후 URL 경로를 만들어줄 수 있기 때문이다.<br>
History API는 깜빡임 없이 페이지를 로딩하면서, URL이 바뀌게 설정할 수 있다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://hanamon.kr/spa-mpa-ssr-csr-%EC%9E%A5%EB%8B%A8%EC%A0%90-%EB%9C%BB%EC%A0%95%EB%A6%AC/" target="_blank">https://hanamon.kr/spa-mpa-ssr-csr-%EC%9E%A5%EB%8B%A8%EC%A0%90-%EB%9C%BB%EC%A0%95%EB%A6%AC/</a>
- <a href="https://www.ascentkorea.com/seo-for-spa/" target="_blank">https://www.ascentkorea.com/seo-for-spa/</a>