---
title: 웹 접근성(인식의 용이성)
author: Jay.J
date: 2020-03-07 17:44:39 +0900
categories: [html]
tags: [html, Web Accessibility]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---

## 인식의 용이성
모든 콘텐츠는 사용자가 인식할 수 있어야 한다.

- [1.1.1 적절한 대체 텍스트 제공](#111-적절한-대체-텍스트-제공)
- [1.2.1 자막 제공](#121-자막-제공)
- [1.3.1 색에 무관한 콘텐츠 인식](#131-색에-무관한-콘텐츠-인식)
- [1.3.2 명확한 지시사항 제공](#132-명확한-지시사항-제공)
- [1.3.3 텍스트 콘텐츠의 명도 대비](#133-텍스트-콘텐츠의-명도-대비)
- [1.3.4 자동 재생 금지](#134-자동-재생-금지)
- [1.3.5 콘텐츠 간의 구분](#135-콘텐츠-간의-구분)

<br>

### 1.1.1 적절한 대체 텍스트 제공
텍스트 아닌 콘텐츠는 그 의미나 용도를 이해할 수 있도록 대체 텍스트를 제공해야 한다.

#### 1) 의미가 있는 이미지는 대체 텍스트를 제공한다.

<img src="/assets/img/webAccessibility/need_alt_img.png" alt="" style="left:0;transform:none;">

##### <b style='color:red'>잘못된 소스</b>

```HTML
<img src="test.jpg" alt="">
```
> alt 미적용

##### <b style='color:blue'>잘된 소스</b>

```HTML
<img src="test.jpg" alt="산악인들의 극찬! 요즘엔 이거 없이 등산 안해?">
```

<br>

#### 2) 의미가 없는 이미지는 대체 텍스트를 제공하지 않는다.

<img src="/assets/img/webAccessibility/not_need_alt_img.png" alt="" style="left:0;transform:none;">

##### <b style='color:red'>잘못된 소스</b>

```HTML
<img src="test.jpg" alt="[단독] '철밥통 천국' 한국... 공공 인건비, 500대 기업 넘었다">
```
의미가 없는 이미지( 제목이 나와 있는 썸네일 등)에 불필요하게 중복된 텍스트 제공

##### <b style='color:blue'>잘된 소스</b>

```HTML
<img src="test.jpg" alt="">
```

<br>

#### 3) 의미를 파악할 수 있도록 적절한 대체 텍스트를 제공한다.

<img src="/assets/img/webAccessibility/qrcode.png" alt="" style="width:250px;left:0;transform:none;">

##### <b style='color:red'>잘못된 소스</b>

```HTML
<img src="qr_code.jpg" alt="QR코드">
```
의미를 정확하게 파악할 수 없는 QR코드

##### <b style='color:blue'>잘된 소스</b>

```HTML
<img src="qr_code.jpg" alt="QR코드 네이버 바로가기 http://www.naver.com">
```

<br>

### 1.2.1 자막 제공
멀티미디어 콘텐츠에는 자막, 원고 또는 수화를 제공해야 한다.

<img src="/assets/img/webAccessibility/subtitle.png" alt="" style="left:0;transform:none;border:1px solid #eee">

<br>

### 1.3.1 색에 무관한 콘텐츠 인식
콘텐츠는 색에 관계없이 인식될 수 있어야 한다.

<img src="/assets/img/webAccessibility/tab.png" alt="" style="left:0;transform:none;border:1px solid #eee">
> 탭

<img src="/assets/img/webAccessibility/paging.png" alt="" style="left:0;transform:none;border:1px solid #eee">
> 페이징

탭, 페이징 등은 선택된 컨텐츠는 색과 무관하게 굵게, 테두리 등을 이용하여 인식할 수 있어야 한다.

<br>

### 1.3.2 명확한 지시사항 제공
지시사항은 모양, 크기, 위치, 방향, 색, 소리 등에 관계없이 인식될 수 있어야 한다.


<img src="/assets/img/webAccessibility/color_error.png" alt="" style="left:0;transform:none;border:1px solid #eee">
> 색상으로만 정보 제공을 해서는 안된다.

<img src="/assets/img/webAccessibility/button.png" alt="" style="left:0;transform:none;border:1px solid #eee">
> 크기만으로 정보 제공을 해서는 안된다.

<img src="/assets/img/webAccessibility/position.png" alt="" style="left:0;transform:none;border:1px solid #eee">
> 위치나 방향으로만 정보 제공을 해서는 안된다.

<br>

### 1.3.3 텍스트 콘텐츠의 명도 대비
텍스트 콘텐츠와 배경 간의 명도 대비는 4.5대 1 이상이어야 한다.

<img src="/assets/img/webAccessibility/cca.jpg" alt="" style="left:0;transform:none;border:1px solid #eee">

- 텍스트와 배경
- 이미지 내부 텍스트와 배경
- 의미 있는 이미지와 배경

위 사항 모두 명도대비가 4.5대 1 이상이어야 한다.

<br>

### 1.3.4 자동 재생 금지
자동으로 소리가 재생되지 않아야 한다.<br>
<br>
사이트 및 컨텐츠에 접근시 자동으로 소리가 재생되어서,<br>
스크린리더를 이용하여 사이트 및 컨텐츠에 접근하는 사용자를 방해해서는 안된다.<br>
불가피하게 제공되어야 할 경우 3초내에 정지하거나,<br>
esc 키로 정지시킬 수 있어야 한다.<br>

<br>

### 1.3.5 콘텐츠 간의 구분
이웃한 콘텐츠는 구별될 수 있어야 한다.

<img src="/assets/img/webAccessibility/content_classification.png" alt="" style="border:1px solid #eee">

- 테두리를 이용하여 구분
- 콘텐츠 사이에 시각적인 구분선을 삽입하여 구분
- 서로 다른 무늬를 이용하여 구분
- 콘텐츠 배경색 간의 명도대비(채도)를 달리하여 구분
- 줄 간격 및 글자 간격을 조절하여 구분
- 기타 콘텐츠를 시각적으로 구분할 수 있는 방법을 통해 구분

<br>
<br>

## 참고 했던 자료 및 블로그
 - <a href="http://www.websoul.co.kr/accessibility/WA_guide21.asp" target="_blank">http://www.websoul.co.kr/accessibility/WA_guide21.asp</a>
 - <a href="https://nuli.navercorp.com/guideline/s01/g01" target="_blank">https://nuli.navercorp.com/guideline/s01/g01</a>
