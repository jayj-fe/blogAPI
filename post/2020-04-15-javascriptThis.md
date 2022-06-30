---
title: Javascript에서의 This
author: Jay.J
date: 2020-04-15 17:44:39 +0900
categories: [javascript]
tags: [javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

this가 무엇이냐라고 누군가 물어봤을 때 의미 자체에 순간 망설였던 적이 있었다.<br>
그래서 this는 무엇이고 어떻게 동작하는 지에 대해 포스팅 하려고 한다.

## This 무엇이냐 넌
this. 자바스크립트의 this는 호출한 객체가 저장되어있는 속성이다.

```js
console.log(this);  // window
```

기본적으로 this는 window 객체의 정보를 저장하고 있다.<br>
기본적으로 사용하는 메서드들 또한 상단에의 window를 통해 호출하기 때문이다.

```js
window.console.log(this);  // window
```
> console에 찍힌 window 객체를 자세히보기를 열어서 찾으면 console를 찾을 수 있을 것이다.

window객체의 console 객체의 log 메서드를 통하여 호출하였기에 this는 window의 정보를 저장하고 있다.

<br>

## 일반함수에서 This

일반함수 또한 window를 가르킨다.<br>
일반함수도 다른 객체를 통하여 호출하는 것이 아니라 상위 객체가 window이기 때문에 이다.

```js
function a() {
  return this
}
function b() {
  'use strict';
  return this
}

const c = function(){
  return this
}
const d = function(){
  'use strict';
  return this
}

console.log(a()); // window
console.log(b()); // undefined
console.log(c()); // window
console.log(d()); // undefined
```
> 그런데 일반함수에서도 조금은 나눠진다.<br>
> use strict(엄격모드)를 사용하게 되면, this는 더 이상 window를 가르키지 않는다.

엄격모드를 사용하면서도 this가 window의 정보를 저장해야되면 아래와 같이 해결할 수 있다.

```js
console.log(window.b()); // window
```
> 단, 변수에 함수를 담은 경우는 다르다.

<br>

## 객체와 생성자에서 This

객체의 메서드를 통하여 This를 호출하면 호출한 객체의 정보를 보여준다.

```js
const a = {
  b : function(){
    return this
  },
  c : function(a, b){
    return a + b;
  }
}

console.log( a.b() ); // a에 대한 정보
```

new 키워드를 통하여 새로운 객체를 생성할 경우, this는 새로 만들어진 객체를 저장한다.

```js
'use strict'

function a(b, c){
  this.b = b;
  this.c = c;
  this.d = function(){
    return this
  }
}

const newA = new a('newA', 'a');
console.log(newA.b)     // newA
console.log(newA.c)     // a
console.log(newA.d())   // a {b: "newA", c: "a", d: ƒ}

const newB = new a('newB', 'b');
console.log(newB.b)     // newB
console.log(newB.c)     // b
console.log(newB.d())   // a {b: "newB", c: "b", d: ƒ}
```

newA와 newB 모두 같은 생성자 함수로 만들어진 객체이기에 같은 함수를 보여지는 듯 하지만,<br>
보여지는 각 객체의 속성들은 전혀 다른 정보를 저장하고 있다.<br>

<br>

## 명백한 바인딩 (Explicit Binding) / call, bind, apply

명백한 바인딩, 즉 this의 역할을 우리가 직접 명확하게 지정해준다는 뜻이다.<br>

```js
'use strict'
function test(){
  return this
}

var testVal = {
  a : 'a'
}

console.log(test.call(testVal));   // a
console.log(test.apply(testVal));  // a
```
> testVal 이라는 객체를 this라고 지정해줬다.

bind의 경우 조금 다르게 사용된다.

```js
'use strict'

const testObj1 = {
  outerFunc: function() {
    var innerFunc = function(){
      console.log(this) // undefined
    }                   // bind가 없을경우

    innerFunc();
  }
}
testObj1.outerFunc()

const testObj2 = {
  outerFunc: function() {
    var innerFunc = function(){
      console.log(this) // 호출한 testObj2
    }.bind(this)        // bind가 있을 경우

    innerFunc();
  }
}
testObj2.outerFunc()
```


<br>

## Arrow Function

자신을 둘러싼 환경의 this를 그대로 계승 받는다.

```js
'use strict'

var test = () => {
  console.log(this)
  // test를 둘러싼 환경의 this,
  // test를 둘러싼 환경은 window 임으로,
  // test의 this는 window이다.
}

test();
window.test();

const a = {
  b : () => {
    console.log(this)
    // b를 둘러싼 환경의 this,
    // b를 둘러싼 환경은 a 이다.
    // 일반 함수에서도 설명한 것처럼 window.a 임으로 a의 this window이다.
    // test의 this는 window이다.
  },
  c : (a, b) => {
    return a + b;
  }
}

a.b();

const testObj1 = {
  outerFunc: function() {
    var innerFunc = () => {
      console.log(this)
      // innerFunc를 둘러싼 환경의 this,
      // innerFunc를를 둘러싼 환경은 outerFunc() 이다.
    }
    console.log(this) // outerFunc 메서드의 this = testObj1

    innerFunc();
    // 즉 innerFunc의 this는 outerFunc의 this인 testObj1 이다.
  }
}
testObj1.outerFunc()
```

<br>

## 정리

1. 함수 실행시에는 전역(window) 객체를 가리킨다.
2. 메소드 실행시에는 메소드를 소유하고 있는 객체를 가리킨다.
3. 생성자 실행시에는 새롭게 만들어진 객체를 가리킨다.
4. 자신을 둘러싼 환경의 this를 그대로 계승 받는다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://blueshw.github.io/2018/03/12/this/">https://blueshw.github.io/2018/03/12/this/</a>
- <a href="https://im-developer.tistory.com/96">https://im-developer.tistory.com/96</a>
- <a href="https://kim-solshar.tistory.com/57">https://kim-solshar.tistory.com/57</a

