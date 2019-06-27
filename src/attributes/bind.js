/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {

    /*

    mantain two value synked after changes
    // cloneValue
    $ui.cloneValue = function(obj) {
        var self = $(obj);
        var hook = self.attr("data-ui-clone-value");
        var item = $(hook);
        item.val(self.val());
    };
    $(document).on("change","[data-ui-clone-value]",function(e){
        $ui.cloneValue(this);
    });
    $(document).on("blur","[data-ui-clone-value]",function(e){
        $ui.cloneValue(this);
    });
    $(document).on("submit","form",function(e){
        $("[data-ui-clone-value]:visible").each(function(){
            $ui.cloneValue(this);
        });
    });
    $(document).ready(function(){
        $("[data-ui-clone-value]:visible").each(function(){
            $ui.cloneValue(this);
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
