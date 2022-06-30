---
title: How do you stop event propagation?
author: Jay.J
date: 2018-04-09 12:11:39 +0900
categories: [javascript]
tags: [javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

## How do you stop event propagation?
> 이벤트 전파를 어떻게 중지합니까?

<br>

### 이벤트 전파란?

#### html
```html
<div class="boxDiv click01">
    <p>3</p>
    <div class="boxDiv click02">
        <p>2</p>
        <div class="boxDiv click03">
            <p>1</p>
        </div>
    </div>
</div>
<p class="result"></p>
```
#### css
```css
.boxDiv{border:1px solid #000;padding:20px}
.click01{width:300px;margin:0 50px;background:#aaa}
.click02{background:#ddd}
.click03{background:#fff}
```
#### js
```js
var click01 = document.querySelector('.click01'),
    click02 = document.querySelector('.click02'),
    click03 = document.querySelector('.click03');

click01.addEventListener('click', function(){
    clickEvent('click01');
});

click02.addEventListener('click', function(){
    clickEvent('click02');
});

click03.addEventListener('click', function(){
    clickEvent('click03');
});

function clickEvent(target){
    var result = document.querySelector('.result'),
        text = result.innerHTML;
    result.innerHTML = text + target + '<br>';
}
```

> codepen : <a href="https://codepen.io/anon/pen/RMBveo?editors=1111" target="_blank">https://codepen.io/anon/pen/RMBveo?editors=1111</a>

위와 같은 코드에서 최하위에 위치한 1을 클릭하면 상위에 있는 모든 이벤트가 실행된다.
이러한 동작을 이벤트 전파라고 한다.
<br>

### 중지 시키는 방법
- [event.preventDefault](#preventdefault)
- [event.stopPropagation](#stoppropagation)
- [event.stopImmediatePropagation](#stopimmediatepropagation)

<br>

### preventDefault
event.preventDefault는 현재 이벤트의 기본 동작을 중단시킨다.
event.Default의 기능은 a태그를 생각하면 이해가 쉽다.
a태그는 기본 동작으로 URL 이동을 가지고 있는 태그이다.
<b>a태그의 기본 동작인 URL 이동을 하지 않고 이벤트만 실행하고자 할 때 해당 코드로 기본 동작을 막을 수 있다</b>.

<hr>

#### html
```html
<div class="boxDiv click01">
    <p>3</p>
    <div class="boxDiv click02">
        <p>2</p>
        <a href="www.naver.com" class="boxDiv click03">
            <p>1</p>
        </a>
    </div>
</div>
<p class="result"></p>
```

#### css
```css
.boxDiv{border:1px solid #000;padding:20px}
.click01{width:300px;margin:0 50px;background:#aaa}
.click02{background:#ddd}
.click03{background:#fff}
a{display:block}
```

#### script
```js
var click01 = document.querySelector('.click01'),
    click02 = document.querySelector('.click02'),
    click03 = document.querySelector('.click03');

click01.addEventListener('click', function(event){
    clickEvent('click01');
});

click02.addEventListener('click', function(event){
    clickEvent('click02');
});

click03.addEventListener('click', function(event){
    event.preventDefault();
    clickEvent('click03');
});

function clickEvent(target){
    var result = document.querySelector('.result'),
        text = result.innerHTML;
    result.innerHTML = text + target + '<br>';
}
```
> codepen : <a href="https://codepen.io/anon/pen/wmxOeE" target="_blank">https://codepen.io/anon/pen/wmxOeE</a>

<br>

### stopPropagation
event.stopPropagation는 현재 이벤트가 상위로 전파되는걸 중단시킨다.
위에 있는 코드를 확인해보면 제일 하위의 엘리먼트의 이벤트가 실행되면,
상위에 존재하는 모든 이벤트들이 모두 실행된다.
이벤트가 전파되는 동작인데, 해당 코드를 가지고 <b>상위로 전파되는 이벤트를 막을 수 있다</b>.

<hr>

#### html
```html
<div class="boxDiv click01">
    <p>3</p>
    <div class="boxDiv click02">
        <p>2</p>
        <div class="boxDiv click03">
            <p>1</p>
        </div>
    </div>
</div>
<p class="result"></p>
```

#### css
```css
.boxDiv{border:1px solid #000;padding:20px}
.click01{width:300px;margin:0 50px;background:#aaa}
.click02{background:#ddd}
.click03{background:#fff}
```

#### script
```js
var click01 = document.querySelector('.click01'),
    click02 = document.querySelector('.click02'),
    click03 = document.querySelector('.click03');

click01.addEventListener('click', function(event){
    clickEvent('click01');
});

click02.addEventListener('click', function(event){
    clickEvent('click02');
});

click03.addEventListener('click', function(event){
    event.stopPropagation();
    clickEvent('click03');
});

function clickEvent(target){
    var result = document.querySelector('.result'),
        text = result.innerHTML;
    result.innerHTML = text + target + '<br>';
}
```
> codepen : <a href="https://codepen.io/anon/pen/eMbdRO" target="_blank">https://codepen.io/anon/pen/eMbdRO</a>

<br>

### stopImmediatePropagation
event.stopImmediatePropagation는 현재 이벤트가 상위 뿐만 아니라 현재 레벨에 걸린 다른 이벤트도 중단시킨다.
해당 코드가 있는 이벤트 외에 <b>같은 레벨과 상위 레벨의 이벤트를 중단</b>시킨다.

<hr>

#### html
```html
<div class="boxDiv click01">
    <p>3</p>
    <div class="boxDiv click02">
        <p>2</p>
        <div class="boxDiv click03">
            <p>1</p>
        </adiv>
    </div>
</div>
<p class="result"></p>
```

#### css
```css
.boxDiv{border:1px solid #000;padding:20px}
.click01{width:300px;margin:0 50px;background:#aaa}
.click02{background:#ddd}
.click03{background:#fff}
```

#### script
```js
var click01 = document.querySelector('.click01'),
    click02 = document.querySelector('.click02'),
    click03 = document.querySelector('.click03');

click01.addEventListener('click', function(event){
    clickEvent('click01');
});

click02.addEventListener('click', function(event){
    clickEvent('click02');
});

click03.addEventListener('click', function(event){
    clickEvent('click03');
});

click03.addEventListener('click', function(event){
    event.stopimmediatePropagation();
    clickEvent('only event');
});

function clickEvent(target){
    var result = document.querySelector('.result'),
        text = result.innerHTML;
    result.innerHTML = text + target + '<br>';
}
```
> codepen : <a href="https://codepen.io/anon/pen/pLqNKN" target="_blank">https://codepen.io/anon/pen/pLqNKN</a>

<br>
## 참고 했던 자료 및 블로그
- <a href="https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/">https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/</a>

 - <a href="https://programmingsummaries.tistory.com/313" target="_blank">https://programmingsummaries.tistory.com/313</a>

