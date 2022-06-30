---
title: Javascript Call Stack and Event Loop
author: Jay.J
date: 2018-05-11 12:00:39 +0900
categories: [javascript]
tags: [javascript]
math: true
mermaid: true
image: /blogAPI/assets/img/javaScript.png
---

## Call Stack and Event Loop
> 호출 스택 및 이벤트 루프

<br>

### 자바 스크립트 엔진
javascript 를 해석하고 실행하는 인터프리터.
> 인터프리터 : 프로그래밍 언어의 소스 코드를 바로 실행하는 컴퓨터 프로그램 또는 환경을 말한다.

엔진에는 4가지로 구성되어있다.
- [Heap](#heap)
- [CallStack](#callstack)
- [EventQueue](#eventqueue)
- [EventLoop](#eventloop)

<br>

### Heap
객체나 변수 값들이 들어가있는 영역으로 메모리의 할당이 일어나는 곳이다.

<br>

### CallStack
Call Stack은 코드 실행에 따라 호출 스택(task)이 쌓이는 곳이다.
자바스크립트는 기본적으로 싱글 쓰레드 기반 언어이다.
따라서 코드 순서에 따라 호출 스택(task)이 쌓이면 작업 시 그 순서에 맞게 한번에 하나씩 호출하여 처리한다.
즉. <b>하나의 스택(하나의 task)이 작업중일 때에는 그 실행이 끝날 때까지 다른 작업을 수행할 수 없다</b>.
> 쓰레드는 프로그래밍이 실행될때 동작의 구분이 되는 흐름을 말한다.
> 쓰레드는 그 수에 따라 싱글스레드와 멀티스레드로 구분된다.

<br>

### EventQueue
비동기 처리 함수의 콜백 함수, 비동기식 이벤트, setTimeout(), setInterval()가 보관되는 영역이다.

<br>

### EventLoop
Call Stack내에서 현재 실행중인 task가 있는지 Event Queue에 task가 있는지 반복하여 확인해주는 역할을 한다.

<br>

## 정리
페이지 렌더링이 시작되면,
객체와 변수 값들은 Heap에 저장되어 메모리 할당이 일어나고,
코드 및 함수들은 Call Stack에 순서대로 쌓이게 된다.

Call Stack에 쌓인 순서대로 하나씩 스택들을 호출하여 처리하는데,
호출 스택의 각 단계를 스택 프레임(Stack Frame)이라고 한다.

그리고 비동기 처리 함수의 콜백 함수, 비동기식 이벤트 등의 함수들은
Event Queue라는 곳에 저장되어, 조건에 따라 호출되어 처리된다.

Call Stack, Event Queue에 현재 실행중인 스택이 있는지, 호출할 스택이 남아있는지를
반복적으로 확인하는 Event Loop가 일어난다.

<br>

## 참고 했던 자료 및 블로그
- <a href="https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/">https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/</a>
