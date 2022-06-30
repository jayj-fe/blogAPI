---
title: VanillaJs
author: Jay.J
date: 2020-08-25 18:44:39 +0900
categories: [javascript]
tags: [javascript, VanillaJs]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

## Vanilla JS란?
Vanilla JS(바닐라 자바스크립트)란 어떠한 프레임워크와 라이브러리가 적용되지 않은 날 것의 자바스크립트를 바닐라 자바스크립트라고 한다.

<br>

## 왜 Vanilla JS 사용하는 것인가
개인적인 생각이지만 배보다 배꼽이 커지는 상황도 많았던 것 같다.<br>
jQuery라는 DOM을 컨트롤 하는데에 있어서 매우 뛰어난 라이브러리가 있다.<br>
하지만 특정한 곳에서 한번만 사용할 것인데 그를 위해 jQuery를 사용한다면 효율적인 면에서 떨어진다.<br>
jQuery 또한 자바스크립트의 라이브러리이기 때문에 순수한 자바스크립트보다 속도면에서 성능이 떨어진다.<br>
<br>
또한 이전까지의 자바스크립트 버전은 DOM에 접근하려면 jQuery에 비해 길게 작성해야했기에 조금 더 편리한 jQuery를 개발하는 데 편하고 좋았다고 생각한다.<br>

```js
// class가 item 인 요소에 이벤트 바인딩

// javascript
document.querySelectorAll('.item').forEach(function(item){
    item.addEventListener('click', function(){
        console.log(this);
    })
})

// jQuery
$('.item').on('click', function(){
    console.log(this);
})

```
> Internet Explorer 낮은 버전까지 제대로 작동하기 위해선 조금 더 길어진다.

하지만 ES6(ECMAScript2015)버전이 출시되면서 자바스크립트 이전 버전에 비해 좀 더 DOM에 접근하기 간편해지고 너무 낮은 Internet Explorer 들은 맞추지 않기 시작하면서 성능이 중요해졌고,<br>
자바스크립트 프레임워크인 Angular.js, React.js, Vue.js이 등장하고 해당 프레임워크들은 순수 자바스크립트를 사용하면서 바닐라 자바스크립트의 중요성이 더 높아졌다.

<br>

## Vanilla JS의 장점

바닐라 자바스크립트의 장점으로는 공식 홈페이지에도 표기되어 있듯이 속도가 장점이다.<br>

<img src="/assets/img/javascript/vanillaJs01.png" alt="">

<img src="/assets/img/javascript/vanillaJs02.png" alt="">

<br>

## 코딩을 시작하는 초보자가 Vanilla JS를 해야하는 이유
현재 외국이나 자체 서비스를 운영하는 회사에서는 jQuery를 사용하는 프로젝트가 점점 줄어들고 있는 상황이다.<br>
jQuery에 익숙해진 개발자가, jQuery를 걷어내고 개발을 하게 되었을 때 얼마만큼 할 수 있을지 의문이다.<br>
또한 자바스크립트의 프레임워크를 사용하는 회사도 많아지고 있다.<br>
<br>
프레임워크나 라이브러리 같은 것도 결국 순수한 자바스크립트가 기본 베이스이다.<br>
그렇기에 초보자라면 순수한 자바스크립트에 대해서 공부를 하여 기본 실력을 쌓고<br>
본인 상황에 맞게 추가적으로 라이브러리나 프레임워크에 대해서 공부하는 것이 좋다고 생각한다.<br>

<br>
<br>


## 참고 했던 자료 및 블로그
- <a href="http://vanilla-js.com/">http://vanilla-js.com/</a>
- <a href="https://mollangk.tistory.com/7">https://mollangk.tistory.com/7</a>
