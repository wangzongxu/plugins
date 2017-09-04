# README:

## demo preview

<img src="https://wangzongxu.github.io/img-cache/book/book.png" width="600" alt="" align="center"/>

[预览](https://wangzongxu.github.io/plugins/Book/)

### install

> vue >= version 2.1

```bash
npm install vue-book-component --save
```

### require

```js
import Vue from 'vue'
import Book from 'vue-book-component'
Vue.use(Book)
```

### template:

```html
   <book :data="pages"
         ref="book">
     <template scope="prop">
       <img :src="prop.page.url">
       <p>{{ prop.page.title }}</p>
     </template>
   </book>
```

### props:

prop | desc | type | default | required
---|------|------|------|---
styleForPageMain | 书的样式调整 | Object | {} | false
styleForPageIndex | 页码的样式调整 | Object | {} | false
data | 书页数据 | Array | [x] | true
turnPageByHand | 是否允许手动翻页 | Boolean | true | false
initPage | 初始页码 | Number | 1 | false
autoNextPage | 自动翻页 | Boolean | false | false
duration |  翻页动画时间 | Number | 1000ms | false
autoNextPageDelayTime | 每个索引页的延迟时间[一个页面分为左右两个索引页] | Number | 3000 | false
showPageIndex | 是否显示页码 | Boolean | true | false
startPageIndex | 开始显示索引的页面[索引页] | Number | 0 | false
endPageIndex | 结束显示索引的页面[索引页] | Number | 9999 | false

### Events:

Event | desc | eventParams
---|------|---
atFirstPage | 翻到第一页时触发 | 见下
atEndPage | 翻到最后一页时触发 | 见下
turnStart | 开始翻页动画时触发 | 见下
turnEnd | 动画结束后触发 | 见下
next | 进行下一页时触发 | 见下
prev | 进行上一页时触发 | 见下
indexPageChange | 每个索引页改变触发 | 当前索引页

- EventParams

```js
  // arguments:
  {
     0: 当前页（按整个页面计算，从1开始）
     1: 当前两个索引页（一个页面分为左右两个索引页，从0开始）
     2: 当前两个索引页的数据
  }
```

### Methods

```js
// 向下翻页，默认一页，可指定页数
this.$refs.book.next(num)
// 向上翻页，默认一页，可指定页数
this.$refs.book.prev(num)
```
