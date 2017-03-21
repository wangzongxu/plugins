;
(function(name,factory) {
  if(typeof define === 'function'){
    define(factory)
  }else if(typeof module !=='undefined' && module.exports){
    module.exports=factory()
  }else{
    this[name]=factory()
  }
})('Drag', function() {
    function Drag(option) {
        var config = {
            horizontal: true,
            scopeLimit: false,
            vertical: true
        }
        if (!option.ele) {
            throw new Error('未找到目标元素')
        }
        this.extend(config, option);
        this.extend(this, config);
        this.ele.style.position = 'absolute';
        this.ele.style.margin=0
        this.init();
        return this
    }
    Drag.prototype = {
        init: function() {
            if (this.ele.ISDRAG) {
                return
            }
            this.x = null;
            this.y = null;
            this.mx = null;
            this.my = null;
            this.minX = -9999;
            this.minY = -9999;
            this.maxX = 9999;
            this.maxY = 9999;
            this.currentX = null;
            this.currentY = null;
            this.width = null;
            this.height = null;
            this.ele.ISDRAG = true;
            this.ONMOUSEDOWN = 'mousedown';
            this.ONMOUSEMOVE = 'mousemove';
            this.ONMOUSEUP = 'mouseup';
            this.isMobile = false;
            this.testBrowser();
            this.START = this.start.bind(this);
            this.DRAGING = this.drag.bind(this);
            this.END = this.end.bind(this);
            this.ele.addEventListener(this.ONMOUSEDOWN, this.START, false)
        },
        limit: function() {
            if (!this.scopeLimit) {
                return
            }
            if (this.scopeLimit == 'screen') {//限制全屏幕
                this.minX = 0-this.offset(this.ele.offsetParent).l;
                this.minY = 0-this.offset(this.ele.offsetParent).t;
                this.maxX = (document.documentElement.clientWidth || document.body.clientWidth) - this.ele.offsetWidth - this.offset(this.ele.offsetParent).l;
                this.maxY = (document.documentElement.clientHeight || document.body.clientHeight) - this.ele.offsetHeight - this.offset(this.ele.offsetParent).t;
            } else if (this.scopeLimit.tagName) {
                var par = this.scopeLimit;
                if (this.isParent(this.ele, par)) {
                  if(par==this.ele.offsetParent){//定位元素和限制元素一样
                    this.minX = 0;
                    this.minY = 0;
                    this.maxX = par.offsetWidth + this.minX - this.ele.offsetWidth;
                    this.maxY = par.offsetHeight + this.minY - this.ele.offsetHeight;
                  }else{///定位元素和限制元素不一样
                    this.minX = 0 - (this.offset(this.ele.offsetParent).l-this.offset(par).l);
                    this.minY = 0 - (this.offset(this.ele.offsetParent).t-this.offset(par).t);
                    this.maxX = par.offsetWidth + this.minX - this.ele.offsetWidth;
                    this.maxY = par.offsetHeight + this.minY - this.ele.offsetHeight;
                  }
                } else {
                    console.warn('限制元素和目标元素没有后代关系')
                }
            } else if (typeof this.scopeLimit == 'object' && !this.scopeLimit.tagName) {
                this.extend(this, this.scopeLimit)
            }
        },
        start: function(e) {
            if(this.testMultipleFingers(e))return;
            if(this.isMobile){
              e.pageX = e.touches[0].pageX;
              e.pageY = e.touches[0].pageY;
            }
            this.x = this.offset(this.ele).l;
            this.y = this.offset(this.ele).t;
            this.mx = e.pageX;
            this.my = e.pageY;
            document.addEventListener(this.ONMOUSEMOVE, this.DRAGING, false);
            document.addEventListener(this.ONMOUSEUP, this.END, false);
            this.dragStart && this.dragStart.call(this, e)
        },
        drag: function(e) {
            if(this.testMultipleFingers(e))return;
            if(this.isMobile){
              e.pageX = e.touches[0].pageX;
              e.pageY = e.touches[0].pageY;
            }
            this.limit();
            var curX = e.pageX - this.mx + this.x - this.offset(this.ele.offsetParent).l;
            var curY = e.pageY - this.my + this.y - this.offset(this.ele.offsetParent).t;
            if (this.scopeLimit) {
                curX = curX < this.minX ? this.minX : curX;
                curX = curX > this.maxX ? this.maxX : curX;
                curY = curY < this.minY ? this.minY : curY;
                curY = curY > this.maxY ? this.maxY : curY;
            }
            this.currentX=curX;
            this.currentY=curY;
            this.width = this.ele.offsetWidth;
            this.height = this.ele.offsetHeight;
            this.offsetParent = this.ele.offsetParent;//readonly
            if (this.vertical) {
                this.ele.style.top = curY + 'px';
            }
            if (this.horizontal) {
                this.ele.style.left = curX + 'px';
            }
            this.draging && this.draging.call(this, e);
        },
        end: function(e) {
            if(this.testMultipleFingers(e))return;
            document.removeEventListener(this.ONMOUSEMOVE, this.DRAGING, false);
            document.removeEventListener(this.ONMOUSEUP, this.END, false);
            this.dragEnd && this.dragEnd.call(this, e)
        },
        destroy: function() {
            this.ele.removeEventListener(this.ONMOUSEDOWN, this.START, false)
        },
        extend: function(target, source) {
            for (var k in source) {
                if (source.hasOwnProperty(k)) {
                    target[k] = source[k]
                }
            }
            return target
        },
        offset: function(ele) {
            var l = ele.offsetLeft;
            var t = ele.offsetTop;
            var par = ele.offsetParent;
            while (par) {
                l += par.offsetLeft;
                t += par.offsetTop;
                par = par.offsetParent;
            }
            return {
                l: l,
                t: t
            };
        },
        isParent: function(child, par) {
            var eachPar = child.parentNode;
            while (eachPar) {
                if (eachPar == par) {
                    return true
                }
                eachPar = eachPar.parentNode
            }
            return false
        },
        testBrowser: function() {
            if (/Mobile/.test(navigator.userAgent)) {
                this.ONMOUSEDOWM = 'touchstart';
                this.ONMOUSEMOVE = 'touchmove';
                this.ONMOUSEUP = 'touchend';
                this.isMobile=true
            }
        },
        testMultipleFingers:function(e){
          if(e.touches && e.touches.length>1){
            return true
          }
            return false
        }
    }
    return Drag
})
