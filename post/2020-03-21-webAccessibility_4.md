---
title: 웹 접근성(이해의 용이성)
author: Jay.J
date: 2020-03-21 17:44:39 +0900
categories: [html]
tags: [html, Web Accessibility]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---

## 이해의 용이성
콘텐츠는 이해할 수 있어야 한다.

- [3.1.1 기본 언어 표시](#311-기본-언어-표시)
- [3.2.1 사용자 요구에 따른 실행](#321-사용자-요구에-따른-실행)
- [3.3.1 콘텐츠의 선형화](#331-콘텐츠의-선형화)
- [3.3.2 표의 구성](#332-표의-구성)
- [3.4.1 레이블 제공](#341-레이블-제공)
- [3.4.2 오류 정정](#342-오류-정정)

<br>

### 3.1.1 기본 언어 표시
주로 사용하는 언어를 명시해야 한다.

```HTML
<html lang=”ko”>
```
> HTML5

<br>

### 3.2.1 사용자 요구에 따른 실행
사용자가 의도하지 않은 기능 (새 창, 초점 변화 등)은 실행되지 않아야 한다.

#### 1) 페이지 진입시 뜨는 새 창(팝업)

<img src="/assets/img/webAccessibility/firstpopup.jpg" alt="" style="border:1px solid #ddd;left:0;width:500px;transform:none;">

페이지 진입시 새 창이 뜰 경우, 사용자는 본 창을 탐색하고 있는지 <br>
새 창을 탐색하고 있는 건지 구분하기 어렵다.

<br>

#### 2) 사전에 인식할 수 없는 새 창

```HTML
<a href="#" onclick="open():">페이지</a>
```
> 스크립트로 처리시 새 창인지 인지할 수 없다.

```HTML
<a href="test.html"> 페이지<span class="blind">새 창</span></a>
<a href="test.html" title="새 창">페이지</a>
<a href="test.html" target="_blank">페이지</a>
```
위와 같이 새 창인지 인지할 수 있도록 정보를 제공해야한다.

<br>

### 3.3.1 콘텐츠의 선형화
콘텐츠는 논리적인 순서로 제공해야 한다.

<img src="/assets/img/webAccessibility/tab.png" alt="" style="left:0;transform:none;border:1px solid #eee">
> 제목 > 내용 순으로 이어져야한다.

##### <b style='color:red'>잘못된 소스</b>

```HTML
<ul>
  <li><button>탭 제목1</button></li>
  <li><button>탭 제목2</button></li>
  <li><button>탭 제목3</button></li>
</ul>
<div>
  탭 내용 1
</div>
<div>
  탭 내용 2
</div>
<div>
  탭 내용 3
</div>
```

##### <b style='color:blue'>잘된 소스</b>

```HTML

<ul>
  <li>
    <button>탭 제목1</button>
    <div>
      탭 내용 1
    </div>
  </li>
  <li>
    <button>탭 제목1</button>
    <div>
      탭 내용 2
    </div>
  </li>
  <li>
    <button>탭 제목1</button>
    <div>
      탭 내용 3
    </div>
  </li>
</ul>
```

<img src="/assets/img/webAccessibility/contents.jpg" alt="" style="border:1px solid #ddd;left:0;transform:none;border:1px solid #eee">
> 제목 > 내용 > 더보기 순으로 마크업 되어야한다.


##### <b style='color:red'>잘못된 소스</b>

```HTML
<h3>녹색친구들 이야기</h3>
<a href="...">더보기</a>

<ul>
  <li><button>내용</button></li>
  <li><button>내용</button></li>
  <li><button>내용</button></li>
</ul>
```

##### <b style='color:blue'>잘된 소스</b>

```HTML
<h3>녹색친구들 이야기</h3>

<ul>
  <li><button>내용</button></li>
  <li><button>내용</button></li>
  <li><button>내용</button></li>
</ul>

<a href="...">더보기</a>
```

<br>

### 3.3.2 표의 구성
표는 이해하기 쉽게 구성해야 한다.

복잡하지 않는 간단한 표로 제공해야하며,<br>
요약을 설명하는 caption태그와 어느 순서로 읽는지 알려주는 th의 scope속성을 제공해야한다.

<img src="/assets/img/webAccessibility/table.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

##### <b style='color:red'>잘못된 소스</b>

```HTML
<table>
  <tr>
    <th>T-shirt</th>
    <th>Jacket</th>
    <th>Sweatshirt</th>
    <th>Pants</th>
    <th>Shorts</th>
  </tr>
  <tr>
    <td>Size</td>
    <td>S</td>
    <td>M</td>
    <td>L</td>
    <td>XL</td>
  </tr>
  ...
</table>
```

##### <b style='color:blue'>잘된 소스</b>

```HTML
<table>
  <caption>Size Guide</caption>
  <thead>
    <tr>
      <th scope="col">T-shirt</th>
      <th scope="col">Jacket</th>
      <th scope="col">Sweatshirt</th>
      <th scope="col">Pants</th>
      <th scope="col">Shorts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Size</td>
      <td>S</td>
      <td>M</td>
      <td>L</td>
      <td>XL</td>
    </tr>
  </tbody>
  ...
</table>
```

* 표가 아닌 디자인을 위해서 콘텐츠를 테이블로 마크업해서는 안된다.

<br>

### 3.4.1 레이블 제공
사용자 입력에는 대응하는 레이블을 제공해야 한다.

<img src="/assets/img/webAccessibility/input.jpg" alt="" style="border:1px solid #ddd;left:0;transform:none;border:1px solid #eee">

##### <b style='color:red'>잘못된 소스</b>

```HTML
<input type="text" placeholder="이메일 아이디를 입력해주세요.">
```
> 레이블 미제공

##### <b style='color:blue'>잘된 소스</b>

```HTML
<label for="email_id">이메일 아이디</label>
<input type="text" id="email_id" placeholder="이메일 아이디를 입력해주세요.">

or

<input type="text" placeholder="이메일 아이디를 입력해주세요." title="이메일 아이디">
```

<br>

### 3.4.2 오류 정정
입력 오류를 정정할 수 있는 방법을 제공해야 한다.

- 입력 오류 시 입력 내용이 모두 사라지면 안된다.
- 오류의 원인을 알 수 있도록 제공한다.
- 오류가 발생된 입력란으로 초점이 이동되어야한다.

<img src="/assets/img/webAccessibility/input_error.jpg" alt="" style="border:1px solid #ddd;left:0;transform:none;border:1px solid #eee">
> 초점 이동과 오류의 원인을 제공한 스크린샷

<br>
<br>

## 참고 했던 자료 및 블로그
 - <a href="http://www.websoul.co.kr/accessibility/WA_guide21.asp" target="_blank">http://www.websoul.co.kr/accessibility/WA_guide21.asp</a>
 - <a href="https://nuli.navercorp.com/guideline/s03/g17" target="_blank">https://nuli.navercorp.com/guideline/s03/g17</a>
