/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {

    /*

       // confirm
    $(document).on('click','[data-ui-dialog-confirm]',function(){
        var self = $(this);
        var mess = self.attr('data-ui-dialog-confirm');
        if (confirm(mess)) {
            if (self.is('[data-ui-dialog-redirect]')) {
                window.location = self.attr("data-ui-dialog-redirect");
                return false;
            }
            return true;
        } else {
            return false;
        }
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
