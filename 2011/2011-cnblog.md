# 博客园

> 地址 2011 https://www.cnblogs.com/huajs/

## 2011-10-17 我如何踏上IT路

第一次开技术博客，第一篇博文就聊聊自己是如何走上IT这条路的。一直听人说“搞IT的”颇含贬低色彩，也有IT前辈奉劝不要轻易踏上这条路，但最终我这个本是化学化工专业的门外汉还是义无反顾的走在IT的路上了。

记得第一次见到电脑，好像在读小学三年级，我哥带我去网吧，看到了电脑的样子。当时站在哥旁边只是看他鼠标键盘点来点去的，自己却没上前碰上一碰，但是那时候的情景至今仍刻在脑海里。随后，知道在网吧的那些人都是玩游戏的，玩起游戏就会耽误学习，作为懂事听话的好孩子的我就不敢再近网吧半步，就这样一直按部就班的读书读到高中毕业，其中只有高中时候过星期天会跟着同学一起去网吧上上网，但也最多登登QQ，很少玩游戏。高中毕业考上了个普通的大学，大学里的生活很自由，大一时候因为学校校区没网线，大家就都没有电脑，但是大把的空闲时间不能不打发，就集群似的进入了网吧，玩起了游戏，当然我也是其中之一。大一就这样在游戏和轻松的生活学习中度过了。

大二，我们搬进了新校区，设施比较齐全，同学们陆续都带了电脑过来。刚开学时我还没买，我在反思自己大一的生活，觉得不能一直这样子放纵自己玩游戏，同时想着我应该利用大学的时间做出些有意义的事情，而不是整天玩游戏、聊天虚度生活。后来想到做个有关校园生活网站，靠在网站上给学校附近商店做广告赚些钱，当时分析了网站放什么什么内容、怎么联系商家、怎么推广等等，后来跟一位同学聊这个事情，同学也同意我这个想法，就这么干了起来。但是，一年后事实证明我当时的想法太简单，经营网站以失败告终。不过，却是这个网站催我走上了IT路。大二刚开学有经营网站的想法，到后来想寻求计算机老师帮助建网站未果的情况下，迫不得已自学建站技术。就这样从最简单的html、css开始到后来的asp.net、js一点点学习了起来。

开这个博客，主要是为了和大家交流学习js。从大二建网站接触到js到现在已经两年时间，期间前几个月都是了解些基本的js语句，对这个语言也只是知道个皮毛。直到大二过完年后才开始慢慢深入学习这个语言，再到后来就专门学习这个语言了。这期间由于要顾及我的化学专业不挂科以及其他一些琐碎事情。并不能全身心投入学习JS，好在课余时间利用的比较充分（很少玩游戏），看过不少JS方面的书籍，这里向大家提提几本自己感觉比较好的。《Javascript语言精髓与编程实践》这本书讲解全面也比较深入，感觉适合入门后需要进阶的同学去学习；下一本是《犀利开发：jQuery内核详解与实践》，这本书介绍了jquery的架构等知识，有助于理解jquery源代码，也就更加有利于你深入理解js语言；接着是一本高级一点的书《JavaScript设计模式》这本书算是JS的高级书，学这本书的前提需要掌握面向对象编程的思想（这个可以借助学习Java或C++来理解面向对象是什么）以及了解一些设计模式的知识。除了书本，别人的优秀博客文章也是个学习的好途径。这里推荐一个前辈的博客cloudgamer，最好把里边的他自己写的工具库Cloudgamer JavaScript Library v0.1学习一下，如果能透彻理解他这个库，就又能有不少收获，另外他博客里的众多js效果都比较经典，值得下载下来好好学习。

当然一味看别人的代码，自己不写是不行的。只有自己能够独立写出来，才算是真正的掌握。前期或许只能写一些很简单的东西，到后来随着学习理解的深入和经验的增长，就能写一些更丰富、更有技术含量的内容。一年来，我自己也练习写过不少JS网页特效和一些小游戏，今后陆续整理出来同大家学习交流，当然个人能力有限，代码质量大多不能和牛人相提并论，欢迎拍砖，欢迎提供更好方案，大家共同交流进步。


## cnblogs 2011-10-28 js常用代码段
列出一些常用的代码段，认真阅读会发现，其中的实现方法有许多可取之处，供大家学习应用。

```js
/**//*   
	以下是平时收集的常用代码段，大多数是从网上搜集而来。也均为未找到是谁谁原创，是否允许转载等要求，
	所以如果看到的朋友发现其中有些代码是自己写的，还请原谅在下转帖出来。
	每段代码前边都有功能注解和参数要求等说明文字，难度不大也就没做更多注释。
	为看得清楚，这里依先后顺序做个小目录：
		重写window.setTimeout，
		理解递归程序的返回规律，
		截取长字符串，
		取得元素在页面中的绝对位置，
		统计、去除重复字符（多种方法实现），
		把有序的数组元素随机打乱（多种方法实现）
	
*/  
  /**//*   
        功能：修改 window.setTimeout，使之可以传递参数和对象参数 （同样可用于setInterval）  
        使用方法：  setTimeout(回调函数,时间,参数1,...,参数n) （FF已经原生支持，IE不支持）  
*/   
var  __sto  =  setTimeout;    
window.setTimeout  =  function(callback,timeout,param){    
  var  args  =  Array.prototype.slice.call(arguments,2);    
  var  _cb  =  function(){    
      callback.apply(null,args);    
  }    
  __sto(_cb,timeout);    
}    
  function  aaaaa(a,b,c){    
        alert(a  +  b  +  c);    
}          
window.setTimeout(aaaaa,2000,5,6,7);   

/**//*   
  功能：理解递归程序的返回规律（从内到外） 
      对象之间成员的互引用
*/   
var ninja = { 
  yell: function(n){ 
    return n > 0 ? ninja.yell(n-1) + "a" : "hiy"; 
  } 
}; 
alert(ninja.yell(4))//结果为：hiyaaaa;
var samurai = { yell: ninja.yell }; 
//var ninja = {}; // 此处 注释与否 对结果有影响
try { 
      alert(samurai.yell(4)); 
} catch(e){ 
      alert("Uh, this isn't good! Where'd ninja.yell go?" ); 
} 

/** 功能：截取长字符串
 * @param {string} str 要截取的字符串
 * @param {number} size 截取长度(单字节长度)
 */
var subStr = function(str, size){
  var curSize = 0, arr = [];
  for(var i = 0, len = str.length; i < len; i++){
    arr.push(str.charAt(i));			
    if (str.charCodeAt(i) > 255){
      curSize += 2;
      if(size === curSize || size === curSize - 1){
        return arr.join('');
      }
    }else{
      curSize++;
      if(size === curSize){
        return arr.join('');
      }
    }
  }
};
var str = '#%*……&#什么东西1234abcd 还不够长';
alert(str.length);
alert(str.substr(0, 15));
alert(subStr(str, 15));

/**//*   
  功能：取得元素在页面中的绝对位置（相对于页面左上角） 
  @param {string} node 待求位置的DOM元素
*/   	
function getAbsPosition(node) {
  var t = node.offsetTop;
  var l = node.offsetLeft;
  while (node = node.offsetParent) {
    t += node.offsetTop;
    l += node.offsetLeft;
  }
  alert("top=" + t + "\n" + "left=" + l);
}

/**//*   
  功能：统计、去除重复字符 
  @param str 需要统计的字符串
  说明：常用于字符串中重复字符，或者数组中重复的字母、数字等个数统计。
    此处从网上收集两种典型的类型，分别有两种实现方法，其他还有许多变种，从不同角度编写，可搜索学习。
    
    待统计的数据，不论是数组和字符串都可以，只用借助String.split()或 Array.join()
      转换为函数参数要求的类型即可。 
*/   

// 类型一：借助新建对象来保存数据
var count1 = function (str) {
  var map = {}, maxCount = 0, maxChar, undefined, i = str.length;
  while (i--) {
    var t = str.charAt(i);
    map[t] == undefined ? map[t] = 1 : map[t] += 1;
    if (map[t] > maxCount) {
      maxChar = t;
      maxCount = map[maxChar];
    }
  }
  return "字符：" + maxChar + "次数：" + maxCount;
}

function s_0(a) { // 此处参数应为数组类型
  var b = {}, c = [], i;
  for (i = 0; i < a.length; i++){
    if (!b[a[i]]) {
      c[c.length] = a[i], b[a[i]] = true;
    }
  }
  return c;
}

// 类型二：正则表达式匹配统计
var count2 = function (str) {
  var most = str.split('').sort().join('').match(/(.)\1*/g); //排列重复字符
  most = most.sort(function (a, b) { return a.length - b.length }).pop(); //按出现频繁排序
  return most.length + ': ' + most[0];
}

function s_1(a) {
  var a = a.join(""), b = [];
  while (a.length > 0)
      a = a.replace(new RegExp((b[b.length] = a.charAt(0)), "g"), "");
  return b;
}

/**//*   
  功能：把有序数组打乱（产生无序随机数组）
  说明：基本的排序算法大家应该都很清楚。但是在编程中也经常用到相反的操作，即把原来有序的数组元素随机打乱。
      以下给出三种方法，第一种是以前我自己写出来的，由于水平差，写出的代码时间复杂度太大，
      于是从网上搜索一些简单而且效率高的方法来。
      第二种据说是“洗牌算法”，想必很多人都听说过；
      第三种是利用JS的内置sort方法，这种实现起来很简单。
*/   
  // 方法1（给大家做失败的教训借鉴）
function randArray(num) {
  var rands = [];
  var ra = parseInt(num * Math.random());
  rands.push(ra);
  for (var r = 0; r < num - 1; r++) {
    ra = parseInt(num * Math.random());
    for (var m = 0; m < rands.length; m++) {
      while (rands[m] == ra) {
        ra = parseInt(num * Math.random());
        m = -1;
      }
    }
    rands.push(ra);
  }
  //alert(rands);
  return rands;     
}
// 方法2：
//选择两个[0...array.Length)之间的随机数，把它们做下标的两个元素交换位置（这样乱序效率高）
/* 说明：这是“洗牌算法” 有人证明打乱的效果如下：
    随机交换nums/2次的效果很差，平均约1/3的对象还在原来的位置
        随机交换nums次才基本可用，平均约15%的对象还在原来的位置
        随机交换nums*2次才真正可用，平均约2%的对象还在原来的位置
    */
function daluan(nums) {
  var array=[];
  for (var i = 0; i < nums; i++) {
      array[i] = i;
  }
        for (var i = 0; i < nums; i++) {
            var rand = parseInt(nums * Math.random());
            var temp = array[i];
            array[i] = array[rand];
            array[rand] = temp;
        }
        return array;
}		
// 方法3：
// 让比较函数随机传回-1或1就可以了（这样乱序效率可能不高）
var testArray3=[1,2,3,4,5,6,7,8,9,10,22,33,55,77,88,99]; 
testArray3.sort(function(){return Math.random()>0.5?-1:1;}); 
alert(testArray3); 
```

## cnblogs 2011-11-05 JS重要知识点
这里列出了一些JS重要知识点（不全面，但自己感觉很重要）。彻底理解并掌握这些知识点，对于每个想要深入学习JS的朋友应该都是必须的。

讲解还是以示例代码搭配注释的形式，这里做个小目录：
JS代码预解析原理（包括三个段落）；
函数相关（包括 函数传参，带参数函数的调用方式，闭包）；
面向对象（包括 对象创建、原型链，数据类型的检测，继承）。

```js
/****************** JS代码预解析原理 ******************/
/*
JS代码预解析、变量作用域、作用域链等 应该能作为学习JS语言的入门必备知识。
下边给出些简要解释和一些典型的代码段，若要了解更多，能从网上搜索到更多相关示例。

引用网上的一段有关 “JS的执行顺序” 的解释：
如果一个文档流中包含多个script代码段（用script标签分隔的js代码或引入的js文件），它们的运行顺序是：
步骤1. 读入第一个代码段（js执行引擎并非一行一行地执行程序，而是一段一段地分析执行的）
步骤2. 做语法分析，有错则报语法错误（比如括号不匹配等），并跳转到步骤5
步骤3. 对var变量和function定义做“预解析”（永远不会报错的，因为只解析正确的声明）
步骤4. 执行代码段，有错则报错（比如变量未定义）
步骤5. 如果还有下一个代码段，则读入下一个代码段，重复步骤2
步骤6. 结束
*/
// 下边给出 三段觉得比较典型的代码示例：
/********** 一：基本的几条语句 **********/
alert(num);  // undefined
var num = 0;
alert(str);  // 错误：str未定义
str = "string";	
alert(func);  // undefined
var func = function (){ alert('exec func'); }
test();  // exec test
alert(test());  // 先exec test 后undefined
function test(){ alert('exec test'); }

/********** 二：函数名与变量名相同 **********/		
//var mark = 1;
function mark(x) {
  return x * 2;
}
var mark;
alert(mark);  // function mark(x) {   return x * 2; }
// 去掉前边的var mark = 1;则会返回1

/********** 三：把第二段包括在语句块中 **********/	
// 当有条件时候（代码包含在条件语句块里）
if (false) {
	var mark1 = 1;
	function mark1() {
	   alert("exec mark1");
	}
	//var mark1;
	alert(mark1);  
}
alert(mark1);
mark1();
// 由于解析浏览器解析不同，这段代码在不同浏览器里执行的结果不一致，具体原因可从网上查找答案


/****************** 函数相关 ******************/

/********** 一：函数传参 **********/	
/*
编程语言大概都有 值类型与引用类型 的区别，JS也不例外。
原始类型：undefined  null number boolean 均为值类型。
string比较特殊，因为它是不可改变的，String类定义的方法都不能改变字符串的内容。
function object array 这三种为引用类型。 
*/
/* JavaScript 函数传递参数时，是值传递。

ECMAScript 中，所有函数的参数都是按值来传递的。
基本类型值的传递和基本类型变量复制一致（采用在栈内新建值），
引用类型值的传递和引用类型变量的复制一致（栈内存放的是指针，指向堆中同一对象）。
具体参考：http://www.xiaoxiaozi.com/2010/03/05/1719/
*/
function setName(obj){
	//obj拷贝了person的值（person是一个对象的引用地址），所以obj也指向了person所指向的对象。
	obj.name = "xiaoxiaozi"; 
	obj = {}; // 让obj 指向了另一个对象
	obj.name = "admin";
}
var person = {};
setName(person);
alert(person.name); //  xiaoxiaozi


/********** 二：带参数函数的调用方式 **********/	
/* 在DOM不同版本中，函数调用方式不太一样。标准推荐的是addEventListener和attachEvent
	这两种方式有很多资料可查。但是有些已经不被推荐的函数调用仍旧有实际应用，相关资料发现的不多。
	这里主要讨论这些函数调用方式
*/
var g = "全局变量";
function show(str) {
	alert("my site: " + str);
}
setTimeout("show(g);",100);  // g是全局变量，函数正确执行
function t() {
	var url = "www.xujiwei.cn";
	var num = 2;
	//setTimeout("alert("+url+")", 3000);    //   解析错误，www未定义
	//setTimeout("alert("+num+")", 3000);    //   解析正确，注意与上句对比
	//setTimeout("show('url');", 2000);    //   url
	//setTimeout("show("+ url +");", 2000);    //   解析错误，www未定义
	//setTimeout("show(url);", 2000);    //   解析错误，url未定义
	//setTimeout('"show("+ url +");"', 2000);    //   解析错误，url未定义
	//setTimeout("show('"+ url +"');", 2000);    // 正确
	//setTimeout(function(){show(url);},1000);   // 正确
}
t();
/* 结论：
	诸如onclick="xx();"等函数调用方式，在双引号内的内容直接解析为js语句执行。
	若调用的函数带有参数，注意对比以上各种写法，保证传递进去的参数为正确的。
*/		


/********** 三：闭包 **********/
/* 
闭包，几乎是每个学习JS的朋友都要讨论的问题，因此各种相关资料应有尽有。
它的作用很大，但也有弊端，例如如果使用不当，容易引起内存泄漏等问题，因此有不少人
提倡少用闭包。

这里列出闭包的一种经典应用，一个有争议的应用。
*/
function test1() {     //通过闭包，每次能传入不同的j值。
	for (var j = 0; j < 3; j++) {
		(function (j) {
			setTimeout(function () { alert(j) }, 3000);
		})(j);                                                 
	}
}
test1();
/* 这个是闭包的典型应用 */

(function tt() {
	for (var i = 1; i < 4; i++) {
		document.getElementById("b" + i).attachEvent("onclick", 
		new Function('alert("This is button' + i + '");')); // 在IE中测试
	}
})()  // 立即执行函数，一个文件是否只能有一个？把上边函数写成立即执行出问题，怎么回事？

/* 这个问题出现在论坛里，有很多争议
有说是new Function动态生成个闭包结构的函数，所以能保存外部变量。
有说是跟闭包无关，new Function，就是新定义了一个function，
i的值也作为这个新的function的参数固化在其内部了。
*/		


/****************** 面向对象 ******************/

/********** 一：对象创建、原型链 **********/
/* 讨论 构造函数（类方式）创建对象 ，深入理解这些内容，是很重要的
*/
function MyFunc() { }; //定义一个空函数
var anObj = new MyFunc(); //使用new操作符，借助MyFun函数，就创建了一个对象
// 等价于：
function MyFunc() { };
var anObj = {};     //创建一个对象
anObj.__proto__ = MyFunc.prototype;
MyFunc.call(anObj); //将anObj对象作为this指针调用MyFunc函数
/*
用 var anObject = new aFunction() 形式创建对象的过程实际上可以分为三步：
第一步：建立一个新对象（anObject）；
第二步：将该对象内置的原型对象（__proto__）设置为构造函数prototype引用的那个原型对象；
第三步：将该对象作为this参数调用构造函数，完成成员设置等初始化工作。

对象建立之后，对象上的任何访问和操作都只与对象自身及其原型链上的那串对象有关，
与构造函数再扯不上关系了。
换句话说，构造函数只是在创建对象时起到介绍原型对象和初始化对象两个作用。

原型链：（参考：http://hi.baidu.com/fegro/blog/item/41ec7ca70cdb98e59152eed0.html）
	每个对象（此处对象应该仅指大括号括起来的object，不包括function、array。待验证？）
	都会在其内部初始化一个属性，就是__proto__，当我们访问一个对象的属性时，
	如果这个对象内部不存在这个属性，那么他就会去__proto__里找这个属性，
	这个__proto__又会有自己的__proto__，于是就这样 一直找下去，也就是我们平时所说的原型链的概念。
*/ 

/* 理解了对象创建的原理，可试着分析下边两个示例的结果 */
var yx01 = new function() {return "圆心"}; 
alert(yx01); // [object Object]
var yx02 = new function() {return new String("圆心")}; 
alert(yx02); // “圆心”		
/* 解释：
"圆心"是基本的字符串类型，new String("圆心")则创建了一个string对象。
只要new表达式之后的构造函数返回一个引用对象（数组，对象，函数等），都将覆盖new创建的对象，
如果返回一个原始类型（无 return 时其实为 return 原始类型 undefined），
那么就返回 new 创建的对象。
参考：http://www.planabc.net/2008/02/20/javascript_new_function/ 
*/


/********** 二：数据类型的检测 **********/
/* 判断数据类型可能想到的方法：
constructor、typeof、instanceof、Object.prototype.toString.call()
*/
/***** 1、通过constructor属性  *****/
var myvar= new Array("a","b","c","d");
function A(){}
myvar.constructor = A;
var c = myvar.constructor;
alert(c); // function A(){}
//可见，通过constructor属性获取类型的方法很容易被修改，不应该用来判断类型。

/***** 2、通过typeof  *****/
/* 
	typeof是一个操作符，而不是个函数。
	typeof的实际应用是用来检测一个对象是否已经定义或者是否已经赋值。
		如if(typeof a!="undefined"){}，而不要去使用if(a)因为如果a不存在（未声明）则会出错。
	typeof检测对象类型时一般只能返回如下几个结果：
	number,boolean,string,function,object,undefined。
	对于Array,Null,自定义对象 等使用typeof一律返回object，
		这正是typeof的局限性。
*/
var num = new Number(1);
var arr = [1,2,3];
alert(typeof num);  //object 而不是number
alert(typeof arr);  //object 而不是Array
alert(typeof null);  // object

/***** 3、通过 instanceof  *****/
/* 用instanceof操作符来判断对象是否是某个类的实例。
	如果obj instanceof Class返回true，那么Class的原型与obj原型链上的某个原型是同一个对象，
	即obj要么由Class创建，要么由Class的子类创建。
*/
function t(){};
t.prototype  = Array.prototype;
//t.prototype  = [];
var x = new t();
alert(x instanceof t);//弹出true
alert(x instanceof Array);//弹出true
alert(x instanceof Object);//弹出true
/*
由此可知，通过 instanceof 判断数据类型也不可靠。
因为一个对象（此处x）的原型链可以很长，每个原型的类型可以不同。

另外在iframe内也会容易出错：
即有个页面定义了一个数组a，页面又嵌套了一个IFrame，在Iframe里面通过 top.a instanceof Array， 是返回false的。
这个说明 父页面和内嵌iframe里的对象是不同的，不能混合在一起使用。
改成top.a instanceof top.Array 就会返回true
*/

/***** 4、通过 Object.prototype.toString.call()  *****/
/*  
Object.prototype.toString.call() 作用是：
	1、获取对象的类名（对象类型）。
	2、然后将[object、获取的类名]组合并返回。
可应用于判断Array,Date,Function等类型的对象
*/
var num = new Number(1);
var arr = [1,2,3];
alert(Object.prototype.toString.call(num)); // [object Number]
alert(Object.prototype.toString.call(arr)); // [object Array]

// 扩展示例：（apply等价于call）
window.utils = {
	toString: Object.prototype.toString,
	isObject: function (obj) {
		return this.toString.apply(obj) === '[object Object]';
	},
	isFunction: function (obj) {
		return this.toString.apply(obj) === '[object Function]';
	},
	isArray: function (obj) {
		return this.toString.apply(obj) === '[object Array]';
	}
}
function A() { }
window.utils.isFunction(A);        //true
window.utils.isObject(new A());    //true
window.utils.isArray([]);          //true

/*  
jQuery等框架 就是用这个方法判断对象的类型的，因此可以把这种方法作为权威的判断方法。
但是，如果重写了Object.prototype.toString方法，这时候再用来判断数据类型可能就会出错，
所以，一般不要去重写Object.prototype.toString方法。
*/


/********** 三：继承 **********/
/* 
JS继承和闭包一样，几乎是每个想深入学习JS的朋友都要讨论的问题，因此各种相关资料应有尽有。
JS继承代码的版本非常多，但原理都是一样的，核心都是利用了prototype对象。
为了和其他面向对象语言的风格相似，大多数都采用“类式”风格模拟。

继承的详细原理不再赘述，网上有许多资料介绍。
这里给出一个示例：Jquery作者John Resig写的继承。
（其中的详细注释是来自某个博客，不知道是谁原创，这里私自转帖出来）
*/
(function () {
// initializing变量用来标示当前是否处于类的创建阶段，
// - 在类的创建阶段是不能调用原型方法init的
// - 我们曾在本系列的第三篇文章中详细阐述了这个问题
// fnTest是一个正则表达式，可能的取值为（/\b_super\b/ 或 /.*/）
// - 对 /xyz/.test(function() { xyz; }) 的测试是为了检测浏览器是否支持test参数为函数的情况
// - 不过我对IE7.0,Chrome2.0,FF3.5进行了测试，此测试都返回true。
// - 所以我想这样对fnTest赋值大部分情况下也是对的：fnTest = /\b_super\b/;
var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;
// 基类构造函数
// 这里的this是window，所以这整段代码就向外界开辟了一扇窗户 - window.Class
this.Class = function () { };
// 继承方法定义
Class.extend = function (prop) {
	// 这个地方很是迷惑人，还记得我在本系列的第二篇文章中提到的么
	// - this具体指向什么不是定义时能决定的，而是要看此函数是怎么被调用的
	// - 我们已经知道extend肯定是作为方法调用的，而不是作为构造函数
	// - 所以这里this指向的不是Object，而是Function（即是Class），那么this.prototype就是父类的原型对象
	// - 注意：_super指向父类的原型对象，我们会在后面的代码中多次碰见这个变量
	var _super = this.prototype;
	// 通过将子类的原型指向父类的一个实例对象来完成继承
	// - 注意：this是基类构造函数（即是Class）
	initializing = true;
	var prototype = new this();
	initializing = false;
	// 我觉得这段代码是经过作者优化过的，所以读起来非常生硬，我会在后面详解
	for (var name in prop) {
		prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function (name, fn) {
					return function () {
						var tmp = this._super; // 这里是必要的，第91行注释代码可说明之。
						this._super = _super[name];
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
	}
	// 这个地方可以看出，Resig很会伪装哦
	// - 使用一个同名的局部变量来覆盖全局变量，很是迷惑人
	// - 如果你觉得拗口的话，完全可以使用另外一个名字，比如function F()来代替function Class()
	// - 注意：这里的Class不是在最外层定义的那个基类构造函数
	// 这里的Class和上边的window.Class函数不一样，这里是window.Class内部的函数局部变量
	function Class() {
		// 在类的实例化时，调用原型方法init
		if (!initializing && this.init)
			this.init.apply(this, arguments);
	}
	// 子类的prototype指向父类的实例（完成继承的关键）
	Class.prototype = prototype;  // Class指代上边的Class，并非一开始的window.Class
	// 修正constructor指向错误
	// 是否可用Class.prototype.constructor = Class;来修正？？？
	Class.constructor = Class;
	// 子类自动获取extend方法，arguments.callee指向当前正在执行的函数
	Class.extend = arguments.callee;
	return Class;
};
})();	
```

## cnblogs 2011-11-06 发现了IE9里的一个bug

textarea元素在IE9里的一个情形下会出现问题，这个问题在IE9之前的版本和其他的浏览器里都不存在。这个本不该出现的“特性”，或许是IE9的一个bug。下边详细说明之。

```js
var t = document.getElementById("t");
t.innerHTML = "<p style='color:red'>aaaa</p>";  // 只能在IE9中被解析，其他浏览器不解析
/* textarea表示文本区域，本应该把它里边的各种文字、标签等显示成纯文本的形式。
	直接把诸如
	<p style='color:red'>aa</p>的html形式标签放到textarea里，在IE9及其他浏览器里都会把P标签显示出来，
	这个应该是正确的解析，没什么问题。
	但是，把
	<p style='color:red'>aa</p>
	通过JS的innerHTML向textarea里插入，就能（只能）被IE9解析成红色的aa，把p标签当成html标签解析，
	p被过滤掉了（注意，<!DOCTYPE>的文档声明必须要加上，不加的话，IE9就不会解析p标签了）。
	当然，textarea里一般不应该用innerHTML方法插入内容。
	这或许是IE9的一个bug
*/

//t.innerText = "dd"; //支持IE Chrome 不支持FF
```

## cnblogs 2011-11-10 事件对象问题
e = e || window.event是我们在做事件处理时候区分IE和其他浏览器事件对象时常用的写法。但是这行兼容性代码有没有必要出现在所有的事件句柄中呢？标准事件调用方式需要这行代码吗？下边我们做详细讨论。

```js

document.getElementById("aa").onclick = function (e) {
		if (e) alert(e.toString()); // IE6/7/8 e为undefined  IE9中e为W3标准事件对象。
		//e = window.event;
		alert(e.srcElement.tagName || e.currentTarget.tagName);
}
/*  element.onXXX方式（比较古老，不推荐使用）

这种方式添加事件IE6/7/8只支持window.event不支持参数传入，
	Firefox只支持参数传入不支持其它方式。
IE9/Opera/Safari/Chrome 两种方式都支持。
*/

	
var d4 = document.getElementById('bb');
function clk(e) {
		alert(e);  // 所有浏览器弹出的信息框显示都是事件对象。
		alert(e.srcElement.tagName || e.currentTarget.tagName);
		e = e || window.event;
		alert(e);  // IE6/7/8中和上个e弹出相同的对象。
	} 
if (d4.addEventListener) {
		d4.addEventListener('click', clk, false);
		alert("addEventListener");
}
if (d4.attachEvent) {
		d4.attachEvent('onclick', clk);
		alert("attachEvent");
}
/*  addEventListener、attachEvent方式（推荐使用）

结论：
通常事件句柄里有这句话：e = e || window.event;
但是在这种调用方式（addEventListener、attachEvent方式）中没什么作用，
这是什么原因呢？上边参考文章的总结里指出了原因，即：
“IE6/7/8支持通过window.event获取对象，
通过attachEvent方式添加事件时也支持事件对象作为句柄第一个参数传入”
因为IE6/7/8在attachEvent方式添加事件时同时支持两种方式，所以事件句柄中的参数e在
IE6/7/8中会自动转换为window.event。
	这么以来，这句e = e || window.event;在此处就不需要了（个人结论）。

*/


/*  
在编写跨浏览器的函数库时，IE和标准事件对象的属性的差异的问题需要解决。
	下边抽出相关代码，讨论这个问题在这里的体现。
	*/
var _E = {
		BindEvent: function (object, fun) {
				if (arguments.length == 1) {
						fun = arguments[0];
						object = null;
				}
				var args = Array.prototype.slice.call(arguments, 2);
				return function (event) {
						return fun.apply(object, [fixEvent(event)].concat(args));
				}
		}
};
function fixEvent(event) {  // 统一不同浏览器的event对象
		if (event) return event;  
		event = window.event;
		event.pageX = event.clientX + getScrollLeft(event.srcElement);
		event.pageY = event.clientY + getScrollTop(event.srcElement);
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

	// 测试代码如下
	function get(ev) {
		alert(ev.pageX);
}
var cc = document.getElementById("cc");
var clickHandler = _E.BindEvent(get);
cc.attachEvent('onclick', clickHandler);  // IE6/7/8下测试
/*
结果点击id为cc的div元素后，弹出undefined。说明ev.pageX根本不存在。
	可是我们在fixEvent()里已经做了事件对象的统一工作。
	调试会发现：fixEvent()里if (event) return event;这句是执行后就直接return了，
	这里的event按照道理说应该是undefined，但是事实并不是。

	//
	至于原因个人觉得就是这里：因为IE6/7/8在attachEvent方式添加事件时同时支持两种方式，
	所以事件句柄中的参数会自动转换为window.event。也就是说参数不是undefined
	
	//
	所以在这里用if (event) return event;判断事件对象是否为undefined不妥。
	（说明：fixEvent()这段代码参考自博客园里cloudgamer的函数库，
		他里边就是这种写法，个人觉得有错误，希望有兴趣的朋友也做做验证）
	*/

```


## cnblogs 2011-11-13 简单动画封装
JS动画，实质是对DOM样式的改变。只要把主流浏览器DOM元素的属性方法搞清楚，做JS动画并不算难。网上也有很多封装好的JS动画库，但大多因为功能过于完善，而至于代码量大动辄过千行，不宜在小项目中使用。这里自己封装了一个很轻量的动画库，主要功能都已实现。难免有疏漏之处，还请大家多多指教。

https://www.cnblogs.com/huajs/archive/2011/11/13/2247544.html


## cnblogs 2011-11-16 也写“JS俄罗斯方块”
这个经典的小游戏被无数人玩过，也被很多数的程序员写过，在下也献丑写个出来。由于在自己动手写之前没参考过别人写的这个游戏的代码，完全是根据自己玩这个游戏的体会写成的。也知水平有限，虽然已认真测试过，但仍可能有漏洞，感兴趣的朋友发现后还望不吝指出来。

说说自己的思路，以及编写过程中的重点难点。

思路：

1、我是在纸上先画出方块的几大类型，分成了十大类，每种类型在按“上方向键”时，有四种变化（田字形实际只有一种形状；长条形，以及两种互相对称的“折线形”分别也只有两种变化），把这些形状所在的位置信息放入数组中（xx,yy数组表示）。

2、把形状分类后，就要想办法把每种形状显示出来。这里利用构造函数block构造方块对象。然后在“预览”显示的div里创建每种方块形状（initshape()），并把它们全部隐藏。

3、把“预览div”里的方块形状随机（实际有一定规律）显示一种。然后在主窗口里创建这种方块（createBlock()），然后定时器让方块下落（fall()），下落过程中不断改变方块的位置（setPosition()），判断是否越界（judgeLRside()和judgeBott()）。当方块落到底部，或者与已经落下的方块接触时，判断是否能消除行（removeBlocks()）。然后把“预览div”里的方块形状再显示一种（setVisible()），继续步骤三。


重点难点：

1、方块是否越界的精准控制，我实现起来有些复杂。

2、方块之间的接触条件，这里要把握好。


总结：
在FF和IE9里测试通过，由于几乎不用什么兼容性代码，其他浏览器应该也没问题。

没用什么能令人眼前一亮或拍手叫好的技巧，代码吗的相当朴实。

需要说明的是：主窗口每次创建和消去方块都要更新DOM，这需要耗费时间和内存，效率不一定高。但是如没特别要求对浏览器来说一般也无压力。没有做封装，全局变量多，仅供朋友们交流参考，如果需要部署使用，还需要优化完善。


原来以为并不难的东西，自己独立去写，才发现要想做好做优秀仍是有难度的。建议没独立写过的朋友，对此感兴趣的话，先不要看别人的代码和思路，自己独立尝试下，会有不少收获的。


在网上有一个很精简的版本，JS部分一共一百行左右代码，主要是利用“移位操作”简化了很多代码，感兴趣的朋友可以找找看。


## 


## 


## 


##


