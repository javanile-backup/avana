

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











