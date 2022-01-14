/****************************************************
* author：  hualei
* time：    2012/12/18 11:47:9
* fileName：router.js
*****************************************************/

    var Router = Backbone.Router.extend({
        routes: {
            '': 'showHome',           //home view
            'home': 'showHome',         //home view as well
            'list': 'showList',         //list view
            'detail/:name/:id': 'showDetail',   //detail view
            'other': 'showOther',
            '*actions': 'defaultAction' //default action
        },
        defaultAction: function () { },
        showOther: function () {
            var otherView = new OtherView();
            otherView.render();
            this.triggerChangeView(otherView, "this is other view");
        },
        showHome: function (actions) {
            var homeView = new HomeView();
            homeView.render();
            this.triggerChangeView(homeView, "this is home view");
        },
        showList: function () {
            var musicList = new MusicList();
            var listView = new ListView({ collection: musicList });
            listView.bind('renderCompleted:list', this.triggerChangeView, this);
            musicList.fetch();
        },
        showDetail: function (name, id) {
            var model = new Music();
            var detailView = new DetailView({ model: model });
            //detailView.bind('renderCompleted:detail', this.triggerChangeView, this);
            model.fetch(id);
        },
        viewCollect: [],
        showEle: [],
        viewNum: 0,
        curEle: '',
        initialize: function () {
            var that = this,
                bd = $('.bd');
            bd.on('webkitTransitionEnd', function () {
                bd.attr('style', '');
                var childs = bd.children();
                childs.each(function (i) {
                    var self = $(childs[i]),
                        num = self.attr('viewNum');
                    self.addClass('none');
                    if (num == that.curEle.attr('viewNum')) {
                        self.removeClass('none');
                    }
                });
            });
        },
        changeView: function (view) {
            var that = this,
                $el = $(view.el),
                childs = $el.children(),
                len = childs.length;

            var transform = function () {
                if (that.showEle.length < 2) return;
                if (parseInt(that.showEle[0]) > parseInt(that.showEle[1])) {
                    $el.css({
                        'width': '200%',
                        //'-webkit-transition': '-webkit-transform 50s ease-out',
                        '-webkit-transform': 'translateX(-50%)'
                    });
                    setTimeout(function () {
                        $el.css({
                            '-webkit-transition': '-webkit-transform .5s ease-out',
                            '-webkit-transform': 'translateX(0px)'
                        });
                    }, 10);
                } else {
                    $el.css({
                        'width': '200%',
                        '-webkit-transition': '-webkit-transform .5s ease-out',
                        '-webkit-transform': 'translateX(0px)'
                    });
                    setTimeout(function () {
                        $el.css({
                            //'-webkit-transition': '-webkit-transform .5s ease-out',
                            '-webkit-transform': 'translateX(-50%)'
                        });
                    }, 10);
                }
            };

            if (this.showEle.length > 2) {
                this.showEle.shift();
                childs.each(function (i) {
                    var self = $(childs[i]),
                        num = self.attr('viewNum');
                    if (num == that.showEle[0] || num == that.showEle[1]) {
                        self.removeClass('none');
                    }
                });
            }
            transform();
        },
        triggerChangeView: function (view, demoparm) {
            var $el = $(view.el),
                childs = $el.children(),
                arr = this.viewCollect,
                len = arr.length;
            var vnum = this.viewNum + '';
            for (var i = 0; i < len; i++) {
                if (view.html == arr[i]) {
                    this.curEle = childs.eq(i);
                    vnum = this.curEle.attr('viewNum');
                    this.showEle.push(vnum);
                    this.changeView(view);
                    return;
                }
            }
            // var n = $(view.html).attr('viewNum', vnum),
            //     html = $('<div></div>').html(n).html();
            // arr.push(view.html);
            // $el.append(html);
            // this.curEle = $(html);
            arr.push(view.html);
            this.curEle = $('<div>' + view.html + '</div>');
            this.curEle.attr('viewNum', vnum);
            $el.append(this.curEle);
            console.log(this.curEle.attr('viewNum'))
            this.showEle.push(vnum);
            this.changeView(view);

            this.viewNum++;
        }
    });
