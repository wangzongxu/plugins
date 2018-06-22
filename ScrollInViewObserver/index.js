;
(function (global, factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory()
	} else if (typeof define === 'function' && define.amd) {
		define(factory)
	} else {
		global.ScrollInViewObserver = factory()
	}
}(this, function () {
	function noop() {}

	function getOffset(el) {
		var left = el.offsetLeft
		var top = el.offsetTop
		var par = el.offsetParent

		while (par) {
			left += par.offsetLeft
			top += par.offsetTop
			par = par.offsetParent
		}
		return {
			top,
			left,
			height: el.offsetHeight,
			width: el.offsetWidth,
		}
	}

	/**
	 * 监听元素时候出现在页面中
	 * view { Element } 视窗元素
	 * subs { Array } { readonly } 正在监听的元素
	 * watching { boolean } { readonly } 是否正在监听
	 * observer { Function } { readonly } 当前滚动事件触发的回调函数
	 */
	function ScrollInViewObserver(view) {
		this.view = view || window
		this.subs = []
		this.watching = false
		this.observer = noop
	}

	ScrollInViewObserver.prototype = {
		/**
		 * 添加被监听元素
		 * @param el { Element } 元素
		 * @param opt { Object } 选项
		 *          once { Boolean } 只执行一次
		 *          view { Element } 视窗元素；默认窗口
		 *          immediate { Boolean } 添加监听时如果元素就已经位于屏幕中则立即触发回调
		 */
		add: function (el, opt = {}) {
			for (var i = 0; i < this.subs.length; i++) {
				var item = this.subs[i]
				if (item.el === el) return
			}
			var sub = this._subWrap(el, opt)
			this.subs.push(sub)
			this.start()
			if (opt.immediate) this._notify(sub)
		},

		/**
		 * 移除被监听元素
		 * @param el { Element } 元素
		 */
		remove: function (el) {
			if (typeof el === 'number') {
				this._removeByIndex(el)
				return
			}
			for (var i = 0; i < this.subs.length; i++) {
				var item = this.subs[i]
				if (item.el === el) {
					this._removeByIndex(i)
					return
				}
			}
		},

		/**
		 * 清空被监听元素
		 */
		clear: function () {
			this.subs = []
			this.stop()
		},

		/**
		 * 开始监听
		 */
		start: function () {
			if (this.watching) return
			this.watching = true
			this.observer = this._observer.bind(this)
			this.view.addEventListener('scroll', this.observer)
		},

		/**
		 * 停止监听
		 */
		stop: function () {
			if (!this.watching) return
			this.watching = false
			this.view.removeEventListener('scroll', this.observer)
		},

		_removeByIndex: function (index) {
			if (typeof index !== 'number') return
			this.subs.splice(index, 1)
			if (this.subs.length === 0) this.stop()
		},


		_subWrap: function (el, opt) {
			return {
				el: el,
				inFn: opt.in,
				outFn: opt.out,
				opt: opt,
			}
		},

		_observer: function () {
			for (var i = 0; i < this.subs.length; i++) {
				var sub = this.subs[i]
				this._notify(sub)
			}
		},

		_notify: function (sub) {
			var inFn = typeof sub.inFn === 'function' ? sub.inFn : noop
			var outFn = typeof sub.outFn === 'function' ? sub.outFn : noop
			var opt = sub.opt
			var isInView = this._inView(sub.el)

			if (isInView) {
				inFn.call(sub.el, sub.el)
				if (opt.once) this.remove(sub.el)
			} else {
				outFn.call(sub.el, sub.el)
			}
		},

		_inView: function (el) {
			var viewHeight = this.view.innerHeight ||
											 this.view.clientHeight ||
											 document.documentElement.clientHeight ||
											 document.body.clientHeight
			var scrollTop = this.view === window
										? (document.documentElement.scrollTop || document.body.scrollTop)
									  : this.view.scrollTop
			var coord = getOffset(el)

			if (
				viewHeight + scrollTop > coord.top &&
				coord.top + coord.height > scrollTop
			) {
				return true
			}
		}
	}

	return ScrollInViewObserver
}))
