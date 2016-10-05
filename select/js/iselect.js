/**
 * @name  ISelect 下拉列表插件
 * @param {ele:'容器原生或者jq元素',
     *         content:'默认显示的标题',
     *         list:'下拉列表（str）',
     *         showCb:'列表为下拉状态的回调',
     *         hideCb:'列表为隐藏状态的回调',
     *         changeContentCb:'当显示标题内容改变的回调',
     *         ready:'初始化完毕的回调'}
 * @returns {ISelect}：返回当前实例
 * @constructor ：ISelect
 */
/**
 * 实例上可调用此方法进行联动或者刷新列表
 * @name  refresh 下拉列表的刷新方法
 * @param {content:'默认显示的标题',list:'下拉列表（str）'}
 */
var ISelect = function (option) {
    this.ele = option.ele instanceof $ ? option.ele : $(option.ele);//转换成jq对象
    this.text = null;//p
    this.row = null;//li
    this.box = null;//ul
    this.eLength = this.ele.length;//选中元素数量
    this.reg = /<([a-z]+)(?:.*?)>([\s\S]*?)<\/([a-z]+)>/ig;
    this.list = typeof option.list == 'string' ? option.list : '<li>请插入 “li” 列表</li>';//手动拼接下拉列表字符串
    this.content = option.content || this.reg.exec(this.list);//可自定义选中的内容，默认是列表的第一项
    this.showCb = option.showCb instanceof Function ? option.showCb : null;//下拉框显示时候的回调
    this.hideCb = option.hideCb instanceof Function ? option.hideCb : null;//下拉框隐藏时候的回调
    this.changeContentCb = option.changeContentCb instanceof Function ? option.changeContentCb : null;//在选择某一条内容后的回调
    this.ready = option.ready instanceof Function ? option.ready : null;//初始化的回调
    this.body = $('body');
    this.ele[0].reset=false;
    this.init();
    return this
};
ISelect.prototype = {
    constructor: ISelect,
    init: function () {
        if (!this.ele[0].reset) {
            this.appendList();
            this.toggle();
            this.hide();
            this.changeContent();
            this.readyStatus()
        }
    },
    refresh: function (newObj) {
        this.list = typeof newObj.list == 'string' ? newObj.list : '<li>请插入新的 “li” 列表</li>';
        this.content = newObj.content || this.reg.exec(this.list);
        this.appendList();
        this.changeContent();
    },
    appendList: function () {
        if (this.eLength != 1) {
            throw new Error('“ele”参数错误。需输入正确的单个元素！')
        }
        this.ele.addClass('selectcol');
        this.box = this.ele.children('ul');
        this.box.html(this.list);
    },
    toggle: function () {
        var that = this;
        that.ele.on('click', function (e) {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                if (that.showCb)that.showCb()
            } else {
                if (that.hideCb)that.hideCb()
            }
        })
    },
    hide: function () {
        var that = this;
        that.body.on('click', function (e) {
            var flag = true;
            that.ele.parent().find('*').each(function (index, item) {
                if (item == e.target) {
                    flag = false;
                    return
                }
            });
            if (flag) {
                if (that.ele.hasClass('active')) {
                    that.ele.removeClass('active');
                    if (that.hideCb)that.hideCb()
                }
            }
        })
    },
    changeContent: function () {
        this.text = this.ele.children('p');
        this.row = this.ele.find('ul>li');
        if (this.content && this.content instanceof Array) {//没有传标题，并且是列表第一个li捕获的结果
            this.reg.lastIndex = 0;
            var regs = null;
            while (regs = this.reg.exec(this.list)) {
                if (!(regs[1].toLowerCase() == regs[3].toLowerCase() && regs[3].toLowerCase() == 'li')) {//插入的列表中有的不是li标签
                    console.error('“list”参数错误，不可以插入\<' + regs[1] + '\>标签');
                }
            }
            this.text.html(this.content[2]);
        } else if (typeof this.content == 'string') {
            this.text.html(this.content);
        } else {//没有传标题也没有匹配到正确的标签
            throw new Error('“list”参数错误，需插入以\<li\>为列表的字符串')
        }
        var that = this;
        that.row.on('click', function (e) {
            that.text.html($(this).html());
            that.text.val($(this).html());//方便用jq的val()可以获取到
            that.text.attr('value',$(this).html());//只是为了显示在控制台元素内，方便查看
            that.ele.val($(this).html());//方便用jq的val()可以获取到
            that.ele.attr('value',$(this).html());//只是为了显示在控制台元素内，方便查看
            if (that.changeContentCb)that.changeContentCb($(this))
        })
    },
    readyStatus: function () {
        this.ele[0].reset = true;//同一个下拉列表只能绑定一次
        if (this.ready)this.ready()
    }
};

var one = new ISelect({
    ele: '#category',
    content: '电影',
    list: '<li class="left">LI1</li><li class="left">LI2</li><li class="left">LI3</li><li  class="left">LI4</li><li  class="left">LI5</li><li  class="left">LI6</li>',
    showCb: function () {
        console.log('show')
    },
    hideCb: function () {
        console.log('hide')
    },
    ready: function () {
        console.log('初始化完毕！');
    },
    changeContentCb: function (e) {//params：所点击的那一项
        console.log('选中了这一项');
        console.log('所选内容',e.html())
        two.refresh({//刷新实例l的数据
            //content:'fushanxing',
            list: '<li class="left">LI1</li><li  class="left">LI2</li><li  class="left">LI3</li>'
        })
    }
});
var two = new ISelect({
    ele: '#category2',
    content: '釜山行',
    hideCb: function () {
        console.log('hide2')
    },
    showCb: function () {
        console.log('show2')
    },
    changeContentCb: function () {
        console.log('changeContentCb2');
    }
})