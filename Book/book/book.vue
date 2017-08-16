<template>
  <div class="bookMain"
       :style="{width: width,
                height: height}">
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
         :class="index % 2 === 0 ? 'index-left' : 'index-right'">{{ index + 1 - startPageIndex }}
      </i>
    </div>
    <template v-if="pages.length === 0">
      <div class="bookItem left">
        <svg class="loading" viewBox="0 0 1024 1024" width="30" height="30">
          <path d="M858.88 753.408C858.88 756.5824 861.7984 759.4496 864.9216 759.4496 868.096 759.4496 870.9632 756.5824 870.9632 753.408 870.9632 750.2336 868.096 747.3664 864.9216 747.3664 861.7984 747.3664 858.88 750.2336 858.88 753.408L858.88 753.408ZM725.4528 891.0848C725.4528 894.208 726.784 897.3312 728.9856 899.584 731.2384 901.7856 734.3616 903.0656 737.4848 903.0656 740.6592 903.0656 743.7824 901.7856 745.984 899.584 748.2368 897.3312 749.5168 894.208 749.5168 891.0848 749.5168 887.9104 748.2368 884.7872 745.984 882.5856 743.7824 880.3328 740.6592 879.0528 737.4848 879.0528 734.3616 879.0528 731.2384 880.3328 728.9856 882.5856 726.784 884.7872 725.4528 887.9104 725.4528 891.0848L725.4528 891.0848ZM545.6384 961.9456C545.6384 966.656 547.584 971.3664 550.912 974.6944 554.2912 978.0224 558.9504 979.968 563.712 979.968 568.4224 979.968 573.1328 978.0224 576.4608 974.6944 579.84 971.3664 581.7856 966.656 581.7856 961.9456 581.7856 957.184 579.84 952.4736 576.4608 949.1456 573.1328 945.8176 568.4224 943.872 563.712 943.872 558.9504 943.872 554.2912 945.8176 550.912 949.1456 547.584 952.4736 545.6384 957.184 545.6384 961.9456L545.6384 961.9456ZM352.0512 952.4224C352.0512 958.72 354.6624 964.9664 359.0656 969.4208 363.52 973.8752 369.8176 976.4864 376.064 976.4864 382.3616 976.4864 388.6592 973.8752 393.0624 969.4208 397.5168 964.9664 400.128 958.72 400.128 952.4224 400.128 946.1248 397.5168 939.8784 393.0624 935.424 388.6592 930.9696 382.3616 928.4096 376.064 928.4096 369.8176 928.4096 363.52 930.9696 359.0656 935.424 354.6624 939.8784 352.0512 946.1248 352.0512 952.4224L352.0512 952.4224ZM180.3264 864.3072C180.3264 872.192 183.552 880.0256 189.1328 885.5552 194.7136 891.136 202.496 894.3616 210.3808 894.3616 218.2656 894.3616 226.0992 891.136 231.68 885.5552 237.2096 880.0256 240.4864 872.192 240.4864 864.3072 240.4864 856.4224 237.2096 848.5888 231.68 843.008 226.0992 837.4784 218.2656 834.2016 210.3808 834.2016 202.496 834.2016 194.7136 837.4784 189.1328 843.008 183.552 848.5888 180.3264 856.4224 180.3264 864.3072L180.3264 864.3072ZM61.3888 714.496C61.3888 723.9168 65.28 733.3376 71.936 740.0448 78.6432 746.7008 88.064 750.592 97.4848 750.592 106.9568 750.592 116.3776 746.7008 123.0336 740.0448 129.7408 733.3376 133.632 723.9168 133.632 714.496 133.632 705.024 129.7408 695.6032 123.0336 688.9472 116.3776 682.24 106.9568 678.3488 97.4848 678.3488 88.064 678.3488 78.6432 682.24 71.936 688.9472 65.28 695.6032 61.3888 705.024 61.3888 714.496L61.3888 714.496ZM16.7424 530.5344C16.7424 541.5424 21.2992 552.4992 29.0816 560.2816 36.864 568.064 47.8208 572.6208 58.8288 572.6208 69.888 572.6208 80.8448 568.064 88.6272 560.2816 96.4096 552.4992 100.9664 541.5424 100.9664 530.5344 100.9664 519.4752 96.4096 508.5184 88.6272 500.736 80.8448 492.9536 69.888 488.3968 58.8288 488.3968 47.8208 488.3968 36.864 492.9536 29.0816 500.736 21.2992 508.5184 16.7424 519.4752 16.7424 530.5344L16.7424 530.5344ZM53.4528 347.7504C53.4528 360.3456 58.6752 372.8896 67.584 381.7984 76.4928 390.7072 88.9856 395.8784 101.632 395.8784 114.2272 395.8784 126.72 390.7072 135.68 381.7984 144.5888 372.8896 149.76 360.3456 149.76 347.7504 149.76 335.1552 144.5888 322.6112 135.68 313.7024 126.72 304.7936 114.2272 299.6224 101.632 299.6224 88.9856 299.6224 76.4928 304.7936 67.584 313.7024 58.6752 322.6112 53.4528 335.1552 53.4528 347.7504L53.4528 347.7504ZM163.6352 200.3968C163.6352 214.5792 169.472 228.6592 179.5072 238.6944 189.5424 248.7296 203.6224 254.5664 217.856 254.5664 232.0384 254.5664 246.1184 248.7296 256.1536 238.6944 266.1888 228.6592 272.0256 214.5792 272.0256 200.3968 272.0256 186.2144 266.1888 172.0832 256.1536 162.048 246.1184 152.064 232.0384 146.176 217.856 146.176 203.6224 146.176 189.5424 152.064 179.5072 162.048 169.472 172.0832 163.6352 186.2144 163.6352 200.3968L163.6352 200.3968ZM325.4272 115.968C325.4272 131.7376 331.8784 147.4048 343.04 158.5152 354.2016 169.6768 369.8176 176.128 385.5872 176.128 401.3568 176.128 416.9728 169.6768 428.1344 158.5152 439.296 147.4048 445.7472 131.7376 445.7472 115.968 445.7472 100.2496 439.296 84.5824 428.1344 73.4208 416.9728 62.3104 401.3568 55.808 385.5872 55.808 369.8176 55.808 354.2016 62.3104 343.04 73.4208 331.8784 84.5824 325.4272 100.2496 325.4272 115.968L325.4272 115.968ZM507.136 110.7456C507.136 128.0512 514.2528 145.3056 526.4896 157.5424 538.7776 169.8304 555.9808 176.9472 573.3376 176.9472 590.6432 176.9472 607.8976 169.8304 620.1344 157.5424 632.4224 145.3056 639.5392 128.0512 639.5392 110.7456 639.5392 93.3888 632.4224 76.1856 620.1344 63.8976 607.8976 51.6608 590.6432 44.544 573.3376 44.544 555.9808 44.544 538.7776 51.6608 526.4896 63.8976 514.2528 76.1856 507.136 93.3888 507.136 110.7456L507.136 110.7456ZM673.4848 185.6C673.4848 204.4928 681.2672 223.2832 694.6304 236.6464 707.9936 250.0096 726.784 257.792 745.6768 257.792 764.5696 257.792 783.36 250.0096 796.7232 236.6464 810.0864 223.2832 817.8688 204.4928 817.8688 185.6 817.8688 166.7072 810.0864 147.9168 796.7232 134.5536 783.36 121.1904 764.5696 113.408 745.6768 113.408 726.784 113.408 707.9936 121.1904 694.6304 134.5536 681.2672 147.9168 673.4848 166.7072 673.4848 185.6L673.4848 185.6ZM791.7056 326.1952C791.7056 346.6752 800.1024 367.0016 814.592 381.4912 829.0816 395.9808 849.4592 404.4288 869.9392 404.4288 890.4192 404.4288 910.7456 395.9808 925.2352 381.4912 939.7248 367.0016 948.1728 346.6752 948.1728 326.1952 948.1728 305.664 939.7248 285.3376 925.2352 270.848 910.7456 256.3584 890.4192 247.9616 869.9392 247.9616 849.4592 247.9616 829.0816 256.3584 814.592 270.848 800.1024 285.3376 791.7056 305.664 791.7056 326.1952L791.7056 326.1952ZM838.7072 508.2624C838.7072 530.3296 847.7696 552.2432 863.3856 567.8592 879.0016 583.4752 900.9152 592.5376 922.9824 592.5376 945.0496 592.5376 966.9632 583.4752 982.5792 567.8592 998.1952 552.2432 1007.2576 530.3296 1007.2576 508.2624 1007.2576 486.1952 998.1952 464.2816 982.5792 448.6656 966.9632 433.1008 945.0496 423.9872 922.9824 423.9872 900.9152 423.9872 879.0016 433.1008 863.3856 448.6656 847.7696 464.2816 838.7072 486.1952 838.7072 508.2624L838.7072 508.2624Z"
                fill="#1296db">
          </path>
        </svg>
      </div>
      <div class="bookItem right">
        <svg class="loading" viewBox="0 0 1024 1024" width="30" height="30">
          <path d="M858.88 753.408C858.88 756.5824 861.7984 759.4496 864.9216 759.4496 868.096 759.4496 870.9632 756.5824 870.9632 753.408 870.9632 750.2336 868.096 747.3664 864.9216 747.3664 861.7984 747.3664 858.88 750.2336 858.88 753.408L858.88 753.408ZM725.4528 891.0848C725.4528 894.208 726.784 897.3312 728.9856 899.584 731.2384 901.7856 734.3616 903.0656 737.4848 903.0656 740.6592 903.0656 743.7824 901.7856 745.984 899.584 748.2368 897.3312 749.5168 894.208 749.5168 891.0848 749.5168 887.9104 748.2368 884.7872 745.984 882.5856 743.7824 880.3328 740.6592 879.0528 737.4848 879.0528 734.3616 879.0528 731.2384 880.3328 728.9856 882.5856 726.784 884.7872 725.4528 887.9104 725.4528 891.0848L725.4528 891.0848ZM545.6384 961.9456C545.6384 966.656 547.584 971.3664 550.912 974.6944 554.2912 978.0224 558.9504 979.968 563.712 979.968 568.4224 979.968 573.1328 978.0224 576.4608 974.6944 579.84 971.3664 581.7856 966.656 581.7856 961.9456 581.7856 957.184 579.84 952.4736 576.4608 949.1456 573.1328 945.8176 568.4224 943.872 563.712 943.872 558.9504 943.872 554.2912 945.8176 550.912 949.1456 547.584 952.4736 545.6384 957.184 545.6384 961.9456L545.6384 961.9456ZM352.0512 952.4224C352.0512 958.72 354.6624 964.9664 359.0656 969.4208 363.52 973.8752 369.8176 976.4864 376.064 976.4864 382.3616 976.4864 388.6592 973.8752 393.0624 969.4208 397.5168 964.9664 400.128 958.72 400.128 952.4224 400.128 946.1248 397.5168 939.8784 393.0624 935.424 388.6592 930.9696 382.3616 928.4096 376.064 928.4096 369.8176 928.4096 363.52 930.9696 359.0656 935.424 354.6624 939.8784 352.0512 946.1248 352.0512 952.4224L352.0512 952.4224ZM180.3264 864.3072C180.3264 872.192 183.552 880.0256 189.1328 885.5552 194.7136 891.136 202.496 894.3616 210.3808 894.3616 218.2656 894.3616 226.0992 891.136 231.68 885.5552 237.2096 880.0256 240.4864 872.192 240.4864 864.3072 240.4864 856.4224 237.2096 848.5888 231.68 843.008 226.0992 837.4784 218.2656 834.2016 210.3808 834.2016 202.496 834.2016 194.7136 837.4784 189.1328 843.008 183.552 848.5888 180.3264 856.4224 180.3264 864.3072L180.3264 864.3072ZM61.3888 714.496C61.3888 723.9168 65.28 733.3376 71.936 740.0448 78.6432 746.7008 88.064 750.592 97.4848 750.592 106.9568 750.592 116.3776 746.7008 123.0336 740.0448 129.7408 733.3376 133.632 723.9168 133.632 714.496 133.632 705.024 129.7408 695.6032 123.0336 688.9472 116.3776 682.24 106.9568 678.3488 97.4848 678.3488 88.064 678.3488 78.6432 682.24 71.936 688.9472 65.28 695.6032 61.3888 705.024 61.3888 714.496L61.3888 714.496ZM16.7424 530.5344C16.7424 541.5424 21.2992 552.4992 29.0816 560.2816 36.864 568.064 47.8208 572.6208 58.8288 572.6208 69.888 572.6208 80.8448 568.064 88.6272 560.2816 96.4096 552.4992 100.9664 541.5424 100.9664 530.5344 100.9664 519.4752 96.4096 508.5184 88.6272 500.736 80.8448 492.9536 69.888 488.3968 58.8288 488.3968 47.8208 488.3968 36.864 492.9536 29.0816 500.736 21.2992 508.5184 16.7424 519.4752 16.7424 530.5344L16.7424 530.5344ZM53.4528 347.7504C53.4528 360.3456 58.6752 372.8896 67.584 381.7984 76.4928 390.7072 88.9856 395.8784 101.632 395.8784 114.2272 395.8784 126.72 390.7072 135.68 381.7984 144.5888 372.8896 149.76 360.3456 149.76 347.7504 149.76 335.1552 144.5888 322.6112 135.68 313.7024 126.72 304.7936 114.2272 299.6224 101.632 299.6224 88.9856 299.6224 76.4928 304.7936 67.584 313.7024 58.6752 322.6112 53.4528 335.1552 53.4528 347.7504L53.4528 347.7504ZM163.6352 200.3968C163.6352 214.5792 169.472 228.6592 179.5072 238.6944 189.5424 248.7296 203.6224 254.5664 217.856 254.5664 232.0384 254.5664 246.1184 248.7296 256.1536 238.6944 266.1888 228.6592 272.0256 214.5792 272.0256 200.3968 272.0256 186.2144 266.1888 172.0832 256.1536 162.048 246.1184 152.064 232.0384 146.176 217.856 146.176 203.6224 146.176 189.5424 152.064 179.5072 162.048 169.472 172.0832 163.6352 186.2144 163.6352 200.3968L163.6352 200.3968ZM325.4272 115.968C325.4272 131.7376 331.8784 147.4048 343.04 158.5152 354.2016 169.6768 369.8176 176.128 385.5872 176.128 401.3568 176.128 416.9728 169.6768 428.1344 158.5152 439.296 147.4048 445.7472 131.7376 445.7472 115.968 445.7472 100.2496 439.296 84.5824 428.1344 73.4208 416.9728 62.3104 401.3568 55.808 385.5872 55.808 369.8176 55.808 354.2016 62.3104 343.04 73.4208 331.8784 84.5824 325.4272 100.2496 325.4272 115.968L325.4272 115.968ZM507.136 110.7456C507.136 128.0512 514.2528 145.3056 526.4896 157.5424 538.7776 169.8304 555.9808 176.9472 573.3376 176.9472 590.6432 176.9472 607.8976 169.8304 620.1344 157.5424 632.4224 145.3056 639.5392 128.0512 639.5392 110.7456 639.5392 93.3888 632.4224 76.1856 620.1344 63.8976 607.8976 51.6608 590.6432 44.544 573.3376 44.544 555.9808 44.544 538.7776 51.6608 526.4896 63.8976 514.2528 76.1856 507.136 93.3888 507.136 110.7456L507.136 110.7456ZM673.4848 185.6C673.4848 204.4928 681.2672 223.2832 694.6304 236.6464 707.9936 250.0096 726.784 257.792 745.6768 257.792 764.5696 257.792 783.36 250.0096 796.7232 236.6464 810.0864 223.2832 817.8688 204.4928 817.8688 185.6 817.8688 166.7072 810.0864 147.9168 796.7232 134.5536 783.36 121.1904 764.5696 113.408 745.6768 113.408 726.784 113.408 707.9936 121.1904 694.6304 134.5536 681.2672 147.9168 673.4848 166.7072 673.4848 185.6L673.4848 185.6ZM791.7056 326.1952C791.7056 346.6752 800.1024 367.0016 814.592 381.4912 829.0816 395.9808 849.4592 404.4288 869.9392 404.4288 890.4192 404.4288 910.7456 395.9808 925.2352 381.4912 939.7248 367.0016 948.1728 346.6752 948.1728 326.1952 948.1728 305.664 939.7248 285.3376 925.2352 270.848 910.7456 256.3584 890.4192 247.9616 869.9392 247.9616 849.4592 247.9616 829.0816 256.3584 814.592 270.848 800.1024 285.3376 791.7056 305.664 791.7056 326.1952L791.7056 326.1952ZM838.7072 508.2624C838.7072 530.3296 847.7696 552.2432 863.3856 567.8592 879.0016 583.4752 900.9152 592.5376 922.9824 592.5376 945.0496 592.5376 966.9632 583.4752 982.5792 567.8592 998.1952 552.2432 1007.2576 530.3296 1007.2576 508.2624 1007.2576 486.1952 998.1952 464.2816 982.5792 448.6656 966.9632 433.1008 945.0496 423.9872 922.9824 423.9872 900.9152 423.9872 879.0016 433.1008 863.3856 448.6656 847.7696 464.2816 838.7072 486.1952 838.7072 508.2624L838.7072 508.2624Z"
                fill="#1296db">
          </path>
        </svg>
      </div>
    </template>
  </div>
</template>
<script>
  const TURNTOLEFT = 'left'
  const TURNTORIGHT = 'right'
  const HIDDEN = 'hidden'
  const VISIBLE = 'visible'
  export default {
    name: 'book',
    props: {
      width: {
        type: String,
        default: '600px'
      },
      height: {
        type: String,
        default: '350px'
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
            }, this.duration + 50)
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
            }, this.duration + 50)
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
