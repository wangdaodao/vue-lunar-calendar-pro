# Calendar 日历

![NPM version](https://img.shields.io/npm/v/vue-lunar-calendar-pro.svg)

* 😊 基于 vue 2.0 开发的轻量，高性能日历组件；
* 😘 支持农历，节气，假日显示；
* 😍 原生 js 开发，无第三方库；
* 😂 支持现代浏览器(IE >= 9)；
* 👍 感谢 [calendar.js](https://github.com/jjonline/calendar.js)

## 安装

### npm

```bash
npm i vue-lunar-calendar-pro --save
```

### cdn

目前可以通过 [unpkg.com/vue-lunar-calendar-pro](https://unpkg.com/vue-lunar-calendar-pro) 或者 [www.jsdelivr.com/package/npm/vue-lunar-calendar-pro](https://www.jsdelivr.com/package/npm/vue-lunar-calendar-pro) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

🚩 建议使用 CDN 引入组件的用户在链接地址上锁定版本，以免将来组件升级时受到非兼容性更新的影响。🚩 

```html
<!-- 这里会始终引用最新版本 -->
<script src='https://unpkg.com/vue-lunar-calendar-pro/dist/calendar.umd.js'></script>
<script src='https://cdn.jsdelivr.net/npm/vue-lunar-calendar-pro/dist/calendar.umd.js'></script>

<!-- 这里会引用 1.0.15 版本 -->
<script src='https://unpkg.com/vue-lunar-calendar-pro@1.0.15/dist/calendar.umd.js'></script>
```

## 使用

### 全局使用

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
// ...

import Calandar from 'vue-lunar-calendar-pro'
Vue.use(Calandar)

// ...

new Vue({
  el: '#app',
  render: h => h(App)
})
```

```html
<!--app.vue-->
<template>
  <div id="app">
    <calendar height="800px" width="800px"/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
```

### 本地注册
```html
<!--app.vue-->
<template>
  <div id="app">
    <calendar height="800px" width="800px"/>
  </div>
</template>

<script>
  import Calendar from 'vue-lunar-calendar-pro'
  export default {
    name: 'App',
    components:{Calendar}
  }
</script>
```

## 基本单选

🔸 设置 `default-date` 来指定当前显示的月份。如果 `default-date` 未指定，则显示当月。

demo1: [demo1](http://demo.const.team/calendar/demo1.html)

```html
<template>
  <calendar :select-date="date" :default-date="defaultDate"></calendar>

  <p class="demonstration">默认日期：{{defaultDate}}</p>
  <p class="demonstration">选中日期：{{date}}</p>
</template>

<script>
  export default {
    data() {
      return {
        defaultDate:"2018-06-26",
        date: ["2019-09-07"]
      }
    },
  }
</script>
```

## 基本多选

🔸 设置 `multiple` 开启日期多选。

demo1: [demo2](http://demo.const.team/calendar/demo2.html)

```html
<template>
  <calendar multiple :select-date="date"></calendar>

  <p class="demonstration">选中日期：{{date}}</p>
</template>

<script>
  export default {
    data() {
      return {
        date: [ "2019-09-07", "2019-10-10", "2019-10-16", "2019-10-15", "2019-10-22", "2019-10-18" ] 
      }
    },
  }
</script>
```

## 设置周起始日

🔸 设置 `first-day-of-week` 来指定周起始日。如果 `first-day-of-week` 未指定则按照周日为起始日。

demo3: [demo3](http://demo.const.team/calendar/demo3.html)

```html
<template>
  <calendar :first-day-of-week="1" ref="calendar" :select-date="date"></calendar>

  <p class="demonstration">选中日期：{{date}}</p>
</template>

<script>
  export default {
    data() {
      return {
        date: ["2019-09-07"]
      }
    },
  }
</script>
```

## 高亮日期

🔸 设置 `highlighter-date` 高亮日期。

demo4: [demo4](http://demo.const.team/calendar/demo4.html)

```html
<template>
  <calendar multiple :select-date="date" :highlighter-date="highlighter"></calendar>

  <p class="demonstration">选中日期：{{date}}</p>
  <p class="demonstration">高亮日期：{{highlighter}}</p>
</template>

<script>
  export default {
    data() {
      return {
        date: [ "2019-09-07", "2019-10-10", "2019-10-16", "2019-10-15", "2019-10-22", "2019-10-18" ] ,
        highlighter: ["2019-12-24","2020-01-25","2020-02-13","2020-02-24","2020-02-26","2020-06-26"]
      }
    },
  }
</script>
```

## 某些日期不可选

🔸 设置 `disabled-date` 来指定当哪些日期不可选。

demo5: [demo5](http://demo.const.team/calendar/demo5.html)

```html
<template>
  <calendar multiple :select-date="date" :disabled-date="disableddate"></calendar>

  <p class="demonstration">选中日期：{{date}}</p>
  <p class="demonstration">不可选日期：{{disableddate}}</p>
</template>

<script>
  export default {
    data() {
      return {
        date: [ "2019-09-07", "2019-10-10", "2019-10-16", "2019-10-15", "2019-10-22", "2019-10-18" ],
        disableddate: ["2019-11-02","2019-11-08","2019-11-21"]
      }
    },
  }
</script>
```

## 设置日期区间

🔸 设置 `max-date` 和 `min-date` 来设置日期区间。

demo6: [demo6](http://demo.const.team/calendar/demo6.html)

```html
<template>
  <calendar ref="calendar" multiple  :select-date="date" max-date="2019-12-31" min-date="2019-05-01" :disabled-date="disableddate"></calendar>

  <p class="demonstration">选中日期：{{date}}</p>
  <p class="demonstration">日期区间：2019-05-01 至 2019-12-31</p>
  <p class="demonstration">不可选日期：{{disableddate}}</p>
</template>

<script>
  export default {
    data() {
      return {
        date: [ "2019-09-07", "2019-10-10", "2019-10-16", "2019-10-15", "2019-10-22", "2019-10-18" ],
        disableddate: ["2019-11-02","2019-11-08","2019-11-21"]
      }
    },
  }
</script>
```

## Render方法

🔸 内置 `render` 方法，参数为`year, month`，配合其他组件使用。另外，通过设置名为 `dateCell` 的 `scoped-slot` 来自定义日历单元格中显示的内容。在 `scoped-slot` 可以获取到 `date`（当前单元格的日期对象），详情解释参考下方的 `API` 文档。

demo7: [demo7](http://demo.const.team/calendar/demo7.html)

```html
<template>
  <p style="margin-bottom:20px">
    <el-date-picker
      v-model="value1"
      @change="changeDate"
      type="month"
      value-format="yyyy-MM"
      placeholder="选择月份">
    </el-date-picker>
  </p>

  <calendar ref="calendar" multiple :select-date="date"  :show-title="false">
    <template slot="dateCell" slot-scope="{date}">
      <el-popover
        placement="right"
        width="400"
        trigger="click">
        <dl>
          <dt>属性：</dt>
          <dd>date：{{date.date}}</dd>
          <dd>year：{{date.year}}</dd>
          <dd>month：{{date.month}}</dd>
          <dd>day：{{date.day}}</dd>
          <dd>weekDay：{{date.weekDay}}</dd>
          <dd>gzDay：{{date.gzDay}}</dd>
          <dd>gzMonth：{{date.gzMonth}}</dd>
          <dd>gzYear：{{date.gzYear}}</dd>
          <dd>lunarMonth：{{date.lunarMonth}}</dd>
          <dd>lunar：{{date.lunar}}</dd>
          <dd>animal：{{date.animal}}</dd>
          <dd>astro：{{date.astro}}</dd>
        </dl>
        <span slot="reference" class="obj">点击</span>
      </el-popover>
    </template>
  </calendar>

  <p class="demonstration">选中日期：{{date}}</p>
</template>
<script>
  export default {
    data() {
      return {
        value1: "",
        date: ["2019-09-30","2019-09-28","2019-09-25","2019-10-01"]
      }
    },
    methods: {
      changeDate(val){
        console.log("val", val)
        var dateArr = val.split("-");
        this.$refs.calendar.render(dateArr[0], dateArr[1]);
      }
    },
  }
</script>
```

## Attributes
| 参数             | 说明          | 类型      | 可选值        | 默认值  |
|-----------------|-------------- |---------- |------------ |-------- |
| default-date|默认渲染日期|Date,String|能被new Date()解析的|new Date()|
| select-date | 绑定值         | Array | —  | —      |
| highlighter-date | 高亮日期         | Array | —  | —      |
| disabled-date | 不可选日期         | Array | —  | —      |
| max-date | 最大可选日期         | Date,String | 能被new Date()解析的  | —      |
| min-date | 最小可选日期         | Date,String | 能被new Date()解析的  | —      |
| show-lunar | 是否渲染农历         | Boolean | —  | true      |
| show-festival | 是否渲染节日         | Boolean | —  | true      |
| show-term | 是否渲染节气         | Boolean | —  | true      |
| show-week | 是否高亮周末         | Boolean | —  | true      |
| show-title | 是否显示头部标题栏(年月日/按钮)         | Boolean | —  | true      |
| week-count | 每月显示的行的数量         | Number | —  | 6      |
| first-day-of-week | 周起始日         | Number | 1 到 7  |  7   |
| multiple | 是否多选         | Boolean | —  | false      |

## Events

| 事件名	| 说明 | 参数 |
|---|---|---|
| year-change  | 当前渲染的年份变化时会触发该事件  |  year,month |
| month-change  | 当前渲染的月份变化时会触发该事件  |  year,month |
| date-click  | 点击某个日期格子时会触发该事件  |  date |

## Date

| 字段	| 说明  |
|---|---|
| date  | Date对象  | 
| year  | 年  | 
| month  | 月  | 
| day  | 日  | 
| weekDay  | 周几(0-6)  | 
| lunar  | 农历日 | 
| lunarMonth  | 农历日 | 
| festival  | 节日 | 
| lunarFestival  | 农历节日 | 
| term  | 节气 | 
| astro  | 星座 | 
| animal  | 属相 | 
| gzDay  | 干支天 | 
| gzMonth  | 干支月 | 
| gzYear  | 干支年 | 
| isToday  | 是否为今天 | 
| isSelect  | 是否选中 | 
| isWeekend  | 是否为周末 | 
| isOtherMonthDay  | 是否属于当前渲染月份 | 
| renderYear  | 当前渲染年份 | 
| renderMonth  | 当前渲染月份 | 
| isDefaultDate  | 是否是默认日期 | 