---
title: MVC패턴에 대해서
author: Jay.J
date: 2019-05-09 16:12:39 +0900
categories: [Architecture]
tags: [Architecture, Design Pattern]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---

## MVC 란

MVC는 Model, View, Controller의 약자이다.<br>
MVC는 사용자 인터페이스, 데이터 및 논리 제어를 구현하는데 널리 사용되는 소프트웨어 디자인 패턴이다.<br>
소프트웨어의 비즈니스 로직과 화면을 구분하는데 중점을 두고 있다.<br>

<img src="/assets/img/architecture/mvc.png" alt="" style="max-width:500px">

User는 Controller에게 요청하고, Controller는 Model에게 명령을 보내고,<br>
Model은 해당의 데이터를 View에게 제공하여, User는 View를 통해 정보를 얻을 수 있다.<br>
<br>
하나 하나의 기능을 자세히 살펴보면 아래와 같다.<br>
<br>

### Model

모델(model)이란 어떠한 동작을 수행하는 코드를 말한다.<br>
모델은 데이터가 무엇인지를 정의한다.<br>
데이터 자체는 사용자에게 어떻게 보일지에 대해 신경쓰지 않아도 된다.<br>
<br>
모델은 순수하게 public 함수로만 이루어진다.<br>
모델은 모델의 상태에 변화가 있을 때 컨트롤러와 뷰에 이를 통보한다.<br>
어떤 MVC 구현에서는 통보 대신 뷰나 컨트롤러가 직접 모델의 상태를 읽어 오기도 한다.<br>

<br>

### View

View(뷰)란 데이타를 기반으로 사용자들이 볼 수 있는 화면이다.<br>
뷰는 사용자가 볼 결과물을 생성하기 위해 모델로부터 정보를 얻어 온다.<br>
MVC에서 모델은 여러 개의 뷰를 가질 수 있다.<br>
뷰는 모델에게 질의를 하여 모델로 부터 값을 가져와 사용자에게 보여준다.<br>

<br>

### Controller

Controller(컨트롤러)는 데이터와 사용자인터페이스 요소들을 잇는 다리역할로써<br>
사용자로부터의 입력에 대한 응답으로 모델 및 뷰를 업데이트하는 로직을 포함한다.<br>

<br>
<br>

## 참고 했던 자료 및 블로그
 - <a href="https://developer.mozilla.org/ko/docs/Glossary/MVC" target="_blank">https://developer.mozilla.org/ko/docs/Glossary/MVC</a>
 - <a href="https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC" target="_blank">https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC</a>
 - <a href="https://m.blog.naver.com/jhc9639/220967034588" target="_blank">https://m.blog.naver.com/jhc9639/220967034588</a>

