---
title: 느낌표 두개 연산자 - Double Exclamation Marks Operator
author: Jay.J
date: 2022-12-12 18:44:39 +0900
categories: [javascript]
tags: [javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

<br>

라이브러리를 사용하기 위하여 분석하다가 !! 연산자를 사용한 것을 본 적이 있다.<br>
어떤 동작을 하는 연산자인지 검색해보고 알게된 내용을 정리하려고 한다.

<br>

## NOT 연산자인 (느낌표) and 느낌표 두개(!!) 연산자

```js
console.log("str")      // "str"
console.log(!("str"))   //false
console.log(!!("str"))  //true

console.log("")         //""
console.log(!(""))      //true
console.log(!!(""))     //false

console.log(true)       //true
console.log(!true)      //false
console.log(!!true)     //true

console.log(false)      //false
console.log(!false)     //true
console.log(!!false)    //false

console.log(NaN)        //NaN
console.log(!NaN)       //true
console.log(!!NaN)      //false

console.log(undefined)  //undefined
console.log(!undefined) //true
console.log(!!undefined)//false

console.log(null)       //null
console.log(!null)      //true
console.log(!!null)     //false
```
<br>

NOT연산자인 (느낌표)는 입력값을  boolean으로 변환하여 값이 true이면 false로 , false이면 true로 값을 리턴한다.<br>
느낌표 두개(!!) 연산자를 사용하면 boolean으로 변환된 값의 반대가 되어 리턴된다.

<br>

## Double Exclamation Marks Operator 언제쓰는가?

<b>느낌표 두개(!!) 연산자는 확실한 논리결과를 가지기 위해 사용한다.</b><br>
예를 들어 정의되지 않은 변수 undefined 값을 가진 내용의 논리 연산 시에도 확실한 true / false를 가지도록 하는게 목적이다.

<br>

```js
console.log(!!null);		// false
console.log(!!NaN);			// false
console.log(!!undefined);	// false
```
> 일반적으로 javascript에서 false로 간주되는 값이 있다.<br>
> null, NaN, undefined 등이 있는데 이 값에 !!를 사용하게 되면 false로 반환한다.

<br>

```js
console.log({});            // {}
console.log([]);            // []
console.log([].length);     // 0

console.log(!{});            // false
console.log(![]);            // false
console.log(![].length);     // true

console.log(!!{});          // true
console.log(!![]);          // true
console.log(!![].length);   // false

/* 배열 */
console.log(!![]);				// true
console.log(!!['a']);			// true
console.log(!!['a'].length);    // true
console.log(!![].length);   	// false
```
> 빈 배열을 확인하기 위하여 사용할 수 있다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://ifuwanna.tistory.com/278" target="_blank">https://ifuwanna.tistory.com/278</a>
- <a href="https://swtpumpkin.github.io/javascript/doubleExclamationOperator/" target="_blank">https://swtpumpkin.github.io/javascript/doubleExclamationOperator/</a>