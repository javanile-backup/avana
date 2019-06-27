/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {


    /*




    // autocomplete
    $ui.autocomplete = function(obj) {
        var s = $(obj);
        var c = $ui.getConfig(s,"data-ui-autocomplete");

        c.select = function( event, ui ) {
            if (typeof c['selectTo'] === "string") {
                $(c['selectTo']).val(ui.item.id);
            }

            //console.log(c,ui.item);

            if (typeof c.target === "string") {
                c.target = [c.target];
            }
            if (typeof c.layout === "string") {
                c.layout = [c.layout];
            }
            for(var i in c.target) {
                var l = c.layout[i];
                var t = c.target[i];
                for(var k in ui.item) {
                    l = l.replace("{"+k+"}",ui.item[k]);
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
        };

        s.autocomplete(c);
    };
    $(document).ready(function(){
        $("[data-ui-autocomplete]").each(function(){
            $ui.autocomplete(this);
        });
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
