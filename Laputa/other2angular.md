
## 其他组件适配angular

这里的其他组件指的是 “不是依赖angular” 实现的组件。包括象 jQuery插件、一些ui库的插件等。

这些组件适配进angular体系，难吗？这个难度更多取决于组件本身的复杂度及组件本身设计的优良程度：也就是说，本身就复杂的组件(接口多、依赖项多)，转换起来一般也比较麻烦，但如果本身设计良好，那可能麻烦就能减少许多。

这里示范几种组件适配转换方法，从最简单的到比较麻烦的依次开始。


#### jQuery插件 toolbar 的适配转换：
html:

    <div id="format-toolbar1" class="settings-button" 
         toolbar-tip="{content:'#toolbar-options', position:'top'}">
        <img src="http://paulkinzett.github.com/toolbar/img/icon-cog-small.png">
    </div>
    <div id="toolbar-options">
        <a href="#"><i class="icon-align-left"></i></a>
    </div>
    
js:

    link: function (scope, element, attrs) {
        element.toolbar(scope.$eval(attrs.toolbarTip));
    }
    
很简单，把原本的插件初始化配置项移到html里 div 的属性 toolbar-tip 上，然后在 directive 的 link 函数里 按普通的方式进行初始化即可。（见[原文](http://amitgharat.wordpress.com/2013/02/03/an-approach-to-use-jquery-plugins-with-angularjs/)及其[demo](http://jsfiddle.net/codef0rmer/TH87t/)）

#### jQuery ui的angular适配
jQuery ui提供了 Draggable/Droppable/Sortable/Selectable 等贴心实用的功能，我们这里示例其中的拖放及排序的angular适配转换。（[源码](other2angular/examples/dd.html)）

html:

    <ul class="drag" dnd-source="source">
        <li class="draggable" ng-repeat="item in source track by $index"><div>{{item.value}}</div></li>
    </ul>
    
部分js:

    app.directive('dndSource', ['$timeout', function ($timeout) {
        return function (scope, element, attrs) {
            $timeout(function () {
                element.find('.draggable').draggable({
                    connectToSortable: "#single",
                    helper: "clone",
                    revert: "invalid",
                    start: function (event, ui) {
                        scope.dsIndex = $(event.target).index();
                        scope.dsElem = true;
                    }
                });
            });
        }
    }]);
        
注意，这里多了个 $timeout，因为 directive 里 link 的 element 可用时，其子元素不一定能可用，所以加一个延时，有些比较极端的甚至会套两层 $timeout 。这个例子其实还可以牵连出更复杂的内容：象‘互相拖动的操作’，‘视图拖动动作→引起数据改变、可能产生视图与数据冲突’，引出 $apply 的使用等等。

这里只是简单的适配进angular体系，更全面(或更纯粹)的转换至少还需要把: 

- 各个配置项能放到html属性上，即支持了data-api
- 对事件处理转换
- watch一些数据的改变 

> kendoUI适配、bui适配，示例见`./examples`目录

