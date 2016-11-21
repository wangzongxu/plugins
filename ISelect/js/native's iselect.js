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
        this.ele = (typeof option.ele==='object')?option.ele:document.querySelector(option.ele);//要替换的下拉框
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
        this.body = document.querySelector('body');
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
            this.select = document.createElement('div');
            this.select.classList.add('select-pull-down');
            this.headBox = document.createElement('div');
            this.headBox.classList.add('select-down-head');
            this._title = document.createElement('p');
            this._title.classList.add('select-title');
            this.listBox = document.createElement('ul');
            this.listBox.classList.add('select-list-down');
            var i = document.createElement('i');
            i.classList.add('select-arrow-down');
            this.headBox.appendChild(this._title);
            this.headBox.appendChild(i);
            this.select.appendChild(this.headBox);
            this.select.appendChild(this.listBox);
        },
        appendDoc: function () {/*插入*/
            var list = this.ele.innerHTML,
                that = this;
            list = list.replace(/<(?:option)(.*?)>([\s\S]*?)<\/(?:option)>/ig, function (REG, G1, G2) {
                return '<' + 'li' + '' + G1 + '>' + G2 + '</' + 'li' + '>'
            });
            that.listBox.innerHTML=list;
            that.list = that.listBox.querySelectorAll('li');
            /*赋值数据*/
            that.$prop.value = that.getText().value;
            that.$prop.disabled = that.getText().disabled;
            /*设置初始显示*/
            var nativeStyle=getComputedStyle(that.ele);
            that.select.style.width=nativeStyle.width;
            that.select.style.height=nativeStyle.height;
            that.select.style.lineHeight=nativeStyle.height;
            that.ele.style.display='none';
            that.ele.parentNode.insertBefore(that.select,that.ele)
        },
        toggle: function () {/*切换动画*/
            var sBox = this.select,
                that = this;
            var showFn=function(e){
                if (that.select.classList.contains('disabled'))return;
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    that.select.classList.remove('select-top');
                    if (that.hideCb)that.hideCb.call(that)
                } else {
                    this.classList.add('active');
                    that.htmlCH = document.documentElement.clientHeight || document.body.clientHeight;
                    that.htmlST = document.documentElement.scrollTop || document.body.scrollTop;
                    that.boxH = that.listBox.offsetHeight;
                    that.eleH = sBox.offsetHeight;
                    that.eleT = that.util.offsetTop(sBox) - that.htmlST;
                    that.overH = that.htmlCH - that.eleH - that.eleT;
                    if (that.overH < that.boxH) {
                        that.select.classList.add('select-top')
                    }
                    //console.log(that.overH,'<=',that.boxH);
                    if (that.showCb)that.showCb.call(that)
                }
            }
            var bodyFn=function (e) {
                if (that.select.classList.contains('disabled'))return;
                var flag = true;
                var parList=sBox.parentElement.querySelectorAll('*');
                for(var i=0;i<parList.length;i++){
                    var item=parList[i];
                     if (item == e.target) {
                        flag = false;
                    }
                }
                if (flag) {
                    if (sBox.classList.contains('active')) {
                        sBox.classList.remove('active');
                        if (that.hideCb)that.hideCb.call(that)
                    }
                }
            }
            sBox.removeEventListener('click',showFn,false);
            sBox.addEventListener('click',showFn,false);
            that.body.removeEventListener('click',bodyFn,false);
            that.body.addEventListener('click',bodyFn,false);
        },
        choose: function () {/*选择*/
            var that = this;
            for(var i=0;i<that.list.length;i++){
                that.list[i].addEventListener('click',function (e) {
                that.$prop.value = $(this).attr('value');
                if (that.chooseCb)that.chooseCb.call(that, $(this))
                },false);
            }
            that.ele.addEventListener('input',function () {
                var _data = that.getText();
                that.$prop.value = _data.value;
            })
        },
        getText: function () {//取得原生下拉框内容和值
            var index = this.ele.selectedIndex,
                _option = this.ele.options[index],
                isDisabled = this.ele.disabled;
            return {
                html: _option.innerHTML,
                value: _option.value,
                disabled: isDisabled
            }
        },
        setSelect: function (val) {
            var that = this;
            //设置value
            that.select.setAttribute('value', val);
        },
        getSelect: function () {//iSelect数据
            var box = this.select,
                title = this._title;
            return {
                html: title.innerHTML,
                value: box.getAttribute('value'),
                disabled: box.classList.contains('disabled')
            }
        },
        linkage: function () {
            var that = this;
            Object.defineProperties(that.$prop, {
                'value': {
                    configurable: true,
                    enumerable: true,
                    set: function (val) {
                        var options=that.ele.options,
                            anyHas= 0;
                        for(var i=0;i<options.length;i++){
                            if(options[i].value!=val){
                                anyHas++
                            }
                        }
                        if(anyHas==options.length){
                            throw new Error('刷新失败:在下拉项中并未找到value='+val+'的option!')
                        }
                        that.ele.value=val;
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
                        that._title.innerHTML=viewVal;//设置显示内容
                        that.select.setAttribute('title', viewVal);//设置title
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
                            that.select.classList.add('disabled');
                            that.ele.disabled=true;
                            that.select.classList.contains('active') ? that.select.classList.remove('active') : null;
                        } else {
                            that.select.classList.remove('disabled');
                            that.ele.disabled=false
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
                        //console.log('所有数据的属性:'+key+'没有改变','标准:',data[key],'原生:', native_data[key],'iselect:', select_data[key])
                        newData[key]=data[key]
                    }else if(data[key]!=native_data[key] && data[key]!=select_data[key]){//都变化了
                       // console.log('属性:'+key+'都变了,将以原生下拉框为准.','标准:',data[key],'原生:', native_data[key],'iselect:', select_data[key])
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
        },
        util:{
            offsetTop:function(node){
                var par=node.offsetParent;
                var top=node.offsetTop;
                  while(par){
                  top+=par.clientTop;
                 top+=par.offsetTop;
                 par=par.offsetParent;
               }
             return top
            }
        }
    };
    return ISelect
}))
