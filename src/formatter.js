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
