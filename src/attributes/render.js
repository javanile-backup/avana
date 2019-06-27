/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {

    /*

    //
    $ui.render = function(o,r){

        r = typeof r === "undefined" ? false : !!r;

        var s = $(o);
        var c = $ui.getConfig(s,"data-ui-render");

        if (r) {
            var t = typeof c.onload === "boolean" ? typeof c.onload : false;
            if (!t) { return; }
        }

        if (!!s.val()) {
            $ws.req(c.source,{
                id:s.val()
            },function(item){
                if (typeof c.target === "string") {
                    c.target = [c.target];
                }
                if (typeof c.layout === "string") {
                    c.layout = [c.layout];
                }
                for(var i in c.target) {
                    var l = c.layout[i];
                    var t = c.target[i];
                    for(var k in item) {
                        l = l.replace("{"+k+"}",item[k]);
                    }
                    switch(t) {
                        case ":prev":
                            if (s.prev().is(':input')) {
                                s.prev().attr("value",l);
                                s.prev().change();
                            } else {
                                s.prev().text(l);
                                s.prev().change();
                            }
                            break;
                        case ":prev(2)":
                            if (s.prev().prev().is(':input')) {
                                s.prev().prev().attr("value",l);
                                s.prev().prev().change();
                            } else {
                                s.prev().prev().text(l);
                                s.prev().prev().change();
                            }
                            break;
                        default:
                            if ($(t).is(':input')) {
                                $(t).attr("value",l);
                                $(t).change();
                            } else {
                                $(t).text(l);
                                $(t).change();
                            }
                            break;
                    }
                }
            });
        }
    };
    $(document).ready(function(){
        $("[data-ui-render]").each(function(){
            $ui.render(this,true);
        });
    });
    $(document).on("change","[data-ui-render]",function(){
        $ui.render(this);
    });
     */

    function show(element) {
        let hooks = element.attr('data-show').split('|');
        if (element.is(':input')) {

        }
    }

    $(document).on('change', '[data-show]', function() {
        show($(this));
    });

    $(document).ready(function(){
        $('[data-show]').each(function(){
            show($(this));
        });
    });
};
