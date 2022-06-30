---
title: 웹 접근성(견고성)
author: Jay.J
date: 2020-03-22 17:44:39 +0900
categories: [html]
tags: [html, Web Accessibility]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---

## 운용의 용이성
사용자 인터페이스 구성요소는 조작 가능하고 내비게이션 할 수 있어야 한다.

- [4.1.1 마크업 오류 방지](#411-마크업-오류-방지)
- [4.2.1 웹 애플리케이션 접근성 준수](#421-웹-애플리케이션-접근성-준수)

<br>

### 4.1.1 마크업 오류 방지
마크업 언어의 요소는 열고 닫음, 중첩 관계 및 속성 선언에 오류가 없어야 한다.

#### 1) 요소의 열고 닫음

##### <b style='color:red'>잘못된 소스</b>
```HTML
<ul>
  <li>목록</li>
  <li>목록</li>
  <li>목록</li>
<p>내용</p>
```

##### <b style='color:blue'>잘된 소스</b>
```HTML
<ul>
  <li>목록</li>
  <li>목록</li>
  <li>목록</li>
</ul>
<p>내용</p>
```

<br>

#### 2) 중첩 관계

##### <b style='color:red'>잘못된 소스</b>
```HTML
<a href="..."><p>내용</a></p>
```

##### <b style='color:blue'>잘된 소스</b>
```HTML
<a href="..."><p>내용</p></a>
```

<br>

#### 3) 속성 선언

##### <b style='color:red'>잘못된 소스</b>
```HTML
<img src="test.png" class="test" class="test-class" title="test" title="class-title" alt="">
```

##### <b style='color:blue'>잘된 소스</b>
```HTML
<img src="test.png" class="test test-class" title="test class-title" alt="">
```

<br>

#### 4) ID 중복
페이지에 동일한 ID가 존재하면 안된다.

<br>

### 4.2.1 웹 애플리케이션 접근성 준수
콘텐츠에 포함된 웹 애플리케이션은 접근성이 있어야 한다.

#### 1) 사이트 전체가 플래시로 구현된 경우
플래시를 대체 할 수 있는 접근 가능한 콘텐츠로 제공한다.

#### 2) 테이블로 사이트 전체를 코딩하면 안된다.

<br>
<br>

## 참고 했던 자료 및 블로그
 - <a href="http://www.websoul.co.kr/accessibility/WA_guide21.asp" target="_blank">http://www.websoul.co.kr/accessibility/WA_guide21.asp</a>
 - <a href="https://nuli.navercorp.com/guideline/s04/g23" target="_blank">https://nuli.navercorp.com/guideline/s04/g23</a>
