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