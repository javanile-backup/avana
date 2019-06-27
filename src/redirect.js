/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {

    /*

        // redirect
    $(document).on("click","[data-ui-redirect]",function(){
        var self = $(this);
        var urlt = self.attr('data-ui-redirect');
        window.location = urlt;
        return false;
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
