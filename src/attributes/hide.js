/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {


    /*

    // switchShowHide
    $ui.switchShowHide = function(obj){
        var self = $(obj);
        var hook = self.attr("data-ui-switch-show-hide").split('|');
        var item = 0;
        if (self.is("[type=checkbox]")) {
            item = self.is(":checked")?1:0;
        } else {
            item = self.prop("selectedIndex");
        }
        for (var i in hook) {
            $(hook[i]).hide();
        }
        $(hook[item]).show();
    };
    $(document).on("change","[data-ui-switch-show-hide]",function(e){
        $ui.switchShowHide(this);
    });
    $(document).ready(function(){
        $("[data-ui-switch-show-hide]").each(function(){
            $ui.switchShowHide(this);
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
