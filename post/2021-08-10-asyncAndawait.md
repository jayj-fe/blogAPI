---
title: async 와 await
author: Jay.J
date: 2021-08-10 18:44:39 +0900
categories: [javascript]
tags: [javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

<br>

## async 와 await 란

async는 asynchronous의 약자로 비동기 방식이다.
async는 예전부터 많이 봤었다.

스크립트를 호출할 때도 사용했었으며,

```js
<script type="text/javascript" src="common/js/script2.js" async></script>
```
> 스크립트는 비동기적으로 호출한다.<br>
> <a href="/blog/posts/%2Fpost%2F2018-03-29-Where_do_you_place_the_JavaScript" target="_blank">'Where do you place the JavaScript?' 포스터</a>

Ajax 또한 Ajax(<b>Asynchronous</b> JavaScript and XML)의 약자로, ajax 옵션중 async옵션이 존재한다.


```js
$.ajax({
    ...
    async: false,
    success: function(data) {

  	}
});
```
> async : false => ajax 호출시 비동기를 사용하지 않겠다는 설정

즉, async는 비동기함수를 만들어주는 명령어이다.<br>
await는 은 (~을) 기다리다 라는 뜻으로, 비동기 방식인 함수를 해당 명령어로 통해 기다리게 만든다.

<br>

## async 사용법

async와 await는 둘 다 사용법이 간단하다.<br>
사용하고자 하는 함수의 앞에 async를 붙인다.

```js
const asyncAPI = async () => {
    ...
}

async function() => {
    ...
}

async () => {
    ...
}
```


<br>

## await 사용법

await는 비동기 처리 코드 앞에 붙인다.

```js
const asyncAPI = async () =>{
    
    await fetch('https://jayj-fe.github.io/blogAPI/postlist.json')
        .then(function (response) {
            console.log(1);
        })

    console.log(2) ; 
}

asyncAPI();
```
> 결과값 : 1, 2 <br>
> 만약 await 가 없었다면 2, 1 순으로 콘솔에 출력될 것이다.

<br>

## 주의할 점

await가 처리 하고자 하는 비동기 처리 코드는 프로미스를 반환 함수에서만 작동한다.

```js
const asyncAPI = async () =>{
    
    await setTimeout( ()=>{ console.log( 1); }  ,  2000 ); 

    console.log(2) ; 
}

asyncAPI();
```

결과값이 await를 사용했으므로 1, 2 순으로 콘솔에 출력 될 것을 예상되나,<br>
setTimeout함수는 프로미스를 반환하는 함수가 아니므로 await가 작동하지 않는다.<br>
따라서 결과값은 2, 1 순으로 콘솔창에 출력된다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://yeolceo.tistory.com/4" target="_blank">https://yeolceo.tistory.com/4</a>
- <a href="https://velog.io/@jomo34/%EC%8A%A4%ED%84%B0%EB%94%94-JS-async-await%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0feat.-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC" target="_blank">https://velog.io/@jomo34/%EC%8A%A4%ED%84%B0%EB%94%94-JS-async-await%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0feat.-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC</a>
