# 小白的日常填坑
## 给一个数组set对象
```js
const arr = []
for (item of arr) {
    let affix = {}
    this.$set(affix, 'orderStatus', item.orderStatus)
    this.$set(affix, 'routeList', [])
}
```
## 页面多层循环
控制好v-for嵌套使用，如果忘记请看adt项目的货运要求录入页面。。。。。。。