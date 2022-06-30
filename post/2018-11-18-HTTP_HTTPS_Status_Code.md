---
title: HTTP 와 HTTPS, Status Code
author: Jay.J
date: 2018-11-18 12:33:39 +0900
categories: [html]
tags: [html]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---

## HTTP 와 HTTPS 란  
  
인터넷을 사용하다보면 HTTP와 HTTPS로 시작되는 주소를 볼 수 있다.    
어떤 차이가 있어서 HTTP와 HTTPS를 나눠서 쓰는지 알아보려고 한다.  

<br>

### HTTP
HTTP는 <b>Hyper Text Transfer Protocol</b>의 약자로  
World Wide Web에서 사용되는 기본 프로토콜이며 이 프로토콜은 메시지가 형식화되고  
전송되는 방법과 다양한 명령에 대한 응답으로 <b>웹 서버와 브라우저가 수행해야하는 작업을 정의</b>한다.  
<br>
  
### HTTPS
HTTPS는 <b>Hyper Text Transfer Protocol over Secure sockets layter</b>의 약자이다.  
기존의 HTTP는 보안장치 없이 그대로 정보를 전송하기에 보안에 취약하다.  
그 보안에 취약한 문제를 해결하고자 HTTP에 secure sockets layer라는 SSL이 합쳐져 나온 것이다.  
즉, HTTPS는 SSL을 이용하여 <b>웹 서버와 브라우저가 암호화된 정보를 주고 받는 작업을 수행</b>한다.  
<br>
  
### HTTP와 HTTPS의 정리
HTTP는 기본 프로토콜로서 웹 서버와 브라우저가 정보 또는 자원을 주고 받는 작업을 수행한다.  
HTTP는 보안장치 없이 그대로 정보를 전송하기에 보안에 취약하다.  
<br>
HTTPS는 HTTP에 SSL이 합쳐진 것으로 보안성이 좀 더 높다.  
하지만 정보를 암호화함에 있어서 HTTP보다 속도면에서 느려진다.

<br>
  
## Status Code
<b>HTTP 응답 상태 코드로 HTTP의 요청에 응답하는 코드</b>이다.  
5가지의 그룹이 있으며 아래와 같이 나누어 진다.  
- 100번 때 : 정보 응답
- 200번 때 : 성공 응답
- 300번 때 : 리다이렉션 메시지
- 400번 때 : 클라이언트 에러 응답
- 500번 때 : 서버 에러 응답

<br>
## 참고 했던 자료 및 블로그  
 - <a href="https://ko.wikipedia.org/wiki/HTTP" target="_blank">https://ko.wikipedia.org/wiki/HTTP</a>
 - <a href="http://jeong-pro.tistory.com/89" target="_blank">http://jeong-pro.tistory.com/89</a>
 - <a href="http://annajinee.tistory.com/22" target="_blank">http://annajinee.tistory.com/22</a>
 - <a href=" https://developer.mozilla.org/ko/docs/Web/HTTP/Status" target="_blank"> https://developer.mozilla.org/ko/docs/Web/HTTP/Status</a>