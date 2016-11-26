(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ISelect = factory();
    }
}(this,function(){
    var ISelect = function (option) {
        this.ele = option.ele instanceof $?option.ele:$(option.ele);//要替换的下拉框
        this.select = null;//最外层div
        this.headBox = null;//头部div
        this._title = null;//标题p
        this.list = null;//每一项li
        this.listBox = null;//li的父级ul
        this.hideCb = option.hideCb||null;//隐藏回调
        this.showCb = option.showCb||null;//展示回调
        this.chooseCb =option.chooseCb|| null;//选择某一项后的回调
        this.ready = option.ready||null;//初始化回调
        this.$prop = {//属性对象
            html: null,//显示的内容和title   改变这个属性,只是改变了显示的内容,并不会影响ISelect下拉框value的变化和原生下拉框的value变化（防止死循环），
            value: null,//值   改变这个属性  html属性会跟着变化，也就是显示的内容会跟着变化 (value改变后html会跟着变,但是html改变,value不会变)
            disabled: false//是否禁用
        };
        this.body = $('body');
        this.init();
        return this
    };
    ISelect.prototype = {
        constructor: ISelect,
        init: function () {
            this.create();
            this.linkage();
            this.appendDoc();
            this.toggle();
            this.choose();
            this.readyStatus();
        },
        create: function () {/*创建*/
            this.select = $(document.createElement('div')).addClass('select-pull-down');
            this.headBox = $(document.createElement('div')).addClass('select-down-head');
            this._title = $(document.createElement('p')).addClass('select-title');
            var i = $(document.createElement('i')).addClass('select-arrow-down');
            this.listBox = $(document.createElement('ul')).addClass('select-list-down');
            this.headBox.append(this._title, i);
            this.select.append(this.headBox, this.listBox);
        },
        appendDoc: function () {/*插入*/
            var list = this.ele.html(),
                that = this;
            list = list.replace(/<(?:option)(.*?)>([\s\S]*?)<\/(?:option)>/ig, function (REG, G1, G2) {
                return '<' + 'li' + '' + G1 + '>' + G2 + '</' + 'li' + '>'
            });
            that.listBox.html(list);
            that.list = that.listBox.find('li');
            /*赋值数据*/
            that.$prop.value = that.getText().value;
            that.$prop.disabled = that.getText().disabled;
            /*设置初始显示*/
            that.select.css({
                width: that.ele.width(),
                height: that.ele.height(),
                lineHeight: that.ele.height() + 'px'
            });
            that.ele.hide().before(that.select);
        },
        toggle: function () {/*却换动画*/
            var sBox = this.select,
                that = this;
            var selectFn=function (e) {
                if (that.select.hasClass('disabled'))return;
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    that.select.removeClass('select-top');
                    if (that.hideCb)that.hideCb.call(that,e)
                } else {
                    $(this).addClass('active');
                    that.htmlCH = document.documentElement.clientHeight || document.body.clientHeight;
                    that.htmlST = document.documentElement.scrollTop || document.body.scrollTop;
                    that.boxH = that.listBox.outerHeight();
                    that.eleH = sBox.outerHeight();
                    that.eleT = sBox.offset().top - that.htmlST;
                    that.overH = that.htmlCH - that.eleH - that.eleT;
                    if (that.overH < that.boxH) {
                        that.select.addClass('select-top')
                    }
                    //console.log(that.overH,'<=',that.boxH);
                    if (that.showCb)that.showCb.call(that,e)
                }
            };
            var bodyFn=function (e) {
                if (that.select.hasClass('disabled'))return;
                var flag = true;
                sBox.parent().find('*').each(function (index, item) {
                    if (item == e.target) {
                        flag = false;
                    }
                });
                if (flag) {
                    if (sBox.hasClass('active')) {
                        sBox.removeClass('active');
                        if (that.hideCb)that.hideCb.call(that,e)
                    }
                }
            };
            sBox.off('click',selectFn).on('click',selectFn);
            that.body.off('click',bodyFn).on('click',bodyFn);
        },
        choose: function () {/*选择*/
            var that = this;
            that.list.on('click', function (e) {
                that.$prop.value = $(this).attr('value');
                if (that.chooseCb)that.chooseCb.call(that, $(this))
            });
            that.ele.on('input', function () {
                var _data = that.getText();
                that.$prop.value = _data.value;
            });
        },
        getText: function () {//取得原生下拉框内容和值
            var index = this.ele[0].selectedIndex,
                _option = this.ele[0].options[index],
                isDisabled = this.ele.prop('disabled');
            return {
                html: _option.innerHTML,
                value: _option.value,
                disabled: isDisabled
            }
        },
        setSelect: function (val) {
            var that = this;
            //设置value
            that.select.attr('value', val);
        },
        getSelect: function () {//iSelect数据
            var box = this.select,
                title = this._title;
            return {
                html: title.html(),
                value: box.attr('value'),
                disabled: box.hasClass('disabled')
            }
        },
        linkage: function () {
            var that = this;
            Object.defineProperties(that.$prop, {
                'value': {
                    configurable: true,
                    enumerable: true,
                    set: function (val) {
                        var options=that.ele[0].options,
                            anyHas= 0;
                        for(var i=0;i<options.length;i++){
                            if(options[i].value!=val){
                                anyHas++
                            }
                        }
                        if(anyHas==options.length){
                            throw new Error('刷新失败:在下拉项中并未找到value='+val+'的option!')
                        }
                        that.ele.val(val);
                        var html = that.getText().html;
                        that.setSelect(val);
                        that.$prop.html = html;
                        this.newValue = val;
                    },
                    get: function () {
                        return this.newValue
                    }
                },
                'html': {
                    configurable: true,
                    enumerable: true,
                    set: function (viewVal) {
                        that._title.html(viewVal);//设置显示内容
                        that.select.attr('title', viewVal);//设置title
                        this.newHtml = viewVal;
                    },
                    get: function () {
                        return this.newHtml
                    }
                },
                'disabled': {
                    configurable: true,
                    enumerable: true,
                    set: function (val) {
                        if (val) {
                            that.select.addClass('disabled');
                            that.ele.prop('disabled', true);
                            that.select.hasClass('active') ? that.select.removeClass('active') : null;
                        } else {
                            that.select.removeClass('disabled');
                            that.ele.prop('disabled', false)
                        }
                        this.newDisabled = val
                    },
                    get: function () {
                        return this.newDisabled
                    }
                }
            })
        },
        watch: function () {/*检查变化*/
            var data = this.$prop,//标准数据
                native_data = this.getText(),//原生下拉数据
                select_data = this.getSelect();//iSelect数据
            var newData={};
            for (var key in native_data) {
                if (data.hasOwnProperty(key)&&key!='html'){//不进行显示内容检测
                    if (data[key] == native_data[key] && data[key] == select_data[key]) {//都未变化
                       // console.log('所有数据的属性:'+key+'没有改变','标准:',data[key],'原生:', native_data[key],'iselect:', select_data[key])
                        newData[key]=data[key]
                    }else if(data[key]!=native_data[key] && data[key]!=select_data[key]){//都变化了
                        //console.log('属性:'+key+'都变了,将以原生下拉框为准.','标准:',data[key],'原生:', native_data[key],'iselect:', select_data[key])
                        newData[key]=native_data[key]//以原生下拉为准
                    }else if(data[key]!=select_data[key]){//ISelect数据变化了
                        //console.log('ISelect属性:'+key+'变了,将以ISelect为准.','标准:',data[key],'原生:', native_data[key],'iselect', select_data[key])
                        newData[key]=select_data[key]
                    }else if(data[key]!=native_data[key]){//原生下拉框变化了
                        //console.log('原生下拉框属性:'+key+'变了,将以原生下拉框为准.','标准:',data[key],'原生:', native_data[key],'iselect:', select_data[key])
                        newData[key]=native_data[key]
                    }
                }
            }
            return newData
        },
        refresh: function () {
            var newData=this.watch();
            //console.log('新数据:',newData);
            for(var key in newData){
                if(newData.hasOwnProperty(key)){
                    this.$prop[key]=newData[key]
                }
            }
        },
        readyStatus: function () {
            if (this.ready)this.ready.call(this)
        }
    };
    return ISelect
}))
