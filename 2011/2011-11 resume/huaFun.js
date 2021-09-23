/************************************************************
*文件名称：huaFun.js
*创建时间：2011/8/20
*作	  者：huajs
*博	  客：http://www.cnblogs.com/huajs/ 
*版权声明：
*功能说明：封装常用操作，简化开发。
*用法及注意事项：
		1、用法见测试页面。
		2、模仿jQuery，包装html元素，构造链式调用。
		3、包括功能如下：
			检测浏览器、对象的扩展（拷贝）、事件封装（采用门面模式）
			DOM常用操作（获取、设置样式位置等）
		4、注意合理使用，若过度包装对象，会占用很多内存。
		5、注意避免JS对象与DOM对象互引用，造成内存泄漏。	
************************************************************/


(function (window, undefined) {
    // code goes here
    var ua = window.navigator.userAgent.toLowerCase();
    var _obj = {},
    toString = Object.prototype.toString,
    slice = Array.prototype.slice;

    //=========================== 检测浏览器 =========================
    var B = function (ua) {
        var b = {
            msie: /msie/.test(ua) && !/opera/.test(ua),
            opera: /opera/.test(ua),
            safari: /webkit/.test(ua) && !/chrome/.test(ua),
            firefox: /firefox/.test(ua),
            chrome: /chrome/.test(ua)
        };
        var vMark = "";
        for (var i in b) {
            if (b[i]) { vMark = /(?:opera|safari)/.test(i) ? "version" : i; break; }
        }
        b.version = vMark && RegExp("(?:" + vMark + ")[\\/: ]([\\d.]+)").test(ua) ? RegExp.$1 : "0";
        b.ie = b.msie;
        b.ie6 = b.msie && parseInt(b.version) == 6;
        b.ie7 = b.msie && parseInt(b.version) == 7;
        b.ie8 = b.msie && parseInt(b.version) == 8;
        b.ie9 = b.msie && parseInt(b.version) == 9;
        return b;
    } (ua);


    //========================= 对象（object）=========================

    // 浅拷贝
    _obj.copy = function (destination, source, override) {
        if (override === undefined) override = true; // 默认重写相同属性
        for (var property in source) {
            if (override || !(property in destination)) {
                destination[property] = source[property];
            }
        }
        return destination;
    };
    // 深拷贝
    _obj.deepcopy = function (destination, source) {
        for (var property in source) {
            var copy = source[property];
            if (destination === copy) continue;
            if (typeof copy === "object") {
                destination[property] = arguments.callee(destination[property] || {}, copy);
            } else {
                destination[property] = copy;
            }
        }
        return destination;
    };


    //=========================== 事件绑定 =========================

    var _E = {

        Bind: function (object, fun) {
            if (arguments.length == 1) {
                fun = arguments[0];
                object = null;
            }
            var args = slice.call(arguments, 2);
            return function () {
                return fun.apply(object, args.concat(slice.call(arguments)));
            }
        },
        BindAsEventListener: function (object, fun) {
            if (arguments.length == 1) {
                fun = arguments[0];
                object = null;
            }
            var args = slice.call(arguments, 2);
            return function (event) {
                return fun.apply(object, [fixEvent(event)].concat(args));
            }
        }

    };
    function fixEvent(event) { // 兼容IE和其他浏览器的event事件对象
        if (event.pageX) return event;
        event = window.event;
        event.pageX = event.clientX + D.getScrollLeft(event.srcElement);
        event.pageY = event.clientY + D.getScrollTop(event.srcElement);
        event.target = event.srcElement;
        event.stopPropagation = stopPropagation;
        event.preventDefault = preventDefault;
        var relatedTarget = {
            "mouseout": event.toElement, "mouseover": event.fromElement
        }[event.type];
        if (relatedTarget) { event.relatedTarget = relatedTarget; }

        return event;
    };
    function stopPropagation() { this.cancelBubble = true; };
    function preventDefault() { this.returnValue = false; };


    //==================== DOM（用作私用方法）=========================
    var D = {
        getScrollTop: function (node) {
            var doc = node ? node.ownerDocument : document;
            return doc.documentElement.scrollTop || doc.body.scrollTop;
        },
        getScrollLeft: function (node) {
            var doc = node ? node.ownerDocument : document;
            return doc.documentElement.scrollLeft || doc.body.scrollLeft;
        }
    };


    //==================== DOM操作 =========================
	
    /* 说明：
		1、传入元素id（可以多个），把元素包装成JS对象。
		2、利用函数_$的静态方法_$.method构造链式调用。
		3、实例方法（addEvent、removeEvent、setStyle）返回对象引用，即return this，
			这样可在使用中进行链式调用。
		4、取值器方法（contains、getScrollTop、getScrollLeft、rect、getStyle）
			有返回值，一般会赋给一个变量，不宜进行链式调用，不返回对象引用this，
			因此，使用时应该向$函数传入 一个元素id。
			
	*/

    (function () {

        function _$(els) {
            this.elements = [];
            for (var i = 0, len = els.length; i < len; ++i) {
                var element = els[i];
                if (typeof element == 'string') {
                    element = document.getElementById(element);
                }
                this.elements.push(element);
            }
            //return this.elements[0];
        };
        _$.method = function (name, fn) { // 构造链式调用
            this.prototype[name] = fn;
            return this;
        }
        // 赋值器方法进行链式调用
        _$.method("each", function (fn) {
            for (var i = 0, len = this.elements.length; i < len; ++i) {
                fn.call(this, this.elements[i]);
            }
        }).method("addEvent", function (type, fn) {
            var add = function (el) {
                if (window.addEventListener) {
                    el.addEventListener(type, fn, false);
                }
                else if (window.attachEvent) {
                    el.attachEvent('on' + type, fn);
                } else {
                    el["on" + type] = fn;
                }
            };
            this.each(function (el) {
                add(el);
            });
            return this;
        }).method("removeEvent", function (type, fn) {
            var add = function (el) {
                if (window.removeEventListener) {
                    el.removeEventListener(type, fn, false);
                } else if (window.detachEvent) {
                    el.detachEvent('on' + type, fn);
                } else {
                    el["on" + type] = null;
                }
            };
            this.each(function (el) {
                add(el);
            });
            return this;
        }).method("setStyle", function (styles) {
            this.each(function (el) {
                for (var prop in styles) {
                    if (!styles.hasOwnProperty(prop)) continue;
                    if (prop == "opacity" && B.ie) {
                        el.style.filter = (el.currentStyle && el.currentStyle.filter || "").replace(/alpha\([^)]*\)/, "") + " alpha(opacity=" + (styles[prop] * 100 | 0) + ")";
                    } else if (prop == "float") {
                        el.style[B.ie ? "styleFloat" : "cssFloat"] = styles[prop];
                    } else {
                        el.style[prop] = styles[prop];
                    }
                }
            });
            return this;
        });

        // 取值器方法（有返回值，一般会赋给一个变量，不宜进行链式调用）
        _$.prototype.contains = document.defaultView
	        ? function (b) { return !!(this.elements[0].compareDocumentPosition(b.elements[0]) & 16); }
	        : function (b) { return this.elements[0] != b.elements[0] && this.elements[0].contains(b.elements[0]); };

        _$.prototype.getScrollTop = D.getScrollTop;
        _$.prototype.getScrollLeft = D.getScrollLeft;
		
		// rect 返回元素相对于整个页面左上角的位置信息
        _$.prototype.rect = function () {        
            var left = 0, top = 0, right = 0, bottom = 0;
            //ie8的getBoundingClientRect获取不准确
            if (!this.elements[0].getBoundingClientRect || B.ie8) {
                var n = this.elements[0];
                while (n) { left += n.offsetLeft, top += n.offsetTop; n = n.offsetParent; };
                right = left + this.elements[0].offsetWidth; bottom = top + this.elements[0].offsetHeight;
            } else {
                var rect = this.elements[0].getBoundingClientRect();
                left = right = this.getScrollLeft(this.elements[0]); top = bottom = this.getScrollTop(this.elements[0]);
                left += rect.left; right += rect.right;
                top += rect.top; bottom += rect.bottom;
            };
            return { "left": left, "top": top, "right": right, "bottom": bottom };
        };

        _$.prototype.getStyle = document.defaultView
	        ? function (name) {
	            var style = document.defaultView.getComputedStyle(this.elements[0], null);
	            name == "borderWidth" ? name = "borderLeftWidth" : name;
	            var w3style = name in style ? style[name] : style.getPropertyValue(name);
	            w3style == "auto" ? w3style = "0px" : w3style;
	            return w3style;
	        }
	        : function (name) {
	            var style = this.elements[0].style, curStyle = this.elements[0].currentStyle;
	            //透明度 from youa
	            if (name == "opacity") {
	                if (/alpha\(opacity=(.*)\)/i.test(curStyle.filter)) {
	                    var opacity = parseFloat(RegExp.$1);
	                    return opacity ? opacity / 100 : 0;
	                }
	                return 1;
	            }
	            if (name == "float") { name = "styleFloat"; }
	            var ret = curStyle[name] || curStyle[S.camelize(name)];
	            //单位转换 from jqury
	            if (!/^-?\d+(?:px)?$/i.test(ret) && /^\-?\d/.test(ret)) {
	                var left = style.left, rtStyle = this.elements[0].runtimeStyle, rsLeft = rtStyle.left;

	                rtStyle.left = curStyle.left;
	                style.left = ret || 0;
	                ret = style.pixelLeft + "px";

	                style.left = left;
	                rtStyle.left = rsLeft;
	            }
	            return ret;
	        };

		// $ 入口函数（和外部库有冲突时，可修改这里）	
        window.$ = function () {
            return new _$(arguments);
        };

    })();

    /* 对象和事件的 入口 */
    window.obj = _obj;
    window.E = _E;

})(window);