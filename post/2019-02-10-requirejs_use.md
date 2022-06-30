---
title: Require.js 을 사용했던 프로젝트에 대한 회고
author: Jay.J
date: 2019-02-10 18:44:39 +0900
categories: [javascript]
tags: [javascript, AMD, require.js, Retrospect]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

<br>

기존의 프로젝트를 진행할 때에는 필요한 기능을 전역 함수 파일에 추가하여 사용했다.<br>
전역 파일에 기능을 추가하여 사용하다보니 기능이 늘어날 수록 코드는 복잡해져갔으며 <br>
모든 페이지에서 불필요한 기능까지 전부 호출하는게 비효율적으로 느껴졌다.<br>
<br>
그렇기에 최근 알게 되었던 AMD/Require.js에 관심을 더욱 가지게 되었으며, <br>
신규 프로젝트에 Require.js를 사용해보기 했다.<br>
> <a href="/posts/AMD_requirejs/">AMD / Require.js에 대한 포스팅</a>

<br>

### 프로젝트 초반

디자인을 보고 퍼블리싱하며, 공통으로 쓰이는 기능과 특정 페이지에서 사용 되는 기능을 파악했다.<br>
공통으로 쓰이는 기능들 가운데, 기존 전역 함수에 있었던 기능들은 분리하여 모듈화 시키며 스크립트를 나누는 작업에 집중했다.<br>
팀원들이 각각 다른 프로젝트를 진행하고 있었기에 혼자 구글링하며 설정하며 진행하고 있었고<br>
그렇기에 잘 진행되고 있는 지 알기는 조금 어려움이 있었던 것 같다.<br>

<br>

### 프로젝트 중반

전 페이지에서 사용하는 스크립트들은 최상단에서 그대로 호출하기로 했으며,<br>
모든 페이지에서 쓰지 않는 기능들을 얼추 분리시키고 스크립트보다 마크업에 집중했던 것 같다.<br>

```js
// config.js

paths:{
    'question': 'question_module',
    'textEdit': 'textEdit_module',
    'btnSwitch': 'btnSwitch_module',
    'tab': 'tab_module',
    'jquery' : 'jquery-1.9.0.min',
    'slick' : 'slick.min',
    'fullpage' : 'fullpage.min',
    'jquery-ui' : 'jquery-ui',
    'range-slider': 'jQRangeSlider-min'
},

```

생각보다 의존성이 필요한 기능들이 없었기에 별다른 문제 없이 진행되었었던 것 같다.<br>
사실 이런저런 시행착오나 오류를 겪으며 하나씩 배워나가는 점도 있었으면 좋았을 것 같았는데<br>
아쉬웠던 부분이다.<br>
그래도 모듈별로 깔끔하게 분리되는 것 같았으며, 코드를 작성하거나 모듈을 만들 때 좀 더 범용적으로 사용할 수 있도록 생각하고 코딩했던 점은 좋았었다.<br>

<br>

### 프로젝트 후반

마크업부분이 끝나고 개발팀에게 전달되니 문제점이 발생하였다.<br>
개발을 진행하면서 onclick으로도 특정 함수를 호출 할 수 있었으면 좋겠다라는 요청이 있었다.<br>

```js

require(['A', ..., 'Z'], function(A,...,Z){
    ...

    function Ex_EventName(){
      ~
    }

});

```

Ex_EventName을 require밖에서도 사용해야된다는 것이였다.<br>
결국 전역변수를 선언하고 메서드를 추가하는 방식으로 해결하였다.<br>

```js

var globalVar = globalVar || {};

require(['A', ..., 'Z'], function(A,...,Z){
    ...

    globalVar.Ex_EventName(){
      ~
    }

});

```

<del>지금 생각해보면 꼭 onclick이 필요했었던가 생각이 든다.</del><br>

<br>

### 프로젝트를 마치며.

개인적으로 생각하기에 해당 프로젝트에서는<br>
여러 모듈이 다양하게 사용된다거나 특정 페이지의 여러 기능이 동시에 들어가지 않아,<br>
순서나 의존성에 대한 관리가 크게 필요하지 않았던 것 같다.<br>
<br>
그렇지만 새로운 걸 사용한다는 것 자체는 매우 흥미롭고 재밌는 경험이엿으며,<br>
의존 관계나 순서를 관리함에 있어서 꼭 필요하다고 생각이 들었다.<br>
<br>
조금 더 큰 프로젝트나 다양한 기능이 들어가는 프로젝트에서 사용해보려고 한다.
