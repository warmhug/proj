/****************************************************
* author：  hualei
* time：    2012/12/20 18:44:55
* fileName：model.js
*****************************************************/

    var Music = Backbone.Model.extend({
        defaults: {
            id: "1",
            name: 'k歌之王',
            src: '555',
            singer: 'eason',
            lrc: ''
        },
        fetch: function (id) {
            var self = this;
            var tmpContact;

            $.ajax({
                url: 'data/' + id + '.json',
                type: "GET",
                dataType: "json",
                error: function () { alert("error"); },
                success: function (data) {
                    //console.log(data);
                    self.set({
                        id: data.id,
                        name: data.name,
                        src: data.src,
                        singer: data.singer,
                        lrc: data.lrc
                    });
                    self.trigger("fetchCompleted:oneMusic");
                },
                complete: function(){
                    //console.log("fetch complete + " + this);
                }
            });
        }
    });
