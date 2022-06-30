---
title: Vue Lifecycle 이해하기
author: Jay.J
date: 2021-04-28 18:44:39 +0900
categories: [VueJs]
tags: [javascript, vue.js, VueLifecycle]
math: true
mermaid: true
image: /blogAPI/assets/img/vuejs.png
---

## Vue Lifecycle 이해하기

모든 Vue 앱은 Vue 함수로 새 Vue 인스턴스를 만드는 것부터 시작한다.

```js
var vm = new Vue({
  // 옵션
})
```

Vue 인스턴스는 생성될 때, 일련의 초기화 단계를 거친다.<br>
예를들어 아래와 같은 경우가 있다.

- 데이터 관찰 설정이 필요한 경우
- 템플릿을 컴파일 하는 경우
- 인스턴스를 DOM에 마운트하는 경우
- 데이터가 변경되어 DOM을 업데이트 하는 경우

<br>

## 이미지로 보는 라이프 사이클

<img src="/assets/img/vue/vue_lifecycle.png" alt="">

<br>

## 1. Create 단계
라이프 사이클 훅에서 제일 처음 실행되는 Create 단계이다.<br>
DOM이 생성되기 이전에 실행되는 훅으로써 DOM에 접근하거나 this.$el 을 사용하지 못한다.<br>
<br>
이 단계는 <b style="color:#1976D2">beforeCreate 훅</b>과 <b style="color:#1976D2">created 훅</b>이 있다.

### 1-1. beforeCreate
create 단계에서도 먼저 실행되는 훅으로써 데이터와 이벤트, 감시자가 생성 되기 전에 호출된다.<br>
따라서 이 훅에서는 data와 이벤트, 감시자등을 사용할 수 없다.

```js

new Vue({
  render: h => h(App),
  data() {
    return {
      title: 'Vue.JS'
    };
  },
  beforeCreate () {
    console.log('제일 처음 실행되는 훅이다.')
    console.log(this.title)
    // data를 생성하기전에 호출됨으로 값은 undefined이다.
  }
}).$mount('#app')

```
> data와 이벤트등을 사용할 수 없다

### 1-2. created
data, computed, methods, watch 등과 같은 옵션 설정이 완료된 시점으로 data와 이벤트, 감시자는 사용할 수 있다.

```js

new Vue({
  render: h => h(App),
  data() {
    return {
      title: 'Vue.JS'
    };
  },
  created () {
    console.log('두번째 실행되는 훅이다.')
    console.log(this.title)
    // beforeCreate와 다르게 data를 생성이 후 호출하기 때문에 Vue.js의 값을 출력한다.
  }
}).$mount('#app')

```

<br>

## 2. Mount 단계
렌더링 직전에 컴포넌트에 직접 접근할 수 있는 단계이다.<br>
초기 데이터를 설정할 때에는 created 훅을 사용하기를 권장한다.<br>
그 이유로는 서버사이드렌더링을 지원하지 않기 때문이라고 한다.<br>
<br>
이 단계는 <b style="color:#1976D2">beforeMount 훅</b>과 <b style="color:#1976D2">mounted 훅</b>이 있다.

### 2-1. beforeMount
템플릿과 렌더 함수들이 컴파일된 후에 첫 렌더링이 일어나기 직전에 실행된다.<br>
렌더링이 되지 않았기 때문에 this.$el에 접근할 수 없다.

```js
new Vue({
  render: h => h(App),
  beforeMount() {
    console.log(this.$el)
  }
}).$mount('#app')
// 아무것도 렌더링 되지않은 DOM만 출력된다.
```

### 2-2. mounted
컴포넌트, 템플릿, 렌더링된 돔에 접근할 수 있다.<br>

```js
new Vue({
  render: h => h(App),
  mounted() {
    console.log(this.$el)
  }
}).$mount('#app')
// 렌더링 된 DOM이 출력된다.
```
> 모든 컴포넌트가 마운트된 상태를 보장하지는 않는다.

<br>

## 3. Update 단계
컴포넌트에서 사용되는 데이터들이 변경되면 재 렌더링이 발생되면 실행된다.<br>
디버깅을 위하여 재 렌더링 시점을 알고 싶을 때 사용할 수 있다.<br>
<br>
이 단계는 <b style="color:#1976D2">beforeUpdate 훅</b>과 <b style="color:#1976D2">updated 훅</b>이 있다.

### 3-1. beforeUpdate

컴포넌트에서 사용되는 데이터들이 변경되고 Update 단계가 시작될 때 실행된다.<br>
즉, 데이터 변경이 일어나는 시점과 랜더링을 하기 전에 실행된다.<br>
재 랜더링이 되기 전이기 때문에 재 랜더링되는 DOM에는 접근할 수 없다.<br>

### 3-2. updated

컴포넌트에서 사용되는 데이터들이 변경되고 Update 단계가 시작되고, DOM에 렌더링이 된 후 실행된다.<br>
DOM이 재 랜더링이 된 후, DOM 접근이 가능한 훅이다.

```js
// main.js 파일
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const app = new Vue({
  render: h => h(App)
})

app.$mount('#app');

// console.log(app);
// console.log(app.$children[0]);

setTimeout(function() {
  app.$children[0].testData = '데이터변경';
}, 3000);
```

```js
// App.vue 파일

<template>
  <div id="app">
    {{ testData }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      testData : '데이터없음'
    }
  },
  mounted() {
    console.log('mounted');
    console.log(this.$el)
  },
  beforeUpdate() {
    console.log('beforeUpdate');
    console.log(this.$el)
  },
  updated() {
    console.log('updated');
    console.log(this.$el)
    this.$nextTick(function () {
      // 모든 화면이 렌더링된 후 실행한다.
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
> <b>What is nextTick function</b> ❓<br>
> App.vue 파일의 28번째 라인을 보면 nextTick이라는 함수가 보인다.<br>
> data 가 업데이트 되고 난 직후, 비동기로 호출될 경우에 Vue가 DOM을 찾지 못하는 경우가 발생한다.<br>
> 이 함수는 모든 호출이 완료된 후에 실행시켜줄 수 있는 함수이다. 위와 같은 상황을 방지해준다.

<br>
위 코딩의 결과 값<br>
<img src="/assets/img/vue/vue_lifecycle02.png" alt="" style="width:500px;border-radius: 5px;left: 0;transform: none;">

<br>

## 4. Destroy 단계
인스턴스를 해체할 때 호출한다.
<br>
이 단계는 <b style="color:#1976D2">beforeDestroy 훅</b>과 <b style="color:#1976D2">destroyed 훅</b>이 있다.

### 4-1. beforeDestroy

Vue 인스턴스 제거되기 직전에 호출된다.<br>
제거되기 직전임으로 컴포넌트는 원래 모습과 모든 기능들을 그대로 가지고 있다.

### 4-2. destroyed

Vue 인스턴스 제거된 후에 호출된다.<br>
Vue 인스턴스의 component에 걸려 있는 모든 이벤트가 해제된다.<br>
모든 하위 Vue 인스턴스도 삭제된다.

<br>
<br>

## 참고 했던 자료 및 블로그
- <a href="https://kr.vuejs.org/v2/guide/instance.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%ED%9B%85">https://kr.vuejs.org/v2/guide/instance.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%ED%9B%85</a>
- <a href="https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4">https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4</a>
- <a href="https://blog.martinwork.co.kr/vuejs/2018/02/05/vue-lifecycle-hooks.html">https://blog.martinwork.co.kr/vuejs/2018/02/05/vue-lifecycle-hooks.html</a>
- <a href="https://beomy.tistory.com/47">https://beomy.tistory.com/47</a>
