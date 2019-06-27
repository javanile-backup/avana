/**
 * common-ui.js (0.1.4)
 * http://common-js.eu/license
 */

;"use strict"

;(function($){

    var $ui = {

        locale: false,

        setLocale:function(locale) {
            $ui.locale = locale;
            $.datepicker.setDefaults($.datepicker.regional[locale]);
        },

        getConfig:function(o,a) {
            var s = $(o);
            var x = "c = {"+s.attr(a)+"};";
            var c = {};
            try {
                eval(x);
            } catch(e) {
                console.log("$ui.getConfig() - Parse error:",x);
                var c = {};
            }
            return c;
        },

        getTokens:function(o,a) {
            var s = $(o);
            var t = s.attr(a).split(' ');
            return t;
        },

        functionExists:function(f){
            return typeof f === "string" && typeof window[f] === "function";
        },

        getValues:function(o) {
            function sanitize_base(i) {
                return i;
            }
            function sanitize_rest(i) {
                return i.substring(0,i.length-1);
            }
            var f = $(o);
            var d = {};
            $(":input",f).each(function(){
                var i = $(this);
                var n = i.attr("name");
                if (typeof n === "undefined") {
                    return;
                }
                if (n.indexOf("[")>0) {
                    n = n.split("[");
                    switch(n.length) {
                        case 2:
                            n[0] = sanitize_base(n[0]);
                            n[1] = sanitize_rest(n[1]);
                            if (typeof d[n[0]] === "undefined") {
                                d[n[0]] = {};
                            }
                            if (typeof d[n[0]][n[1]] === "undefined") {
                                d[n[0]][n[1]] = {};
                            }
                            d[n[0]][n[1]] = i.val();
                            break;
                        case 3:
                            n[0] = sanitize_base(n[0]);
                            n[1] = sanitize_rest(n[1]);
                            n[2] = sanitize_rest(n[2]);
                            if (typeof d[n[0]] === "undefined") {
                                d[n[0]] = {};
                            }
                            if (typeof d[n[0]][n[1]] === "undefined") {
                                d[n[0]][n[1]] = {};
                            }
                            if (typeof d[n[0]][n[1]][n[2]] === "undefined") {
                                d[n[0]][n[1]][n[2]] = {};
                            }
                            d[n[0]][n[1]][n[2]] = i.val();
                            break;
                    }
                } else {
                    d[n] = i.val();
                }
            });
            return d;
        },

        setValues:function(o,d) {
            var f = $(o);
            $(":input",f).each(function(){
                var i = $(this);
                var n = i.attr("name");
                if (typeof d[n] !== "undefined") {
                    i.val(d[n]);
                }
            });
        },

        cloneValues:function(obj) {
            $(":input",obj).each(function(){
                if ($(this).is("[data-ui-clone-value]:visible")) {
                    $ui.cloneValue(this);
                }
            });
        },

        urlParamsParse:function(url) {
            url = $ui.urlStripPound(url);
            url = url.split('?');
            if (url.length>1) {
                var par = url[1].split("&");
                var ret = {};
                for(var i in par) {
                    var kev = par[i].split('=');
                    ret[ kev[0] ] = decodeURIComponent(kev[1]);
                }
                return ret;
            } else {
                return {};
            }
        },

        urlParamsBuild:function(url,params) {
            url = $ui.urlStripPound(url);
            url = url.split('?');
            var qry = "";
            for(var i in params) {
                qry+= "&" + i + '=' + encodeURIComponent(params[i]);
            }
            return url[0]+'?'+qry.substr(1);
        },

        urlParamsUpdate:function(url,params) {
            url = $ui.urlStripPound(url);
            var old_params = $ui.urlParamsParse(url);
            for (var i in params) {
                old_params[i] = params[i];
            }
            return $ui.urlParamsBuild(url,old_params);
        },

        urlStripPound:function(url) {
            url = url.split('#');
            return url[0];
        },

        urlParams:function() {
            return $ui.urlParamsParse(window.location.href);
        },

        endsWith:function(str,suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        },

        startsWith:function(str,suffix) {
            return str.indexOf(suffix) === 0;
        },

        toInt:function(str) {
            return !isNaN(str=parseInt(str))?str:0;
        },

        toFloat:function(str) {
            return !isNaN(str=parseFloat(str))?str:0;
        },

        testing: {
            email:function(obj){
                var s = $(obj);
                var v = s.val();
                if (v === "") {return true;}
                var r = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return r.test(v);
            },
            required:function(obj){
                var self = $(obj);
                var ival = self.val();
                if (ival !== "") {
                    return true;
                } else {
                    return false;
                }
            },
            integer:function(obj) {
                var self = $(obj);
                var ival = self.val();
                if (ival === "") {return true;}
                ival = parseInt(ival);
                if (isNaN(ival)) {
                    return false;
                } else {
                    return true;
                }
            },
            numeric:function(obj) {
                var self = $(obj);
                var ival = self.val();
                if (ival === "") {return true;}
                ival = parseInt(ival);
                if (isNaN(ival)) {
                    return false;
                } else {
                    return true;
                }
            }
        },

        //
        formatter: {
            ucfirst: function(o) {
                var s = $(o);
                var v = s.val().split(" ");
                if (v.length>0) {
                    for(var i in v) {
                        v[i] = v[i].charAt(0).toUpperCase()+v[i].substring(1);
                    }
                }
                return v.join(" ");
            },
            ucword: function(o) {
                var s = $(o);
                var v = s.val().split(" ");
                if (v.length>0) {
                    for(var i in v) {
                        v[i] = v[i].charAt(0).toUpperCase()+v[i].substring(1);
                    }
                }
                return v.join(" ");
            },
            phonenumber: function(o) {
                var s = $(o);
                var v = s.val();
                var t = 0;
                if (v !== "") {
                    t = 0;
                    if (v.charAt(t)!=="+") {
                        v = "+39 "+v;
                    }
                    t = 7;
                    if (v.length>=t && v.charAt(t)!==" ") {
                        v = v.substring(0,t)+" "+v.substring(t);
                    }
                    t = 10;
                    if (v.length>=t && v.charAt(t)!==" ") {
                        v = v.substring(0,t)+" "+v.substring(t);
                    }
                    t = 13;
                    if (v.length>=t && v.charAt(t)!==" ") {
                        v = v.substring(0,t)+" "+v.substring(t);
                    }
                    v = v.replace(/ +/g," ");
                }
                return v;
            },
            website: function(o) {
                var s = $(o);
                var v = s.val();
                var t = 0;
                if (v !== "") {
                    t = 0;
                    if (v.charAt(t)!=="w") {
                        v = "www."+v;
                    }
                }
                return v;
            },
            uppercase: function(o) {
                var s = $(o);
                var v = s.val();
                if (v !== "") {
                    v = v.toUpperCase();
                }
                return v;
            },
            lowercase: function(o) {
                var s = $(o);
                var v = s.val();
                if (v !== "") {
                    v = v.toLowerCase();
                }
                return v;
            }
        },

        /**
         *
         * @param {type} selector0
         * @param {type} selector1
         * @returns {Boolean}
         *
         */
        muiMatch:function(selector0,selector1) {
            var s0 = (selector0+"").split(":");
            var s1 = (selector1+"").split(":");
            if (s0.length < s1.length) {
                var min = s0;
                var max = s1;
            } else {
                var min = s1;
                var max = s0;
            }
            for(var i in min) {
                if (min[i] === "*" || max[i] === "*") {
                    continue;
                } else if (max[i] === min[i]) {
                    continue;
                } else if (max[i] !== min[i]) {
                    return false;
                }
            }
            return true;
        },

        sendForm:function(params) {
            var url = params["url"];
            var form = $(params["form"]);
            var success = params["success"];
            var data = {};
            $(":input",form).each(function(){
                var self = $(this);
                var name = self.attr("name");
                data[name] = self.val();
            });
            $.ajax({
                url: url,
                type: "POST",
                data: data,
                success: function(data){
                    success(data);
                },
                error: function(data){
                    console.log("SENDFORM ERROR:",data);
                }
            });
        },

        addConditionalClass:function(obj,prefix) {
            var l = prefix.length;
            $("*[class*='"+prefix+"']",obj).each(function(){
                var s = $(this);
                var c = s.attr("class").split(' ');
                for(var i=0;i<c.length;i++) {
                    if ($ui.startsWith(c[i],prefix)) {
                        var a = c[i].substring(l);
                        s.addClass(a);
                    }
                }
            });
        },

        removeConditionalClass:function(obj,prefix) {
            var l = prefix.length;
            $("*[class*='"+prefix+"']",obj).each(function(){
                var s = $(this);
                var c = s.attr("class").split(' ');
                for(var i=0;i<c.length;i++) {
                    if ($ui.startsWith(c[i],prefix)) {
                        var a = c[i].substring(l);
                        s.removeClass(a);
                    }
                }
            });
        },

        refresh:function() {
            // fix view flik errrors
            $ui.hideMessage("error:*","body");
            $ui.hideMessage("loading:*","body");
        },

        target:function(selector,obj) {
            if (typeof selector === "string") {
                switch(selector) {
                    case ":prev": return $(obj).prev();
                    case ":prev(2)": return $(obj).prev().prev();
                    case ":next": return $(obj).next();
                    case ":next(2)": return $(obj).next().next();
                }
            }
            return $(selector);
        }
    };


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

    // autocomplete
    $ui.autocomplete = function(obj) {
        var s = $(obj);
        var c = $ui.getConfig(s,"data-ui-autocomplete");

        c.select = function( event, ui ) {
            if (typeof c['selectTo'] === "string") {
                $(c['selectTo']).val(ui.item.id);
            }

            //console.log(c,ui.item);

            if (typeof c.target === "string") {
                c.target = [c.target];
            }
            if (typeof c.layout === "string") {
                c.layout = [c.layout];
            }
            for(var i in c.target) {
                var l = c.layout[i];
                var t = c.target[i];
                for(var k in ui.item) {
                    l = l.replace("{"+k+"}",ui.item[k]);
                }
                switch(t) {
                    case ":prev":
                        if (s.prev().is(':input')) {
                            s.prev().attr("value",l);
                            s.prev().change();
                        } else {
                            s.prev().text(l);
                            s.prev().change();
                        }
                        break;
                    case ":prev(2)":
                        if (s.prev().prev().is(':input')) {
                            s.prev().prev().attr("value",l);
                            s.prev().prev().change();
                        } else {
                            s.prev().prev().text(l);
                            s.prev().prev().change();
                        }
                        break;
                    default:
                        if ($(t).is(':input')) {
                            $(t).attr("value",l);
                            $(t).change();
                        } else {
                            $(t).text(l);
                            $(t).change();
                        }
                        break;
                }
            }
        };

        s.autocomplete(c);
    };
    $(document).ready(function(){
        $("[data-ui-autocomplete]").each(function(){
            $ui.autocomplete(this);
        });
    });

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

    // redirect
    $(document).on("click","[data-ui-redirect]",function(){
        var self = $(this);
        var urlt = self.attr('data-ui-redirect');
        window.location = urlt;
        return false;
    });

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

    //
    $ui.render = function(o,r){

        r = typeof r === "undefined" ? false : !!r;

        var s = $(o);
        var c = $ui.getConfig(s,"data-ui-render");

        if (r) {
            var t = typeof c.onload === "boolean" ? typeof c.onload : false;
            if (!t) { return; }
        }

        if (!!s.val()) {
            $ws.req(c.source,{
                id:s.val()
            },function(item){
                if (typeof c.target === "string") {
                    c.target = [c.target];
                }
                if (typeof c.layout === "string") {
                    c.layout = [c.layout];
                }
                for(var i in c.target) {
                    var l = c.layout[i];
                    var t = c.target[i];
                    for(var k in item) {
                        l = l.replace("{"+k+"}",item[k]);
                    }
                    switch(t) {
                        case ":prev":
                            if (s.prev().is(':input')) {
                                s.prev().attr("value",l);
                                s.prev().change();
                            } else {
                                s.prev().text(l);
                                s.prev().change();
                            }
                            break;
                        case ":prev(2)":
                            if (s.prev().prev().is(':input')) {
                                s.prev().prev().attr("value",l);
                                s.prev().prev().change();
                            } else {
                                s.prev().prev().text(l);
                                s.prev().prev().change();
                            }
                            break;
                        default:
                            if ($(t).is(':input')) {
                                $(t).attr("value",l);
                                $(t).change();
                            } else {
                                $(t).text(l);
                                $(t).change();
                            }
                            break;
                    }
                }
            });
        }
    };
    $(document).ready(function(){
        $("[data-ui-render]").each(function(){
            $ui.render(this,true);
        });
    });
    $(document).on("change","[data-ui-render]",function(){
        $ui.render(this);
    });

    // declare global
    window._ui = $ui;
    window.$ui = $ui;

})(jQuery);

$ui.refresh();

