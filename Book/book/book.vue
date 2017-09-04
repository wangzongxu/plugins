<template>
  <div class="bookMain"
       :style="styleForPageMain">
    <div v-for="page, index in pages"
         class="bookItem"
         ref="bookItem"
         @click="turn(index)"
         :class="[{rotate180 : page.rotate180},
                     page.left ? 'left' : 'right',
                     page.animateClass]"
         :style="{zIndex : set_zIndex(index),
                  animationDuration: page.animationDuration + 's'}">
      <slot :page="page"
            :index="index">
      </slot>
      <i v-if="showPageIndex && startPageIndex <= index && endPageIndex >= index"
         class="index"
         :class="index % 2 === 0 ? 'index-left' : 'index-right'"
         :style="styleForPageIndex">{{ index + 1 - startPageIndex }}
      </i>
    </div>
    <template v-if="pages.length === 0">
      <div class="bookItem left">
        <loading-svg class="loading"></loading-svg>
      </div>
      <div class="bookItem right">
        <loading-svg class="loading"></loading-svg>
      </div>
    </template>
  </div>
</template>
<script>
  import loadingSvg from './loading.vue'
  const TURNTOLEFT = 'left'
  const TURNTORIGHT = 'right'
  const HIDDEN = 'hidden'
  const VISIBLE = 'visible'
  export default {
    name: 'book',
    components: {
      loadingSvg
    },
    props: {
      styleForPageMain: {
        type: Object,
        default () {
          return {}
        }
      },
      styleForPageIndex: {
        type: Object,
        default () {
          return {}
        }
      },
      // 页面数据
      data: {
        type: Array,
        required: true
      },
      // 是否允许手动翻页
      turnPageByHand: {
        type: Boolean,
        default: true
      },
      // 初始页
      initPage: {
        type: Number,
        default: 1
      },
      // 是否自动翻页
      autoNextPage: {
        type: Boolean,
        default: false
      },
      // 每页停留时间
      autoNextPageDelayTime: {
        type: Number,
        default: 3000
      },
      // 翻页动画时间
      duration: {
        type: Number,
        default: 1000
      },
      // 显示页码
      showPageIndex: {
        type: Boolean,
        default: true
      },
      // 页码开始索引
      startPageIndex: {
        type: Number,
        default: 0
      },
      // 页码结束索引
      endPageIndex: {
        type: Number,
        default: 9999
      }
    },
    data () {
      return {
        pages: [],
        curPage: this.initPage, // 当前页码,每一页中是两个半页，从1开始计算
        direction: TURNTOLEFT, // 翻页方向,并非按钮方向
        curHalfPage: 0, // 每个半页,每一页等于两个半页，从0开始计算
        animating: false, // 正在进行动画状态，防止点击翻页
        staying: false // 每页的停留状态
      }
    },
    computed: {
      // 总页数
      pageCount () {
        return Math.ceil(this.pages.length / 2)
      }
    },
    methods: {
      assign (obj, target) {
        for (let k in target) {
          if (target.hasOwnProperty(k)) {
            obj[k] = target[k]
          }
        }
        return obj
      },
      $$emit (type) {
        let leftPage = this.curPage * 2 - 1 - 1
        let rightPage = this.data[leftPage + 1] ? leftPage + 1 : undefined
        this.$emit(type, this.curPage, [leftPage, rightPage], [this.data[leftPage], this.data[rightPage]])
      },
      // 处理所有页面
      getPages () {
        // 初始化数据
        const pages = []
        this.data.forEach((item, index) => {
          let page = this.assign({
            animateClass: '',
            rotate180: false,
            animationDuration: '0s',
            left: false
          }, item)
          // 当前页之前的都在左边
          if (index <= this.curPage * 2 - 1 - 1) {
            page.left = true
          }
          pages.push(page)
        })
        this.pages = pages
        if (this.autoNextPage) {
          this.stay(this.curHalfPage)
        }
      },
      // 通过索引获取当前所属页码
      getPageNumByIndex (index) {
        return Math.ceil((index + 1) / 2)
      },
      // 向右翻页的时候给偶数页添加翻转类名[不包含第一页]，向左翻页的时候给奇数页添加翻转类名[不包含最后一页]。
      rotate180 () {
        this.pages.forEach((page, index) => {
          if (this.direction === TURNTOLEFT) {
            page.rotate180 = index > 1 && index % 2 === 0
          } else if (this.direction === TURNTORIGHT) {
            page.rotate180 = index < this.pages.length - 1 && index % 2 === 1
          }
        })
      },
      // 添加动画类名,添加后立即会进行动画
      animateClass () {
        // 书页正反两面会执行两次结束事件，这里限制只允许触发一次
        let emitTurnEnd = true
        this.pages.forEach((page, index) => {
          page.animationDuration = this.duration / 1000
          if (this.direction === TURNTOLEFT) {
            // 第一页不添加
            if (this.curPage === 1) return
            // 动画完成后使其保持动画后的位置
            let time = setTimeout(() => {
              page.left = true
              this.animating = false
              if (emitTurnEnd) {
                emitTurnEnd = false
                this.$$emit('turnEnd')
              }
              this.resetAnimateClass()
            }, this.duration + 150)
            // 动画中的前一页翻过去，隐藏掉
            if (this.curPage * 2 - 3 === index) {
              page.animateClass = `${TURNTOLEFT}-${HIDDEN}`
            } else if (this.curPage * 2 - 2 === index) {
              // 动画中后一页翻过来，进行显示
              page.animateClass = `${TURNTOLEFT}-${VISIBLE}`
            } else {
              // 没执行动画，清除定时器
              clearTimeout(time)
              // 不添加类名
              page.animateClass = ''
            }
          } else if (this.direction === TURNTORIGHT) {
            // 最后一页不添加
            if (this.curPage === this.pageCount) return
            // 动画完成后使其保持动画后的位置
            let time = setTimeout(() => {
              page.left = false
              this.animating = false
              if (emitTurnEnd) {
                emitTurnEnd = false
                this.$$emit('turnEnd')
              }
              this.resetAnimateClass()
            }, this.duration + 150)
            // 动画中的前一页翻过去，隐藏掉
            if (this.curPage * 2 - 1 === index) {
              page.animateClass = `${TURNTORIGHT}-${VISIBLE}`
            } else if (this.curPage * 2 === index) {
              // 动画中后一页翻过来，进行显示
              page.animateClass = `${TURNTORIGHT}-${HIDDEN}`
            } else {
              // 没执行动画，清除定时器
              clearTimeout(time)
              // 不添加类名
              page.animateClass = ''
            }
          }
        })
      },
      // 重置动画类名为空
      resetAnimateClass () {
        this.pages.forEach(page => {
          page.animateClass = ''
        })
        // 清空类名之后视图不会更新，这里让vue强制更新视图
        this.$forceUpdate()
      },
      // 设置书页层叠高度当前页面最高，其他页面递减
      set_zIndex (index) {
        var pageNum = this.getPageNumByIndex(index)
        if (this.curPage === pageNum) {
          // 当前页取总页数作为层级值
          return this.pageCount
        } else {
          // 在当前页的两边层叠高度依次递减
          return Math.abs(this.pageCount - Math.abs(this.curPage - pageNum))
        }
      },
      // 翻页
      turn (index) {
        if (!this.turnPageByHand) return
        if (index % 2 === 0) {
          this.prev()
        } else {
          this.next()
        }
      },
      // 上一页
      prev (num) {
        num = this.roundNum(num)
        if (isNaN(num) || num < 1) return
        if (this.animating) return
        if (this.curPage - num < 1) return
        // 改变方向
        this.direction = TURNTORIGHT
        this.$$emit('turnStart')
        this.curPage -= num
        this.$$emit('prev')
      },
      // 下一页
      next (num) {
        num = this.roundNum(num)
        if (isNaN(num) || num < 1) return
        if (this.animating) return
        if (this.curPage + num > this.pageCount) return
        // 改变方向
        this.direction = TURNTOLEFT
        this.$$emit('turnStart')
        this.curPage += num
        this.$$emit('next')
      },
      // 数字四舍五入
      roundNum (any) {
        return Math.round(any || 1)
      },
      // 停留当前页
      stay (index) {
        this.curHalfPage = index
        this.staying = true
        // 记录当前页面，如果定时器结束之前当前页面被点击翻页改变了，那么不进行下列状态的结束操作
        const temp = this.curHalfPage
        setTimeout(() => {
          if (temp === this.curHalfPage) {
            this.ended()
          }
        }, this.autoNextPageDelayTime)
      },
      // 单页预览完毕
      ended () {
        this.staying = false
        // 右边
        if (this.curHalfPage % 2 === 1) {
          if (this.autoNextPage) {
            this.next()
          }
        } else {
          if (this.autoNextPage) {
            this.curHalfPage += 1
            this.stay(this.curHalfPage)
          }
        }
      },
      // 页面改变后进行计算
      computedData (pageNum) {
        // 每次翻页都播放当页左边的再减去一个单位的索引（因为每个半页是索引0开头，页面是1开头）
        this.curHalfPage = pageNum * 2 - 1 - 1
        // 翻页进行动画状态
        this.animating = true
        // 计算哪些页面需要翻转180度
        this.rotate180()
        // 计算需要进行动画的页面
        this.animateClass()
        // 停留当前页
        this.stay(this.curHalfPage)
      },
      // 改变自动翻页状态
      changeAutoNextPage () {
        this.autoNextPage = !this.autoNextPage
        // 设置自动翻页的时候，如果不是停留状态，并且也没在翻页过程中的话，则翻下一页
        if (this.autoNextPage && !this.staying && !this.animating) {
          this.next()
        }
      }
    },
    mounted () {
      this.getPages()
    },
    watch: {
      // 监听变化重新渲染
      data () {
        this.getPages()
      },
      // 页码改变之后的动画处理
      curPage (pageNum) {
        if (pageNum === 1) {
          this.$$emit('atFirstPage')
        } else if (pageNum === this.pageCount) {
          this.$$emit('atEndPage')
        }
        this.computedData(pageNum)
      },
      // 每个半页改变
      curHalfPage (num) {
        this.$emit('indexPageChange', num)
      }
    }
  }
</script>
<style scoped>
  /*书样式*/
  .bookMain{
    width: 600px;
    height: 350px;
    border: 5px solid #1296db;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
    perspective:1500px;
  }
  .bookMain .bookItem{
    width: 50%;
    height: 100%;
    border-radius: 10px;
    background: #ffffff;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
  }
  .bookMain .bookItem>.loading{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    margin: auto;
    animation: loading linear 1s infinite;
  }
  .bookMain .bookItem .index{
    position: absolute;
    bottom: 5px;
    font-style: normal;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(18, 150, 219, 0.4);
    border-radius: 50%;
  }
  .bookMain .bookItem .index.index-left{
    left: 5px;
  }
  .bookMain .bookItem .index.index-right{
    right: 5px;
  }
  .bookMain .bookItem.left{
    left:0;
    right:initial
  }
  .bookMain .bookItem.right{
    left: initial;
    right: 0;
  }
  /*需要动画的元素一开始是反过来的，动画完成后方向改变正确*/
  .bookMain .bookItem.rotate180.right-hidden *,
  .bookMain .bookItem.rotate180.right-visible *,
  .bookMain .bookItem.rotate180.left-hidden *,
  .bookMain .bookItem.rotate180.left-visible *{
    transform: rotateY(180deg);
  }
  /*音频的按钮的位置*/
  .bookMain .bookItem.rotate180.right-hidden .index.index-left,
  .bookMain .bookItem.rotate180.right-visible .index.index-left,
  .bookMain .bookItem.rotate180.left-hidden .index.index-left,
  .bookMain .bookItem.rotate180.left-visible .index.index-left{
    left: initial;
    right: 5px;
  }
  /*页码位置*/
  .bookMain .bookItem.rotate180.right-hidden .index.index-right,
  .bookMain .bookItem.rotate180.right-visible .index.index-right,
  .bookMain .bookItem.rotate180.left-hidden .index.index-right,
  .bookMain .bookItem.rotate180.left-visible .index.index-right{
    right: initial;
    left: 5px;
  }
  /*动画中的书页层级很高*/
  .bookMain .bookItem.right-hidden {
    z-index: 99!important;
    transform-origin: right;
    animation: right-hidden linear 1s 1 both;
  }
  .bookMain .bookItem.right-visible {
    z-index: 100!important;
    transform-origin: right;
    animation: right-visible linear 1s 1 both;
  }
  .bookMain .bookItem.left-hidden {
    z-index: 99!important;
    transform-origin: left;
    animation: left-hidden linear 1s 1 both;
  }
  .bookMain .bookItem.left-visible {
    z-index: 100!important;
    transform-origin: left;
    animation: left-visible linear 1s 1 both;
  }
  /*书页向右运动的前一页 渐渐隐藏*/
  @keyframes right-hidden {
    0% { /*  动画开始 */
      opacity: 1;
      transform: rotate3d(0, 1, 0, 0deg);
    }
    50% {
      opacity: 1;
      box-shadow: 0px 0px 20px #333333;
      transform: rotate3d(0, 1, 0, 90deg);
    }
    50.1% {
      opacity: 0;
      transform: rotate3d(0, 1, 0, 90deg);
    }
    100% { /*  动画结束 */
      opacity: 0;
      box-shadow: none;
      transform: rotate3d(0, 1, 0, 180deg);
    }
  }

  /*书页向右运动的后一页 渐渐出现*/
  @keyframes right-visible {
    0% { /*  动画开始 */
      opacity: 0;
      transform: rotate3d(0, 1, 0, 0deg);
    }
    50% {
      opacity: 0;
      box-shadow: 0px 0px 20px #333333;
      transform: rotate3d(0, 1, 0, 90deg);
    }
    50.1% {
      opacity: 1;
      transform: rotate3d(0, 1, 0, 90deg);
    }
    100% { /*  动画结束 */
      opacity: 1;
      box-shadow: none;
      transform: rotate3d(0, 1, 0, 180deg);
    }
  }

  /*书页向左运动的前一页 渐渐隐藏*/
  @keyframes left-hidden {
    0% { /*  动画开始 */
      opacity: 1;
      transform: rotate3d(0, 1, 0, 0deg);
    }
    50% {
      opacity: 1;
      box-shadow: 0px 0px 20px #333333;
      transform: rotate3d(0, 1, 0, -90deg);
    }
    50.1% {
      opacity: 0;
      transform: rotate3d(0, 1, 0, -90deg);
    }
    100% { /*  动画结束 */
      opacity: 0;
      box-shadow: none;
      transform: rotate3d(0, 1, 0, -180deg);
    }
  }

  /*书页向左运动的后一页 渐渐出现*/
  @keyframes left-visible {
    0% { /*  动画开始 */
      opacity: 0;
      transform: rotate3d(0, 1, 0, 0deg);
    }
    50% {
      opacity: 0;
      box-shadow: 0px 0px 20px #333333;
      transform: rotate3d(0, 1, 0, -90deg);
    }
    50.1% {
      opacity: 1;
      transform: rotate3d(0, 1, 0, -90deg);
    }
    100% { /*  动画结束 */
      opacity: 1;
      box-shadow: none;
      transform: rotate3d(0, 1, 0, -180deg);
    }
  }

  @keyframes loading {
    from{
      transform: rotateZ(0deg);
    }
    to{
      transform: rotateZ(360deg);
    }
  }
</style>
