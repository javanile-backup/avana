/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {


    /*

     // messages
    $ui.showMessage = function(selector,obj){
        $("[data-ui-message]",obj).each(function(){
            var self = $(this);
            var sel0 = selector;
            var sel1 = self.attr("data-ui-message");
            if ($ui.muiMatch(sel0,sel1)) {
                self.show();
            }
        });
    };
    $ui.hideMessage = function(selector,obj){
        $("[data-ui-message]",obj).each(function(){
            var self = $(this);
            var sel0 = selector;
            var sel1 = self.attr("data-ui-message");
            if ($ui.muiMatch(sel0,sel1)) {
                self.hide();
            }
        });
    };
    $(document).ready(function(){
        $ui.hideMessage("error:*","body");
        $ui.hideMessage("loading:*","body");
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
