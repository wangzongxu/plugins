## 简介
- iselect是一个下拉列表插件。
- 相对于原生select而言，iselect可以自定义样式，与整体网站风格一致，此插件还有很多事件，方便操作联动下拉，例如：省市区联动。
- 需要依赖jquery。
- 版本：v0.1。
### 第一个实例
- html
<!--<div>-->
    //用了bootstrap样式
    <div class="col-xs-2">
        <div class="form-control" id="category">  //实例化后会自带selectcol类名，可以自定义样式
            <p>电影</p>
            <i></i>
            <ul>
                这里是iselect渲染区域
            </ul>
        </div>
    </div>
<!--</div>-->

- js
<!--<div>-->
@name  ISelect 下拉列表插件
@param {ele:'容器原生或者jq元素',
................content:'默认显示的标题',
................list:'下拉列表（str）',
................showCb:'列表为下拉状态的回调',
................hideCb:'列表为隐藏状态的回调',
................changeContentCb:'当显示标题内容改变的回调',
................ready:'初始化完毕的回调'}
@returns {ISelect}：返回当前实例
@constructor ：ISelect
<!--</div>-->
``
var one = new ISelect({
``
``
    ele: '#category',
    ``
    ``
    content: '电影',
    ``
    ``
    list: '<li class="left">LI1</li><li class="left">LI2</li><li class="left">LI3</li><li  class="left">LI4</li><li  class="left">LI5</li><li  class="left">LI6</li>',
    ``
    ``
    showCb: function () {
    ``
    ``
        console.log('show')
        ``
        ``
    },
    ``
    ``
    hideCb: function () {
      ``
      ``
        console.log('hide')
    ``
    ``
    },
    ``
    ``
    ready: function () {
      ``
      ``
        console.log('初始化完毕！');
    ``
    ``
    },
    ``
    ``
    changeContentCb: function (e) {//params：所点击的那一项
    ``
    ``
        console.log('选中了这一项');
      ``
      ``
        console.log('所选内容',e.html())
        ``
        ``
        two.refresh({//刷新实例l的数据，见下边注释
          ``
          ``
            //content:'fushanxing',
            ``
            ``
            list: '<li class="left">LI1</li><li  class="left">LI2</li><li  class="left">LI3</li>'
        ``
        ``
        })
    ``
    ``
    }
``
``
});   
``
             <!--<div>-->
             two.refresh
             实例上可调用此方法进行联动或者刷新列表
             @name  refresh 下拉列表的刷新方法
             @param {content:'默认显示的标题',list:'下拉列表（str）'}
             <!--</div>-->
``
var two = new ISelect({
``
``
    ele: '#category2',
    ``
    ``
})
``