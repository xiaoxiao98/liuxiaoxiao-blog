# vue的一些乱七八糟
## 单页面应用   SPA（single page application)

单页面应用的几个框架：AngularJS、React、Vue.js
#### 优点：
（一）用户体验好、快，内容改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；

（二）一定程度上减少了后端服务器的压力（不用管页面逻辑和渲染）；

（三）前后端职责分离，前端进行交互逻辑，后端负责数据处理。
#### 缺点：
（一）初次加载耗时多：需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；

（二）前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；

（三）SEO难度较大：所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。
## SEO搜索引擎优化 和 SSR服务端渲染
为什么SPA不利于SEO，如果应用程序初始展示 loading，然后通过 Ajax 获取内容，抓取工具并不会等待异步完成后再行抓取页面内容。

那如何才能正常使用SPA而又不影响SEO呢？： **SSR服务端渲染**

**SSR的意思就是vue在客户端将标签渲染成的整个html片段的工作在服务端完成，服务端形成的html片段直接返回给客户端这个过程就叫做服务端渲染。**
（这也是第一次访问SPA网站在同等带宽及网络延迟下比传统的在后端生成HTML发送到浏览器要更慢的主要原因）
#### SSR的优点
更快的响应时间，不用等待所有的JS都下载完成，浏览器便能显示比较完整的页面了。可以将SEO的关键信息直接在后台就渲染成HTML，而保证搜索引擎的爬虫都能爬取到关键数据。

#### SSR的缺点
本来服务器是用来提供静态文件的，SSR中使用的渲染程序自然会占用更多的CPU和内存资源。

一些常用的浏览器API可能无法正常使用，比如window、docment和alert等，如果使用的话需要对运行的环境加以判断。

开发调试会有一些麻烦，因为涉及了浏览器及服务器，对于SPA的一些组件的生命周期的管理会变得复杂。可能会由于某些因素导致服务器端渲染的结果与浏览器端的结果不一致。

## v-show 与 v-if 有什么区别？
v-if 是真正的条件渲染，在切换过程中条件块内的事件和子组件被销毁和重建；如果在初始渲染时条件为假，直到条件第一次变为真时，才会开始渲染条件块。
v-show相当于CSS 的 “display” 
v-if不适应于频繁切换的场景；v-show适于频繁切换

## Vue给对象新增属性 使用Vue.$set()
当vue的data里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，向对象中添加新的属性，如果更新此属性的值，控制台可以打印出新值，但是不会更新视图的。
this.$set(person, 'name', 'liuxiaoxiao')
this.$delete(person, 'name')

## Vue的单项数据流
父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
子组件想修改时，通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

## vue的生命周期
```beforeCreate```  组件实例被创建之初，组件的属性生效之前 

```created ``` 实例已创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用 

```beforeMount```  在挂载开始之前调用：相关的 render 函数首次被调用 

```Mounted```   el被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子 

```beforeUpdate```  组件数据更新之前调用

```Update```   组件数据更新之后 

```activited```     keep-alive 专属，组件被激活时调用 

```Deactivated```   keep-alive 专属，组件被销毁时调用 

```beforeDestory```  组件销毁前调用 

```destoryed```  组件销毁后调用

在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。

![avatar](https://github.com/fengshi123/blog/blob/master/assets/vue_interview/1.png?raw=true)
## 对 keep-alive 的了解
keep-alive是一个抽象组件：它自身不会渲染一个DOM元素，也不会出现在父组件链中；使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

举个🌰：
*用户在某个列表页选择筛选条件过滤出一份数据列表，由列表页进入详情页，再返回该列表页，我们希望：列表页可以保留用户的筛选（或选中）状态。*

keep-alive就是用来解决这种场景。当然keep-alive不仅仅是能够保存页面/组件的状态这么简单，它还可以避免组件反复创建和渲染，有效提升系统性能。总的来说，keep-alive用于保存组件的渲染状态。
1.  一般结合路由和动态组件一起使用，用于缓存组件；
2. 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
3. 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发activated，当组件被移除时，触发deactivated。

## vue的父组件和子组件生命周期函数执行的顺序

加载渲染过程：
```
父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
```
子组件更新过程：
```
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
```
父组件更新过程：
```
父 beforeUpdate -> 父 updated
```
销毁过程：
```
父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed
```
## 在哪个生命周期内调用异步请求？
可以在 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端返回的数据进行赋值。推荐在 created 钩子函数中调用异步请求

在 created 钩子函数中调用异步请求有以下优点：
**能更快获取到服务端数据，减少页面 loading 时间**
**ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性**
## 父组件可以监听到子组件的生命周期吗？
使用@hook
```js
// Parent.vue 
<Child  @hook:mounted="doSomething" ></Child> 
doSomething() { console.log('父组件监听到 mounted 钩子函数 ...'); },
 // Child.vue 
mounted(){ console.log('子组件触发 mounted 钩子函数 ...'); }
```
以上输出顺序为：子组件触发 mounted，父组件监听到 mounted 
## 组件中 data 为什么是一个函数
为什么组件中的 data 必须是一个函数，然后 return 一个对象，而new Vue 实例里，data 可以直接是一个对象？

因为组件是用来复用的，且 JS 里面的对象是引用关系，如果组件中 data 是一个对象，那么作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，组件实例之间的 data 属性值不会互相影响；
而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。
## v-model 的原理？
我们主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
``` js
<input v-model='something'> 相当于 <input v-bind:value="something" v-on:input="something = $event.target.value">
```
## Vue 组件间通信有哪几种方式？
**父子组件通信、隔代组件通信、兄弟组件通信**

props / $emit 适用 父子组件通信

EventBus （$emit / $on） 适用于 父子、隔代、兄弟组件通信

Vuex 适用于 父子、隔代、兄弟组件通信

## VUEX
**Vuex 是一个专为 Vue.js 开发的状态管理模式。**
每一个 Vuex 应用的核心就是 **store（仓库）**。“store”就是一个容器，它包含着你的应用中大部分的状态 ( state )。

Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
改变 store 中的状态的唯一途径就是 (commit) mutation。这样可以方便地跟踪每一个状态的变化。

包含的模块：
1. ``` State ```：定义了应用状态的数据结构，在这里设置默认的初始状态。
2. ```Getter```：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
3. ```Mutation```：更改 store 中状态的方法，且必须是同步函数。
4. ```Action```：用于提交 mutation，而不是直接变更状态，可包含任意异步操作。
5. ```Module```：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

## Vue脚手架对webpack做了哪些配置
