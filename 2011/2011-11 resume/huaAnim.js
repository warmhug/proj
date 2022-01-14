
/************************************************************
*文件名称：huaAnim.js
*创建时间：2011/11/10
*作	  者：huajs
*博	  客：http://www.cnblogs.com/huajs/ 
*版权声明：
*功能说明：简单动画封装
*用法及注意事项：
	anim(elemId, cssObj, time, animType, funObj)
	参数说明：
		elemId （必选）需要施加动画效果的元素id
		cssObj （必选）动画结束时的样式，对象类型，键值对形式，
			其中键是能直接用在JS中的“驼峰”形式的css属性，而不是原来的css属性。
			例如：{ marginLeft: '200px', top: '200px', borderWidth: '8px'}
		time （必选）动画持续时间（单位ms）
		animType （可选）默认为线性变化，代码里的Tween类型包含可选的其他参数
		funObj （可选）如果要此选项，需要加入开始和结束时候执行的函数。
			形如：{ el为elemId所指向的元素
                start: function (el) { el.innerHTML = 'start!'; }, 
                complete: function (el) { el.innerHTML = 'Completed!'; }
            }
	
	几点注意事项：
		1、没有做低版本浏览器兼容，支持IE8+、FF、chrome、safari、opera
		2、注意用能直接用在JS中的“驼峰”形式的css属性（本来应把css转“驼峰”形式，
			但是基本所有JS程序员都能直接写出驼峰形式，所以没转）
		3、如果需要把动画应用到绝对定位（position:absolute;）元素上，
			需要注意在这些元素上设置CSS的方法。
			例如：设置top和marginTop，对于绝对定位元素，应该设置top而不是marginTop，
				更不应该将二者混合使用，因为二者的参考点是不一样的，同时设置很容易造成混乱。
				所以，这里也不支持同时设置二者。
				其他相似的同理（left和marginLeft、right和marginRight）
				同时设置top和bottom、left和right也不支持。
		4、引用了Tween缓动算法，支持线性、渐入渐出等多种变化方式。	
************************************************************/


(function () {
    // 缓动方式
    //    t: current time（当前时间）；
    //    b: beginning value（初始值）；
    //    c: change in value（变化量）；
    //    d: duration（持续时间）。
    var Tween = {
        Linear: function (t, b, c, d) { return c * t / d + b; },
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
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
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
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
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
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
                if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }


    var color = {
        sub: function (str, start, len) {
            if (len) return str.substring(start, start + len);
            else return str.substring(start);
        },
        hex: function (i) {  // 返回16进制颜色表示
            if (i < 0) return "00";
            else if (i > 255) return "ff";
            else { var str = "0" + i.toString(16); return str.substring(str.length - 2); }
        },
        //获取颜色数据    
        GetColors: function (sColor) {
            sColor = sColor.replace("#", "");
            var r, g, b;
            if (sColor.length > 3) {
                r = color.sub(sColor, 0, 2); g = color.sub(sColor, 2, 2); b = color.sub(sColor, 4, 2);
            } else {
                r = color.sub(sColor, 0, 1); g = color.sub(sColor, 1, 1); b = color.sub(sColor, 2, 1);
                r += r; g += g; b += b;
            }
            return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
        }
    }



    var fn = {
        getElement: function (id) {
            return typeof id == "string" ? document.getElementById(id) : id;
        },
        objType: function (obj) {
            switch (Object.prototype.toString.call(obj)) {
                case "[object Object]":
                    return "Object";
                case "[object Number]":
                    return "Number";
                case "[object Array]":
                    return "Array";
            }
        },
        getStyle: function (elem, name) { //
            var w3style;
            if (document.defaultView) {
                var style = document.defaultView.getComputedStyle(elem, null);
                name == "borderWidth" ? name = "borderLeftWidth" : name; // 解决标准浏览器解析问题
                w3style = name in style ? style[name] : style.getPropertyValue(name);
                w3style == "auto" ? w3style = "0px" : w3style;
            }
            return elem.style[name] ||
            (elem.currentStyle && (elem.currentStyle[name] == "auto" ? "0px" : elem.currentStyle[name])) || w3style;
        },
        getOriCss: function (elem, cssObj) { // 此处只能获取属性值为数值类型的style属性
            var cssOri = [];
            for (var prop in cssObj) {
                if (!cssObj.hasOwnProperty(prop)) continue;
                //if (prop != "opacity") cssOri.push(parseInt(fn.getStyle(elem, prop)));
                //else cssOri.push(100 * fn.getStyle(elem, prop));
                if (fn.getStyle(elem, prop) == "transparent" || /^#|rgb\(/.test(fn.getStyle(elem, prop))) {
                    if (fn.getStyle(elem, prop) == "transparent") {
                        cssOri.push([255, 255, 255]);
                    }
                    if (/^#/.test(fn.getStyle(elem, prop))) {
                        cssOri.push(color.GetColors(fn.getStyle(elem, prop)));
                    }
                    if (/^rgb\(/.test(fn.getStyle(elem, prop))) {
                        //cssOri.push([fn.getStyle(elem, prop).replace(/^rgb\(\)/g, "")]);
                        var regexp = /^rgb\(([0-9]{0,3}),\s([0-9]{0,3}),\s([0-9]{0,3})\)/g;
                        var re = fn.getStyle(elem, prop).replace(regexp, "$1 $2 $3").split(" ");
                        //cssOri.push(re); // re为字符串数组
                        cssOri.push([parseInt(re[0]), parseInt(re[1]), parseInt(re[2])]);
                    }
                } else if (prop == "opacity") {
                    cssOri.push(100 * fn.getStyle(elem, prop));
                } else {
                    cssOri.push(parseInt(fn.getStyle(elem, prop)));
                }
            }
            return cssOri;
        },
        getEndCss: function (cssobj) {
            var cssEnd = [];
            for (var prop in cssobj) {
                if (!cssobj.hasOwnProperty(prop)) continue;
                //if (prop != "opacity") cssEnd.push(parseInt(cssobj[prop]));
                //else cssEnd.push(100 * cssobj[prop]);
                if (prop == "opacity") {
                    cssEnd.push(100 * cssobj[prop]);
                } else if (/^#/.test(cssobj[prop])) {
                    cssEnd.push(color.GetColors(cssobj[prop]));
                } else {
                    cssEnd.push(parseInt(cssobj[prop]));
                }
            }
            return cssEnd;
        }
    }


    function _anim(/*elemId, cssObj, time, animType, funObj*/) {
        this.init.apply(this, arguments[0]);
    }
    _anim.prototype = {
        init: function () {
            this.elem = fn.getElement(arguments[0]);
            this.cssObj = arguments[1];
            this.cssOri = fn.getOriCss(this.elem, arguments[1]);
            this.cssEnd = fn.getEndCss(arguments[1]);
            this.durtime = arguments[2];
            this.animType = "Tween.Linear";
            this.funObj = null;
            this.start = false;
            this.complete = false;
            this.onPause = false;
            this.onRestart = false;

            if (arguments.length < 3) {
                throw new Error("至少要传入3个参数");
            } else if (arguments.length == 4) {
                if (fn.objType(arguments[3]) == "Object") {
                    this.funObj = arguments[3];
                    for (var p in this.funObj) {
                        if (p.toString() == "start") this.start = true;
                        if (p.toString() == "complete") this.complete = true;
                    }
                }
                if (typeof (arguments[3]) == "string") {
                    this.animType = arguments[3];
                }
            } else if (arguments.length == 5) {
                this.animType = arguments[3];
                if (fn.objType(arguments[4]) == "Object") {
                    this.funObj = arguments[4];
                    for (var p in this.funObj) {
                        if (p.toString() == "start") this.start = true;
                        if (p.toString() == "complete") this.complete = true;
                    }
                }
            }
            this.startAnim();
        },
        startAnim: function () {
            if (this.start) this.funObj["start"].call(this, this.elem);
            var that = this;
            var t = 0;
            var props = [];
            for (var pro in this.cssObj) {
                if (!this.cssObj.hasOwnProperty(pro)) continue;
                props.push(pro);
            }
            var tt = new Date().getTime();
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                if (that.onPause) {
                    clearInterval(that.timer);
                    return;
                }
                if (t < that.durtime / 10) {
                    t++;
                    for (var i = 0; i < props.length; i++) {
                        var b, c;
                        fn.objType(that.cssOri[i]) != "Array" && (b = that.cssOri[i]); //开始值
                        fn.objType(that.cssEnd[i]) != "Array" && (c = that.cssEnd[i] - that.cssOri[i]); // 变化量
                        var d = that.durtime / 10; // 持续时间
                        if (fn.objType(that.cssOri[i]) == "Array" && fn.objType(that.cssEnd[i]) == "Array") {
                            var b1 = that.cssOri[i][0], b2 = that.cssOri[i][1], b3 = that.cssOri[i][2];
                            var c1 = that.cssEnd[i][0] - that.cssOri[i][0],
                                c2 = that.cssEnd[i][1] - that.cssOri[i][1],
                                c3 = that.cssEnd[i][2] - that.cssOri[i][2];
                            var r = color.hex(Math.ceil((eval(that.animType))(t, b1, c1, d))),
                                g = color.hex(Math.ceil((eval(that.animType))(t, b2, c2, d))),
                                b = color.hex(Math.ceil((eval(that.animType))(t, b3, c3, d)));
                            that.elem.style[props[i]] = "#" + r + g + b;

                        } else if (props[i].toString() == "opacity") {
                            that.elem.style[props[i]] = Math.ceil((eval(that.animType))(t, b, c, d)) / 100;
                        } else {
                            that.elem.style[props[i]] = Math.ceil((eval(that.animType))(t, b, c, d)) + "px";
                        }
                    }
                } else {
                    for (var i = 0; i < props.length; i++) {
                        if (fn.objType(that.cssOri[i]) == "Array" && fn.objType(that.cssEnd[i]) == "Array") {
                            var c1 = that.cssEnd[i][0],
                                c2 = that.cssEnd[i][1],
                                c3 = that.cssEnd[i][2];
                            var r = color.hex(Math.ceil((eval(that.animType))(t, b1, c1, d))),
                                g = color.hex(Math.ceil((eval(that.animType))(t, b2, c2, d))),
                                b = color.hex(Math.ceil((eval(that.animType))(t, b3, c3, d)));
                            that.elem.style[props[i]] = "#" + r + g + b;
                        } else if (props[i].toString() == "opacity") {
                            that.elem.style[props[i]] = that.cssEnd[i] / 100;
                        } else {
                            that.elem.style[props[i]] = that.cssEnd[i] + "px";
                        }
                    }
                    clearInterval(that.timer);
                    if (that.complete) that.funObj["complete"].call(that, that.elem);
                    //alert(new Date().getTime() - tt);
                }
            }, 10); // 一般要给10毫秒异步调用时间，不能是1
        },
        restart: function () {
            // 重新恢复到最原始的状态

        },
        pause: function () {
            this.onPause = true;
        }
    }

    window.anim = function () {
        return new _anim(arguments);
    }
})();
