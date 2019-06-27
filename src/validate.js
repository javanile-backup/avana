/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {


    /*

       // validate
    $ui.validate = function(obj) {
        try {
            var form = $(obj);
            var flag = true;
            var conf = $ui.getConfig(form,"data-ui-validate");

            $ui.hideMessage("error:*",form);
            $ui.removeConditionalClass(form,"if-error-");
            $ui.cloneValues(form);

            var errorScope = typeof conf.errorScope === "string" ? conf.errorScope : false;
            var errorClass = typeof conf.errorClass === "string" ? conf.errorClass : "ui-input-error";
            $("."+errorClass).each(function(){$(this).removeClass(errorClass);});

            $(":input",form).each(function(){
                var input = $(this);

                if (!input.is(":visible")) {
                    return;
                }

                if (input.is("[data-ui-testing-bypass=yes]")) {
                    return;
                }

                var tests = input.attr("data-ui-testing");
                if (typeof tests === "string" && tests !== "") {
                    tests = tests.split(' ');
                    for(var i in tests) {
                        var test = tests[i].toLowerCase();
                        var func = $ui.testing[test];
                        if (typeof func === "function") {
                            if (!func(this)) {
                                var errorSelector = 'error:'+input.attr("name")+':'+test;
                                $ui.showMessage(errorSelector,form);
                                input.addClass(errorClass);
                                if (errorScope) {
                                    input.closest(errorScope).addClass(errorClass);
                                }
                                flag = false;
                            }
                        }
                    }
                }
            });

            if (flag) {
                $ui.showMessage("loading:*",form);
            }

            if (flag && $ui.functionExists(conf.success)) {
                return window[conf.success]();
            }

            return flag;
        } catch (e)	{
            console.log(e.stack);
            return false;
        }
    };
    $(document).on("submit","[data-ui-validate]",function(){
        return $ui.validate(this);
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
