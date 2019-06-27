/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {


    /*


    // datePicker
    $ui.datePicker = function(obj) {
        var self = $(obj);
        var conf = $ui.getConfig(obj,"data-ui-datepicker");
        var name = $(obj).prop("name");

        self.datepicker(conf);
        self.datepicker("hide");
    };
    $(document).ready(function(){
        $("[data-ui-datepicker]").each(function(){
            $ui.datePicker(this);
        });
        setTimeout('$("#ui-datepicker-div").css("z-index","2").hide();',300);
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
