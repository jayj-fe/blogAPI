---
title: Where do you place the JavaScript?
author: Jay.J
date: 2018-03-29 08:11:39 +0900
categories: [javascript]
tags: [javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

<br>

## Where do you place the JavaScript?
> JavaScript는 어디에 두어야합니까?

<br>

### 1. Head, Body
head Tag 섹션에 삽입하거나 body Tag 섹션의 시작 부분에 놓는 방법은 안좋다.  
해당 부분에 위치시킬 경우 문서는 페이지 로드시  
페이지를 읽다가 script Tag를 만날 경우 페이지의 분석을 멈추고  
스크립트를 로드한 후 페이지를 읽기 때문에 성능면에서 안좋다.  
<br>

#### 브라우저가 웹 사이트를 로드 할 때 일어나는 일
1. 문서 가져 온다 (예 : index.html, index.asp, main.php ...등)
2. HTML 구문 분석한다.
3. 파서는 문서를 위에서 부터 아래로 읽는다.  
    중간에 외부 스크립트 파일을 참조하는 script Tag를 발견한다.
4. 브라우저가 스크립트 파일을 확인하고 요청한다.  
    <b>그 사이 파서는 페이지의 다른 HTML을 구문 분석하는 것을 차단한다.</b>
5. 잠시 후 스크립트가 다운로드 된 후 실행된다.
6. 파서는 나머지 HTML 문서를 계속 파싱한다.
  
> 웹 사이트는 기본적으로 모든 스크립트를 다운로드 할 때까지 로드를 중지하기에  
> 4번은 좋지 않은 사용자 환경을 유발한다.

<br>

#### 왜 모든 스크립트를 다운로드 할 때 까지 페이지 로드를 중지하는가  

모든 스크립트는 document.write() 또는 다른 DOM 조작을 통해 자체 HTML을 삽입 할 수 있다.  
이는 구문 분석기가 나머지 문서를 분석하기 전에 스크립트가 다운로드되고 실행될 때까지 기다려야 함을 의미한다.  
결국 스크립트는 HTML 문서를 직접 컨트롤 할 수 있기 때문에  
스크립트가 실행될 때까지 페이지 로드를 중지한다.

<br>

### 2. 고전적인 방법
이 문제를 해결하기 위한 고전적인 접근 방법으로는  
<b>body 맨 아래에 script Tag를 두는 방법</b>이 있었다.  
이렇게하면 파서가 맨 아래까지 읽어내려오는 동안 차단되지 않기 때문이다.  
<b>그러나 이 접근 방식에는 문제가 있다.  
브라우저는 전체 문서가 로드되고, 구문 분석 될 때까지 스크립트 다운로드를 시작할 수 없다</b>
  
<br>
  
### 3. 현대적인 접근법

#### async
```js
<script type="text/javascript" src="common/js/script1.js" async></script>
<script type="text/javascript" src="common/js/script2.js" async></script>
```
async 속성이 있는 스크립트는 <b>비동기</b>적으로 실행된다.  
즉, 스크립트를 브라우저가 차단되지 않고 다운로드한다.  
비동기적으로 다운로드하기 때문에 script2.js가 script1.js 이전에 다운로드 및 실행될 수 있음을 의미한다.  
<b>async 속성은 스크립트를 다운로드시 브라우저를 차단하지 않지만,  
다운로드가 완료되면 브라우저를 차단하고 스크립트를 실행한다.  
이후 스크립트가 실행이 완료되면 다시 파싱을 한다.</b>  
<a href="http://caniuse.com/#feat=script-async" target="_blank">http://caniuse.com/#feat=script-async</a> 에 따르면 모든 브라우저의 90%가 이를 지원한다.  
<br>

#### defer
```js
<script type="text/javascript" src="common/js/script1.js" defer></script>
<script type="text/javascript" src="common/js/script2.js" defer></script>
```
defer 속성을 가진 스크립트는 순서대로 (즉, 첫 번째 script1.js 다음에 script2.js) 실행된다.  
defer 속성을 가진 스크립트 또한 브라우저를 차단하지 않는다.  
<b>async 속성과는 다른게 defer 속성은 스크립트가 다운로드가 완료되어도, 전체 문서를 먼저 로드된 후에 실행된다.  </b>  
<a href="http://caniuse.com/#feat=script-defer" target="_blank">http://caniuse.com/#feat=script-defer</a> 에 따르면 모든 브라우저 중 90%가 이를 지원한다. 92%는 적어도 부분적으로 그 것을 지원한다.  
   
<br>
<hr>
<br>
  
## 결론
현재의 최신 기술은 스크립트를 head 태그에 넣고 <b>async</b> 또는 <b>defer</b> 속성을 사용하는 것이다.  
이렇게하면 브라우저를 차단하지 않고도 스크립트를 최대한 빨리 다운로드 할 수 있다.  
좋은 점은 이 속성을 지원하지 않는 브라우저의 20%에서도 웹 사이트가 여전히 올바르게 로드 되며  
나머지 80 %는 속도가 빨라진다는 것이다.

<br>
## 참고 했던 자료 및 블로그  
 - <a href="https://blog.asamaru.net/2017/05/04/script-async-defer/" target="_blank">https://blog.asamaru.net/2017/05/04/script-async-defer/</a>
 
