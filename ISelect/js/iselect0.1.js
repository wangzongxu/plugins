/**
 * @name  ISelect 下拉列表插件
 * @param {ele:'容器原生或者jq元素',
     *         content:'默认显示的标题',
     *         list:'下拉列表（str）',
     *         showCb:'列表为下拉状态的回调',
     *         hideCb:'列表为隐藏状态的回调',
     *         changeContentCb:'当选择下拉列表中的某一项的回调',this=>ele,事件对象event=>点击的元素
     *		   bindEvent:'只绑定事件，不进行列表渲染（在后台渲染列表的时候，或者不需要动态渲染的时候）'		
     *         ready:'初始化完毕的回调'this=>ele}
 * @returns {ISelect}：返回当前实例
 * @constructor ：ISelect
 */
/**
 * 实例上可调用此方法进行联动或者刷新列表
 * @name  refresh 下拉列表的刷新方法
 * @param {content:'默认显示的标题',list:'下拉列表（str）'}
 * 例：var s = new ISelect({
				
		  })

 s.refresh({
				
	 	  })
 */
/*select--------------*/
var ISelect = function (option) {
    this.ele = option.ele instanceof $ ? option.ele : $(option.ele);//转换成jq对象
    this.text = null;//p
    this.row = null;//li
    this.box = null;//ul
    this.eLength = this.ele.length;//选中元素数量
    this.reg = /<([a-z]+)(?:.*?)>([\s\S]*?)<\/([a-z]+)>/ig;
    this.list = typeof option.list == 'string' ? option.list : '<li>请选择</li>';//使用时根据需要手动拼接下拉列表的li字符串
    this.content = option.content || this.reg.exec(this.list);//可自定义选中的内容，默认是列表的第一项
    this.showCb = option.showCb instanceof Function ? option.showCb : null;//下拉框显示时候的回调
    this.hideCb = option.hideCb instanceof Function ? option.hideCb : null;//下拉框隐藏时候的回调
    this.changeContentCb = option.changeContentCb instanceof Function ? option.changeContentCb : null;//在选择某一条内容后的回调
    this.ready = option.ready instanceof Function ? option.ready : null;//初始化的回调
    this.bindEvent = option.bindEvent || false;
    this.body = $('body');
    this.init();
    return this
};
ISelect.prototype = {
    constructor: ISelect,
    init: function () {
        if (!this.ele[0].reset) {
            this.ele.addClass('selectcol');
            if(!this.bindEvent){//只绑定事件，不进行数据插入
                this.appendList();
            }
            this.toggle();
            this.hide();
            this.changeContent();
            this.readyStatus();
        }
    },
    refresh: function (newObj) {
        this.list = typeof newObj.list == 'string' ? newObj.list : '<li>请选择</li>';
        this.content = newObj.content || this.reg.exec(this.list);
        this.appendList();
        this.changeContent();
    },
    appendList: function () {
        if (this.eLength != 1) {
            throw new Error('“ele”参数错误。需输入正确的单个元素！')
        }
        this.box = this.ele.children('ul');
        this.box.html(this.list);
    },
    toggle: function () {
        if(this.ele.attr('disabled')){
            this.ele.css('cursor','no-drop');
            return
        }
        var that = this;
        if(!this.box){
            this.box = this.ele.children('ul');
        }
        that.ele.on('click', function (e) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                that.box.removeClass('iselectTop');
                if (that.hideCb)that.hideCb()
            } else {
                $(this).addClass('active');
                that.htmlCH=document.documentElement.clientHeight||document.body.clientHeight;
                that.htmlST=document.documentElement.scrollTop||document.body.scrollTop;
                that.boxH=that.box.outerHeight();
                that.eleH=that.ele.outerHeight();
                that.eleT=that.ele.offset().top-that.htmlST;
                that.overH=that.htmlCH-that.eleH-that.eleT;
                if(that.overH<that.boxH){
                    that.box.addClass('iselectTop')
                }
                console.log(that.overH,'<=',that.boxH);
                if (that.showCb)that.showCb()
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
        this.text = this.ele.find('span');
        this.row = this.ele.find('ul>li');
        if (this.content && this.content instanceof Array) {//没有传标题，并且是列表第一个li捕获的结果
            this.reg.lastIndex = 0;
            var regs = null;
            while (regs = this.reg.exec(this.list)) {
                if (!(regs[1].toLowerCase() == regs[3].toLowerCase() && regs[3].toLowerCase() == 'li')) {//插入的列表中有的不是li标签
                    console.error('“list”参数错误，不可以插入\<' + regs[1] + '\>标签');
                }
            }
            this.bindEvent?this.text.html(this.row.eq(0).html()):this.text.html(this.content[2]);
        } else if (typeof this.content == 'string') {
            this.text.html(this.content);
        } else {//没有传标题也没有匹配到正确的标签
            throw new Error('“list”参数错误，需插入以\<li\>为列表的字符串')
        }
        var that = this;
        that.text.attr('title',that.text.html());
        that.ele.val(this.row.eq(0).val());//方便用jq的val()可以获取到
        that.ele.attr('value',this.row.eq(0).val());//只是为了显示在控制台元素内，方便查看
        that.row.on('click', function (e) {
            that.text.html($(this).html());
            that.ele.val($(this).val());//方便用jq的val()可以获取到
            that.ele.attr('value',$(this).attr('value'));//只是为了显示在控制台元素内，方便查看
            that.text.attr('title',that.text.html());
            if (that.changeContentCb)that.changeContentCb.call(that.ele,$(this))
        });
        this.row.each(function(index,item){
            if($(item).attr('selected')){
                that.text.html($(item).html());
                that.ele.val($(item).val());//方便用jq的val()可以获取到
                that.ele.attr('value',$(item).attr('value'));//只是为了显示在控制台元素内，方便查看
            }
        });
    },
    readyStatus: function () {
        this.ele[0].reset = true;//同一个下拉列表只能绑定一次
        if (this.ready)this.ready.call(this.ele)
    }
};
/*--------------select*/
