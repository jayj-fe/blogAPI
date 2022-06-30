---
title: Cookie와 Session의 차이는 무엇일까
author: Jay.J
date: 2021-05-23 18:44:39 +0900
categories: [HTTP]
tags: [javascript, HTTP]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---
<!-- <img src="/assets/img/vue/webkitflow.png" alt=""> -->

## 쿠키(Cookie)

사용자가 어떠한 웹 사이트를 방문할 경우 사용자의 컴퓨터에 저장하는 작은 기록 정보 파일이다.<br>
사용자가 따로 요청하지 않아도 브라우저가 Request시에 Request Header를 넣어서 자동으로 서버에 전송한다.<br>
사용자의 상태 정보를 로컬에 저장했다가 필요시 정보를 참조하거나 재사용 한다.<br>
사용자 인증이 유효한 시간을 명시할 수 있으며, 유효 시간이 정해지면 브라우저가 종료되어도 인증이 유지된다는 특징이 있다.

### 쿠키의 구성 요소

- 이름 : 각각의 쿠키를 구별하는 데 사용되는 이름
- 값 : 쿠키의 이름과 관련된 값
- 유효시간 : 쿠키의 유지시간
- 도메인 : 쿠키를 전송할 도메인
- 경로 : 쿠키를 전송할 요청 경로

### 쿠키 특징

- 이름, 값, 만료일(저장 기간 설정), 경로 정보로 구성되어 있다.
- 사용자마다 총 300개의 쿠키를 저장할 수 있다.
- 하나의 도메인 당 20개의 쿠키를 가질 수 있다
- 하나의 쿠키는 4KB(=4096byte)까지 저장 가능하다.

### 쿠키의 동작 순서

1. 사용자가 페이지를 요청한다. (사용자가 웹사이트 접근)
2. 서버는 쿠키를 생성한다.
3. 생성한 쿠키에 정보를 담아 HTTP 화면을 돌려줄 때, 같이 사용자에게 돌려준다.
4. 브라우저가 종료되어도 쿠키 만료 기간이 있다면 사용자가 보관하고 있다(로컬 PC에 저장)
5. 같은 요청을 할 경우 HTTP 헤더에 쿠키를 함께 보낸다.
6. 서버에서 쿠키를 읽어 이전 상태 정보를 변경 할 필요가 있을 때 쿠키를 업데이트 하여 변경된 쿠키를 HTTP 헤더에 포함시켜 응답한다.

### 사용 예시

1. 방문했던 사이트에 다시 방문 하였을 때 아이디와 비밀번호 자동 입력.
2. 팝업창을 통해 "오늘 이 창을 다시 보지 않기" 체크.
3. 그 외 쇼핑몰의 장바구니, 오늘 봤던 제품 등.

<br>
<hr>
<br>

## 세션(Session )

일정 시간동안 같은 사용자(브라우저) 정보를 서버 측에 저장한다.<br>
사용자가 Request를 보내면, 해당 서버의 엔진이 사용자에게 유일한 ID를 부여하는 데 이것이 세션ID다.<br>
세션 ID는 서버에서는 사용자를 구분하고 브라우저를 종료할 때까지 인증상태를 유지한다.<br>
일정 시간 응답이 없다면 정보가 유지되지 않게 설정이 가능 하다.<br>
사용자에 대한 정보를 서버에 두기 때문에 쿠키보다 보안에 좋지만, 사용자가 많아질수록 서버 메모리를 많이 차지하게 된다.<br>
> 동접자 수가 많은 웹 사이트인 경우 서버에 과부하를 주게 되므로 성능 저하의 요인이 될 수 있다.

### 세션 특징

- 웹 서버의 저장되는 쿠키(=세션 쿠키)
- 브라우저를 닫거나, 서버에서 세션을 삭제했을때만 삭제가 되므로, 쿠키보다 비교적 보안이 좋다.
- 각 사용자마다 고유 세션 ID를 부여하고, 해당 ID로 사용자를 구분하여 각 사용자 요구에 맞는 서비스 제공한다.
- 사용자가 많아질수록 서버 메모리를 많이 차지하게 됨

### 세션의 동작 순서

1. 사용자가 서버에 접속 시 세션 ID를 발급받는다. (사용자가 웹사이트 접근)
2. 사용자는 세션 ID에 대해 쿠키를 사용해서 저장하고 가지고 있습니다.
3. 서버는 접근한 사용자의 Request-Header 필드인 Cookie를 확인하여, 세션 ID를 보냈는지 확인한다.
4. 전달 받은 세션 ID로 별다른 작업없이 저장되어 있는 사용자의 정보를 가져온다.
5. 저장되어있는 사용자의 정보나 세션 ID가 없다면, 사용자가 서버에 요청할 때 생성되는 쿠키를 사용해 세션 ID를 서버에 저장한다.

### 사용 예시

1. [로그인] 사이트를 벗어나거나, 로그아웃하기 전까지 로그인 상태 유지.

<br>
<hr>
<br>

## 쿠키와 세션 차이

<br>

<table style="width:90%;border-top:1px solid #000">
  <caption style="opacity:0">쿠키와 세션 차이</caption>
  <thead>
    <tr>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem;">&nbsp;</td>
      <th style="border-bottom:1px solid #ddd;line-height:2.5rem;" scope="col">쿠키(Cookie)</th>
      <th style="border-bottom:1px solid #ddd;line-height:2.5rem;" scope="col">세션(Session)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style="border-bottom:1px solid #ddd;line-height:2.5rem" scope="row">저장 위치</th>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">사용자(=접속자 PC)</td>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">웹 서버</td>
    </tr>
    <tr>
      <th style="border-bottom:1px solid #ddd;line-height:2.5rem" scope="row">저장 형식</th>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">text</td>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">Object</td>
    </tr>
    <tr>
      <th style="border-bottom:1px solid #ddd;line-height:2.5rem" scope="row">만료 시점</th>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">쿠키 저장시 설정<br>(만료시점이 지나야 삭제됨)</td>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">브라우저 종료시 삭제<br>(기간 지정 가능)</td>
    </tr>
    <tr>
      <th style="border-bottom:1px solid #ddd;line-height:2.5rem" scope="row">사용하는 자원(리소스)</th>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">사용자 리소스</td>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">웹 서버 리소스</td>
    </tr>
    <tr>
      <th style="border-bottom:1px solid #ddd;line-height:2.5rem" scope="row">용량 제한</th>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">
        총 300개<br>
        하나의 도메인 당 20개<br>
        하나의 쿠키 당 4KB(=4096byte)
      </td>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem">서버가 허용하는 한 용량제한 없음.</td>
    </tr>
    <tr>
      <th style="border-bottom:1px solid #ddd;line-height:2.5rem" scope="row">속도</th>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem;color:blue">세션보다 빠름</td>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem;color:red">쿠키보다 느림</td>
    </tr>
    <tr>
      <th style="border-bottom:1px solid #ddd;line-height:2.5rem" scope="row">보안</th>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem;color:red">세션보다 안좋음</td>
      <td style="border-bottom:1px solid #ddd;line-height:2.5rem;color:blue">쿠키보다 좋음</td>
    </tr>
  </tbody>
</table>

- <b>사용자의 정보가 저장되는 위치 : </b><br>
  쿠키는 서버의 자원을 전혀 사용하지 않으며, 세션은 서버의 자원을 사용한다.

- <b>보안 측면 : </b><br>
  세션이 더 우수하며, 요청 속도는 쿠키가 세션보다 더 빠르다. 그 이유는 세션은 서버의 처리가 필요하기 때문이다.

- <b>생명주기 : </b><br>
  쿠키도 만료시간이 있지만 파일로 저장되기 때문에 브라우저를 종료해도 계속해서 정보가 남아 있을 수 있다. <br>
  세션도 만료시간을 정할 수 있지만 브라우저가 종료되면 만료시간에 상관없이 삭제된다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://hahahoho5915.tistory.com/32">https://hahahoho5915.tistory.com/32</a>
- <a href="https://interconnection.tistory.com/74">https://interconnection.tistory.com/74</a>
