---
title: Javascript and CSS Animation
author: Jay.J
date: 2023-01-15 18:44:39 +0900
categories: [css]
tags: [css]
math: true
mermaid: true
image: /blogAPI/assets/img/css.png
---

<br>

브라우저에서 애니메이션 효과를 사용하기 위해서는 두 가지의 방법을 사용할 수 있습니다. <br>
CSS의 <b style="color:skyblue">transition / animation</b> 속성과 <br>
Javascript의 <b style="color:#D7DF01">setInterval / requestAnimationFrame </b> 함수를 사용할 수 있습니다.<br>
<br>
<br>

<hr>
<br>

## CSS 애니메이션

CSS 애니메이션은 Javascript 애니메이션보다 좀 더 간단한 애니메이션을 구현하고 처리하는데 사용합니다.<br>
transform의 translate를 사용하여 애니메이션을 구현하면 Javascript로 애니메이션을 구현하는 것보다 성능을 개선할 수 있습니다.<br>
Javascript의 경우 top, left등의 속성 값을 변화시키면 랜더링 과정에서 <b style="color:red">reflow</b> 단계가 여러번 일어나기 때문입니다.

<br>

### CSS 애니메이션의 장점
- Javascript보다 구현이 간단하다.
- 미디어쿼리를 이용하여 반응형을 구현하기 쉽다.
- 외부 라이브러리를 필요로 하지 않습니다.
- 메인 스레드가 아닌 별도의 컴포지터 스레드에서 그려지기 때문에 Reflow가 일어나지 않기에 Javascript 보다 성능이 효율적이다. 

<br>
<hr>

<br>

## Javascript 애니메이션
<br>

Javascript의 애니메이션은 CSS로 처리하는 것보다 훨씬 복잡한 애니메이션을 구현할 수 있습니다.<br>
다만 Javascript로 애니메이션을 구현할 경우 CSS로 애니메이션을 구현하는 것보다 Reflow가 발생함으로 성능이 떨어진다.<br>
SetInterval 함수와 requestAnimationFrame 함수가 있는데 <br>
setInterval 함수로 구현하게 되면 사람들 눈에 전달되는 fps(프레임)이 좋지 않아, 살짝 끊기는 것 처럼 보이게 된다.<br>
requestAnimationFrame 함수는 사람의 육안으로 볼 때 끊김 없고 부드럽게 구현되는 <b style="color:skyblue">60fps</b>를 지원한다.<br>
<br>
최근에는 다양한 라이브러리가 많이 나왔는데, 해당 라이브러리들을 이용하면 프레임이나 성능 문제 없이 Javascript로도 좋은 효율을 지닌 애니메이션 구현이 가능하다.

<br>

### Javascript 애니메이션의 장점
- 애니메이션을 복잡하게 구현해야할 경우 사용하기 좋습니다.
- CSS의 애니메이션을 이용하는 것보다 크로스 브라우징 측면이 좋습니다.
- GPU를 통한 하드웨어 가속을 제어할 수 있습니다. <br>
  CSS 애니메이션의 경우 특정 속성에 의한 GPU가속이 됨으로서 저사양의 컴퓨팅인 경우에 성능 하락을 발생시킬 수 있으나 이를 막을수 있습니다.
- 미디어쿼리를 이용하여 반응형을 구현하기 쉽다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://choi-hyunho.tistory.com/24" target="_blank">https://choi-hyunho.tistory.com/24</a>
- <a href="https://cansweep.tistory.com/330" target="_blank">https://cansweep.tistory.com/330</a>
- <a href="https://zester7.tistory.com/55" target="_blank">https://zester7.tistory.com/55</a>
