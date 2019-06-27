/**
 *
 * @param $
 * @param document
 */
module.exports = function($, document) {

    /*


    // grid-input-row
    $ui.gridInputRow = function(o) {
        var s = $(o);
        var c = $ui.getConfig(o,"data-ui-grid-input-row");
        var p = s.parent();
        var q = typeof c.source === "object" && $.isArray(c.source) ? c.source : [];
        var n = typeof c.name === "string" ? c.name : s.attr("id");
        var m = p.children(":visible").size();

        $(":input",s).each(function(){
            $(this).attr("name",n+"[{index}]["+$(this).attr("name")+"]");
            if (m>0) {
                $(this).attr("data-ui-testing-bypass","yes");
            }
        });

        s.hide();

        for(var i in q) {
            $ui.gridInputRowAdd(o,q[i]);
        }

        $ui.gridInputRowNeed(o);
    };
    $ui.gridInputRowAdd = function(o,v) {

        var s = $(o);
        var i = $ui.toInt(s.attr("data-ui-grid-input-row-count")) + 1;
        var p = s.parent();
        var r = s.clone();
        var c = $ui.getConfig(o,"data-ui-grid-input-row");
        var n = typeof c.name === "string" ? c.name : s.attr("id");
        var d = typeof c.deleteClass === "string" ? c.deleteClass : "data-ui-grid-input-row-delete";
        //var e = typeof c.render === "boolean" ? c.render : true;
        var m = p.children(":visible").size();

        if ($("[data-ui-grid-input-row-virgin=yes]",p).length)	{
            return;
        }

        // fill row input with "v" values
        if (typeof v === "object") {
            for(var f in v) {
                var l = $("[name='"+n+"[{index}]["+f+"]']",r);
                //l.val(v[f]);
                l.attr("value",v[f]);
                if (l.is("[data-ui-render]")) {
                    $ui.render(l,true);
                }
                //console.log(f,v[f],l.val());
            }
            $("[name='"+n+"[{index}][action]']",r).val('update');
        } else {
            r.attr("data-ui-grid-input-row-virgin","yes");
        }

        s.attr("data-ui-grid-input-row-count",i);
        r.attr("data-ui-grid-input-row-index",i);

        r.html(r.html().replace(/\{index\}/g,i));

        $("input[type=text]",r).each(function(){
            $(this).on("keyup",function(){
                r.removeAttr("data-ui-grid-input-row-virgin");
                $("[name='"+n+"["+i+"][action]']",r).val('update');
                $(this).removeAttr("data-ui-testing-bypass");
                $ui.gridInputRowNeed(o);
            });
            $(this).on("change",function(){
                r.removeAttr("data-ui-grid-input-row-virgin");
                $("[name='"+n+"["+i+"][action]']",r).val('update');
                $(this).removeAttr("data-ui-testing-bypass");
                $ui.gridInputRowNeed(o);
            });
        });

        $("."+d,r).each(function(){
            $(this).on("click",function(e){
                $ui.gridInputRowDelete(o,r);
                e.preventDefault();
            });
        });

        $("[data-ui-autocomplete]",r).each(function(){
            $ui.autocomplete(this);
        });

        $("[data-ui-datepicker]",r).each(function(){
            $(this).removeClass("hasDatepicker");
            $(this).attr("id","");
            $ui.datePicker(this);
        });

        $(":input",r).each(function(){
            //$(this).attr("name",$(this).attr("name").replace("[__prototype__]","["+i+"]"));
            if (m>0) {
                $(this).attr("data-ui-testing-bypass","yes");
            }
        });


        r.removeAttr("data-ui-grid-input-row");
        r.removeAttr("data-ui-grid-input-row-count");
        r.attr("id",n+"-row-"+i);
        r.appendTo(p);
        r.show();
    };
    $ui.gridInputRowNeed = function(o) {
        var s = $(o);
        var p = s.parent();
        var v = p.children('[data-ui-grid-input-row-virgin=yes]:visible').size();
        if (v===0) {
            $ui.gridInputRowAdd(o);
        }
    };
    $ui.gridInputRowDelete = function(o,r) {

        if (confirm("Sei sicuro di volere cancellare?")) {
            var s = $(o);
            var i = $ui.toInt(r.attr("data-ui-grid-input-row-index"));
            var c = $ui.getConfig(o,"data-ui-grid-input-row");
            var n = typeof c.name === "string" ? c.name : s.attr("id");

            r.hide();

            $("[name='"+n+"["+i+"][action]']",r).val('delete');

            $ui.gridInputRowNeed(o);
        }
    };
    $(document).ready(function(){
        $("[data-ui-grid-input-row]").each(function(){
            $ui.gridInputRow(this);
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
