---
title: Sass & SCSS 란?
author: Jay.J
date: 2019-08-31 12:33:39 +0900
categories: [css]
tags: [sass, scss, css]
math: true
mermaid: true
image: /blogAPI/assets/img/sass.png
---

최근 프론트쪽을 담당하는 직군의 기술 스택을 보면 Sass를 심심찮게 볼 수 있습니다.
그래서 Sass는 무엇인가에 대해서 알아보려고 합니다.

> 본 글에서는 Sass에 대해서만 알아보며, 문법과 컴파일 방법에 대해서는 다루지 않습니다.

<br>

## Sass 란?
Sass는 Syntactically Awesome Style Sheets의 약자이며,
CSS를 우리가 조금 더 편하게 사용하기 위해 확장한 언어입니다.
그러나 웹에서는 CSS만 직접 동작하기 때문에 Sass는 웹에서 사용하기 위해서는 컴파일을 해주어야 합니다.
그러기에 Sass는 <b>CSS Preprocessor(CSS 전처리기)</b>라고 불립니다. 
> 전처리기 란?
> 프로그램을 만들 때 소스파일 > 전처리기 -> 컴파일러 ->  실행파일 순으로 실행되는데,
> <b>전처리기(Preprocessor)</b>는 소스 코딩을 한 후 컴파일 하기 직전에 처리하는 컴파일러의 한 부분입니다.
> * CSS 전처리기에는 Sass 외에 Less, Stylus 등의 전처리기가 있습니다.

<br>
  
## Sass는 왜 사용해야하는가?
1. CSS를 구조화하여 표현할 수 있어 구조를 쉽게 파악할 수 있으며 <b>코드 낭비를 최소화</b> 할 수 있습니다.
2. 변수, 조건문 등을 CSS에 없는 기능을 활용하여 <b>유지보수 편의를 향상</b>시킬 수 있습니다.
3. 함수 등을 이용하여 <b>재활용이 가능한 코드</b>를 만들 수 있습니다.

<br>
  
## Sass는 Sass지, SCSS는 무엇인가?
SCSS(Sassy CSS)는 Sass의 세번째 버전에서 추가되었습니다.
Sass의 모든 기능을 지원하며, CSS 구문과 완전히 호환되도록 만들어졌습니다.
즉, SCSS는 CSS와 거의 같은 문법이며 또한 Sass 기능도 지원합니다.

<br>
  
## Sass와 SCSS 차이점은?
중괄호 {} , 세미콜론 ; 의 차이가 있습니다.

<br>
  
### Sass
```sass
    .roro
        overflow: hidden
        width: 100px
        li
            float: left
            margin: 0 10px
            &:last-child
                margin: 0
```

### SCSS
```scss
    .roro{
        overflow: hidden;
        width: 100px;
        li{
            float: left;
            margin: 0 10px;
            &:last-child{
                margin: 0;
            }
        }
    }
```

## Sass vs SCSS
기존 버전인 Sass 는
규칙 중첩을 중괄호 <code>{}</code> 가 아니라 들여쓰기로 사용하며,
속성을 구분하기 위해 세미콜론 ; 대신 줄 바꿈을 사용합니다.
따라서 조금 더 빠르고 읽기 쉽도록 코드가 작성되어,
시각적으로도 코드가 깔끔하며, 깔끔한 코드 관리가 가능해집니다.
<br>

세번째 버전인 SCSS 는
공식 레퍼런스는 SCSS 문법을 기준으로 모든 문법을 설명하고 예시를 보여줍니다.
평상시에 사용하는 CSS와 문법이 비슷하므로, CSS를 사용할 줄 알면 Sass보다 진입장벽이 훨신 낮습니다.
다수의 라이브러리, 프레임워크가 SCSS 문법을 활용하는 등 새로운 문법이 더욱 널리 쓰입니다.
<br>

공식 문서에서도 SCSS 문법을 기준으로 하는 만큼 SCSS를 사용하기를 추천합니다.