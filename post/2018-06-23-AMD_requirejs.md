---
title: AMD & require.js
author: Jay.J
date: 2018-06-23 15:44:39 +0900
categories: [javascript]
tags: [javascript, AMD, require.js]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---

## AMD

AMD(Asynchronous Module Definition)란 모듈을 정의하는 방법과 모듈이 필요할 때 비동기로 로딩하는 방법을 정의한 API 이다.
AMD는 세 가지의 핵심 개념을 가지고 동작한다.
<br>
#### 1. 동적 로딩

동적 로딩(Dynamic Loading, Lazy Loading)은 페이지 렌더링을 방해하지 않으면서 필요한 파일만 로딩할 수 있다.

브라우저는 문서를 위에서 아래로 읽어내려오며, \<script\> 태그를 만나면 \<script\>의 HTTP 요청과 다운로드, 파싱(Parsing), 실행이 일어나는 동안 브라우저는 다른 동작을 하지 않는다.
그로 인하여 페이지 렌더링은 느려지는데, 이를 최적화 하는 기법으로 \<script\> 태그를 \<body\> 태그의 마지막에 배치하는 방법이 있다.
하지만 이 방법 또한 첫 렌더링과 첫 인터랙션에 필요하지 않은, 페이지에 필요한 모든 JavaScript를 로딩하기 때문에 사용자가 첫 화면을 보는 데까지 걸리는 시간은 줄어들지 않는다.

좀 더 최적화 된 기법으로 첫 렌더링과 첫 인터랙션에 필요한 javascript만 먼저 로딩하고, 나머지를 로딩하는 방식이 동적 로딩 방식이라 한다.

<br>
#### 2. 모듈화

모듈(module) 이라는 것은 전체 애플리케이션의 일부를 독립된 코드로 분리해서 만들어 놓은 것을 말한다.
관련된 유용한 기능을 모아둔 모듈이라 할 수 있으며 크게는 jQuery 와 같은 라이브러리도 모듈이라 할 수 있다.

스크립트의 모듈화는 스크립트 내부에서만 사용하는 변수와 함수들을 전역 공간에 저장하는 것을 방지한다.
전역 공간에 변수가 있음으로 문제가 발생하는 것을 최소화 및 방지할 수 있다.
> 전역 변수에 있음으로 발생하는 문제 :
> 참고 사이트 - <a href="https://blog.perfectacle.com/2017/05/20/js-005-module/">https://blog.perfectacle.com/2017/05/20/js-005-module/</a>

<br>
#### 3. 의존성 관리

의존성이란 코드에서 두 모듈 간의 연결, 객체지향언어에서는 두 클래스 간의 관계라고도 말한다.
일반적으로 둘 중 하나가 다른 하나를 어떤 용도를 위해 사용한다.

자바스크립트는 기본적으로 코드 내에서 외부 코드를 불러오는 방법이 제공되지 않고 html의 script 태그에 의존하여 코드를 로드하게 된다.
기존의 방식은 HTML에서 의존관계에 따라 순서대로 스크립트를 로드하고, 코드내에서 네임스페이스를 정의하여 사용하는 방식이였다.

하지만 이런 방식은 개발자가 그 의존관계와 순서를 일일이 신경 써야 하고, 어플리케이션의 규모가 커질수록 관리하는데 있어 어려움이 있다.
이러한 문제를 해결하기 위해 의존성에 대한 관리가 필요하다.

<br>

## require.js

AMD API를 지원하는 프레임웍이다.

- require.js 공식 사이트 및 사용법
> https://requirejs.org/docs/api.html

<br>

### require 초기화 및 설정

```js
/*
 * 초기화 및 설정
 * config.js
 */
 require.config({
    /*
        baseUrl:
        JavaScript 파일이 있는 기본 경로를 설정한다.
        만약 data-main 속성이 사용되었다면, 그 경로가 baseUrl이 된다.
        data-main 속성은 require.js를 위한 특별한 속성으로 require.js는 스크립트 로딩을 시작하기 위해 이 부분을 체크한다.
    */
     baseUrl : '폴더명',
     /*
        paths:
        path는 baseUrl 아래에서 직접적으로 찾을 수 없는 모듈명들을 위해 경로를 매핑해주는 속성이다.
        "/"로 시작하거나 "http" 등으로 시작하지 않으면, 기본적으로는 baseUrl에 상대적으로 설정하게 된다.

        paths: {
            "exam": "aaaa/bbbb"
        }

        의 형태로 설정한 뒤에, define에서 "exam/module" 로 불러오게 되면, 스크립트 태그에서는 실제로는 src="aaaa/bbbb/module.js" 로 잡을 것이다.
        path는 또한 아래와 같이 특정 라이브러리 경로 선언을 위해 사용될 수 있는데, path 매핑 코드는 자동적으로 .js 확장자를 붙여서 모듈명을 매핑한다.
        따라서 설정할 때 뒤에 js 확장자는 생략한다.
    */
     paths : {
        '별칭' : '파일경로와 파일명',
        '별칭' : '파일경로와 파일명'
     },

    /*
        shim:
        AMD 형식을 지원하지 않는 라이브러리의 경우 아래와 같이 shim을 사용해서 모듈로 불러올 수 있다.
        참고 : http://gregfranko.com/blog/require-dot-js-2-dot-0-shim-configuration/

        shim 설정을 해주면 해당 모듈을 로드하기전에 의존성이 있는 다른 모듈들을 불러올수 있게 설정이 가능했다.
    */
     shim : {
         '별칭' : {
             deps : [ dependencies, dependencies ],
             exports : '파일 경로와 파일명'
             /*
                exports의 파일이 로드되기 전에
                deps 배열에 있는 의존성이 있는 모듈들을 먼저 로드한다.
            */
         }
     }
 });
```
<br>

### require 모듈 정의

```js
/*
 * 모듈 정의
 * 모듈명.js
 * define() 함수는 모듈을 정의할 때 사용한다.
 * id 는 모듈이 있는 파일 경로 또는 파일명 (id 생략가능하다.)
 * 모듈의 이름을 명시적으로 설정할 수도 있지만 이름 없는 모듈로 정의하는 것을 권장한다.
 * - 이름 없는 모듈은 호출될 때 모듈의 위치에 따라 이름을 결정한다.
 * - 개발할 때 파일의 이름이나 위치는 자주 변경되므로 유연한 상태로 둘 필요가 있다.
 */
define(id, [dependencies1, dependencies2], function(dependencies1, dependencies2){
    /*
        의존 모듈들은 순서대로 매개변수에 담긴다.
        의존 모듈들이 모두 로딩 완료되면 아래 작성한 코드를 실행한다.
    */
});
```
<br>
### require 모듈 호출

```js
/*
 * 모듈 호출
 * require() 함수는 모듈을 호출할 때 사용한다.
 */

require([dependencies1, dependencies2], function(dependencies1, dependencies2){
    /*
        의존 모듈들은 순서대로 매개변수에 담긴다.
        의존 모듈들이 모두 로딩 완료되면 아래 작성한 코드를 실행한다.
    */
})
```

