---
title: RESTful API 이란
author: Jay.J
date: 2021-05-15 18:44:39 +0900
categories: [HTTP]
tags: [HTTP]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---
<!-- <img src="/assets/img/vue/webkitflow.png" alt=""> -->

## RESTful API란?

REST를 기반 API를 의미합니다.<br>
REST은 무엇인지, REST API는 무엇인지, RESTful API는 무엇인지 알아보려고합니다.

<br>
<hr>
<br>

## 1. RESTful API에서 REST 란?

REST는 <span style="color:blue">Representational State Transfer</span>의 약자로써 풀어서 설명하자면<br>
<span style="color:red">자원을 이름으로 구분해 해당 자원의 상태를 주고 받는 것</span>을 말한다.<br>
<br>
<b>웹에 존재하는 자원(이미지, 동영상, DB)에 대한 CRUD 요청을,<br>
고유한 URI(Resource와 Method)로 표현하여 특정한 형태로 전달하는 방법이다.</b>
> <b> CRUD : Create, Read, Update, Delete </b> <Br>
> - Create : 데이터 생성(POST)<br>
> - Read : 데이터 조회(GET)<br>
> - Update : 데이터 수정(PUT)<br>
> - Delete : 데이터 삭제(DELETE)
<br>
<Br>

### REST의 구성요소

1. <b>자원(Resource) : HTTP URI</b><br>
  서버는 Unique한 ID를 가지는 Resource를 가지고 있으며, 클라이언트는 이러한 Resource에 요청을 보낸다.

2. <b>자원에 대한 행위(Verb) : HTTP Method</b><br>
서버에 요청을 보내기 위한 방식으로 GET, POST, PUT, PATCH, DELETE가 있다.<br>
CRUD 연산 중에서 처리를 위한 연산에 맞는 Method를 사용하여 서버에 요청을 보내야 한다.

3. <b>자원에 대한 행위의 내용 (Representations) : HTTP Message Pay Load</b><br>
클라이언트와 서버가 데이터를 주고받는 형태로 json, xml, text, rss 등이 있다.

<Br>

### REST 특징

1. <b>Server-Client Architecture(서버-클라이언트 구조)</b><br>
  자원을 가지고 있는 쪽이 서버, 자원을 요청하는 쪽이 클라이언트에 해당한다.<br>
  서버는 API를 제공하며, 클라이언트는 사용자 인증, Context(세션, 로그인 정보) 등을 직접 관리하는 등 역할을 확실히 구분시킴으로써 서로 간의 의존성을 줄인다.

2. <b>Stateless(무상태)</b><br>
세션정보나 쿠키정보를 활용하여 작업을 위한 상태정보를 저장 및 관리하지 않는다.<br>
서비스의 자유도가 높으며, 서버에서 불필요한 정보를 관리하지 않으므로 구현이 단순하다.<br>
서버의 처리방식에 일관성을 부여하고, 서버의 부담을 줄이기 위함이다.

3. <b>Cacheable(캐시 처리 가능)</b><br>
  HTTP 프로토콜 표준에서 사용하는 Last-Modified Tag 또는 E-Tag를 이용하여 캐싱을 구현할 수 있고, 이것은 대량의 요청을 효율적으로 처리할 수 있게 도와준다.

4. <b>Layered System(계층화)</b><br>
다중 계층으로 구성될 수 있으며 보안, 로드 밸런싱, 암호화 등을 위한 계층을 추가하여 구조를 변경할 수 있다.<br>
또한 Proxy, Gateway와 같은 네트워크 기반의 중간매체를 사용할 수 있게 해준다.

5. <b>Uniform Interface(인터페이스 일관성)</b><br>
Resource(URI)에 대한 요청을 통일되고, 한정적으로 수행하는 아키텍처 스타일을 의미한다.<br>
이것은 요청을 하는 클라이언트의 플랫폼(Android, Ios, Jsp 등) 에 무관하며, 특정 언어나 기술에 종속받지 않는 특징을 의미한다.<br>

<Br>

### REST 장/단점

<br>

<table style="width:100%;border-top:1px solid #000">
  <caption style="opacity:0;font-size:0;margin:0;width:0;height:0.5rem;padding:0;">REST 장/단점</caption>
  <colgroup>
    <col style="width:50%">
    <col style="width:50%">
  </colgroup>
  <thead>
    <tr>
      <th style="text-align:center;border-bottom:1px solid #ddd;line-height:2.5rem;border-right:1px solid #ddd;color:blue" scope="col">장점</th>
      <th style="text-align:center;border-bottom:1px solid #ddd;line-height:2.5rem;color:red" scope="col">단점</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border-bottom:1px solid #ddd;line-height:1.3rem;font-size:0.9rem;vertical-align:top;padding:1rem;border-right:1px solid #ddd">
        <ul style="padding-left:1rem">
          <li style="margin-bottom:5px;">HTTP 프로토콜의 인프라를 그대로 사용하므로 REST API 사용을 위한 별도의 인프라를 구출할 필요가 없다.</li>
          <li style="margin-bottom:5px;">HTTP 프로토콜의 표준을 최대한 활용하여 여러 추가적인 장점을 함께 가져갈 수 있게 해 준다.</li>
          <li style="margin-bottom:5px;">HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.</li>
          <li style="margin-bottom:5px;">Hypermedia API의 기본을 충실히 지키면서 범용성을 보장한다.</li>
          <li style="margin-bottom:5px;">REST API 메시지가 의도하는 바를 명확하게 나타내므로 의도하는 바를 쉽게 파악할 수 있다.</li>
          <li style="margin-bottom:5px;">여러 가지 서비스 디자인에서 생길 수 있는 문제를 최소화한다.</li>
          <li style="margin-bottom:5px;">서버와 클라이언트의 역할을 명확하게 분리한다.</li>
        </ul>
      </td>
      <td style="border-bottom:1px solid #ddd;line-height:1.3rem;font-size:0.9rem;vertical-align:top;padding:1rem">
        <ul style="padding-left:1rem">
          <li style="margin-bottom:5px;">사용할 수 있는 메소드가 4가지밖에 없다.</li>
          <li style="margin-bottom:5px;">HTTP Method 형태가 제한적이다.</li>
          <li style="margin-bottom:5px;">브라우저를 통해 테스트할 일이 많은 서비스라면 쉽게 고칠 수 있는 URL보다 Header 정보의 값을 처리해야 하므로 전문성이 요구된다.</li>
          <li style="margin-bottom:5px;">구형 브라우저에서 호환이 되지 않아 지원해주지 못하는 동작이 많다.(익스폴로어)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<p style="font-size:0.7rem;text-align:right;color:#ddd;"><a href="https://khj93.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-REST-API%EB%9E%80-REST-RESTful%EC%9D%B4%EB%9E%80">하진쓰의 기술 블로그</a></p>

<Br>

### REST 개발 원칙

1. URI는 동사보다는 명사를, 대문자보다는 소문자를 사용하여야 한다.
2. 마지막에 슬래시 (/)를 포함하지 않는다.
3. 언더바 대신 하이폰을 사용한다.
4. 파일확장자(예를들어 .json , .JPGE, .html, php)는 URI에 포함하지 않는다.
5. 행위를 포함하지 않는다.
6. 소스에 대한 행위는 HTTP Method(POST, GET, PUT, DELETE)로 표현해야 합니다.

<br>
<hr>
<br>

## 2. RESTful API에서 API 란?

<b>API(Application Programing Interface)</b><br>
API는 응용 프로그램에서 사용할 수 있도록, 운영 체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스를 뜻한다.<br>
<br>
RESTful API는 REST 설계 가이드를 따라 API를 만드는 것이다.

<br>
<hr>
<br>

## 3. RESTful API에서 RESTful 이란?

'REST API'를 제공하는 웹 서비스를 'RESTful' 하다고 할 수 있다.<br>
REST의 원리를 모두 따르는 시스템을 의미하며, 설계 규칙을 올바르게 지킨 시스템을 말한다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://mangkyu.tistory.com/46">https://mangkyu.tistory.com/46</a>
- <a href="https://blog.metafor.kr/165">https://blog.metafor.kr/165</a>
- <a href="https://velog.io/@taeha7b/api-restapi-restfulapi">https://velog.io/@taeha7b/api-restapi-restfulapi</a>
- <a href="https://khj93.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-REST-API%EB%9E%80-REST-RESTful%EC%9D%B4%EB%9E%80">https://khj93.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-REST-API%EB%9E%80-REST-RESTful%EC%9D%B4%EB%9E%80</a>
