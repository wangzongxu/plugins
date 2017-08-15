# README:

> vue >= version 2.1

## demo

### template:

```html
   <book :data="pages" ref="book">
     <template scope="prop">
       <img :src="prop.page.url">
       <p>{{ prop.page.title }}</p>
     </template>
   </book>
```

### props:

prop | desc | type | default | required
---|------|------|------|---
width | 书整体宽度 | Number | 600 | false
height | 书整体高度 | Number | 350 | true
data | 书页数据 | Array | [x] | true
turnPageByHand | 是否允许手动翻页 | Boolean | true | false
initPage | 出初始页码 | Number | 1 | false
autoNextPage | 自动翻页 | Boolean | false | false
duration |  翻页动画时间 | Number | 1000ms | false
autoNextPageDelayTime | 左半页和右半页的的等待时间，左半页等待完成后等待右半页，右半页等待完后进行翻页 | Number | 3000 | false
showPageIndex | 是否显示页码 | Boolean | true | false
hidePageIndex | 需要隐藏某些半页面的页码 | Array | [] | false

### Events:

Event | desc | eventParams
---|------|---
atFirstPage | 翻到第一页时触发 | 见下
atEndPage | 翻到最后一页时触发 | 见下
turnStart | 开始翻页动画时触发 | 见下
turnEnd | 动画结束后触发 | 见下
next | 进行下一页时触发 | 见下
prev | 进行上一页时触发 | 见下
readRight | 阅读右侧书页时触发（仅在自动翻页时有效 | 见下

- EventParams

```js
  [
     0: 当前页（按整个页面计算，从1开始）
     1: 某个半页（从数据索引0开始）
     2: 当前数据
   ]
```

### Methods

```js
// 向下翻页，默认一页，可指定页数
this.$refs.book.next(num)
// 向上翻页，默认一页，可指定页数
this.$refs.book.prev(num)
```
