---
title: GET과 POST 방식
author: Jay.J
date: 2020-09-28 17:44:39 +0900
categories: [html]
tags: [html]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---

웹 브라우저로 어떤 사이트에 접속한다고 했을 때, 사용자는 URL을 입력하여 접근한다.<br>
HTTP 프로토콜을 통하여 사용자는 요청을 보내고 서버는 그 요청에 맞게 응답한다.<br>
그리고 그 요청의 방식에는 크게 2가지 방식이 있고 그것이 바로 GET방식과 POST방식이다

<br>

## GET

GET 방식은 서버로부터 어떠한 정보를 조회하기 위해서 사용되는 방식이다.<br>
GET은 서버에게 요청할 때 URL에 요청을 담아 보낸다. <br>
URL의 끝에 ? 를 통하여 요청을 하는데 요청의 파라미터가 여러 개일 경우 &을 이용하여 요청한다.<br>

```
www.test.com/test?id=value&id2=value2&id3=value3
```

요청의 파라미터는 키와 값의 형식으로 보낸다.<br>
위에 적은 url에서 키는 id이며, 값은 value으로 이루어진 문자열이다.<br>
<br>
이러한 방식의 요청은 URL에 변수를 보내줘야 하고, 어떤 정보를 요청하는지 다 보이기 때문에 보안에 취약할 수 밖에 없다.<br>
URL의 정보로 요청하기 때문에 요청 파라미터가 있다면 북마크(즐겨찾기)가 가능하다.

## POST
POST 방식은 데이터를 서버로 사용자의 요청을 제출하여 추가, 수정을 하기 위해 사용하는 방식이다.<br>
POST는 GET방식과 다르게 URL에 데이터를 붙여서 전송하지 않는다.<br>
URL로 보내지 않기 때문에 요청하는 데이터가 꼭 문자일 필요가 없다.<br>
<br>
전송해야될 데이터를 HTTP 메세지의 Body에 담아서 전송한다.
BODY에 데이터를 담아서 전송하기 때문에 Body의 데이터에 대한 데이터 타입을 요청 헤더에 표시해야된다.
<br>
데이터를 Body에 포함시켜 보내기 때문에 길이 제한이 없고, 데이터가 노출되지 않기 때문에 GET방식보다 보안이 안전하다고 볼 수 있다.<br>
또한 URL로 보내는 것이 아니기 때문에 문자열이 아닌 객체들의 값도 전송이 가능하다.

<br>

## 정리✨

### GET
- URL의 정보로 요청하기 때문에 요청 파라미터가 있다면 북마크(즐겨찾기)가 가능하다.
- 보안에 취약하다.
- URL로 보내기에 문자열만 가능하다.
- 키와 값이 필요하다.
- ? 로 통해 요청하며, 요청하는 파라미터가 많을 경우 &를 이용하여 요청한다.

### POST
- HTTP의 body로 보내기 때문에 데이터 타입을 헤더에 표시해야된다.
- URL에 데이터가 노출되지않아 어느정도 보안이 된다.
- 길이의 제한이 없기에 대용량 데이터를 전송할 수 있습니다.
- 문자열, 객체등으로 요청할 수 있다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://mangkyu.tistory.com/17">https://mangkyu.tistory.com/17</a>
- <a href="https://hongsii.github.io/2017/08/02/what-is-the-difference-get-and-post/">https://hongsii.github.io/2017/08/02/what-is-the-difference-get-and-post/</a>

