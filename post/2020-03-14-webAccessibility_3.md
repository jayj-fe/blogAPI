---
title: 웹 접근성(운용의 용이성)
author: Jay.J
date: 2020-03-14 17:44:39 +0900
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

- [2.1.1 키보드 사용 보장](#211-키보드-사용-보장)
- [2.1.2 초점 이동](#212-초점-이동)
- [2.1.3 조작 가능](#213-조작-가능)
- [2.2.1 응답시간 조절](#221-응답시간-조절)
- [2.2.2 정지 기능 제공](#222-정지-기능-제공)
- [2.3.1 깜빡임과 번쩍임 사용 제한](#231-깜빡임과-번쩍임-사용-제한)
- [2.4.1 반복 영역 건너뛰기](#241-반복-영역-건너뛰기)
- [2.4.2 제목 제공](#242-제목-제공)
- [2.4.3 적절한 링크 텍스트](#243-적절한-링크-텍스트)

<br>

### 2.1.1 키보드 사용 보장
모든 기능은 키보드만으로도 사용할 수 있어야 한다. (PC웹)<br>
터치(touch) 기반 모바일 기기의 모든 컨트롤은 누르기 동작으로 제어할 수 있어야 한다. (모바일웹)

#### 1) 마오스 오버의 기능은 키보드 접근 시에도 드롭 다운 & 레이어팝업이 제공되어야 한다.

<img src="/assets/img/webAccessibility/keyboard_access1.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

<br>

#### 2) 마우스 클릭의 기능은 키보드로도 접근하여 그 기능을 이용할 수 있어야 한다.

<img src="/assets/img/webAccessibility/keyboard_access2.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">


<br>

### 2.1.2 초점 이동
키보드에 의한 초점은 논리적으로 이동해야 하며 시각적으로 구별할 수 있어야 한다.

#### 1) 키보드의 초점이동은 위에서 아래로 왼쪽에서 오른쪽으로 이동해야한다.

<img src="/assets/img/webAccessibility/focus_shift.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

<br>

#### 2) 키보드의 이동시 초점은 시각적으로 보여져야한다.

<img src="/assets/img/webAccessibility/focus_shift2.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">
> hideFocus, outline:none, onfocus=”this.blur();” 등을 이용하여<br>
> 초점 이동시 시각적으로 표현되는 걸 숨겨서는 안된다.

<br>

### 2.1.3 조작 가능
사용자 입력 및 컨트롤은 조작 가능하도록 제공되어야 한다.

#### 1) 컨트롤의 대각선 길이는 6mm(23px)이상이여야 한다.
> 컨트롤이 너무 작으면 조작하기 어렵다.

<br>

#### 2) 컨트롤은 테두리 안쪽으로 1px이상의 여백을 두어야한다.
> 컨트롤 간의 사이가 너무 좁으면 잘못 조작될 확률이 높다.

<br>

### 2.2.1 응답시간 조절
시간제한이 있는 콘텐츠는 응답시간을 조절할 수 있어야 한다.

#### 1) 시간 제한이 있는 콘텐츠는 종료 안내 및 조절할 수 있는 수단을 제공해야한다.
<img src="/assets/img/webAccessibility/response_time1.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

<br>

#### 2) 페이지가 자동으로 전환되는 콘텐츠는 시간을 조절할 수 있는 수단을 제공해야한다.
<img src="/assets/img/webAccessibility/response_time2.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

<br>

### 2.2.2 정지 기능 제공
자동으로 변경되는 콘텐츠는 움직임을 제어할 수 있어야 한다.

<img src="/assets/img/webAccessibility/stop_function.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">
> 자동으로 변경되는 슬라이드, 콘텐츠는 제어할 수 있는 기능(이전, 다음, 정지)을 제공해야한다.

<br>

### 2.3.1 깜빡임과 번쩍임 사용 제한
초당 3~50회 주기로 깜빡이거나 번쩍이는 콘텐츠를 제공하지 않아야 한다.

[포켓몬사건](https://namu.wiki/w/%ED%8F%AC%EC%BC%93%EB%AA%AC%20%EC%87%BC%ED%81%AC)

<br>

### 2.4.1 반복 영역 건너뛰기
콘텐츠의 반복되는 영역은 건너뛸 수 있어야 한다.

<img src="/assets/img/webAccessibility/skipnavi.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">
> Header영역, GNB영역 등 페이지마다 반복되는 콘텐츠가 있을 경우<br>
> 본문으로 바로 갈 수 있는 기능을 제공해야한다.

<br>

### 2.4.2 제목 제공
페이지, 프레임, 콘텐츠 블록에는 적절한 제목을 제공해야 한다.

#### 1) 페이지에 맞는 적절한 제목의 타이틀을 제공해야 한다.
<img src="/assets/img/webAccessibility/title1.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">
> 게시판의 경우 어떤 게시판의 목록인지 어떤 글의 상세보기 까지의 정확한 정보를 제공해야한다.

<br>

#### 2) 프레임에 맞는 적절한 제목의 타이틀을 제공해야 한다.
<img src="/assets/img/webAccessibility/title2.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

```HTML
<iframe title="프레임에 대한 적절한 제목">
```

<br>

#### 3) 콘텐츠 블록에 맞는 적절한 제목의 타이틀을 제공해야 한다.
<img src="/assets/img/webAccessibility/title3.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

```HTML
<h3>콘텐츠 블록에 맞는 제목</h3> <!-- h1~h6에 맞는 제목타이틀 -->
<div>
  콘텐츠 내용들
  ...
</div>
```

<br>

### 2.4.3 적절한 링크 텍스트
링크 텍스트는 용도나 목적을 이해할 수 있도록 제공해야 한다.

#### 1) 이미지 링크일 경우 이미지에 대체 텍스트를 제공한다.
<img src="/assets/img/webAccessibility/need_alt_img.png" alt="" style="left:0;transform:none;border:1px solid #eee">
```HTML
<a href="..."><img src="test.jpg" alt="산악인들의 극찬! 요즘엔 이거 없이 등산 안해?"></a>
```

<br>

#### 2) 썸네일 이미지가 존재할 경우 제목과 묶어 중복제공을 피한다.
<img src="/assets/img/webAccessibility/link.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

##### <b style='color:red'>잘못된 소스</b>

```HTML
<a href="..."><img src="test.jpg" alt=""></a>
<a href="..."><strong>제목</strong></a>
<a href="..."><p>내용</p></a>
```
> 링크를 중복으로 제공하고 있다.

##### <b style='color:blue'>잘된 소스</b>

```HTML
<a href="...">
  <img src="test.jpg" alt="">
  <strong>제목</strong>
  <p>내용</p>
</a>
```

<br>

#### 3) 배경 이미지로 링크를 줄 경우 IR기법으로 대체 텍스트를 제공한다.
<img src="/assets/img/webAccessibility/ir_link.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

##### <b style='color:red'>잘못된 소스</b>

```HTML
<a href="..."></a>
```
> 빈 링크에 배경 이미지로 제공하여 정보 전달이 되지 않는다.

##### <b style='color:blue'>잘된 소스</b>

```HTML
<a href="..." class="text-hide">메뉴보기</a>
```
```CSS
.text-hide{
  text-overflow:hidden;
  text-indent:-9999px;
  ...
}
```

<br>
<br>

## 참고 했던 자료 및 블로그
 - <a href="http://www.websoul.co.kr/accessibility/WA_guide21.asp" target="_blank">http://www.websoul.co.kr/accessibility/WA_guide21.asp</a>
 - <a href="https://nuli.navercorp.com/guideline/s02/g08" target="_blank">https://nuli.navercorp.com/guideline/s02/g08</a>
