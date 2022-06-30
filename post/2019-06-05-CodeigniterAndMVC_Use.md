---
title: CI(codeigniter)의 MVC패턴 프로젝트 경험
author: Jay.J
date: 2019-06-05 18:44:39 +0900
categories: [Architecture]
tags: [Architecture, Design Pattern, Retrospect]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---
<!-- <img src="/assets/img/vue/webkitflow.png" alt=""> -->

회사에서 개발팀에 코드이그나이터를 도입하였다.<br>
개발팀에 도입한다고 해서 사실 크게 관심이 없었으며,<br>
큰 영향도 없을 것이라고 생각했다.<br>
<br>
하지만 퍼블리셔 입장에서도 기존의 방식과 조금씩 달랐고<br>
하나씩 경험했던 내용을 기록해두려고 한다.<br>

## Codeigniter란

Codeigniter(이하 코드이그나이터)란 PHP로 작성된 웹 프레임워크다.<br>
MVC패턴으로 동작한다.<br>
> <a href="/posts/whatIsMVC/">MVC에 관한 포스팅</a>

<br>

## 기존의 방식과 달라진 퍼블리셔 업무

기존의 방식과 제일 크게 달라졌던 점은 역시 MVC패턴을 사용함에 따른 변화이다.<br>

<img src="/assets/img/architecture/mvc.png" alt="" style="max-width:300px">

이미지와 같이 User가 Url을 통하여 접근하면 해당 URL의 따라 Controller에 요청하고<br>
사용자의 요구에 맞는 데이터를 Model에서 호출하고, 호출한 데이터를 View를 통해서 보여준다.<br>
<br>
PHP파일을 만들고 그 파일을 열리면 화면이 보여줬던 것과 달리<br>
코드이그나이터는 Controller에서 사용자가 접근하는 URL과 View페이지를 연결시켜줘야한다.<br>

### Controller 파일
```php

class A extends CI_Controller {

  ...

	public function B()
	{
    $this->load->view( C );
  }
}

```
> A : Controller File Name (호출하려는 파일명의 상위 폴더명과 동일)<br>
> B : Function Name (임의의 함수명이자 접근 URL명 )<br>
> C : 파일위치/파일명 (확장자는 생략)

### View 폴더 구조
Controller 파일과 동일한 폴더명 - 호출하려는 파일명

### URL
domain/A/B

<br>

## MVC패턴에서 아쉬웠던 점

퍼블리셔팀에서 코드를 작성할 때 많이 실수하던 점이 있었다.<br>
특정 페이지에서 Ajax를 통하여 파일를 호출하는 방식이였다.<br>
그 파일 또한 URL로 접근하는 것인데 Controller에서 연결을 시켜주지 않아<br>
화면이 나오지 않고, 왜 안되는지 이유를 한참 못찾고 헤맸던 적이 있다.<br>
Controller에서 연결시켜준 후에 제대로 작동되는 것을 확인하였는데<br>
코드이그나이터 하기 전에는 없던 동작 오류로 당황스러웠고,<br>
Ajax 또한 URL 접근인데 그 기본을 잊어버리고 한참 동작오류에 대해서 헤맸던 것은 스스로가 아쉬웠다.<br>

<br>

## 결론

최근 MV* 기반의 자바스크립트 프레임워크가 많은 인기를 얻고 있다.<br>
그런 측면에서 경험을 잘 해볼 수 없던 MVC패턴을 경험해봤다는 것은 좋았다.<br>
하지만 Controller만 사용하여 View와 연결만 해본 것만으로는<br>
장점과 단점을 구분하기 많이 부족했다.<br>
<br>
현재의 직책이 퍼블리셔이기에 개발의 단계까지 할 수 없었던 것이 많이 아쉬웠다.<br>
기회가 된다면 MV* 의 디자인패턴에서 개발까지 해보면 좋을 것 같다.
