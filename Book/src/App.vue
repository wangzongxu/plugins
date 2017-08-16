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
        {url: 'https://teacher-media.vipkid.com.cn/resource/725e4f6996864cbf9ff62d8c8cdaa57c.jpg', title: ''},
        {url: 'https://teacher-media.vipkid.com.cn/resource/225e48a8200a48758dbfdd3b857fc0c2.jpg', title: ''},
        {url: 'https://teacher-media.vipkid.com.cn/resource/23f0e55129cb4848a1be391099c6911a.jpg', title: 'The lake was home to many animals.↵Frogs and turtles were living in the pond.'},
        {url: 'https://teacher-media.vipkid.com.cn/resource/6e19087b9fc44299b371fcc8d8e9e544.jpg', title: 'Some turtles were resting on logs.↵Some frogs were waiting on water lilies for flies to catch.'},
        {url: 'https://teacher-media.vipkid.com.cn/resource/107312050efc46f1afc50ef1b4670410.jpg', title: 'Two, small ears were moving slowly in the water.'},
        {url: 'https://teacher-media.vipkid.com.cn/resource/3d481cb972224293a109764426a5c71e.jpg', title: 'All of a sudden a huge mouth appeared with big tusks.'},
        {url: 'https://teacher-media.vipkid.com.cn/resource/146a51c95d214e2187125745fd71858e.jpg', title: 'A hippo was coming up for air.↵Her calf was coming up, too.'},
        {url: 'https://teacher-media.vipkid.com.cn/resource/73a86331721d454a928b3cdc524d652d.jpg', title: ''}
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
