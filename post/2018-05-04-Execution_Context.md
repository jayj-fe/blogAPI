---
title: Javascript 실행 컨텍스트
author: Jay.J
date: 2018-05-04 12:11:39 +0900
categories: [javascript]
tags: [javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

<br>

## Javascript 실행 컨텍스트

<br>

### 실행 컨테스트란

자바스크립트가 실행될 때 생성되는 실행 단위를 실행 컨텍스트라고 부른다.  
자바스크립트가 실행되면 함수들이 차곡차곡 <b>콜 스택(Call Stack)</b>이라 곳에 쌓이는데,  
<b>실행 컨텍스트는 Call Stack에 쌓이는 하나하나의 실행 정보</b>이다.

```js

console.log('전역 스코프');
function first(){
  console.log('First Context');
  second();
}
function second(){
  console.log('Second Context');
}
first();

// 컨텍스트 실행순서
// 1. console.log('전역 스코프') 컨텍스트에 들어감  
// 2. first함수가 컨텍스트에 들어감  
// 3. second함수가 컨텍스트에 들어감
// 4. second에서 빠져나옴  
// 5. first 빠져나옴  
// 6. 전역스코프가 종료  
//   
// 현재 실행되는 컨텍스트에서 이 컨텍스트와 관련 없는 실행 코드가 실행되면,  
// 새로운 컨텍스트가 생성되어 스택에 들어가고 제어권이 그 컨텍스트로 넘어간다.

```
<br>
  

### 실행 컨텍스트 생성과정

```js

function addEvent(num1, num2){
    var a = 1;
    var b = 2;

    function innerEvent(){
        return a+b;
    }

    return num1 + num2 + innerEvent();
}
addEvent(2,3);

```
위와 같은 함수를 하나 만들어서 실행하면,  <br>
자바스크립트 엔진은 함수를 실행하기 위해 해당 컨텍스트에서  <br>
필요한 여러가지 정보를 담을 객체를 생성하고,  <br>
그것을 <b>활성객체</b>라고 부른다.

<br>

#### <b>1. 생성과정 1 - arguments 객체</b>  

활성객체는 arguments 프로퍼티로 arguments객체를 참조한다. <br>
함수 안에서 arguments를 사용할 수 있는 이유이다.  

#### <b>2. 생성과정 2 - 스코프 정보 생성</b>  

유효범위를 나타내는 스코프 정보를 생성한다.  <br>
컨텍스트안에는 연결리스트와 유사한 공간이 있고,  <br>
컨텍스트의 변수에 접근하려할때 이 리스트를 활용하는데,  <br>
만약 리스트에 찾는 변수가 없다면 정의되지 않은 변수로 판단을해 에러를 리턴한다.  <br>
이 리스트를 스코프 체인이라고 부르고 [[scope]] 프로퍼티로 참조된다.   

#### <b>3. 생성과정 3 - 변수 생성</b>  

지역변수 생성한다.  <br>
위의 함수에서 addEvent() 함수가 실행되면, 변수 a, b가 생성되고 메모리에 올라가지는데,  <br>
이때는 값을 할당하지 않는다.(호이스팅)  <br>
모든 변수가 생성된 이후 초기화가 이루어진다.  

#### <b>4. 생성과정 4 - this 바인딩</b>  

this 바인딩이 이루어지는데 this는 참조하는 객체가 없으면 전역객체를 바라본다.

<br>  
<hr>  
<br>

## 정리

1. 함수실행시 가장 처음으로 전역 컨텍스트 생성시킨다.  
그리고 함수가 호출될 때마다 해당 함수의 컨텍스트가 만들어진다.  
2. 실행 컨텍스트 생성 시 컨텍스트 안에 변수객체(arguments, variable), scope chain, this가 생성된다.  
3. 실행 컨텍스트 생성 후 함수가 실행된다. 사용되는 변수들은 활성객체 안에서 값을 찾고,  
없다면 스코프 체인을 따라 올라가며 찾는다. 없으면 에러가 뜬다.  
4. 함수 실행이 마무리되면 해당 컨텍스트는 사라진다. 페이지가 종료되면 전역 컨텍스트가 사라진다.
