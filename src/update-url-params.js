/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {

    /*


    // updateUrlParams by form
    $(document).on('click','[data-ui-update-url-params]',function(){
        var self = $(this);
        var form = self.parents('form');
        var data = {};
        $(':input',form).each(function(){
            var input = $(this);
            data[input.attr('name')] = input.val();
        });
        var url = "" + window.location.href;
        url = $ui.urlParamsUpdate(url,data);
        window.location = url;
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
