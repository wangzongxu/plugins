<template>
  <div id="app">
    <book class="book"
          :data="pages"
          :startPageIndex="1"
          :endPageIndex="pages.length - 2"
          @next="pageChange"
          @prev="pageChange"
          @indexPageChange="indexPageChange">
      <template scope="prop">
        <img :src="prop.page.url">
        <p>{{ prop.page.title }}</p>
      </template>
    </book>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      pages: [
        {url: 'https://wangzongxu.github.io/img-cache/book/book-page-1.jpg', title: ''},
        {url: 'https://wangzongxu.github.io/img-cache/book/book-page-2.jpg', title: ''},
        {url: 'https://wangzongxu.github.io/img-cache/book/book-page-3.jpg', title: 'The lake was home to many animals.↵Frogs and turtles were living in the pond.'},
        {url: 'https://wangzongxu.github.io/img-cache/book/book-page-4.jpg', title: 'Some turtles were resting on logs.↵Some frogs were waiting on water lilies for flies to catch.'},
        {url: 'https://wangzongxu.github.io/img-cache/book/book-page-5.jpg', title: 'Two, small ears were moving slowly in the water.'},
        {url: 'https://wangzongxu.github.io/img-cache/book/book-page-6.jpg', title: 'All of a sudden a huge mouth appeared with big tusks.'},
        {url: 'https://wangzongxu.github.io/img-cache/book/book-page-7.jpg', title: 'A hippo was coming up for air.↵Her calf was coming up, too.'},
        {url: 'https://wangzongxu.github.io/img-cache/book/book-page-8.jpeg', title: ''}
      ]
    }
  },
  methods: {
    pageChange (curPage, indexPages, pageDatas) {
      console.log('当前页:', curPage,
                  '当前两个索引页:', indexPages,
                  '当前两条数据:', pageDatas)
    },
    indexPageChange (num) {
      console.log('索引页改变了:', num)
    }
  }
}
</script>

<style scoped>
.book{
  position: relative;
  margin: 10% auto 0;
}
.book img{
  width: 100%;
  height: 100%
}
.book p{
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 50px;
  font-size: 10px
}
</style>
