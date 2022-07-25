---
title: 자바스크립트 엄격모드?
author: Jay.J
date: 2020-06-11 15:44:39 +0900
categories: [javascript]
tags: [javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

<br>

## 자바스크립트 엄격모드란 ?

ECMAScript 5 에서 소개되었다.<br>
기본으로 우리 사용하는 자바스크립트는 <b>"느슨한모드(sloppy mode)"</b>라고 불리며<br>
문법이나 살짝 벗어나는 오류 정도는 조용히 무시하고 작동되었다.<br>
<b>"엄격한 모드(strict mod)"</b>를 사용하면 조금 더 디테일하게 문법이나 오류를 잡아낸다.

<br>

## 엄격모드를 사용하려면

사용법은 간단하다. <br>
엄격모드를 사용하기 위해서는 스크립트를 작성하기 전 최상단에 '"use strict";'를 작성해준다<br>

```js

'use strict';

function A(){
  ...
}

var b = 'hi';

```

## 무엇이 다른가

엄격모드를 설명하면서 조금 더 디테일하게 문법과 오류를 잡아낸다고 설명했다.<br>

```js
// 느슨한 모드

b = 'hi';
var undefined = 5;
function sum(a, a, c){
  return a + b + c
}

console.log(b);           // hi
console.log(undefined);   // undefined
console.log(sum(1,2,3));  // Uncaught ReferenceError: b is not defined at sum

```

변수 선언을 생략했다던지, 쓸 수 없는 프로퍼티에 값 넣기, 잘못 지정 되어있는 매개변수 등<br>
오류로 잡힐 수 있는 문제를 그냥 넘기고 실행시켜준다.<br>
하지만 엄격모드에서는 오류라고 판단하고 실행이 불가능하다.


```js
// 엄격 모드
'use strict';

b = 'hi';
var undefined = 5;
function sum(a, a, c){
  return a + b + c
}

console.log(b);           // test - 복사본.html:15 Uncaught ReferenceError: b is not defined
console.log(undefined);   // Uncaught TypeError: Cannot assign to read only property 'undefined' of object '#<Window>'
console.log(sum(1,2,3));  // Uncaught SyntaxError: Duplicate parameter name not allowed in this context

```
> 더 많은 상황은 해당 링크에서 확인이 가능하다. <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode">[엄격한 모드]</a>

<br>

## 언제 사용해야하는가?

엄격모드를 사용하게 되면 사용자가 실수로 놓친 부분이나, 오류가 날 부분을 잡아준다.<br>
아직 문법과 오류에 대해서 익숙하지 않고, 자신의 코드를 조금 더 디테일하게 오류를 검사하고 싶다면<br>
엄격모드를 이용한다면 조금 더 안전한 코딩이 될 수 있을 것 같다.

<br>
<br>

## 참고 했던 자료 및 블로그
 - <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode" target="_blank">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode</a>
 - <a href="https://ithub.tistory.com/162" target="_blank">https://ithub.tistory.com/162</a>
 - <a href="https://blog.aliencube.org/ko/2014/01/02/reasons-behind-using-strict-mode-while-coding-javascript/" target="_blank">https://blog.aliencube.org/ko/2014/01/02/reasons-behind-using-strict-mode-while-coding-javascript/</a>
