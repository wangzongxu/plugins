;(function (name, factory) {
    if(typeof define ==='function'){
        define(factory)
    }else if(typeof module !=='undefined' && module.exports){
        module.exports=factory()
    }else{
        this[name]=factory()
    }
})('Animate',function(){
    var EFFECT = {
        //匀速
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        //指数衰减的反弹缓动
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - EFFECT.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return EFFECT.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return EFFECT.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
        //二次方的缓动
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        //三次方的缓动
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        //四次方的缓动
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        //五次方的缓动
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        //正弦曲线的缓动
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        //指数曲线的缓动
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        //圆形曲线的缓动
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        //超过范围的三次方缓动
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        //指数衰减的正弦曲线缓动
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        }
    };
    var MAP={
        1:EFFECT.Linear,
        2:EFFECT.Bounce.easeIn,
        3:EFFECT.Bounce.easeOut,
        4:EFFECT.Bounce.easeInOut,
        5:EFFECT.Quad.easeIn,
        6:EFFECT.Quad.easeOut,
        7:EFFECT.Quad.easeInOut,
        8:EFFECT.Cubic.easeIn,
        9:EFFECT.Cubic.easeOut,
        10:EFFECT.Cubic.easeInOut,
        11:EFFECT.Quart.easeIn,
        12:EFFECT.Quart.easeOut,
        13:EFFECT.Quart.easeInOut,
        14:EFFECT.Quint.easeIn,
        15:EFFECT.Quint.easeOut,
        16:EFFECT.Quint.easeInOut,
        17:EFFECT.Sine.easeIn,
        18:EFFECT.Sine.easeOut,
        19:EFFECT.Sine.easeInOut,
        20:EFFECT.Expo.easeIn,
        21:EFFECT.Expo.easeOut,
        22:EFFECT.Expo.easeInOut,
        23:EFFECT.Circ.easeIn,
        24:EFFECT.Circ.easeOut,
        25:EFFECT.Circ.easeInOut,
        26:EFFECT.Back.easeIn,
        27:EFFECT.Back.easeOut,
        28:EFFECT.Back.easeInOut,
        29:EFFECT.Elastic.easeIn,
        30:EFFECT.Elastic.easeOut,
        31:EFFECT.Elastic.easeInOut
    }
    var utils = {
            getCss: function getCss(ele, attr) {
                var res = null, reg = null;
                if ("getComputedStyle" in window) {
                    res = window.getComputedStyle(ele, null)[attr];
                } else {
                    if (attr == "opacity") {
                        var str = ele.currentStyle["filter"];
                        var reg = /alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)/;
                        res = reg.test(str) ? RegExp.$1 / 100 : 1;
                    } else {
                        res = ele.currentStyle[attr];
                    }
                }
                reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/;
                if(res=='auto'){
                    console.warn(ele.tagName+'元素的属性:'+attr+'的值为auto，请显式的设置该属性的默认值')
                }
                return reg.test(res) ? parseFloat(res) : res;
            },
            setCss: function (curEle, attr, value) {
                //float
                if (attr == 'float') {
                    curEle.style["float"] = value;
                    curEle.style["cssFloat"] = value;//火狐
                    curEle.style["styleFloat"] = value;//ie
                    return;
                }
                //透明度的处理
                if (attr === 'opacity') {
                    curEle.style.opacity = value;
                    curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
                    return;
                }
                //加单位的处理；
                var reg = /^width|height|top|right|bottom|left|fontSize|((margin|padding)(top|right|bottom|left)?)$/i;
                var reg2 = /[+-]?(\d|[1-9]\d+)(\.\d+)?$/;
                if (reg.test(attr) && reg2.test(value)) {  //是这些属性，并且没写单位
                    value += 'px';
                }
                curEle.style[attr] = value;
            },
            setGroupCss: function (curEle, options) {
                if (options.toString() !== '[object Object]') {
                    return;
                }
                for (var attr in options) {
                    this.setCss(curEle, attr, options[attr])
                }
            },
            css: function (curEle) {
                var argTwo = arguments[1];
                if (typeof argTwo === 'string') {
                    if (typeof arguments[2] !== 'undefined') {// 单个设置
                        this.setCss(curEle, argTwo, arguments[2]);
                        return;
                    } else {//获取
                        return this.getCss(curEle, argTwo)
                    }
                }
                argTwo = argTwo || 0;
                if (argTwo.toString() === '[object Object]') {//设置一组样式
                    this.setGroupCss(curEle, argTwo)
                }
            },
            assign:function (det, target) {
                for(var k in target){
                    if(target.hasOwnProperty(k)){
                        det[k]=target[k]
                    }
                }
                return det
            }
    };

    function Pm(cb) {
        'use strict';
        this.error = function () {};
        this.task = [];
        var that = this;
        setTimeout(function () {
            cb(function (data) {
                var fn = that.task.shift();
                if(typeof fn === 'undefined'){
                    return
                }
                var isPm = fn(data);
                if (isPm instanceof Pm) {
                    for(var i in that.task){
                        isPm.task.push(that.task[i]);
                    }
                    isPm.error=that.error;
                } else {
                    fn = that.task.shift();
                    fn && fn(isPm)
                }
            }, function (err) {
                that.error(err)
            })
        })
    }
    Pm.prototype = {
        resolve: function (success) {
            this.then(success)
            return this
        },
        reject: function (error) {
            this._catch(error)
            return this
        },
        then: function (success, error) {
            if(!success instanceof Function){
                throw new Error('params must be a function');
            }
            if(error && !error instanceof Function){
                throw new Error('params must be a function');
            }
            this.task.push(success);
            this.error = error;
            return this
        },
        _catch: function (errFn) {
            if(!errFn instanceof Function){
                throw new Error('params must be a function');
            }
            this.error=errFn
        }
    }
    
    function Animate(ele){
            if(!ele){
                throw new Error('缺少操作元素')
            }
            if(utils.css(ele,'position')=='static'){
                console.warn('指定元素未设置定位属性')
            }
            this.option={
              ele:ele
            };
    }
    Animate.prototype={
      go:function(option){
          var that=this;
        return new Pm(function (resolve) {
            if(typeof option.target==='undefined'){
                throw new Error('缺少目标参数')
            }
            var defaultOption={
                ele:that.option.ele,
                duration:2000,
                effect:1,
                step:15
            }
            that.option=utils.assign(defaultOption,option);
            if(!/^[1-9]$|^[1-2]\d$|^3[0-1]$/.test(that.option.effect)){
                that.option.effect=1
            }
            clearInterval(that.option.ele.timer);
            var curTime = 0,
                begin = {},
                change = {};
            for (var attr in that.option.target) {
                begin[attr] = utils.css(that.option.ele, attr);
                change[attr] = parseFloat(that.option.target[attr]) - begin[attr];
            }
            that.option.ele.timer=setInterval(function(){
                if(curTime>=that.option.duration){
                    utils.css(that.option.ele,that.option.target);
                    clearInterval(that.option.ele.timer);
                    that.option.finish&&that.option.finish.call(that.option.ele);
                    resolve()
                    return
                }
                curTime+=that.option.step;
                for(var attr in change){
                    var curPos=MAP[that.option.effect](curTime,begin[attr],change[attr],that.option.duration);
                    utils.css(that.option.ele,attr,curPos);
                }
            },that.option.step)
        })
      },
      stop:function(){
        clearInterval(this.option.ele.timer);
      }
    }

   return Animate
})
