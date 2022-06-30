---
title: AMP Conference
author: Jay.J
date: 2018-11-05 20:00:39 +0900
categories: [conference]
tags: [conference]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---

## AMP(Accelerated Mobile Pages)
AMP는 Accelerated Mobile Pages의 약자로 Google에서 만든 오픈소스이며,  
웹 페이지를 빠르고 번개와 같이 즉시 로딩 될 수 있게  
모바일 <b>웹의 성능을 높이기 위한 목적을 가지고 있는 오픈소스 라이브러리</b>다.
  
<br>
  
### AMP의 특징
AMP의 특징으로는 <b>즉시 페이지를 로드한다는 큰 틀안에서 이루어진다</b>.  
비동기 스크립트만을 이용하여 페이지의 성능을 개선하고,  
이미지와 iframe 등도 다운로드 전에 크기와 위치를 잡아 성능을 개선한다.  
또한 css를 인라인으로 작성하여 호출할 때 보다 페이지를 더 빠르게 로드한다.  
> 추가적인 정보 : <a href="https://www.ampproject.org/ko/learn/about-how/" target="_blank">https://www.ampproject.org/ko/learn/about-how/</a>  
  
<br>
  
### 컨퍼런스 내용 중
빠른 페이지 로딩 속도 뿐만 아니라 다음과 같은 기술과  
amp를 사용하면서 얻을 수 있는 효과에 대해서 이야기하였다.  
  
- <b>첫째. 다양한 기능들을 사용할 수 있다.</b>  
    amp에서 지원하는 모바일 메뉴나 슬라이드, Youtube 영상,  
    선택에 따라 동적으 변하는 옵션등 다양한 기능들을 쉽게 구현이 가능하다.  

- <b>둘째. Canonical AMP</b>  
    AMP는 모바일 웹 페이지에 최적화되어 있지만, 다른 유형에서도 사용이 가능하다.  
    즉, 모바일을 우선적으로 사용할 수 있고 반응형 또는 웹 페이지에서도 사용이 가능하다.  

- <b>셋째. 빠른 로딩으로 인한 수익률</b>  
    웹 페이지의 로딩이 느리면 사용자는 쉽게 떠나버린다.  
    빠른 로딩을 통하여, 사용자를 오래 머무르게 만들고 그로인한 높은 광고 수익을 낼 수 있다.
  
<br>

### 느낀점  
구축하는 페이지 로딩속도는 개발자라면 누구나 한번쯤 생각해본 문제이다.  
AMP는 그런 문제에 있어서 쉽게 구축할 수 있게 해주는 오픈 소스이다.  
<br>
그러나 AMP 에는 개발자가 직접 작성한 별도의 자바스크립트를 포함할 수 없다.  
AMP에서 제공하지 않는 기능을 페이지에서 제공하려면 단점으로 작용될 거라 생각이 든다.  
<br>
특별한 기능 또는 AMP에서 제공되는 기능들로 구축이 가능하다면 충분히 매력적인 오픈소스이다.  
이번 컨퍼런스에서도 뉴스나 언론매체 등 정보를 제공하는 사이트나 업체에서 많이 참석하였다.  
<br>
자신의 페이지가 정보를 제공하는 것이 주 목적이거나,  
별도의 자바스크립트의 작성이 필요 없는 페이지라면  
페이지 구축 시 AMP를 이용하여 성능을 개선하는 것도 좋다고 생각된다.