/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {


    /*

     // format
    $ui.format = function(o) {
        var s = $(o);
        var t = $ui.getTokens(o,"data-ui-format");
        for(var i in t) {
            if (typeof $ui.formatter[t[i]] === "function") {
                var f = $ui.formatter[t[i]];
                s.val(f(o));
            }
        }
    };
    $(document).on("keyup","[data-ui-format]",function(e){
        var keyCodes = [37,38,39,40];
        for(var i in keyCodes) {
            if (keyCodes[i] === e.keyCode) {
                return;
            }
        }
        $ui.format(this);
    });
    $(document).on("change","[data-ui-format]",function(){
        $ui.format(this);
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
