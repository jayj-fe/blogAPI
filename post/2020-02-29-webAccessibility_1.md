---
title: 웹 접근성이란
author: Jay.J
date: 2020-02-29 17:44:39 +0900
categories: [html]
tags: [html, Web Accessibility]
math: true
mermaid: true
# image:
#   src: https://cdn.jsdelivr.net/gh/cotes2020/chirpy-images/commons/devices-mockup.png
#   width: 850
#   height: 585
---
<!-- <img src="/assets/img/vue/webkitflow.png" alt=""> -->

이전 회사에서 웹 접근성에 대해 공부를 했었다.<br>
공부했던 내용을 정리해두면 좋겠다는 생각이 있었는데,<br>
미루고 미루다가 이제 정리를 한다.

## 웹 접근성(Web Accessibility)이란

웹 접근성이란 어떠한 사용자가 접근을 하더라도, 동일한 정보를 제공할 수 있도록 보장하는 것이다.<br>
즉, 장애인, 고령자등 모든 사람이 비장애인과 차별되지 않은 정보를 얻을 수 있어야한다.<br>
간단한 예로 이미지가 제공된다고 했을 때, 시각적으로 불편한 사람은 이미지의 정보를 얻을 수 없다.<br>
그렇기에 이미지에 대한 대체 텍스트가 제공되어 텍스트로 정보를 전달할 수 있어야한다.
> 시각장애인의 경우, 사이트를 읽어주는 스크린리더라는 프로그램으로 정보에 접근한다.<br>
> 스크린리더는 이미지를 읽어주지 못하기 때문에 이미지 태그의 alt 속성을 이용하여 대체 텍스트를 제공해야한다.

<br>

## 4가지 원칙

- <b>인식의 용이성</b> : 모든 콘텐츠는 사용자가 인식할 수 있어야 한다.
- <b>운용의 용이성</b> : 사용자 인터페이스 구성요소는 조작 가능하고 내비게이션 할 수 있어야 한다.
- <b>이해의 용이성</b> : 콘텐츠는 이해할 수 있어야 한다.
- <b>견고성</b> : 웹 콘텐츠는 미래의 기술로도 접근할 수 있도록 견고하게 만들어야 한다.

<br>

## 검사 항목

4가지의 원칙을 준수하여 24개의 검사항목을 가진다.<br>

<table>
    <tbody>
        <tr><td>1</td><td>1.1.1</td><td>(적절한 대체 텍스트 제공) 텍스트 아닌 콘텐츠는 그 의미나 용도를 이해할 수 있도록 대체 텍스트를 제공해야 한다.</td></tr>
        <tr><td>2</td><td>1.2.1</td><td>(자막 제공) 멀티미디어 콘텐츠에는 자막, 원고 또는 수화를 제공해야 한다.</td></tr>
        <tr><td>3</td><td>1.3.1</td><td>(색에 무관한 콘텐츠 인식) 콘텐츠는 색에 관계없이 인식될 수 있어야 한다.</td></tr>
        <tr><td>4</td><td>1.3.2</td><td>(명확한 지시사항 제공) 지시사항은 모양, 크기, 위치, 방향, 색, 소리 등에 관계없이 인식될 수 있어야 한다.</td></tr>
        <tr><td>5</td><td>1.3.3</td><td>(텍스트 콘텐츠의 명도 대비) 텍스트 콘텐츠와 배경 간의 명도 대비는 4.5대 1 이상이어야 한다.</td></tr>
        <tr><td>6</td><td>1.3.4</td><td>(자동 재생 금지) 자동으로 소리가 재생되지 않아야 한다.</td></tr>
        <tr><td>7</td><td>1.3.5</td><td>(콘텐츠 간의 구분) 이웃한 콘텐츠는 구별될 수 있어야 한다.</td></tr>
        <tr><td rowspan="2">8</td><td>2.1.1</td><td>(키보드 사용 보장) 모든 기능은 키보드만으로도 사용할 수 있어야 한다. (PC웹)</td></tr>
        <tr><td>2.1.1</td><td>(누르기 동작 지원) 터치(touch) 기반 모바일 기기의 모든 컨트롤은 누르기 동작으로 제어할 수 있어야 한다. (모바일웹)</td></tr>
        <tr><td>9</td><td>2.1.2</td><td>(초점 이동) 키보드에 의한 초점은 논리적으로 이동해야 하며 시각적으로 구별할 수 있어야 한다.</td></tr>
        <tr><td>10</td><td>2.1.3</td><td>(조작 가능) 사용자 입력 및 컨트롤은 조작 가능하도록 제공되어야 한다.</td></tr>
        <tr><td>11</td><td>2.2.1</td><td>(응답시간 조절) 시간제한이 있는 콘텐츠는 응답시간을 조절할 수 있어야 한다.</td></tr>
        <tr><td>12</td><td>2.2.2</td><td>(정지 기능 제공) 자동으로 변경되는 콘텐츠는 움직임을 제어할 수 있어야 한다.</td></tr>
        <tr><td>13</td><td>2.3.1</td><td>(깜빡임과 번쩍임 사용 제한) 초당 3~50회 주기로 깜빡이거나 번쩍이는 콘텐츠를 제공하지 않아야 한다.</td></tr>
        <tr><td>14</td><td>2.4.1</td><td>(반복 영역 건너뛰기) 콘텐츠의 반복되는 영역은 건너뛸 수 있어야 한다.</td></tr>
        <tr><td>15</td><td>2.4.2</td><td>(제목 제공) 페이지, 프레임, 콘텐츠 블록에는 적절한 제목을 제공해야 한다.</td></tr>
        <tr><td>16</td><td>2.4.3</td><td>(적절한 링크 텍스트) 링크 텍스트는 용도나 목적을 이해할 수 있도록 제공해야 한다.</td></tr>
        <tr><td>17</td><td>3.1.1</td><td>(기본 언어 표시) 주로 사용하는 언어를 명시해야 한다.</td></tr>
        <tr><td>18</td><td>3.2.1</td><td>(사용자 요구에 따른 실행) 사용자가 의도하지 않은 기능 (새 창, 초점 변화 등)은 실행되지 않아야 한다.</td></tr>
        <tr><td>19</td><td>3.3.1</td><td>(콘텐츠의 선형화) 콘텐츠는 논리적인 순서로 제공해야 한다.</td></tr>
        <tr><td>20</td><td>3.3.2</td><td>(표의 구성) 표는 이해하기 쉽게 구성해야 한다.</td></tr>
        <tr><td>21</td><td>3.4.1</td><td>(레이블 제공) 사용자 입력에는 대응하는 레이블을 제공해야 한다.</td></tr>
        <tr><td>22</td><td>3.4.2</td><td>(오류 정정) 입력 오류를 정정할 수 있는 방법을 제공해야 한다.</td></tr>
        <tr><td>23</td><td>4.1.1</td><td>(마크업 오류 방지) 마크업 언어의 요소는 열고 닫음, 중첩 관계 및 속성 선언에 오류가 없어야 한다.</td></tr>
        <tr><td>24</td><td>4.2.1</td><td>(웹 애플리케이션 접근성 준수) 콘텐츠에 포함된 웹 애플리케이션은 접근성이 있어야 한다.</td></tr>
    </tbody>
</table>

검사항목들에 대해 어떻게 지켜야 하는지 자세한 내용은 각 원칙별로 나눠서 정리했다.

- [인식의 용이성 보러가기](/posts/webAccessibility_2/)
- [운용의 용이성 보러가기](/posts/webAccessibility_3/)
- [이해의 용이성 보러가기](/posts/webAccessibility_4/)
- [견고성 보러가기](/posts/webAccessibility_5/)

<br>

## 웹 접근성 진단도구


- [W3C Validation](https://jigsaw.w3.org/css-validator/)
> 웹 표준 마크업과 CSS 문법에 대한 오류를 검사해 볼 수 있는 사이트.

- [Color Picker](https://www.tpgi.com/color-contrast-checker/)
> 명조대비를 확인할 수 있는 프로그램.

- [Web Developer](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm/related?hl=ko)
> 다양한 검사를 할 수 있는 브라우저 확장 프로그램.

- [스크린 리더(NVDA)](https://www.nvaccess.org/)
> 브라우저의 정보를 음성으로 알려주는 프로그램.

- 웹 접근성 자동 진단 [PC](https://wave.webaim.org/) [MOBILE](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor)
> 웹 접근성 전문가가 없어도 웹 접근성에 대해서 진단하고 개선할 수 있는 사이트 및 프로그램.

<br>
<br>

## 참고 했던 자료 및 블로그
 - <a href="http://www.wa.or.kr/m1/sub1.asp" target="_blank">http://www.wa.or.kr/m1/sub1.asp</a>
 - <a href="http://www.websoul.co.kr/accessibility/WA_guide21.asp" target="_blank">http://www.websoul.co.kr/accessibility/WA_guide21.asp</a>
 - <a href="https://nuli.navercorp.com/education/tools" target="_blank">https://nuli.navercorp.com/education/tools</a>
