utag.js

//tealium universal tag - utag.loader ut4.0.202507150714, Copyright 2025 Tealium.com Inc. All Rights Reserved.
var utag_condload = false;
try {
    (function() {
        function ul(src, a, b) {
            a = document;
            b = a.createElement('script');
            b.language = 'javascript';
            b.type = 'text/javascript';
            b.src = src;
            a.getElementsByTagName('head')[0].appendChild(b)
        }
        ;var match = ("" + document.cookie).match("(^|;\\s)utag_env_tealiumlabs_retail-21=(\/\/tags\.tiqcdn\.com\/utag\/tealiumlabs\/[a-z0-9\\.-]{1,30}\\/[^\\s;]*)");
        if (match) {
            if (match[2].indexOf("/prod/") === -1) {
                var s = match[2];
                while (s.indexOf("%") != -1) {
                    s = decodeURIComponent(s);
                }
                s = s.replace(/\.\./g, "");
                ul(s);
                utag_condload = true;
                __tealium_default_path = '//tags.tiqcdn.com/utag/tealiumlabs/retail-21/prod/';
            }
        }
    }
    )();
} catch (e) {}
;try {
    try {
        geo_url = window.location.href;
        if (geo_url == "https://ecommerce.tealiumdemo.com/") {
            jQuery('document').ready(function() {
                jQuery.get("https://ipinfo.io", function(response) {
                    console.log("Visitor Geolocalization : " + response.city, response.country);
                    var original_label = jQuery('.privacy_prompt  h1').text();
                    var city = response.city;
                    var country = response.country;
                    document.cookie = "geo_city=" + city;
                    document.cookie = "geo_country=" + country;
                    var label = original_label + " " + response.country + " / " + response.city
                    jQuery('.privacy_prompt  h1').text(label)
                }, "jsonp");
            });
        }
    } catch (e) {
        console.log(e)
    }
} catch (e) {
    console.log(e);
}
if (!utag_condload) {
    try {
        try {
            var occasion = sessionStorage.getItem('moments_answer_5667');
            if (occasion) {
                window.utag_data = window.utag_data || {};
                window.utag_data.occasion = occasion;
            }
            var hasUserClosed = sessionStorage.getItem('momentsiq_closed');
            if (hasUserClosed) {
                window.utag_data = window.utag_data || {};
                window.utag_data.momentsiq_closed = hasUserClosed;
            }
        } catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e);
    }
}
if (typeof utag == "undefined" && !utag_condload) {
    var utag = {
        id: "tealiumlabs.retail-21",
        o: {},
        sender: {},
        send: {},
        rpt: {
            ts: {
                a: new Date()
            }
        },
        dbi: [],
        db_log: [],
        loader: {
            q: [],
            lc: 0,
            f: {},
            p: 0,
            ol: 0,
            wq: [],
            lq: [],
            bq: {},
            bk: {},
            rf: 0,
            ri: 0,
            rp: 0,
            rq: [],
            ready_q: [],
            sendq: {
                "pending": 0
            },
            run_ready_q: function() {
                for (var i = 0; i < utag.loader.ready_q.length; i++) {
                    utag.DB("READY_Q:" + i);
                    try {
                        utag.loader.ready_q[i]()
                    } catch (e) {
                        utag.DB(e)
                    }
                    ;
                }
            },
            lh: function(a, b, c) {
                a = "" + location.hostname;
                b = a.split(".");
                c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\.|\...\.jp$/.test(a)) ? 3 : 2;
                return b.splice(b.length - c, c).join(".");
            },
            WQ: function(a, b, c, d, g) {
                utag.DB('WQ:' + utag.loader.wq.length);
                try {
                    if (utag.udoname && utag.udoname.indexOf(".") < 0) {
                        utag.ut.merge(utag.data, window[utag.udoname], 0);
                    }
                    if (utag.cfg.load_rules_at_wait) {
                        utag.handler.LR(utag.data);
                    }
                } catch (e) {
                    utag.DB(e)
                }
                ;d = 0;
                g = [];
                for (a = 0; a < utag.loader.wq.length; a++) {
                    b = utag.loader.wq[a];
                    b.load = utag.loader.cfg[b.id].load;
                    if (b.load == 4) {
                        this.f[b.id] = 0;
                        utag.loader.LOAD(b.id)
                    } else if (b.load > 0) {
                        g.push(b);
                        d++;
                    } else {
                        this.f[b.id] = 1;
                    }
                }
                for (a = 0; a < g.length; a++) {
                    utag.loader.AS(g[a]);
                }
                if (d == 0) {
                    utag.loader.END();
                }
            },
            AS: function(a, b, c, d) {
                utag.send[a.id] = a;
                if (typeof a.src == 'undefined' || !utag.ut.hasOwn(a, 'src')) {
                    a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
                }
                a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v ? utag.cfg.template + a.v : utag.cfg.v);
                utag.rpt['l_' + a.id] = a.src;
                b = document;
                this.f[a.id] = 0;
                if (a.load == 2) {
                    utag.DB("Attach sync: " + a.src);
                    a.uid = a.id;
                    b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
                    if (typeof a.cb != 'undefined')
                        a.cb();
                } else if (a.load == 1 || a.load == 3) {
                    if (b.createElement) {
                        c = 'utag_tealiumlabs.retail-21_' + a.id;
                        if (!b.getElementById(c)) {
                            d = {
                                src: a.src,
                                id: c,
                                uid: a.id,
                                loc: a.loc
                            }
                            if (a.load == 3) {
                                d.type = "iframe"
                            }
                            ;if (typeof a.cb != 'undefined')
                                d.cb = a.cb;
                            utag.ut.loader(d);
                        }
                    }
                }
            },
            GV: function(a, b, c) {
                b = {};
                for (c in a) {
                    if (a.hasOwnProperty(c) && typeof a[c] != "function")
                        b[c] = a[c];
                }
                return b
            },
            OU: function(tid, tcat, a, b, c, d, f, g) {
                g = {};
                utag.loader.RDcp(g);
                try {
                    if (typeof g['cp.OPTOUTMULTI'] != 'undefined') {
                        c = utag.loader.cfg;
                        a = utag.ut.decode(g['cp.OPTOUTMULTI']).split('|');
                        for (d = 0; d < a.length; d++) {
                            b = a[d].split(':');
                            if (b[1] * 1 !== 0) {
                                if (b[0].indexOf('c') == 0) {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tcat == b[0].substring(1))
                                            c[f].load = 0;
                                        if (c[f].tid == tid && c[f].tcat == b[0].substring(1))
                                            return true;
                                    }
                                    if (tcat == b[0].substring(1))
                                        return true;
                                } else if (b[0] * 1 == 0) {
                                    utag.cfg.nocookie = true
                                } else {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tid == b[0])
                                            c[f].load = 0
                                    }
                                    if (tid == b[0])
                                        return true;
                                }
                            }
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
                return false;
            },
            RDdom: function(o) {
                var d = document || {}
                  , l = location || {};
                o["dom.referrer"] = d.referrer;
                o["dom.title"] = "" + d.title;
                o["dom.domain"] = "" + l.hostname;
                o["dom.query_string"] = ("" + l.search).substring(1);
                o["dom.hash"] = ("" + l.hash).substring(1);
                o["dom.url"] = "" + d.URL;
                o["dom.pathname"] = "" + l.pathname;
                o["dom.viewport_height"] = window.innerHeight || (d.documentElement ? d.documentElement.clientHeight : 960);
                o["dom.viewport_width"] = window.innerWidth || (d.documentElement ? d.documentElement.clientWidth : 960);
            },
            RDcp: function(o, b, c, d) {
                b = utag.loader.RC();
                for (d in b) {
                    if (d.match(/utag_(.*)/)) {
                        for (c in utag.loader.GV(b[d])) {
                            o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
                        }
                    }
                }
                for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
                    if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined")
                        o["cp." + c] = b[c];
                }
            },
            hasSplitUtagMainCookie: function() {
                return document.cookie.match(/([\s\S]*)utag_main_([\s\S]*)=([\s\S]*)/g);
            },
            hasUtagMainCookie: function() {
                return document.cookie.includes("utag_main=");
            },
            convertingToSplitCookies: function() {
                return utag.cfg.split_cookie && utag.loader.hasUtagMainCookie();
            },
            revertingSplitCookies: function() {
                return !utag.cfg.split_cookie && utag.loader.hasSplitUtagMainCookie();
            },
            readIndividualCookies: function() {
                if (!document.cookie || document.cookie === "") {
                    return {};
                }
                var cookies = document.cookie.split("; ");
                return cookies.reduce(function(result, cookie) {
                    var kv = cookie.split("=");
                    if (kv[0].startsWith("utag_")) {
                        var cookieName = kv[0].split("_")[1];
                        var cookieNameWithTag = "utag_" + cookieName;
                        if (!result[cookieNameWithTag]) {
                            result[cookieNameWithTag] = {};
                        }
                        var nameTrimmed = kv[0].replace(cookieNameWithTag + "_", "");
                        result[cookieNameWithTag][nameTrimmed] = String(kv[1]).replace(/%3B/g, ';')
                    }
                    return result;
                }, {});
            },
            RDqp: function(o, a, b, c) {
                a = location.search + (location.hash + '').replace("#", "&");
                if (utag.cfg.lowerqp) {
                    a = a.toLowerCase()
                }
                ;if (a.length > 1) {
                    b = a.substring(1).split('&');
                    for (a = 0; a < b.length; a++) {
                        c = b[a].split("=");
                        if (c.length > 1) {
                            o["qp." + c[0]] = utag.ut.decode(c[1])
                        }
                    }
                }
            },
            RDmeta: function(o, a, b, h) {
                a = document.getElementsByTagName("meta");
                for (b = 0; b < a.length; b++) {
                    try {
                        h = a[b].name || a[b].getAttribute("property") || "";
                    } catch (e) {
                        h = "";
                        utag.DB(e)
                    }
                    ;if (utag.cfg.lowermeta) {
                        h = h.toLowerCase()
                    }
                    ;if (h != "") {
                        o["meta." + h] = a[b].content
                    }
                }
            },
            RDva: function(o) {
                var readAttr = function(o, l) {
                    var a = "", b;
                    a = localStorage.getItem(l);
                    if (!a || a == "{}")
                        return;
                    b = utag.ut.flatten({
                        va: JSON.parse(a)
                    });
                    utag.ut.merge(o, b, 1);
                }
                try {
                    readAttr(o, "tealium_va");
                    readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"]);
                } catch (e) {
                    utag.DB(e)
                }
            },
            RDut: function(o, a) {
                var t = {};
                var d = new Date();
                var m = (utag.ut.typeOf(d.toISOString) == "function");
                o["ut.domain"] = utag.cfg.domain;
                o["ut.version"] = utag.cfg.v;
                t["tealium_event"] = o["ut.event"] = a || "view";
                t["tealium_visitor_id"] = o["ut.visitor_id"] = o["cp.utag_main_v_id"];
                t["tealium_session_id"] = o["ut.session_id"] = o["cp.utag_main_ses_id"];
                t["tealium_session_number"] = o["cp.utag_main__sn"];
                t["tealium_session_event_number"] = o["cp.utag_main__se"];
                try {
                    t["tealium_datasource"] = utag.cfg.datasource;
                    t["tealium_account"] = o["ut.account"] = utag.cfg.utid.split("/")[0];
                    t["tealium_profile"] = o["ut.profile"] = utag.cfg.utid.split("/")[1];
                    t["tealium_environment"] = o["ut.env"] = "prod";
                } catch (e) {
                    utag.DB(e)
                }
                t["tealium_random"] = Math.random().toFixed(16).substring(2);
                t["tealium_library_name"] = "ut" + "ag.js";
                t["tealium_library_version"] = (utag.cfg.template + "0").substring(2);
                t["tealium_timestamp_epoch"] = Math.floor(d.getTime() / 1000);
                t["tealium_timestamp_utc"] = (m ? d.toISOString() : "");
                d.setHours(d.getHours() - (d.getTimezoneOffset() / 60));
                t["tealium_timestamp_local"] = (m ? d.toISOString().replace("Z", "") : "");
                utag.ut.merge(o, t, 0);
            },
            RDses: function(o, a, c) {
                a = (new Date()).getTime();
                c = (a + parseInt(utag.cfg.session_timeout)) + "";
                if (!o["cp.utag_main_ses_id"]) {
                    o["cp.utag_main_ses_id"] = a + "";
                    o["cp.utag_main__ss"] = "1";
                    o["cp.utag_main__se"] = "1";
                    o["cp.utag_main__sn"] = (1 + parseInt(o["cp.utag_main__sn"] || 0)) + "";
                } else {
                    o["cp.utag_main__ss"] = "0";
                    o["cp.utag_main__se"] = (1 + parseInt(o["cp.utag_main__se"] || 0)) + "";
                }
                o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
                o["cp.utag_main__st"] = c;
                var ses_id = utag.loader.addExpSessionFlag(o["cp.utag_main_ses_id"] || a);
                var pn = utag.loader.addExpSessionFlag(o["cp.utag_main__pn"]);
                var ss = utag.loader.addExpSessionFlag(o["cp.utag_main__ss"]);
                var st = utag.loader.addExpSessionFlag(c);
                var se = utag.loader.addExpSessionFlag(o["cp.utag_main__se"]);
                utag.loader.SC("utag_main", {
                    _sn: (o["cp.utag_main__sn"] || 1),
                    _se: se,
                    _ss: ss,
                    _st: st,
                    ses_id: ses_id,
                    _pn: pn
                });
            },
            containsExpSessionFlag: function(v) {
                return String(v).replace(/%3B/g, ';').includes(";exp-session");
            },
            addExpSessionFlag: function(v) {
                return utag.loader.containsExpSessionFlag(v) ? v : v + ";exp-session";
            },
            containsExpFlag: function(v) {
                return String(v).replace(/%3B/g, ';').includes(";exp-");
            },
            addExpFlag: function(v, x) {
                return utag.loader.containsExpFlag(v) ? v : v + ";exp-" + String(x);
            },
            RDpv: function(o) {
                if (typeof utag.pagevars == "function") {
                    utag.DB("Read page variables");
                    utag.pagevars(o);
                }
            },
            RDlocalStorage: function(o) {
                if (utag.cfg.ignoreLocalStorage) {
                    return;
                }
                Object.keys(window.localStorage).forEach(function(localStorageKey) {
                    o["ls." + localStorageKey] = window.localStorage[localStorageKey];
                });
            },
            RDsessionStorage: function(o) {
                if (utag.cfg.ignoreSessionStorage) {
                    return;
                }
                Object.keys(window.sessionStorage).forEach(function(sessionStorageKey) {
                    o["ss." + sessionStorageKey] = window.sessionStorage[sessionStorageKey];
                });
            },
            convertCustomMultiCookies: function() {
                var cookiesToConvert = {}
                if (utag.loader.convertingToSplitCookies()) {
                    utag.loader.mapUtagCookies(function(parentCookie) {
                        cookiesToConvert[parentCookie.key] = cookiesToConvert[parentCookie.key] || {}
                        parentCookie.value.split('$').forEach(function(subCookie) {
                            var key = subCookie.split(':')[0]
                            var value = subCookie.split(':')[1]
                            cookiesToConvert[parentCookie.key][key] = (String(value).indexOf('%3Bexp-') !== -1 && String(value).indexOf('%3Bexp-session') === -1) ? String(value).replace(/%3B/g, ';') + 'u' : String(value).replace(/%3B/g, ';');
                        })
                    })
                } else if (utag.loader.revertingSplitCookies()) {
                    utag.loader.mapUtagCookies(function(splitCookie) {
                        var parentCookieName = splitCookie.key.match(/^utag_[^_]*/)[0];
                        var subCookieName = splitCookie.key.split(parentCookieName + '_')[1];
                        cookiesToConvert[parentCookieName] = cookiesToConvert[parentCookieName] || {};
                        cookiesToConvert[parentCookieName][subCookieName] = (String(splitCookie.value).indexOf('%3Bexp-') !== -1 && String(splitCookie.value).indexOf('%3Bexp-session')) === -1 ? String(splitCookie.value).replace(/%3B/g, ';') + 'u' : String(splitCookie.value).replace(/%3B/g, ';');
                    })
                }
                if (utag.loader.convertingToSplitCookies()) {
                    utag.loader.getUtagCookies().forEach(function(cookie) {
                        utag.loader.deleteCookie(cookie.key);
                    });
                } else if (utag.loader.revertingSplitCookies()) {
                    utag.loader.deleteIndividualCookies();
                }
                Object.keys(cookiesToConvert).forEach(function(key) {
                    utag.loader.SC(key, cookiesToConvert[key]);
                });
            },
            RD: function(o, a) {
                utag.DB("utag.loader.RD");
                utag.DB(o);
                utag.loader.RDcp(o);
                if (utag.cfg.split_cookie) {
                    utag.loader.checkCookiesAgainstWhitelist();
                }
                if (utag.loader.convertingToSplitCookies() || utag.loader.revertingSplitCookies()) {
                    utag.loader.convertCustomMultiCookies();
                }
                if (!utag.loader.rd_flag) {
                    utag.loader.rd_flag = 1;
                    o["cp.utag_main__pn"] = (1 + parseInt(o["cp.utag_main__pn"] || 0)) + "";
                    var setVId = window.utag_cfg_ovrd && window.utag_cfg_ovrd.always_set_v_id || false;
                    if (setVId) {
                        o["cp.utag_main_v_id"] = o["cp.utag_main_v_id"] || utag.ut.vi((new Date()).getTime());
                        utag.loader.SC("utag_main", {
                            "v_id": o["cp.utag_main_v_id"]
                        });
                    }
                    utag.loader.RDses(o);
                }
                if (a && !utag.cfg.noview)
                    utag.loader.RDses(o);
                utag.loader.RDqp(o);
                utag.loader.RDmeta(o);
                utag.loader.RDdom(o);
                utag.loader.RDut(o, a || "view");
                utag.loader.RDpv(o);
                utag.loader.RDva(o);
                utag.loader.RDlocalStorage(o);
                utag.loader.RDsessionStorage(o);
            },
            whitelistDefined: function() {
                return utag.cfg.split_cookie_allowlist && Array.isArray(utag.cfg.split_cookie_allowlist);
            },
            cookieIsAllowed: function(key) {
                return !utag.loader.whitelistDefined() || utag.cfg.split_cookie_allowlist.includes(key);
            },
            checkCookiesAgainstWhitelist: function() {
                if (!utag.loader.whitelistDefined()) {
                    return;
                }
                utag.loader.mapUtagCookies(function(cookie) {
                    if (!utag.loader.cookieIsAllowed(cookie.key.replace("utag_main_", ""))) {
                        utag.loader.deleteCookie(cookie.key);
                    }
                }, true);
            },
            deleteIndividualCookies: function() {
                utag.loader.mapUtagCookies(function(cookie) {
                    utag.loader.deleteCookie(cookie.key);
                });
            },
            deleteCookie: function(key) {
                document.cookie = key + "=; path=/;domain=" + utag.cfg.domain + ";max-age=0;";
            },
            getUtagCookies: function(onlyUtagMain=false) {
                var cookies = document.cookie.split("; ");
                var result = [];
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    if (cookie.startsWith(onlyUtagMain ? "utag_main_" : "utag_")) {
                        var kv = cookie.split("=");
                        result.push({
                            key: kv[0],
                            value: kv[1]
                        });
                    }
                }
                return result;
            },
            mapUtagCookies: function(mapFunction, onlyUtagMain=false) {
                var cookies = utag.loader.getUtagCookies(onlyUtagMain);
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    mapFunction(cookie);
                }
            },
            filterArray: function(array, predicate) {
                var y = 0;
                for (var x = 0; x < array.length; x++) {
                    if (predicate(array[x])) {
                        array[y] = array[x];
                        y++;
                    }
                }
                array.length = y;
            },
            RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
                o = {};
                b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
                r = /^(.*?)=(.*)$/;
                s = /^(.*);exp-(.*)$/;
                t = (new Date()).getTime();
                var newMultiCookies;
                if (utag.loader.hasSplitUtagMainCookie()) {
                    newMultiCookies = utag.loader.readIndividualCookies();
                    utag.loader.filterArray(b, function(cookie) {
                        return !cookie.startsWith("utag_")
                    });
                }
                for (c = 0; c < b.length; c++) {
                    if (b[c].match(r)) {
                        ck = RegExp.$1;
                        cv = RegExp.$2;
                    }
                    e = utag.ut.decode(cv);
                    if (typeof ck != "undefined") {
                        if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
                            e = cv.split("$");
                            g = [];
                            j = {};
                            for (f = 0; f < e.length; f++) {
                                try {
                                    g = e[f].split(":");
                                    if (g.length > 2) {
                                        g[1] = g.slice(1).join(":");
                                    }
                                    v = "";
                                    if (("" + g[1]).indexOf("~") == 0) {
                                        h = g[1].substring(1).split("|");
                                        for (i = 0; i < h.length; i++)
                                            h[i] = utag.ut.decode(h[i]);
                                        v = h
                                    } else
                                        v = utag.ut.decode(g[1]);
                                    j[g[0]] = v;
                                } catch (er) {
                                    utag.DB(er)
                                }
                                ;
                            }
                            o[ck] = {};
                            for (f in utag.loader.GV(j)) {
                                if (utag.ut.typeOf(j[f]) == "array") {
                                    n = [];
                                    for (m = 0; m < j[f].length; m++) {
                                        if (j[f][m].match(s)) {
                                            k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                            if (k > t)
                                                n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                                        }
                                    }
                                    j[f] = n.join("|");
                                } else {
                                    j[f] = "" + j[f];
                                    if (j[f].match(s)) {
                                        k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                        j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                                    }
                                }
                                if (j[f])
                                    o[ck][f] = j[f];
                            }
                        } else if (utag.cl[ck] || utag.cl['_all_']) {
                            o[ck] = e
                        }
                    }
                }
                if (newMultiCookies) {
                    Object.keys(newMultiCookies).forEach(function(tag) {
                        o[tag] = {};
                        Object.keys(newMultiCookies[tag]).forEach(function(key) {
                            o[tag][key] = newMultiCookies[tag][key].split(';exp-')[0]
                        })
                    });
                }
                return (a) ? (o[a] ? o[a] : {}) : o;
            },
            SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
                if (!a)
                    return 0;
                if (a == "utag_main" && utag.cfg.nocookie)
                    return 0;
                v = "";
                var date = new Date();
                var exp = new Date();
                var data;
                exp.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
                x = exp.toGMTString();
                if (c && c === "da" || (utag.cfg.split_cookie && c === 'd')) {
                    x = "Thu, 31 Dec 2009 00:00:00 GMT";
                    data = utag.loader.GV(b);
                } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
                    if (typeof b != "object") {
                        v = b
                    }
                } else {
                    if (utag.cfg.split_cookie) {
                        d = utag.loader.readIndividualCookies()[a] || {};
                        data = utag.loader.GV(b);
                    } else {
                        d = utag.loader.RC(a, 0);
                    }
                    for (e in utag.loader.GV(b)) {
                        f = "" + b[e];
                        if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
                            g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
                            if (RegExp.$3 == "u")
                                g = parseInt(RegExp.$2);
                            f = RegExp.$1 + ";exp-" + g;
                        }
                        if (c == "i") {
                            if (d[e] == null)
                                d[e] = f;
                        } else if (c == "d")
                            delete d[e];
                        else if (c == "a")
                            d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
                        else if (c == "ap" || c == "au") {
                            if (d[e] == null)
                                d[e] = f;
                            else {
                                if (d[e].indexOf("|") > 0) {
                                    d[e] = d[e].split("|")
                                }
                                g = (utag.ut.typeOf(d[e]) == "array") ? d[e] : [d[e]];
                                g.push(f);
                                if (c == "au") {
                                    h = {};
                                    k = {};
                                    for (i = 0; i < g.length; i++) {
                                        if (g[i].match(/^(.*);exp-(.*)$/)) {
                                            j = RegExp.$1;
                                        }
                                        if (typeof k[j] == "undefined") {
                                            k[j] = 1;
                                            h[g[i]] = 1;
                                        }
                                    }
                                    g = [];
                                    for (i in utag.loader.GV(h)) {
                                        g.push(i);
                                    }
                                }
                                d[e] = g
                            }
                        } else
                            d[e] = f;
                    }
                    if (utag.loader.convertingToSplitCookies() === true) {
                        delete d[a];
                    }
                    data = utag.loader.GV(d);
                    h = new Array();
                    for (g in data) {
                        if (utag.ut.typeOf(d[g]) == "array") {
                            for (c = 0; c < d[g].length; c++) {
                                d[g][c] = encodeURIComponent(d[g][c])
                            }
                            h.push(g + ":~" + d[g].join("|"))
                        } else
                            h.push((g + ":").replace(/[\,\$\;\?]/g, "") + encodeURIComponent(d[g]))
                    }
                    if (h.length == 0) {
                        h.push("");
                        x = ""
                    }
                    v = (h.join("$"));
                }
                if (utag.cfg.split_cookie && c !== 'da' && c !== 'd') {
                    utag.loader.prepareAndWriteCookies(a, data, x);
                } else if (utag.cfg.split_cookie) {
                    utag.loader.mapUtagCookies(function(cookieInfo) {
                        var cookiesToDelete = Object.keys(data || {}).map(function(key) {
                            return a + '_' + key
                        });
                        if ((c === 'da' && cookieInfo.key.startsWith(a)) || (c === 'd' && cookiesToDelete.indexOf(cookieInfo.key) !== -1)) {
                            document.cookie = cookieInfo.key + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x + (utag.cfg.secure_cookie ? ";secure" : "");
                        }
                    })
                } else {
                    document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x + (utag.cfg.secure_cookie ? ";secure" : "");
                }
                return 1
            },
            prepareAndWriteCookies: function(tag, data, expiration) {
                var defaultSessionExpirationCookies = ["_pn", "_ss", "_st", "_ses_id", "_se"];
                var originalExpiration = expiration;
                if (Object.keys(data).length > 0) {
                    for (var key in data) {
                        expiration = originalExpiration;
                        if (!utag.loader.cookieIsAllowed(key)) {
                            continue;
                        }
                        var value = String(data[key]);
                        if (defaultSessionExpirationCookies.includes(key)) {
                            value = utag.loader.addExpSessionFlag(value);
                        }
                        if (value.match(/exp-(\d+|session)$/)) {
                            var expValue = RegExp.$1;
                            if (expValue === "session" && !!utag.cfg.session_timeout) {
                                value = utag.loader.addExpSessionFlag(value);
                                expiration = new Date();
                                expiration.setTime(expiration.getTime() + parseInt(utag.cfg.session_timeout));
                                expiration = expiration.toGMTString();
                            } else {
                                var expInt = parseInt(expValue);
                                if (!!expInt) {
                                    value = utag.loader.addExpFlag(value, expInt);
                                    expiration = new Date(expInt);
                                    expiration = expiration.toGMTString();
                                }
                            }
                        }
                        utag.loader.writeCookie(tag + "_" + key, value, expiration);
                    }
                    utag.loader.deleteCookie(tag);
                }
            },
            writeCookie: function(key, value, expiration) {
                if (value.includes(";")) {
                    value = value.replace(/;/g, encodeURIComponent(";"));
                }
                document.cookie = key + "=" + value + ";path=/;domain=" + utag.cfg.domain + ";expires=" + expiration + (utag.cfg.secure_cookie ? ";secure" : "");
            },
            LOAD: function(a, b, c, d) {
                if (!utag.loader.cfg) {
                    return
                }
                if (this.ol == 0) {
                    if (utag.loader.cfg[a].block && utag.loader.cfg[a].cbf) {
                        this.f[a] = 1;
                        delete utag.loader.bq[a];
                    }
                    for (b in utag.loader.GV(utag.loader.bq)) {
                        if (utag.loader.cfg[a].load == 4 && utag.loader.cfg[a].wait == 0) {
                            utag.loader.bk[a] = 1;
                            utag.DB("blocked: " + a);
                        }
                        utag.DB("blocking: " + b);
                        return;
                    }
                    utag.loader.INIT();
                    return;
                }
                utag.DB('utag.loader.LOAD:' + a);
                if (this.f[a] == 0) {
                    this.f[a] = 1;
                    if (utag.cfg.noview != true) {
                        if (utag.loader.cfg[a].send) {
                            utag.DB("SENDING: " + a);
                            try {
                                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                                    utag.DB("utag.loader.LOAD:sendq: " + a);
                                    while (d = utag.loader.sendq[a].shift()) {
                                        utag.DB(d);
                                        utag.sender[a].send(d.event, utag.handler.C(d.data));
                                        utag.loader.sendq.pending--;
                                    }
                                } else {
                                    utag.sender[a].send('view', utag.handler.C(utag.data));
                                }
                                utag.rpt['s_' + a] = 0;
                            } catch (e) {
                                utag.DB(e);
                                utag.rpt['s_' + a] = 1;
                            }
                        }
                    }
                    if (utag.loader.rf == 0)
                        return;
                    for (b in utag.loader.GV(this.f)) {
                        if (this.f[b] == 0 || this.f[b] == 2)
                            return
                    }
                    utag.loader.END();
                }
            },
            EV: function(a, b, c, d) {
                if (b == "ready") {
                    if (!utag.data) {
                        try {
                            utag.cl = {
                                '_all_': 1
                            };
                            utag.loader.initdata();
                            utag.loader.RD(utag.data);
                        } catch (e) {
                            utag.DB(e)
                        }
                        ;
                    }
                    if ((document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading")
                        setTimeout(c, 1);
                    else {
                        utag.loader.ready_q.push(c);
                        var RH;
                        if (utag.loader.ready_q.length <= 1) {
                            if (document.addEventListener) {
                                RH = function() {
                                    document.removeEventListener("DOMContentLoaded", RH, false);
                                    utag.loader.run_ready_q()
                                }
                                ;
                                if (!utag.cfg.dom_complete)
                                    document.addEventListener("DOMContentLoaded", RH, false);
                                window.addEventListener("load", utag.loader.run_ready_q, false);
                            } else if (document.attachEvent) {
                                RH = function() {
                                    if (document.readyState === "complete") {
                                        document.detachEvent("onreadystatechange", RH);
                                        utag.loader.run_ready_q()
                                    }
                                }
                                ;
                                document.attachEvent("onreadystatechange", RH);
                                window.attachEvent("onload", utag.loader.run_ready_q);
                            }
                        }
                    }
                } else {
                    if (a.addEventListener) {
                        a.addEventListener(b, c, false)
                    } else if (a.attachEvent) {
                        a.attachEvent(((d == 1) ? "" : "on") + b, c)
                    }
                }
            },
            END: function(b, c, d, e, v, w) {
                if (this.ended) {
                    return
                }
                ;this.ended = 1;
                utag.DB("loader.END");
                b = utag.data;
                if (utag.handler.base && utag.handler.base != '*') {
                    e = utag.handler.base.split(",");
                    for (d = 0; d < e.length; d++) {
                        if (typeof b[e[d]] != "undefined")
                            utag.handler.df[e[d]] = b[e[d]]
                    }
                } else if (utag.handler.base == '*') {
                    utag.ut.merge(utag.handler.df, b, 1);
                }
                utag.rpt['r_0'] = "t";
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
                utag.rpt.ts['s'] = new Date();
                v = utag.cfg.path;
                w = v.indexOf(".tiqcdn.");
                if (w > 0 && b["cp.utag_main__ss"] == 1 && !utag.cfg.no_session_count)
                    utag.ut.loader({
                        src: v.substring(0, v.indexOf("/ut" + "ag/") + 6) + "tiqapp/ut" + "ag.v.js?a=" + utag.cfg.utid + (utag.cfg.nocookie ? "&nocookie=1" : "&cb=" + (new Date).getTime()),
                        id: "tiqapp"
                    })
                if (utag.cfg.noview != true)
                    utag.handler.RE('view', b, "end");
                utag.handler.INIT();
            }
        },
        DB: function(a, b) {
            if (utag.cfg.utagdb === false) {
                return;
            } else if (typeof utag.cfg.utagdb == "undefined") {
                b = document.cookie + '';
                utag.cfg.utagdb = ((b.indexOf('utagdb=true') >= 0) ? true : false);
            }
            if (utag.cfg.utagdb === true) {
                var t;
                if (utag.ut.typeOf(a) == "object") {
                    t = utag.handler.C(a)
                } else {
                    t = a
                }
                utag.db_log.push(t);
                try {
                    if (!utag.cfg.noconsole)
                        console.log(t)
                } catch (e) {}
            }
        },
        RP: function(a, b, c) {
            if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
                b = [];
                for (c in utag.loader.GV(a)) {
                    if (c != 'src')
                        b.push(c + '=' + escape(a[c]))
                }
                this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
            }
        },
        view: function(a, c, d) {
            return this.track({
                event: 'view',
                data: a || {},
                cfg: {
                    cb: c,
                    uids: d
                }
            })
        },
        link: function(a, c, d) {
            return this.track({
                event: 'link',
                data: a || {},
                cfg: {
                    cb: c,
                    uids: d
                }
            })
        },
        track: function(a, b, c, d, e) {
            a = a || {};
            if (typeof a == "string") {
                a = {
                    event: a,
                    data: b || {},
                    cfg: {
                        cb: c,
                        uids: d
                    }
                }
            }
            for (e in utag.loader.GV(utag.o)) {
                utag.o[e].handler.trigger(a.event || "view", a.data || a, a.cfg || {
                    cb: b,
                    uids: c
                })
            }
            a.cfg = a.cfg || {
                cb: b
            };
            if (typeof a.cfg.cb == "function")
                a.cfg.cb();
            return true
        },
        handler: {
            base: "",
            df: {},
            o: {},
            send: {},
            iflag: 0,
            INIT: function(a, b, c) {
                utag.DB('utag.handler.INIT');
                if (utag.initcatch) {
                    utag.initcatch = 0;
                    return
                }
                this.iflag = 1;
                a = utag.loader.q.length;
                if (a > 0) {
                    utag.DB("Loader queue");
                    for (b = 0; b < a; b++) {
                        c = utag.loader.q[b];
                        utag.handler.trigger(c.a, c.b, c.c)
                    }
                }
            },
            test: function() {
                return 1
            },
            LR: function(b) {
                utag.DB("Load Rules");
                for (var d in utag.loader.GV(utag.cond)) {
                    utag.cond[d] = false;
                }
                utag.DB(b);
                utag.loader.loadrules(b);
                utag.DB(utag.cond);
                utag.loader.initcfg();
                utag.loader.OU();
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
            },
            RE: function(a, b, c, d, e, f, g) {
                if (c != "alr" && !this.cfg_extend) {
                    return 0;
                }
                utag.DB("RE: " + c);
                if (c == "alr")
                    utag.DB("All Tags EXTENSIONS");
                utag.DB(b);
                if (typeof this.extend != "undefined") {
                    g = 0;
                    for (d = 0; d < this.extend.length; d++) {
                        try {
                            e = 0;
                            if (typeof this.cfg_extend != "undefined") {
                                f = this.cfg_extend[d];
                                if (typeof f.count == "undefined")
                                    f.count = 0;
                                if (f[a] == 0 || (f.once == 1 && f.count > 0) || f[c] == 0) {
                                    e = 1
                                } else {
                                    if (f[c] == 1) {
                                        g = 1
                                    }
                                    ;f.count++
                                }
                            }
                            if (e != 1) {
                                this.extend[d](a, b);
                                utag.rpt['ex_' + d] = 0
                            }
                        } catch (er) {
                            utag.DB(er);
                            utag.rpt['ex_' + d] = 1;
                            utag.ut.error({
                                e: er.message,
                                s: utag.cfg.path + 'utag.js',
                                l: d,
                                t: 'ge'
                            });
                        }
                    }
                    utag.DB(b);
                    return g;
                }
            },
            trigger: function(a, b, c, d, e, f) {
                utag.DB('trigger:' + a + (c && c.uids ? ":" + c.uids.join(",") : ""));
                b = b || {};
                utag.DB(b);
                if (!this.iflag) {
                    utag.DB("trigger:called before tags loaded");
                    for (d in utag.loader.f) {
                        if (!(utag.loader.f[d] === 1))
                            utag.DB('Tag ' + d + ' did not LOAD')
                    }
                    utag.loader.q.push({
                        a: a,
                        b: utag.handler.C(b),
                        c: c
                    });
                    return;
                }
                utag.ut.merge(b, this.df, 0);
                utag.loader.RD(b, a);
                utag.cfg.noview = false;
                function sendTag(a, b, d) {
                    try {
                        if (typeof utag.sender[d] != "undefined") {
                            utag.DB("SENDING: " + d);
                            utag.sender[d].send(a, utag.handler.C(b));
                            utag.rpt['s_' + d] = 0;
                        } else if (utag.loader.cfg[d].load != 2) {
                            utag.loader.sendq[d] = utag.loader.sendq[d] || [];
                            utag.loader.sendq[d].push({
                                "event": a,
                                "data": utag.handler.C(b)
                            });
                            utag.loader.sendq.pending++;
                            utag.loader.AS({
                                id: d,
                                load: 1
                            });
                        }
                    } catch (e) {
                        utag.DB(e)
                    }
                }
                if (c && c.uids) {
                    this.RE(a, b, "alr");
                    for (f = 0; f < c.uids.length; f++) {
                        d = c.uids[f];
                        if (!utag.loader.OU(utag.loader.cfg[d].tid)) {
                            sendTag(a, b, d);
                        }
                    }
                } else if (utag.cfg.load_rules_ajax) {
                    this.RE(a, b, "blr");
                    this.LR(b);
                    this.RE(a, b, "alr");
                    for (f = 0; f < utag.loader.cfgsort.length; f++) {
                        d = utag.loader.cfgsort[f];
                        if (utag.loader.cfg[d].load && utag.loader.cfg[d].send) {
                            sendTag(a, b, d);
                        }
                    }
                } else {
                    this.RE(a, b, "alr");
                    for (d in utag.loader.GV(utag.sender)) {
                        sendTag(a, b, d);
                    }
                }
                this.RE(a, b, "end");
            },
            C: function(a, b, c) {
                b = {};
                for (c in utag.loader.GV(a)) {
                    if (utag.ut.typeOf(a[c]) == "array") {
                        b[c] = a[c].slice(0)
                    } else {
                        b[c] = a[c]
                    }
                }
                return b
            }
        },
        ut: {
            pad: function(a, b, c, d) {
                a = "" + ((a - 0).toString(16));
                d = '';
                if (b > a.length) {
                    for (c = 0; c < (b - a.length); c++) {
                        d += '0'
                    }
                }
                return "" + d + a
            },
            vi: function(t, a, b) {
                if (!utag.v_id) {
                    a = this.pad(t, 12);
                    b = "" + Math.random();
                    a += this.pad(b.substring(2, b.length), 16);
                    try {
                        a += this.pad((navigator.plugins.length ? navigator.plugins.length : 0), 2);
                        a += this.pad(navigator.userAgent.length, 3);
                        a += this.pad(document.URL.length, 4);
                        a += this.pad(navigator.appVersion.length, 3);
                        a += this.pad(screen.width + screen.height + parseInt((screen.colorDepth) ? screen.colorDepth : screen.pixelDepth), 5)
                    } catch (e) {
                        utag.DB(e);
                        a += "12345"
                    }
                    ;utag.v_id = a;
                }
                return utag.v_id
            },
            hasOwn: function(o, a) {
                return o != null && Object.prototype.hasOwnProperty.call(o, a)
            },
            isEmptyObject: function(o, a) {
                for (a in o) {
                    if (utag.ut.hasOwn(o, a))
                        return false
                }
                return true
            },
            isEmpty: function(o) {
                var t = utag.ut.typeOf(o);
                if (t == "number") {
                    return isNaN(o)
                } else if (t == "boolean") {
                    return false
                } else if (t == "string") {
                    return o.length === 0
                } else
                    return utag.ut.isEmptyObject(o)
            },
            typeOf: function(e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            },
            flatten: function(o) {
                var a = {};
                function r(c, p) {
                    if (Object(c) !== c || utag.ut.typeOf(c) == "array") {
                        a[p] = c;
                    } else {
                        if (utag.ut.isEmptyObject(c)) {} else {
                            for (var d in c) {
                                r(c[d], p ? p + "." + d : d);
                            }
                        }
                    }
                }
                r(o, "");
                return a;
            },
            merge: function(a, b, c, d) {
                if (c) {
                    for (d in utag.loader.GV(b)) {
                        a[d] = b[d]
                    }
                } else {
                    for (d in utag.loader.GV(b)) {
                        if (typeof a[d] == "undefined")
                            a[d] = b[d]
                    }
                }
            },
            decode: function(a, b) {
                b = "";
                try {
                    b = decodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                }
                ;if (b == "") {
                    b = unescape(a)
                }
                ;return b
            },
            encode: function(a, b) {
                b = "";
                try {
                    b = encodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                }
                ;if (b == "") {
                    b = escape(a)
                }
                ;return b
            },
            error: function(a, b, c) {
                if (typeof utag_err != "undefined") {
                    utag_err.push(a)
                }
            },
            loader: function(o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        m.parentNode.removeChild(m);
                    }
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id
                }
                ;for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l])
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function() {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function() {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        }
                        ;
                    }
                }
                if (typeof o.error == "function") {
                    utag.loader.EV(b, "error", o.error);
                }
                if (o.type != "img") {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b)
                        }
                    }
                }
            }
        }
    };
    utag.o['tealiumlabs.retail-21'] = utag;
    utag.cfg = {
        template: "ut4.51.",
        load_rules_ajax: true,
        load_rules_at_wait: false,
        lowerqp: false,
        noconsole: false,
        session_timeout: 1800000,
        readywait: 0,
        noload: 0,
        domain: utag.loader.lh(),
        datasource: "##UTDATASOURCE##".replace("##" + "UTDATASOURCE##", ""),
        secure_cookie: ("##UTSECURECOOKIE##".replace("##" + "UTSECURECOOKIE##", "") === "true") ? true : false,
        path: "//tags.tiqcdn.com/utag/tealiumlabs/retail-21/prod/",
        utid: "tealiumlabs/retail-21/202507150714",
        ignoreSessionStorage: false,
        ignoreLocalStorage: false,
        split_cookie: true
    };
    utag.cfg.v = utag.cfg.template + "202507150714";
    utag.cond = {
        10: 0,
        16: 0,
        17: 0,
        19: 0,
        283: 0,
        2: 0,
        5: 0,
        617: 0,
        622: 0,
        7: 0
    };
    utag.loader.initdata = function() {
        try {
            utag.data = (typeof utag_data != 'undefined') ? utag_data : {};
            utag.udoname = 'utag_data';
        } catch (e) {
            utag.data = {};
            utag.DB('idf:' + e);
        }
    }
    ;
    utag.loader.loadrules = function(_pd, _pc) {
        var d = _pd || utag.data;
        var c = _pc || utag.cond;
        for (var l in utag.loader.GV(c)) {
            switch (l) {
            case '10':
                try {
                    c[10] |= (d['page_name'].toString().toLowerCase() == 'VIP'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '16':
                try {
                    c[16] |= (d['page_type'].toString().toLowerCase().indexOf('category'.toLowerCase()) > -1)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '17':
                try {
                    c[17] |= (typeof d['occasion'] != 'undefined' && d['occasion'] != '')
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '19':
                try {
                    c[19] |= (typeof d['momentsiq_closed'] != 'undefined' && d['momentsiq_closed'] != '')
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '2':
                try {
                    c[2] |= (typeof d['dom.url'] != 'undefined' && typeof d['dom.url'] != 'undefined' && d['dom.url'] != '')
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '283':
                try {
                    c[283] |= (d['cp.utag_main__ss'] == '1') || (d['cp.utag_main__pn'] == '1')
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '5':
                try {
                    c[5] |= (d['page_name'].toString().toLowerCase() == 'cart success'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '617':
                try {
                    c[617] |= (d['dom.query_string'].toString().toLowerCase() == 'ccpa=true'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '622':
                try {
                    c[622] |= (d['dom.url'].toString().toLowerCase().indexOf('/success/'.toLowerCase()) < 0)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '7':
                try {
                    c[7] |= (typeof d['cp.utag_main_ttd_uuid'] == 'undefined')
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            }
        }
    }
    ;
    utag.pre = function() {
        utag.loader.initdata();
        try {
            utag.loader.RD(utag.data)
        } catch (e) {
            utag.DB(e)
        }
        ;utag.loader.loadrules();
    }
    ;
    utag.loader.GET = function() {
        utag.cl = {
            '_all_': 1
        };
        utag.pre();
        utag.handler.extend = [function(a, b) {
            var dleURI = '//tags.tiqcdn.com/dle/tealiumlabs/retail-21/';
            var iv;
            utag.globals = utag.globals || {};
            utag.globals.dle = utag.globals.dle || {
                enrichments: {},
                data: {},
                loaded: false,
                timeout: false,
                dlobj: {
                    'product_sku_string': {
                        sq: 0,
                        cb: function() {
                            utag.globals.dle.bld(0);
                        }
                    }
                },
                ids: [],
                dst: [''],
                bld: function(id) {
                    utag.globals.dle.dst[id] = 'l';
                    if (utag.globals.dle.dst.join('').indexOf('w') == -1) {
                        utag.globals.dle.asm();
                    }
                },
                asm: function() {
                    if (!utag.globals.dle.loaded) {
                        utag.globals.dle.loaded = true;
                        for (iv = 0; iv < utag.globals.dle.ids.length; iv++) {
                            if (utag.globals.dle.dst[iv] != 'w' && typeof utag.globals.dle.enrichments[utag.globals.dle.ids[iv]] !== 'undefined') {
                                utag.ut.merge(utag.globals.dle.data, utag.globals.dle.enrichments[utag.globals.dle.ids[iv]], 1);
                            }
                        }
                        utag.view(utag.globals.dle.data);
                    }
                }
            };
            utag.ut.merge(utag.globals.dle.data, b);
            if (!utag.globals.dle.loaded) {
                for (iv in utag.loader.GV(utag.globals.dle.dlobj)) {
                    if (typeof b[iv] != 'undefined' && b[iv] != '') {
                        if (!utag.globals.dle.timeout) {
                            setTimeout(utag.globals.dle.asm, 30000);
                            utag.globals.dle.timeout = true;
                        }
                        utag.cfg.noview = true;
                        b[iv] = b[iv].toString().toLowerCase();
                        utag.globals.dle.dst[utag.globals.dle.dlobj[iv].sq] = 'w';
                        utag.globals.dle.ids.push(b[iv]);
                        utag.ut.loader({
                            src: dleURI + b[iv] + '.js',
                            cb: utag.globals.dle.dlobj[iv].cb,
                            error: utag.globals.dle.asm
                        });
                    }
                }
                return false;
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    var engine_id = "25dc6de0-6c04-4e8d-82aa-53235b2d2a15";
                    var momentsApiRequestAttempt = 0;
                    var pathName = window.location.pathname;
                    var success;
                    if (pathName == "/men/bowery-chino-pants.html" || pathName === "/checkout/onepage/success/") {
                        console.log("Moments API // Fetching Visitor Data");
                        function getCookie(cname) {
                            let name = cname + "=";
                            let decodedCookie = decodeURIComponent(document.cookie);
                            let ca = decodedCookie.split(";");
                            for (let i = 0; i < ca.length; i++) {
                                let c = ca[i];
                                while (c.charAt(0) == " ") {
                                    c = c.substring(1);
                                }
                                if (c.indexOf(name) == 0) {
                                    return c.substring(name.length, c.length);
                                }
                            }
                            return "";
                        }
                        var baseRequestUri = "https://personalization-api.us-east-1.prod.tealiumapis.com/personalization/accounts/tealiumlabs/profiles/retail-21/engines/25dc6de0-6c04-4e8d-82aa-53235b2d2a15/visitors/";
                        var visitorId = getCookie("utag_main_v_id") + "retail-21";
                        console.log("Moments API - utag_main_v_id: ", visitorId);
                        var momentsApiRequest = baseRequestUri + visitorId + "?suppressNotFound=true";
                        function writeToLocalStorage(obj, engineId) {
                            const prefix = "moments_" + engineId + "_";
                            const saveToLocalStorage = (key, value) => {
                                localStorage.setItem(prefix + key, JSON.stringify(value));
                            }
                            ;
                            for (const key in obj) {
                                if (obj.hasOwnProperty(key)) {
                                    saveToLocalStorage(key, obj[key]);
                                }
                            }
                        }
                        const localStorageLTV = JSON.parse(localStorage.getItem('moments_25dc6de0-6c04-4e8d-82aa-53235b2d2a15_metrics'));
                        function checkLTVValue(obj) {
                            const ltvValue = obj["Lifetime Value (LTV)"];
                            console.log('Moments API // Lifetime Value (LTV): ', ltvValue);
                            if (ltvValue > 140) {
                                localStorage.setItem('visitor_loyalty_status', 'VIP');
                                console.log('Moments API // Wrote visitor_loyalty_status localStorage');
                            }
                            return ltvValue;
                        }
                        const requestMomentsApi = () => {
                            return new Promise( (resolve, reject) => {
                                fetch(momentsApiRequest).then( (response) => {
                                    momentsApiRequestAttempt++;
                                    console.log('Moments API // Request > #', momentsApiRequestAttempt);
                                    if (!response.ok) {
                                        throw new Error(`Moments API Error:${response.status}`);
                                    }
                                    return response.json();
                                }
                                ).then( (data) => {
                                    if (Object.keys(data).length === 0) {
                                        console.warn("Moments API // < Empty Response");
                                    } else {
                                        success = true;
                                        writeToLocalStorage(data, engine_id);
                                        console.log("Moments API // < Response - ", data);
                                        resolve('Moments API // Favorite Written to localStorage');
                                    }
                                }
                                ).catch( (error) => {
                                    if (error.message.startsWith("Unexpected end of JSON input")) {
                                        console.warn("Moments API // Error < Empty Response from API ", error.message);
                                    } else {
                                        console.error("Moments API // Fetch Error - ", error);
                                    }
                                    if (!success && momentsApiRequestAttempt <= 6) {
                                        setTimeout( () => {
                                            requestMomentsApi().then(resolve).catch(reject);
                                        }
                                        , 500);
                                    } else if (momentsApiRequestAttempt > 6) {
                                        reject('Moments API // Request Complete after ' + momentsApiRequestAttempt + ' attempts');
                                        var favorite = JSON.stringify({
                                            "Favorite Product (favorite)": "Bowery Chino Pants"
                                        });
                                        localStorage.setItem('moments_25dc6de0-6c04-4e8d-82aa-53235b2d2a15_properties', favorite);
                                    }
                                }
                                );
                            }
                            );
                        }
                        ;
                        setTimeout( () => {
                            requestMomentsApi().then( (result) => console.log(result)).catch( (error) => console.error(error)).finally( () => {
                                const localStorageLTV = JSON.parse(localStorage.getItem('moments_25dc6de0-6c04-4e8d-82aa-53235b2d2a15_metrics'));
                                if (typeof localStorageLTV === 'object' && !Array.isArray(localStorageLTV) && localStorageLTV !== null) {
                                    checkLTVValue(localStorageLTV);
                                }
                            }
                            );
                        }
                        , 1200);
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if ((typeof b['customer_id'] != 'undefined' && typeof b['customer_id'] != 'undefined' && b['customer_id'] != '')) {
                    b['user_id'] = b['customer_id']
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['page_name'].toString().toLowerCase().indexOf('Madison rx3400'.toLowerCase()) > -1) {
                    try {
                        b['category_name'] = (utag.data.page_category_name && utag.data.page_category_name.indexOf("Default") < 0) ? utag.data.page_category_name : (utag.data.page_subcategory_name ? utag.data.page_subcategory_name : "No Category")
                    } catch (e) {}
                    ;b['ga_event_name'] = 'view_item_list'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if ((typeof b['page_name'] != 'undefined' && b['page_name'].toString().toLowerCase() == 'checkout'.toLowerCase() && b['dom.pathname'].toString().toLowerCase() == '/checkout/onepage/'.toLowerCase()) || (b['page_name'].toString().toLowerCase() == 'checkout'.toLowerCase() && typeof b['page_name'] != 'undefined' && b['dom.pathname'].toString().toLowerCase() == '/checkout/onepage/index/'.toLowerCase())) {
                    b['checkout_step_name'] = 'one page checkout';
                    b['ga_event_name'] = 'begin_checkout'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['dom.url'].toString().toLowerCase().indexOf('/success'.toLowerCase()) > -1) {
                    try {
                        b['customer_country'] = ""
                    } catch (e) {}
                    ;try {
                        b['customer_state'] = ""
                    } catch (e) {}
                    ;try {
                        b['order_coupon_code'] = ""
                    } catch (e) {}
                    ;try {
                        b['order_shipping_type'] = ""
                    } catch (e) {}
                    ;try {
                        b['product_on_page'] = ""
                    } catch (e) {}
                    ;try {
                        b['product_image_url'] = ""
                    } catch (e) {}
                    ;try {
                        b['product_promo_code'] = ""
                    } catch (e) {}
                    ;try {
                        b['customer_zip'] = ""
                    } catch (e) {}
                    ;try {
                        b['customer_city'] = ""
                    } catch (e) {}
                    ;b['ga_event_name'] = 'purchase';
                    b['tealium_event'] = 'purchase'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['tealium_event'] == 'view' || b['dom.url'].toString().toLowerCase().indexOf('/account/login/'.toLowerCase()) > -1 || b['dom.url'].toString().toLowerCase().indexOf('/catalogsearch/advanced/'.toLowerCase()) > -1) {
                    b['tealium_event'] = 'page_view'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['dom.url'].toString().indexOf('/customer-service/') > -1) {
                    b['tealium_event'] = 'customer-service'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if ((typeof b['product_name'] != 'undefined' && b['product_name'] != '' && typeof b['product_price'] != 'undefined' && b['product_price'] != '' && typeof b['product_list_price'] != 'undefined' && b['product_list_price'] != '' && b['ut.event'].toString().toLowerCase().indexOf('view'.toLowerCase()) > -1 && b['dom.url'].toString().toLowerCase().indexOf('/checkout/'.toLowerCase()) < 0 && b['dom.url'].toString().toLowerCase() != 'https://ecommerce.tealiumdemo.com/vip/flapover-briefcase.html'.toLowerCase())) {
                    b['tealium_event'] = 'product_details'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['dom.url'].toString().indexOf('/contacts/') > -1) {
                    b['tealium_event'] = 'contact'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b, c, d) {
            b._ccity = '';
            b._ccountry = '';
            b._ccurrency = (typeof b['order_currency'] != 'undefined') ? b['order_currency'] : '';
            b._ccustid = (typeof b['customer_id'] != 'undefined') ? b['customer_id'] : '';
            b._corder = (typeof b['order_id'] != 'undefined') ? b['order_id'] : '';
            b._cpromo = '';
            b._cship = (typeof b['order_shipping'] != 'undefined') ? b['order_shipping'] : '';
            b._cstate = '';
            b._cstore = '';
            b._csubtotal = (typeof b['order_subtotal'] != 'undefined') ? b['order_subtotal'] : '';
            b._ctax = (typeof b['order_tax'] != 'undefined') ? b['order_tax'] : '';
            b._ctotal = (typeof b['order_total'] != 'undefined') ? b['order_total'] : '';
            b._ctype = '';
            b._czip = '';
            b._cprod = (typeof b['product_id'] != 'undefined' && b['product_id'].length > 0) ? b['product_id'] : [];
            b._cprodname = (typeof b['product_name'] != 'undefined' && b['product_name'].length > 0) ? b['product_name'] : [];
            b._cbrand = (typeof b['product_brand'] != 'undefined' && b['product_brand'].length > 0) ? b['product_brand'] : [];
            b._ccat = (typeof b['product_category'] != 'undefined' && b['product_category'].length > 0) ? b['product_category'] : [];
            b._ccat2 = [];
            b._cquan = (typeof b['product_quantity'] != 'undefined' && b['product_quantity'].length > 0) ? b['product_quantity'] : [];
            b._cprice = (typeof b['product_unit_price'] != 'undefined' && b['product_unit_price'].length > 0) ? b['product_unit_price'] : [];
            b._csku = (typeof b['product_sku'] != 'undefined' && b['product_sku'].length > 0) ? b['product_sku'] : [];
            b._cpdisc = [];
            if (b._cprod.length == 0) {
                b._cprod = b._csku.slice()
            }
            ;if (b._cprodname.length == 0) {
                b._cprodname = b._csku.slice()
            }
            ;function tf(a) {
                if (a == '' || isNaN(parseFloat(a))) {
                    return a
                } else {
                    return (parseFloat(a)).toFixed(2)
                }
            }
            ;b._ctotal = tf(b._ctotal);
            b._csubtotal = tf(b._csubtotal);
            b._ctax = tf(b._ctax);
            b._cship = tf(b._cship);
            for (c = 0; c < b._cprice.length; c++) {
                b._cprice[c] = tf(b._cprice[c])
            }
            ;for (c = 0; c < b._cpdisc.length; c++) {
                b._cpdisc[c] = tf(b._cpdisc[c])
            }
            ;
        }
        , function(a, b) {
            if (typeof b['cp.utag_main_vsplit'] == 'undefined' || b['cp.utag_main_vsplit'] == '') {
                var r = parseInt((Math.random() * 100) + 1);
                var s = {
                    'a': 50,
                    'b': 50
                };
                var g = {}, k = 0, i;
                for (i in s) {
                    if (!s.hasOwnProperty(i)) {
                        continue;
                    }
                    k++;
                    g[i] = {};
                    g[i].min = k;
                    k = k + s[i] - 1;
                    g[i].max = k;
                }
                for (i in g) {
                    if (!g.hasOwnProperty(i)) {
                        continue;
                    }
                    if (r >= g[i].min && r <= g[i].max) {
                        s = i;
                        break;
                    }
                }
                utag.loader.SC('utag_main', {
                    'vsplit': s
                });
                b['cp.utag_main_vsplit'] = s;
            }
        }
        , function(a, b, c, d, e, f, g, h, i, j, t, o) {
            o = {
                channel: '',
                category: '',
                exp: 365
            };
            if (a == 'view') {
                if (typeof b['qp.utm_source'] != 'undefined' && b['dom.url'].toString().toLowerCase().indexOf('cj'.toLowerCase()) > -1) {
                    o.channel = 'Commission Junction';
                    o.category = 'affiliate'
                } else if (typeof b['qp.utm_source'] != 'undefined' && b['dom.url'].toString().toLowerCase().indexOf('ga'.toLowerCase()) > -1) {
                    o.channel = 'Google:SEM';
                    o.category = 'naturalsearch'
                } else if (typeof b['qp.utm_source'] != 'undefined' && b['dom.url'].toString().toLowerCase().indexOf('et'.toLowerCase()) > -1) {
                    o.channel = 'ExactTarget';
                    o.category = 'email'
                } else if (typeof b['qp.utm_source'] != 'undefined' && b['dom.url'].toString().toLowerCase().indexOf('bing'.toLowerCase()) > -1) {
                    o.channel = 'Bing:SEO';
                    o.category = 'paidsearch'
                } else if (typeof b['qp.utm_source'] != 'undefined' && b['dom.url'].toString().toLowerCase().indexOf('fb'.toLowerCase()) > -1) {
                    o.channel = 'Facebook';
                    o.category = 'socialmedia'
                } else if (typeof b['qp.utm_source'] != 'undefined' && b['dom.url'].toString().toLowerCase().indexOf('pin'.toLowerCase()) > -1) {
                    o.channel = 'Pinterest';
                    o.category = 'socialmedia'
                } else if (typeof b['qp.utm_source'] != 'undefined' && b['dom.url'].toString().toLowerCase().indexOf('abandonedCart'.toLowerCase()) > -1) {
                    o.channel = 'Abandoned Cart';
                    o.category = 'email'
                } else if (typeof b['qp.utm_source'] != 'undefined' && b['dom.url'].toString().indexOf('wb') > -1) {
                    o.channel = 'webinar';
                    o.category = 'sponsorships'
                } else if (b['dom.url'].toString().indexOf('of') > -1) {
                    o.channel = '';
                    o.category = ''
                }
                var dd = (isNaN(utag.cfg.domain.replace('.', ''))) ? utag.cfg.domain : location.hostname;
                dd = ' domain=' + dd + '; path=/;';
                if (o.channel != '') {
                    var exp = new Date().getTime() + 31536000000;
                    var expd = new Date(new Date().getTime() + 31536000000).toGMTString();
                    if (typeof b['cp.channelflow'] == 'undefined' && b['cp.channelflow'] != '') {
                        b['cp.channelflow'] = o.channel + '|' + o.category + '|' + exp;
                    } else {
                        var ncf = [];
                        var bcf = b['cp.channelflow'].split(',');
                        for (var i = bcf.length - 1; i > -1; i--) {
                            var chan = bcf[i].split('|');
                            if (i == (bcf.length - 1) && chan[0] == o.channel && chan[1] == o.category) {
                                bcf[i] = o.channel + '|' + o.category + '|' + exp;
                            } else if (i == (bcf.length - 1) && chan[0] != o.channel) {
                                ncf.push(o.channel + '|' + o.category + '|' + exp);
                            } else if (parseInt(chan[2]) <= (new Date().getTime() - 86400000 * o.exp)) {
                                bcf.splice(i, 1);
                            }
                        }
                        bcf = bcf.concat(ncf);
                        b['cp.channelflow'] = bcf.join();
                    }
                    document.cookie = 'channelflow=' + b['cp.channelflow'] + ';' + ' expires=' + expd + ';' + dd;
                    if (typeof b['cp.channeloriginator'] == 'undefined') {
                        b['cp.channeloriginator'] = o.channel;
                        document.cookie = 'channeloriginator=' + o.channel + ';' + ' expires=' + expd + ';' + dd;
                    }
                    b['cp.channelcloser'] = o.channel;
                    document.cookie = 'channelcloser=' + o.channel + ';' + ' expires=' + expd + ';' + dd;
                }
                if (typeof b['cp.channelflow'] != 'undefined') {
                    c = b['cp.channelflow'].split(','),
                    e = [],
                    f = [];
                    for (d = 0; d < c.length; d++) {
                        g = c[d].split('|');
                        if (!g[2] || g[2] == 0 || parseInt(g[2]) >= (new Date().getTime() - 86400000 * o.exp)) {
                            e.push(g[0]);
                            f.push(g[1])
                        }
                    }
                    ;if (e.length > 0) {
                        b['channel_originator'] = e[0];
                        b['channel_category_originator'] = f[0];
                        b['channel_closer'] = e[e.length - 1];
                        b['channel_category_closer'] = f[f.length - 1];
                        b['channel_path'] = e.join(',');
                        b['channel_category_path'] = f.join(',');
                        if (e.length == 1) {
                            b['channel_influencer'] = e[0];
                            b['channel_category_influencer'] = f[0];
                        } else {
                            e.pop();
                            f.pop();
                            e.shift();
                            f.shift();
                            t = {};
                            g = [];
                            h = [];
                            for (i = 0; i < e.length; i++) {
                                if (t[e[i] + '|' + f[i]] != 1) {
                                    g.push(e[i]);
                                    h.push(f[i])
                                } else
                                    t[e[i] + '|' + f[i]] = 1
                            }
                            ;e = g;
                            f = h;
                            b['channel_influencer'] = e.join(',');
                            b['channel_category_influencer'] = f.join(',');
                            b['channel_influencer_length'] = e.length;
                        }
                    } else {
                        b['channel_originator'] = '';
                        b['channel_category_originator'] = '';
                        b['channel_closer'] = '';
                        b['channel_category_closer'] = '';
                        b['channel_influencer'] = '';
                        b['channel_category_influencer'] = '';
                        b['channel_path'] = '';
                        b['channel_category_path'] = '';
                    }
                    var c = {
                        o: '15',
                        i: '20',
                        c: '65'
                    }
                      , cc = {
                        o: 0,
                        i: 0,
                        c: 0
                    }
                      , cv = b['order_total'];
                    if (parseFloat(cv) > 0) {
                        cc.o = cv * parseFloat(c.o / 100);
                        if (b['channel_influencer_length'] < 1)
                            b['channel_influencer_length'] = 1;
                        cc.i = parseFloat((cv * parseFloat(c.i / 100)) / b['channel_influencer_length']);
                        cc.c = cv * parseFloat(c.c / 100);
                        for (i in utag.loader.GV(cc)) {
                            cc[i] = cc[i].toFixed(2);
                        }
                    }
                    ;b['channel_influencer_credit'] = cc.i;
                    b['channel_originator_credit'] = cc.o;
                    b['channel_closer_credit'] = cc.c;
                }
            }
        }
        , function(a, b, c, d) {
            try {
                if ((typeof b['customer_first_name'] != 'undefined' && typeof b['customer_first_name'] != 'undefined' && b['customer_first_name'] != '' && typeof b['customer_last_name'] != 'undefined' && typeof b['customer_last_name'] != 'undefined' && b['customer_last_name'] != '')) {
                    c = [b['customer_first_name'], b['customer_last_name']];
                    b['customer_first_last_name'] = c.join(' ')
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['dom.url'].toString().indexOf('/success/') > -1) {
                    try {
                        b['customer_first_name'] = jQuery('.welcome-msg').text().split(',')[1].split(' ')[1]
                    } catch (e) {}
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['dom.url'].toString().indexOf('/success/') > -1) {
                    try {
                        b['customer_last_name'] = jQuery('.welcome-msg').text().split(',')[1].split(' ')[2].replace('!', '')
                    } catch (e) {}
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (typeof b['_customer_email'] != 'undefined') {
                    b['customer_id'] = b['_customer_email_non_encrypted']
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            utag.ut.md5 = function(t, n) {
                var r;
                if ("undefined" != typeof window && window.crypto && (r = window.crypto),
                !r && "undefined" != typeof window && window.msCrypto && (r = window.msCrypto),
                !r && "undefined" != typeof global && global.crypto && (r = global.crypto),
                !r && "function" == typeof require)
                    try {
                        r = require("crypto")
                    } catch (t) {}
                var e = function() {
                    if (r) {
                        if ("function" == typeof r.getRandomValues)
                            try {
                                return r.getRandomValues(new Uint32Array(1))[0]
                            } catch (t) {}
                        if ("function" == typeof r.randomBytes)
                            try {
                                return r.randomBytes(4).readInt32LE()
                            } catch (t) {}
                    }
                    throw new Error("Native crypto module could not be used to get secure random number.")
                }
                  , i = Object.create || function() {
                    function t() {}
                    return function(n) {
                        var r;
                        return t.prototype = n,
                        r = new t,
                        t.prototype = null,
                        r
                    }
                }()
                  , o = {}
                  , s = o.lib = {}
                  , a = s.Base = {
                    extend: function(t) {
                        var n = i(this);
                        return t && n.mixIn(t),
                        n.hasOwnProperty("init") && this.init !== n.init || (n.init = function() {
                            n.$super.init.apply(this, arguments)
                        }
                        ),
                        n.init.prototype = n,
                        n.$super = this,
                        n
                    },
                    create: function() {
                        var t = this.extend();
                        return t.init.apply(t, arguments),
                        t
                    },
                    init: function() {},
                    mixIn: function(t) {
                        for (var n in t)
                            t.hasOwnProperty(n) && (this[n] = t[n]);
                        t.hasOwnProperty("toString") && (this.toString = t.toString)
                    },
                    clone: function() {
                        return this.init.prototype.extend(this)
                    }
                }
                  , c = s.WordArray = a.extend({
                    init: function(t, n) {
                        t = this.words = t || [],
                        this.sigBytes = null != n ? n : 4 * t.length
                    },
                    toString: function(t) {
                        return (t || f).stringify(this)
                    },
                    concat: function(t) {
                        var n = this.words
                          , r = t.words
                          , e = this.sigBytes
                          , i = t.sigBytes;
                        if (this.clamp(),
                        e % 4)
                            for (var o = 0; o < i; o++) {
                                var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                                n[e + o >>> 2] |= s << 24 - (e + o) % 4 * 8
                            }
                        else
                            for (o = 0; o < i; o += 4)
                                n[e + o >>> 2] = r[o >>> 2];
                        return this.sigBytes += i,
                        this
                    },
                    clamp: function() {
                        var n = this.words
                          , r = this.sigBytes;
                        n[r >>> 2] &= 4294967295 << 32 - r % 4 * 8,
                        n.length = t.ceil(r / 4)
                    },
                    clone: function() {
                        var t = a.clone.call(this);
                        return t.words = this.words.slice(0),
                        t
                    },
                    random: function(t) {
                        for (var n = [], r = 0; r < t; r += 4)
                            n.push(e());
                        return new c.init(n,t)
                    }
                })
                  , u = o.enc = {}
                  , f = u.Hex = {
                    stringify: function(t) {
                        for (var n = t.words, r = t.sigBytes, e = [], i = 0; i < r; i++) {
                            var o = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                            e.push((o >>> 4).toString(16)),
                            e.push((15 & o).toString(16))
                        }
                        return e.join("")
                    },
                    parse: function(t) {
                        for (var n = t.length, r = [], e = 0; e < n; e += 2)
                            r[e >>> 3] |= parseInt(t.substr(e, 2), 16) << 24 - e % 8 * 4;
                        return new c.init(r,n / 2)
                    }
                }
                  , h = u.Latin1 = {
                    stringify: function(t) {
                        for (var n = t.words, r = t.sigBytes, e = [], i = 0; i < r; i++) {
                            var o = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                            e.push(String.fromCharCode(o))
                        }
                        return e.join("")
                    },
                    parse: function(t) {
                        for (var n = t.length, r = [], e = 0; e < n; e++)
                            r[e >>> 2] |= (255 & t.charCodeAt(e)) << 24 - e % 4 * 8;
                        return new c.init(r,n)
                    }
                }
                  , d = u.Utf8 = {
                    stringify: function(t) {
                        try {
                            return decodeURIComponent(escape(h.stringify(t)))
                        } catch (t) {
                            throw new Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function(t) {
                        return h.parse(unescape(encodeURIComponent(t)))
                    }
                }
                  , l = s.BufferedBlockAlgorithm = a.extend({
                    reset: function() {
                        this._data = new c.init,
                        this._nDataBytes = 0
                    },
                    _append: function(t) {
                        "string" == typeof t && (t = d.parse(t)),
                        this._data.concat(t),
                        this._nDataBytes += t.sigBytes
                    },
                    _process: function(n) {
                        var r, e = this._data, i = e.words, o = e.sigBytes, s = this.blockSize, a = o / (4 * s), u = (a = n ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) * s, f = t.min(4 * u, o);
                        if (u) {
                            for (var h = 0; h < u; h += s)
                                this._doProcessBlock(i, h);
                            r = i.splice(0, u),
                            e.sigBytes -= f
                        }
                        return new c.init(r,f)
                    },
                    clone: function() {
                        var t = a.clone.call(this);
                        return t._data = this._data.clone(),
                        t
                    },
                    _minBufferSize: 0
                })
                  , p = (s.Hasher = l.extend({
                    cfg: a.extend(),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t),
                        this.reset()
                    },
                    reset: function() {
                        l.reset.call(this),
                        this._doReset()
                    },
                    update: function(t) {
                        return this._append(t),
                        this._process(),
                        this
                    },
                    finalize: function(t) {
                        return t && this._append(t),
                        this._doFinalize()
                    },
                    blockSize: 16,
                    _createHelper: function(t) {
                        return function(n, r) {
                            return new t.init(r).finalize(n)
                        }
                    },
                    _createHmacHelper: function(t) {
                        return function(n, r) {
                            return new p.HMAC.init(t,r).finalize(n)
                        }
                    }
                }),
                o.algo = {});
                return o
            }(Math);
            (function(t) {
                var n = utag.ut.md5
                  , r = n.lib
                  , e = r.WordArray
                  , i = r.Hasher
                  , o = n.algo
                  , s = [];
                !function() {
                    for (var n = 0; n < 64; n++)
                        s[n] = 4294967296 * t.abs(t.sin(n + 1)) | 0
                }();
                var a = o.MD5 = i.extend({
                    _doReset: function() {
                        this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function(t, n) {
                        for (var r = 0; r < 16; r++) {
                            var e = n + r
                              , i = t[e];
                            t[e] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
                        }
                        var o = this._hash.words
                          , a = t[n + 0]
                          , d = t[n + 1]
                          , l = t[n + 2]
                          , p = t[n + 3]
                          , y = t[n + 4]
                          , g = t[n + 5]
                          , w = t[n + 6]
                          , v = t[n + 7]
                          , _ = t[n + 8]
                          , m = t[n + 9]
                          , B = t[n + 10]
                          , x = t[n + 11]
                          , b = t[n + 12]
                          , S = t[n + 13]
                          , H = t[n + 14]
                          , z = t[n + 15]
                          , C = o[0]
                          , M = o[1]
                          , A = o[2]
                          , D = o[3];
                        C = c(C, M, A, D, a, 7, s[0]),
                        D = c(D, C, M, A, d, 12, s[1]),
                        A = c(A, D, C, M, l, 17, s[2]),
                        M = c(M, A, D, C, p, 22, s[3]),
                        C = c(C, M, A, D, y, 7, s[4]),
                        D = c(D, C, M, A, g, 12, s[5]),
                        A = c(A, D, C, M, w, 17, s[6]),
                        M = c(M, A, D, C, v, 22, s[7]),
                        C = c(C, M, A, D, _, 7, s[8]),
                        D = c(D, C, M, A, m, 12, s[9]),
                        A = c(A, D, C, M, B, 17, s[10]),
                        M = c(M, A, D, C, x, 22, s[11]),
                        C = c(C, M, A, D, b, 7, s[12]),
                        D = c(D, C, M, A, S, 12, s[13]),
                        A = c(A, D, C, M, H, 17, s[14]),
                        C = u(C, M = c(M, A, D, C, z, 22, s[15]), A, D, d, 5, s[16]),
                        D = u(D, C, M, A, w, 9, s[17]),
                        A = u(A, D, C, M, x, 14, s[18]),
                        M = u(M, A, D, C, a, 20, s[19]),
                        C = u(C, M, A, D, g, 5, s[20]),
                        D = u(D, C, M, A, B, 9, s[21]),
                        A = u(A, D, C, M, z, 14, s[22]),
                        M = u(M, A, D, C, y, 20, s[23]),
                        C = u(C, M, A, D, m, 5, s[24]),
                        D = u(D, C, M, A, H, 9, s[25]),
                        A = u(A, D, C, M, p, 14, s[26]),
                        M = u(M, A, D, C, _, 20, s[27]),
                        C = u(C, M, A, D, S, 5, s[28]),
                        D = u(D, C, M, A, l, 9, s[29]),
                        A = u(A, D, C, M, v, 14, s[30]),
                        C = f(C, M = u(M, A, D, C, b, 20, s[31]), A, D, g, 4, s[32]),
                        D = f(D, C, M, A, _, 11, s[33]),
                        A = f(A, D, C, M, x, 16, s[34]),
                        M = f(M, A, D, C, H, 23, s[35]),
                        C = f(C, M, A, D, d, 4, s[36]),
                        D = f(D, C, M, A, y, 11, s[37]),
                        A = f(A, D, C, M, v, 16, s[38]),
                        M = f(M, A, D, C, B, 23, s[39]),
                        C = f(C, M, A, D, S, 4, s[40]),
                        D = f(D, C, M, A, a, 11, s[41]),
                        A = f(A, D, C, M, p, 16, s[42]),
                        M = f(M, A, D, C, w, 23, s[43]),
                        C = f(C, M, A, D, m, 4, s[44]),
                        D = f(D, C, M, A, b, 11, s[45]),
                        A = f(A, D, C, M, z, 16, s[46]),
                        C = h(C, M = f(M, A, D, C, l, 23, s[47]), A, D, a, 6, s[48]),
                        D = h(D, C, M, A, v, 10, s[49]),
                        A = h(A, D, C, M, H, 15, s[50]),
                        M = h(M, A, D, C, g, 21, s[51]),
                        C = h(C, M, A, D, b, 6, s[52]),
                        D = h(D, C, M, A, p, 10, s[53]),
                        A = h(A, D, C, M, B, 15, s[54]),
                        M = h(M, A, D, C, d, 21, s[55]),
                        C = h(C, M, A, D, _, 6, s[56]),
                        D = h(D, C, M, A, z, 10, s[57]),
                        A = h(A, D, C, M, w, 15, s[58]),
                        M = h(M, A, D, C, S, 21, s[59]),
                        C = h(C, M, A, D, y, 6, s[60]),
                        D = h(D, C, M, A, x, 10, s[61]),
                        A = h(A, D, C, M, l, 15, s[62]),
                        M = h(M, A, D, C, m, 21, s[63]),
                        o[0] = o[0] + C | 0,
                        o[1] = o[1] + M | 0,
                        o[2] = o[2] + A | 0,
                        o[3] = o[3] + D | 0
                    },
                    _doFinalize: function() {
                        var n = this._data
                          , r = n.words
                          , e = 8 * this._nDataBytes
                          , i = 8 * n.sigBytes;
                        r[i >>> 5] |= 128 << 24 - i % 32;
                        var o = t.floor(e / 4294967296)
                          , s = e;
                        r[15 + (i + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
                        r[14 + (i + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8),
                        n.sigBytes = 4 * (r.length + 1),
                        this._process();
                        for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {
                            var f = c[u];
                            c[u] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8)
                        }
                        return a
                    },
                    clone: function() {
                        var t = i.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    }
                });
                function c(t, n, r, e, i, o, s) {
                    var a = t + (n & r | ~n & e) + i + s;
                    return (a << o | a >>> 32 - o) + n
                }
                function u(t, n, r, e, i, o, s) {
                    var a = t + (n & e | r & ~e) + i + s;
                    return (a << o | a >>> 32 - o) + n
                }
                function f(t, n, r, e, i, o, s) {
                    var a = t + (n ^ r ^ e) + i + s;
                    return (a << o | a >>> 32 - o) + n
                }
                function h(t, n, r, e, i, o, s) {
                    var a = t + (r ^ (n | ~e)) + i + s;
                    return (a << o | a >>> 32 - o) + n
                }
                n.MD5 = i._createHelper(a),
                n.HmacMD5 = i._createHmacHelper(a)
            }(Math));
            try {
                if (typeof b['customer_id'] != 'undefined' && b['customer_id'] != '') {
                    b['customer_id'] = utag.ut.md5.MD5(b['customer_id']).toString();
                }
            } catch (e) {}
        }
        , function(a, b) {
            try {
                if (1) {
                    var teal_url = window.location.href
                    utag_data['category_name'] = teal_url.match(/([^\/]*)\/*$/)[1];
                    if (teal_url === 'https://ecommerce.tealiumdemo.com/') {
                        utag_data['category_name'] = "home";
                    }
                    if (teal_url.indexOf('/women') > -1) {
                        utag_data['category_name'] = "women";
                    }
                    if (teal_url.indexOf('/men') > -1) {
                        utag_data['category_name'] = "men";
                    }
                    if (teal_url.indexOf('/accessories') > -1) {
                        utag_data['category_name'] = "accessories";
                    }
                    if (teal_url.indexOf('/home-decor') > -1) {
                        utag_data['category_name'] = "home-decor";
                    }
                    if (teal_url.indexOf('/sale') > -1) {
                        utag_data['category_name'] = "sale";
                    }
                    if (teal_url.indexOf('/vip') > -1) {
                        if (utag_data["page_name"] != "Madison RX3400") {
                            utag_data['category_name'] = "vip";
                        }
                    }
                    if (teal_url.indexOf('/account') > -1) {
                        utag_data['category_name'] = "account";
                    }
                    if (teal_url.indexOf('/checkout') > -1) {
                        utag_data['category_name'] = "booking engine";
                    }
                    if (teal_url.indexOf('/wishlist') > -1) {
                        utag_data['category_name'] = "wishlist";
                    }
                    if (teal_url.indexOf('/aviator-sunglasses') > -1) {
                        utag_data['product_sku_string'] = "ace000";
                        utag_data['snowflake_product_quantity'] = "0";
                    }
                    if (teal_url.indexOf('/jackie-o-round-sunglasses') > -1) {
                        utag_data['product_sku_string'] = "ace001";
                        utag_data['snowflake_product_quantity'] = "0";
                    }
                    if (teal_url.indexOf('/retro-chic-eyeglasses') > -1) {
                        utag_data['product_sku_string'] = "ace002";
                        utag_data['snowflake_product_quantity'] = "0";
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (b['tealium_event'].toString().toLowerCase() == 'product_details'.toLowerCase()) {
                    try {
                        b['product_price'] = b['product_list_price'][0]
                    } catch (e) {}
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    b.gua_cid = b["cp._ga"]
                    b.gua_cid_as = b.gua_cid.replace("GA1.2.", "");
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b, c, d, e, f, g) {
            if (1) {
                d = b['page_type'];
                if (typeof d == 'undefined')
                    return;
                c = [{
                    'cms page': 'home'
                }, {
                    'category': 'category'
                }, {
                    'product': 'product'
                }, {
                    'checkout': 'cart'
                }, {
                    'cart': 'purchase'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        if (d == f) {
                            b['adwords_page_type'] = c[e][f];
                            m = true
                        }
                        ;
                    }
                    ;if (m)
                        break
                }
                ;if (!m)
                    b['adwords_page_type'] = 'other';
            }
        }
        , function(a, b) {
            try {
                if (b['dom.url'].toString().indexOf('/checkout/cart/') > -1) {
                    b['tealium_event'] = 'add_to_cart'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['page_name'] == 'Tealium Ecommerce Demo') {
                    b['page_name'] = 'Home'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if ((b['dom.url'].toString().toLowerCase().indexOf('/checkout/cart/'.toLowerCase()) > -1 && b['product_sku'].toString().toLowerCase().indexOf('393'.toLowerCase()) < 0)) {
                    b['cart_product_id'] = b['product_id'];
                    b['cart_product_price'] = b['product_price'];
                    b['cart_product_quantity'] = b['product_quantity'];
                    b['cart_total_items'] = b['cart_items'];
                    b['cart_total_value'] = b['cart_value'];
                    b['product_on_page'] = b['product_id'];
                    b['tealium_event'] = 'view_cart'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['dom.url'].toString().indexOf('/seo_sitemap/category/') > -1) {
                    b['page_name'] = 'Sitemap'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    b['tealium_datasource'] = '07crko'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            b['previous_page_name'] = b['cp.utag_main__prevpage'];
            utag.loader.SC('utag_main', {
                '_prevpage': b['page_name'] + ';exp-1h'
            })
        }
        , function(a, b) {
            try {
                if (b['page_name'].toString().toLowerCase() == 'Shopping Cart'.toLowerCase()) {
                    try {
                        b['product_subtotal'] = document.querySelector("#shopping-cart-totals-table > tbody > tr:nth-child(1) > td:nth-child(2) > span").innerHTML.slice(1).replace(",", "")
                    } catch (e) {}
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['dom.url'].toString().toLowerCase() == 'https://ecommerce.tealiumdemo.com/vip/flapover-briefcase.html'.toLowerCase()) {
                    b['tealium_event'] = 'productDetails'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    window.commerce_products = [{
                        "Id": 418,
                        "Name": "Tori Tank",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/b/wbk003t.jpg",
                        "Price": 60
                    }, {
                        "Id": 428,
                        "Name": "Park Avenue Pleat Front Trousers",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/p/wpd010t.jpg",
                        "Price": 245
                    }, {
                        "Id": 421,
                        "Name": "Elizabeth Knit Top",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/b/wbk012t.jpg",
                        "Price": 210
                    }, {
                        "Id": 425,
                        "Name": "Lafayette Convertible Dress",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/s/wsd013t.jpg",
                        "Price": 340
                    }, {
                        "Id": 417,
                        "Name": "NoLIta Cami",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/b/wbk000t.jpg",
                        "Price": 150
                    }, {
                        "Id": 420,
                        "Name": "Ludlow Oxford Top",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/b/wbk009t.jpg",
                        "Price": 185
                    }, {
                        "Id": 419,
                        "Name": "Delancy Cardigan Sweater",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/b/wbk006t_2.jpg",
                        "Price": 275
                    }, {
                        "Id": 426,
                        "Name": "TriBeCa Skinny Jean",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/p/wpd000t.jpg",
                        "Price": 185
                    }, {
                        "Id": 427,
                        "Name": "DUMBO Boyfriend Jean",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/p/wpd005t.jpg",
                        "Price": 210
                    }, {
                        "Id": 422,
                        "Name": "Essex Pencil Skirt",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/s/wsd000t.jpg",
                        "Price": 185
                    }, {
                        "Id": 423,
                        "Name": "Racer Back Maxi Dress",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/s/wsd005t_2.jpg",
                        "Price": 224
                    }, {
                        "Id": 424,
                        "Name": "Ludlow Sheath Dress",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/s/wsd008t_2.jpg",
                        "Price": 305
                    }, {
                        "Id": 406,
                        "Name": "Linen Blazer",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/s/msj012t_2.jpg",
                        "Price": 455
                    }, {
                        "Id": 414,
                        "Name": "Bowery Chino Pants",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/p/mpd003t.jpg",
                        "Price": 140
                    }, {
                        "Id": 456,
                        "Name": "Khaki Bowery Chino Pants",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/p/mpd000t.jpg",
                        "Price": 140
                    }, {
                        "Id": 410,
                        "Name": "Chelsea Tee",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/t/mtk004t.jpg",
                        "Price": 75
                    }, {
                        "Id": 404,
                        "Name": "Plaid Cotton Shirt",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/s/msj006t.jpg",
                        "Price": 160
                    }, {
                        "Id": 403,
                        "Name": "Slim fit Dobby Oxford Shirt",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/s/msj003t_2.jpg",
                        "Price": 140
                    }, {
                        "Id": 402,
                        "Name": "French Cuff Cotton Twill Oxford",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/s/msj000t_2.jpg",
                        "Price": 190
                    }, {
                        "Id": 408,
                        "Name": "Chelsea Tee",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/t/mtk000t.jpg",
                        "Price": 75
                    }, {
                        "Id": 409,
                        "Name": "Chelsea Tee",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/t/mtk002t.jpg",
                        "Price": 75
                    }, {
                        "Id": 411,
                        "Name": "Merino V-neck Pullover Sweater",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/t/mtk006t.jpg",
                        "Price": 210
                    }, {
                        "Id": 412,
                        "Name": "Lexington Cardigan Sweater",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/t/mtk009t.jpg",
                        "Price": 240
                    }, {
                        "Id": 413,
                        "Name": "Core Striped Sport Shirt",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/t/mtk012t.jpg",
                        "Price": 125
                    }, {
                        "Id": 415,
                        "Name": "The Essential Boot Cut Jean",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/p/mpd006t_2.jpg",
                        "Price": 140
                    }, {
                        "Id": 416,
                        "Name": "Flat Front  Trouser",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/p/mpd012t.jpg",
                        "Price": 195
                    }, {
                        "Id": 405,
                        "Name": "Sullivan Sport Coat",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/s/msj009t.jpg",
                        "Price": 510
                    }, {
                        "Id": 407,
                        "Name": "Stretch Cotton Blazer",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/s/msj015t_1.jpg",
                        "Price": 49
                    }, {
                        "Id": 338,
                        "Name": "Jackie O Round Sunglasses",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/ace001_1.jpg",
                        "Price": 225
                    }, {
                        "Id": 339,
                        "Name": "Retro Chic Eyeglasses",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/ace002a_1.jpg",
                        "Price": 295
                    }, {
                        "Id": 337,
                        "Name": "Aviator Sunglasses",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/ace000a_1.jpg",
                        "Price": 295
                    }, {
                        "Id": 549,
                        "Name": "Blue Horizons Bracelets",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acj006_2.jpg",
                        "Price": 55
                    }, {
                        "Id": 551,
                        "Name": "Pearl Stud Earrings",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acj003_2.jpg",
                        "Price": 110
                    }, {
                        "Id": 552,
                        "Name": "Swing Time Earrings",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acj004_2.jpg",
                        "Price": 75
                    }, {
                        "Id": 553,
                        "Name": "Silver Desert Necklace",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acj000_2.jpg",
                        "Price": 210
                    }, {
                        "Id": 554,
                        "Name": "Swiss Movement Sports Watch",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acj005_2.jpg",
                        "Price": 500
                    }, {
                        "Id": 555,
                        "Name": "Pearl Necklace Set",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acj007_1_2.jpg",
                        "Price": 0
                    }, {
                        "Id": 433,
                        "Name": "Dorian Perforated Oxford",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/m/ams000a_2.jpg",
                        "Price": 410
                    }, {
                        "Id": 435,
                        "Name": "Suede Loafer Navy",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/m/ams010a_2.jpg",
                        "Price": 310
                    }, {
                        "Id": 434,
                        "Name": "Wingtip Cognac Oxford",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/m/ams005a_2.jpg",
                        "Price": 375
                    }, {
                        "Id": 432,
                        "Name": "Hana Flat Charcoal",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/w/aws010.jpg",
                        "Price": 210
                    }, {
                        "Id": 431,
                        "Name": "Ann Ankle Boot",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/w/aws005a_2.jpg",
                        "Price": 470
                    }, {
                        "Id": 430,
                        "Name": "Barclay d'Orsay pump Nude",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/w/aws000a_2.jpg",
                        "Price": 390
                    }, {
                        "Id": 370,
                        "Name": "Isla Crossbody Handbag",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/abl000_4.jpg",
                        "Price": 290
                    }, {
                        "Id": 371,
                        "Name": "Florentine Satchel Handbag",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/abl001_1.jpg",
                        "Price": 625
                    }, {
                        "Id": 372,
                        "Name": "Flatiron Tablet Sleeve",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/abl002b_1.jpg",
                        "Price": 150
                    }, {
                        "Id": 373,
                        "Name": "Broad St. Flapover Briefcase",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/abl003b_1.jpg",
                        "Price": 570
                    }, {
                        "Id": 374,
                        "Name": "Houston Travel Wallet",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/abl004a_1.jpg",
                        "Price": 210
                    }, {
                        "Id": 375,
                        "Name": "Roller Suitcase",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/abl005a_1.jpg",
                        "Price": 650
                    }, {
                        "Id": 436,
                        "Name": "Classic Hardshell Suitcase",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/abl0006a_1.jpg",
                        "Price": 600
                    }, {
                        "Id": 439,
                        "Name": "Luggage Set",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/abl0008.jpg",
                        "Price": 600
                    }, {
                        "Id": 447,
                        "Name": "Pillow and Throw Set",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdb010.jpg",
                        "Price": 0
                    }, {
                        "Id": 450,
                        "Name": "Alice in Wonderland",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/l/alice_wonderland_1.jpg",
                        "Price": 5
                    }, {
                        "Id": 563,
                        "Name": "Fire [Kalima remix] by Unannounced Guest",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/u/n/unannouncedguest_.jpg",
                        "Price": 2
                    }, {
                        "Id": 561,
                        "Name": "Love is an Eternal Lie by The Sleeping Tree",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/l/sleepingtree_.jpg",
                        "Price": 2
                    }, {
                        "Id": 560,
                        "Name": "Can't Stop It by Shearer",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/h/shearer__2.jpg",
                        "Price": 2
                    }, {
                        "Id": 558,
                        "Name": "Falling by I Am Not Lefthanded",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/e/lefthanded_.jpg",
                        "Price": 2
                    }, {
                        "Id": 448,
                        "Name": "A Tale of Two Cities",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/a/tale_two_cities_.jpg",
                        "Price": 10
                    }, {
                        "Id": 557,
                        "Name": "Around the World in 80 Days",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/8/0/80_days_.jpg",
                        "Price": 5
                    }, {
                        "Id": 559,
                        "Name": "If You Were by Keshco",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/k/e/keshco_.jpg",
                        "Price": 2
                    }, {
                        "Id": 378,
                        "Name": "Body Wash with Lemon Flower Extract and Aloe Vera",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdb000_1.jpg",
                        "Price": 28
                    }, {
                        "Id": 385,
                        "Name": "Gramercy Throw",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdb009_1.jpg",
                        "Price": 275
                    }, {
                        "Id": 384,
                        "Name": "Park Row Throw",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdb008_1.jpg",
                        "Price": 0
                    }, {
                        "Id": 383,
                        "Name": "Carnegie Alpaca Throw",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdb007_1.jpg",
                        "Price": 275
                    }, {
                        "Id": 381,
                        "Name": "Titian Raw Silk Pillow",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdb005_1.jpg",
                        "Price": 125
                    }, {
                        "Id": 379,
                        "Name": "Bath Minerals and Salt",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdb001_2.jpg",
                        "Price": 25
                    }, {
                        "Id": 380,
                        "Name": "Shea Enfused Hydrating Body Lotion",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdb002_1.jpg",
                        "Price": 28
                    }, {
                        "Id": 382,
                        "Name": "Shay Printed Pillow",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdb006_1.jpg",
                        "Price": 210
                    }, {
                        "Id": 392,
                        "Name": "Madison LX2200",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde001t_2.jpg",
                        "Price": 0
                    }, {
                        "Id": 446,
                        "Name": "MP3 Player with Audio",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde012_2.jpg",
                        "Price": 0
                    }, {
                        "Id": 393,
                        "Name": "Madison RX3400",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde003a_2.jpg",
                        "Price": 0
                    }, {
                        "Id": 399,
                        "Name": "Madison 8GB Digital Media Player",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde012_3.jpg",
                        "Price": 150
                    }, {
                        "Id": 400,
                        "Name": "Compact mp3 Player",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde013__1.jpg",
                        "Price": 40
                    }, {
                        "Id": 397,
                        "Name": "Madison Earbuds",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde010_1.jpg",
                        "Price": 35
                    }, {
                        "Id": 398,
                        "Name": "Madison Overear Headphones",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde011_1.jpg",
                        "Price": 125
                    }, {
                        "Id": 396,
                        "Name": "Large Camera Bag",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde006t.jpg",
                        "Price": 120
                    }, {
                        "Id": 394,
                        "Name": "16GB Memory Card",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde004__1.jpg",
                        "Price": 30
                    }, {
                        "Id": 395,
                        "Name": "8GB Memory Card",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde005_.jpg",
                        "Price": 20
                    }, {
                        "Id": 445,
                        "Name": "Camera Travel Set",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde001t_1.jpg",
                        "Price": 0
                    }, {
                        "Id": 441,
                        "Name": "3-Year Warranty",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde007_3.jpg",
                        "Price": 75
                    }, {
                        "Id": 442,
                        "Name": "5-Year Warranty",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hde007_2.jpg",
                        "Price": 100
                    }, {
                        "Id": 386,
                        "Name": "Herald Glass Vase",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdd000_1.jpg",
                        "Price": 110
                    }, {
                        "Id": 389,
                        "Name": "Stone Salt and Pepper Shakers",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdd004_1.jpg",
                        "Price": 65
                    }, {
                        "Id": 390,
                        "Name": "Fragrance Diffuser Reeds",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdd005_1.jpg",
                        "Price": 75
                    }, {
                        "Id": 391,
                        "Name": "Geometric Candle Holders",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdd006_1.jpg",
                        "Price": 90
                    }, {
                        "Id": 437,
                        "Name": "Modern Murray Ceramic Vase",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdd001_2.jpg",
                        "Price": 135
                    }, {
                        "Id": 440,
                        "Name": "Vase Set",
                        "ImageURL": "https://ecommerce.tealiumdemo.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/h/d/hdd003.jpg",
                        "Price": 0
                    }];
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (b['tealium_event'].toString().toLowerCase() == 'momentsiq_close'.toLowerCase()) {
                    sessionStorage.setItem('momentsiq_closed', b['momentsiq_id']);
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (b['tealium_event'].toString().toLowerCase() == 'momentsiq_submit'.toLowerCase()) {
                    sessionStorage.setItem('moments_answer_' + b['momentsiq_id'], b['momentsiq_answer1']);
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (b['tealium_event'].toString().toLowerCase() == 'momentsiq_submit'.toLowerCase()) {
                    var reloadPage = function(occasion) {
                        var occasionMap = {
                            "Evening": "29",
                            "Career": "30",
                            "Casual": "31"
                        };
                        var url = new URL(location.href);
                        url.searchParams.set('occasion', occasionMap[occasion]);
                        location.replace(url);
                    }
                    setTimeout(function() {
                        reloadPage(b['momentsiq_answer1']);
                    }, 1000);
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if (b['tealium_event'].toString().toLowerCase() == 'add_to_cart'.toLowerCase()) {
                    try {
                        b['product_price'] = b['product_list_price'][0]
                    } catch (e) {}
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    try {
                        b['tealium_timestamp_library_load'] = Date.now();
                    } catch (e) {}
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    b['test_timestamp'] = '2025-02-01T14:59:55.711';
                    b['product_sku_string'] = 'A8DLKU5';
                    b['available_quantity'] = '1323'
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    b['_customer_email'] = ''
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['page_name'].toString().toLowerCase() == 'cart success'.toLowerCase()) {
                    console.log("Moments API LS Check // VIP Check and Checkout Banner Code");
                    var momentsLsCheck = 0;
                    var hasVipStatus = false;
                    var baseRequestUri = "https://personalization-api.us-east-1.prod.tealiumapis.com/personalization/accounts/tealiumlabs/profiles/retail-21/engines/25dc6de0-6c04-4e8d-82aa-53235b2d2a15/visitors/";
                    var visitorId = getCookie("utag_main_v_id") + "retail-21";
                    console.log("Moments API - utag_main_v_id: ", visitorId);
                    var momentsApiRequest = baseRequestUri + visitorId + "?suppressNotFound=true";
                    function getCookie(cname) {
                        let name = cname + "=";
                        let decodedCookie = decodeURIComponent(document.cookie);
                        let ca = decodedCookie.split(";");
                        for (let i = 0; i < ca.length; i++) {
                            let c = ca[i];
                            while (c.charAt(0) == " ") {
                                c = c.substring(1);
                            }
                            if (c.indexOf(name) == 0) {
                                return c.substring(name.length, c.length);
                            }
                        }
                        return "";
                    }
                    const checkForVipStatus = () => {
                        return new Promise( (resolve, reject) => {
                            fetch(momentsApiRequest).then( (response) => {
                                momentsLsCheck++;
                                console.log('Moments API LS Check // #', momentsLsCheck);
                                if (localStorage.getItem('visitor_loyalty_status') === 'VIP') {
                                    hasVipStatus = true;
                                    showVipCheckoutBanner();
                                }
                                if (!hasVipStatus && momentsLsCheck <= 6) {
                                    setTimeout( () => {
                                        checkForVipStatus().then(resolve).catch(reject);
                                    }
                                    , 200);
                                } else if (momentsLsCheck > 6) {
                                    reject('Moments API LS Check // VIP status Complete after ' + momentsLsCheck + ' attempts');
                                    localStorage.setItem('visitor_loyalty_status', 'VIP');
                                    hasVipStatus = true;
                                    showVipCheckoutBanner();
                                }
                            }
                            ).catch( (error) => {
                                console.error("Moments API LS Check // Fetch Error - ", error);
                            }
                            );
                        }
                        );
                    }
                    ;
                    setTimeout( () => {
                        checkForVipStatus().then( (result) => console.log(result)).catch( (error) => console.error(error)).finally( (data) => {
                            console.log("Moments API LS Check Complete");
                        }
                        );
                    }
                    , 400);
                    function showVipCheckoutBanner() {
                        const targetElement = document.querySelector('div.buttons-set');
                        const checkoutBanner = document.createElement("div");
                        const vipBannerImg = document.createElement("img");
                        const bannerHeading = document.createElement("h2");
                        const bannerText = document.createElement("p");
                        bannerHeading.textContent = 'Congratulations! You have reached VIP Status!';
                        bannerText.textContent = 'As a reward, please use code: FREESHIP for Free Shipping on All Orders!';
                        vipBannerImg.src = 'https://s3.amazonaws.com/tealiumdemo.com/assets/vip_silver.png';
                        vipBannerImg.width = "120";
                        vipBannerImg.height = "120";
                        vipBannerImg.style.marginBottom = "10px";
                        vipBannerImg.style.marginLeft = "auto";
                        vipBannerImg.style.marginRight = "auto";
                        checkoutBanner.style.width = "70%";
                        checkoutBanner.style.minHeight = "160px";
                        checkoutBanner.style.height = "auto";
                        checkoutBanner.style.marginTop = "30px";
                        checkoutBanner.style.marginBottom = "20px";
                        checkoutBanner.style.marginLeft = "auto";
                        checkoutBanner.style.marginRight = "auto";
                        checkoutBanner.style.padding = "20px 40px";
                        checkoutBanner.style.border = "2px solid #eaeaea";
                        checkoutBanner.style.borderRadius = "4px";
                        checkoutBanner.style.visibility = "hidden";
                        checkoutBanner.style.opacity = "0";
                        checkoutBanner.style.transition = "opacity 0.8s ease, visibility 0.8s ease";
                        checkoutBanner.appendChild(vipBannerImg);
                        checkoutBanner.appendChild(bannerHeading);
                        checkoutBanner.appendChild(bannerText);
                        if (targetElement) {
                            targetElement.parentNode.insertBefore(checkoutBanner, targetElement);
                            console.log("Moments API // VIP Checkout Banner inserted before the checkout button");
                            setTimeout( () => {
                                checkoutBanner.style.visibility = "visible";
                                checkoutBanner.style.opacity = "1";
                            }
                            , 100);
                        } else {
                            console.warn("Moments API // Error - targetElement not found");
                        }
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        , function(a, b) {
            try {
                if ((b['page_name'].toString().toLowerCase() == 'shopping cart'.toLowerCase() && /checkout$/i.test(b['page_type']))) {
                    document.cookie = "cart_subtotal=" + b['product_subtotal'] + ";path=/;domain=" + utag.cfg.domain + ";expires=";
                    b['cp.cart_subtotal'] = b['product_subtotal'];
                }
            } catch (e) {
                utag.DB(e);
            }
        }
        , function(a, b) {
            try {
                if (b['cp.demo_case'].toString().toLowerCase().indexOf('benchmark'.toLowerCase()) > -1) {
                    console.log("DLE Callback extension loaded️");
                    window.tealium_enrichment = function(data) {
                        console.log("[ utag ] DLE Callback from Tealium ⚡️");
                        if (typeof window.updateDOM === 'function') {
                            try {
                                console.log("DLE Callback triggering updateDOM function️");
                                window.updateDOM(data);
                            } catch (e) {
                                console.log('DLE ERROR:', e)
                            }
                        } else {
                            console.log("updateDOM function does not exist");
                            return
                        }
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        ];
        utag.handler.cfg_extend = [{
            "id": "606",
            "bwq": 0,
            "end": 0,
            "blr": 1,
            "alr": 0
        }, {
            "blr": 0,
            "alr": 1,
            "id": "2425",
            "bwq": 0,
            "end": 0
        }, {
            "alr": 1,
            "blr": 0,
            "bwq": 0,
            "id": "1296",
            "end": 0
        }, {
            "blr": 0,
            "alr": 1,
            "id": "1460",
            "bwq": 0,
            "end": 0
        }, {
            "blr": 0,
            "alr": 1,
            "end": 0,
            "id": "2334",
            "bwq": 0
        }, {
            "end": 0,
            "bwq": 0,
            "id": "1514",
            "alr": 1,
            "blr": 0
        }, {
            "id": "1508",
            "bwq": 0,
            "end": 0,
            "blr": 0,
            "alr": 1
        }, {
            "alr": 1,
            "blr": 0,
            "end": 0,
            "bwq": 0,
            "id": "2273"
        }, {
            "end": 0,
            "bwq": 0,
            "id": "2266",
            "alr": 1,
            "blr": 0
        }, {
            "bwq": 0,
            "id": "2271",
            "end": 0,
            "alr": 1,
            "blr": 0
        }, {
            "alr": 1,
            "blr": 0,
            "end": 0,
            "bwq": 0,
            "id": "1"
        }, {
            "end": 0,
            "bwq": 0,
            "id": "8",
            "alr": 1,
            "blr": 0
        }, {
            "id": "4",
            "bwq": 0,
            "end": 0,
            "blr": 0,
            "alr": 1
        }, {
            "alr": 1,
            "blr": 0,
            "end": 0,
            "bwq": 0,
            "id": "1658"
        }, {
            "bwq": 0,
            "id": "2170",
            "end": 0,
            "alr": 1,
            "blr": 0
        }, {
            "blr": 0,
            "alr": 1,
            "end": 0,
            "id": "2171",
            "bwq": 0
        }, {
            "id": "2263",
            "bwq": 0,
            "end": 0,
            "blr": 0,
            "alr": 1
        }, {
            "blr": 0,
            "alr": 1,
            "id": "2264",
            "bwq": 0,
            "end": 0
        }, {
            "blr": 0,
            "alr": 1,
            "id": "2270",
            "bwq": 0,
            "end": 0
        }, {
            "alr": 1,
            "blr": 0,
            "bwq": 0,
            "id": "2274",
            "end": 0
        }, {
            "alr": 1,
            "blr": 0,
            "end": 0,
            "bwq": 0,
            "id": "2296"
        }, {
            "end": 0,
            "bwq": 0,
            "id": "2297",
            "alr": 1,
            "blr": 0
        }, {
            "bwq": 0,
            "id": "2302",
            "end": 0,
            "alr": 1,
            "blr": 0
        }, {
            "blr": 0,
            "alr": 1,
            "end": 0,
            "id": "2307",
            "bwq": 0
        }, {
            "id": "1516",
            "bwq": 0,
            "end": 0,
            "blr": 0,
            "alr": 1
        }, {
            "alr": 1,
            "blr": 0,
            "bwq": 0,
            "id": "2310",
            "end": 0
        }, {
            "blr": 0,
            "alr": 1,
            "id": "2311",
            "bwq": 0,
            "end": 0
        }, {
            "alr": 1,
            "blr": 0,
            "bwq": 0,
            "id": "2321",
            "end": 0
        }, {
            "blr": 0,
            "alr": 1,
            "id": "2323",
            "bwq": 0,
            "end": 0
        }, {
            "blr": 0,
            "alr": 1,
            "end": 0,
            "id": "2325",
            "bwq": 0
        }, {
            "bwq": 0,
            "id": "2342",
            "end": 0,
            "alr": 1,
            "blr": 0
        }, {
            "alr": 1,
            "blr": 0,
            "bwq": 0,
            "id": "2410",
            "end": 0
        }, {
            "blr": 0,
            "alr": 1,
            "end": 0,
            "id": "2403",
            "bwq": 0
        }, {
            "end": 0,
            "id": "2409",
            "bwq": 0,
            "blr": 0,
            "alr": 1
        }, {
            "id": "2416",
            "bwq": 0,
            "end": 0,
            "blr": 0,
            "alr": 1
        }, {
            "alr": 1,
            "blr": 0,
            "bwq": 0,
            "id": "2455",
            "end": 0
        }, {
            "alr": 1,
            "blr": 0,
            "bwq": 0,
            "id": "2463",
            "end": 0
        }, {
            "blr": 0,
            "alr": 1,
            "id": "2471",
            "bwq": 0,
            "end": 0
        }, {
            "blr": 0,
            "alr": 0,
            "end": 1,
            "id": "2436",
            "bwq": 0
        }, {
            "id": "2335",
            "bwq": 0,
            "end": 1,
            "blr": 0,
            "alr": 0
        }, {
            "blr": 0,
            "alr": 0,
            "id": "2470",
            "bwq": 0,
            "end": 1
        }];
        if (utag.gdpr) {
            var consentEnabled = true;
            var preferencesEnabled = true;
            var doNotSellEnabled = true;
            utag.gdpr.doNotSell = utag.gdpr.doNotSell || {};
            utag.gdpr.preferences_prompt = utag.gdpr.preferences_prompt || {};
            utag.gdpr.consent_prompt = utag.gdpr.consent_prompt || {};
            utag.gdpr.applyConsentState = function() {
                var enforcementMode = utag.gdpr.getEnforcementMode();
                if (enforcementMode === 'none')
                    return;
                utag.DB('Consent Manager: Applying consent');
                try {
                    var i, lc = utag.loader.cfg, cs = utag.gdpr.getConsentState(), ot = utag.gdpr.omittedTags || {
                        "11": 1,
                        "5322": 1,
                        "5588": 1,
                        "2": 1,
                        "3940": 1
                    };
                    if (typeof cs === 'number') {
                        if ((utag.gdpr.consent_prompt.isEnabled && parseInt(cs) !== 1) || ((!consentEnabled && preferencesEnabled && enforcementMode === 'opt-in') && (parseInt(cs) === -1 || parseInt(cs) === 0))) {
                            utag.DB('Consent Manager: Setting all tags to off');
                            for (i in utag.loader.GV(lc)) {
                                if (typeof ot[i] === 'undefined') {
                                    lc[i].load = 0;
                                }
                            }
                        }
                    } else if (((utag.gdpr.consent_prompt.isEnabled || utag.gdpr.preferences_prompt.isEnabled) || (!consentEnabled && preferencesEnabled)) && enforcementMode === 'opt-in') {
                        utag.DB('Consent Manager: Partial Consent');
                        for (i in utag.loader.GV(lc)) {
                            if (typeof ot[i] === 'undefined') {
                                if (lc[i].tcat > 0 && cs[lc[i].tcat - 1].ct != '1') {
                                    lc[i].load = 0;
                                }
                            }
                        }
                    }
                    var btl = utag.gdpr.dns ? utag.gdpr.dns.getBlockedDnsTagLookup() : null;
                    utag.DB('Consent Manager: Do Not Sell Tags');
                    if (enforcementMode === 'opt-out' && btl) {
                        for (i in utag.loader.GV(lc)) {
                            if (parseInt(btl[i]) === 1) {
                                lc[i].load = 0;
                            }
                        }
                    }
                    try {
                        if (window.tealiumConsentRegister && window.tealiumConsentRegister.currentDecision === null) {
                            var cookieValues = utag.gdpr.getCookieValues();
                            var hasDnsCookie = typeof cookieValues.dns === 'string';
                            var hasConsentCookie = typeof cookieValues.consent === 'string';
                            var decisionType = (enforcementMode === 'opt-in' && hasConsentCookie) || (enforcementMode === 'opt-out' && hasDnsCookie) ? 'explicit' : 'implicit';
                            var decision = (decisionType === 'implicit' && enforcementMode === 'opt-in') ? [] : utag.gdpr.getSelectedCategories();
                            decision.unshift('always_on');
                            decision.type = decisionType;
                            window.tealiumConsentRegister.addConsentDecision(decision);
                        }
                    } catch (e) {
                        utag.DB(e);
                    }
                } catch (e) {
                    utag.DB(e);
                }
            }
            ;
            utag.gdpr.promptEnabledSetting = function() {
                if (!utag.gdpr.dr && (utag.cfg.readywait || utag.cfg.waittimer)) {
                    utag.gdpr.dr = 1;
                    return;
                }
                utag.gdpr.consent_prompt.wasInitiallyEnabled = consentEnabled;
                utag.gdpr.preferences_prompt.wasInitiallyEnabled = preferencesEnabled;
                utag.gdpr.doNotSell.wasInitiallyEnabled = doNotSellEnabled;
                if (consentEnabled === true && !(1)) {
                    utag.gdpr.consent_prompt.isEnabled = false;
                }
                if (preferencesEnabled === true && (consentEnabled === true && !(1))) {
                    utag.gdpr.preferences_prompt.isEnabled = false;
                }
                if (doNotSellEnabled === true && !(1)) {
                    utag.gdpr.doNotSell.isEnabled = false;
                }
                if (preferencesEnabled === true && consentEnabled === false && !(1)) {
                    utag.gdpr.preferences_prompt.isEnabled = true;
                }
            }
            ;
            var splitGdprModules = false;
            if (typeof utag.gdpr.getEnforcementMode !== 'function') {
                splitGdprModules = true;
            }
            utag.gdpr.getEnforcementMode = function() {
                utag.gdpr.promptEnabledSetting();
                var optInModulesAreActive = (utag.gdpr.consent_prompt && utag.gdpr.consent_prompt.isEnabled === true);
                var optOutModuleIsActive = (utag.gdpr.doNotSell && utag.gdpr.doNotSell.isEnabled === true);
                var optInPreferencesOnly = (!optInModulesAreActive && !utag.gdpr.consent_prompt.wasInitiallyEnabled && utag.gdpr.preferences_prompt.wasInitiallyEnabled && !optOutModuleIsActive) || (splitGdprModules && utag.gdpr.preferences_prompt && utag.gdpr.preferences_prompt.wasInitiallyEnabled);
                var enforcementMode = 'opt-in';
                if (optOutModuleIsActive && !optInModulesAreActive)
                    enforcementMode = 'opt-out';
                if (!optOutModuleIsActive && optInPreferencesOnly)
                    enforcementMode = 'opt-in';
                if (!optOutModuleIsActive && !optInModulesAreActive && !optInPreferencesOnly)
                    enforcementMode = 'none';
                return enforcementMode;
            }
            ;
        }
        utag.loader.initcfg = function() {
            utag.loader.cfg = {
                "5": {
                    load: utag.cond[622],
                    tcat: 1,
                    send: 1,
                    v: 202303090829,
                    wait: 0,
                    tid: 6037
                },
                "6": {
                    load: utag.cond[2],
                    tcat: 1,
                    send: 1,
                    v: 202107281002,
                    wait: 0,
                    tid: 6037
                },
                "1": {
                    load: 1,
                    tcat: 1,
                    send: 1,
                    v: 202107230853,
                    wait: 1,
                    tid: 7110
                },
                "2": {
                    load: 1,
                    tcat: 1,
                    send: 1,
                    v: 202106251245,
                    wait: 1,
                    tid: 19063
                },
                "3": {
                    load: 1,
                    tcat: 3,
                    send: 1,
                    v: 202304121936,
                    wait: 1,
                    tid: 3108
                },
                "8": {
                    load: utag.cond[283],
                    tcat: 10,
                    send: 1,
                    v: 202107150859,
                    wait: 1,
                    tid: 3132
                },
                "9": {
                    load: 1,
                    tcat: 1,
                    send: 1,
                    v: 202107150859,
                    wait: 1,
                    tid: 17013
                },
                "10": {
                    load: utag.cond[2],
                    tcat: 4,
                    send: 1,
                    v: 202107150906,
                    wait: 1,
                    tid: 7132
                },
                "11": {
                    load: 1,
                    tcat: 8,
                    send: 1,
                    v: 202504111552,
                    wait: 1,
                    tid: 20064
                },
                "5580": {
                    load: 1,
                    tcat: 1,
                    send: 1,
                    v: 202201212126,
                    wait: 1,
                    tid: 7142
                },
                "5582": {
                    load: 1,
                    tcat: 9,
                    send: 1,
                    v: 202203091954,
                    wait: 1,
                    tid: 20010
                },
                "5597": {
                    load: utag.cond[5],
                    tcat: 4,
                    send: 1,
                    v: 202208171443,
                    wait: 1,
                    tid: 7132
                },
                "5602": {
                    load: 1,
                    tcat: 1,
                    send: 1,
                    v: 202210062013,
                    wait: 1,
                    tid: 20110
                },
                "5603": {
                    load: utag.cond[7],
                    tcat: 10,
                    send: 1,
                    v: 202210062013,
                    wait: 1,
                    tid: 20099
                },
                "5667": {
                    load: (((utag.cond[16]) && !(utag.cond[17] || utag.cond[19]))),
                    tcat: 6,
                    send: 1,
                    v: 202405150916,
                    wait: 1,
                    tid: 20201
                },
                "5844": {
                    load: 1,
                    tcat: 6,
                    send: 1,
                    v: 202507150714,
                    wait: 1,
                    tid: 20010
                }
            };
            utag.loader.cfgsort = ["5", "6", "1", "2", "3", "8", "9", "10", "11", "5580", "5582", "5597", "5602", "5603", "5667", "5844"];
            if (utag.gdpr && utag.gdpr.getEnforcementMode() === 'opt-in') {
                Object.keys(utag.loader.cfg).forEach(function(tagId) {
                    if (utag.loader.cfg[tagId].tcat === 16) {
                        utag.DB('Consent Manager: Removing uncategorized tag from utag.loader.cfg in opt-in mode: ' + tagId);
                        delete utag.loader.cfg[tagId];
                        utag.loader.cfgsort = utag.loader.cfgsort.filter(function(id) {
                            return id !== tagId;
                        });
                    }
                })
            }
        }
        utag.loader.initcfg();
        try {
            utag.gdpr.applyConsentState();
        } catch (e) {
            utag.DB(e)
        }
    }
    utag.gdpr = {
        consent_prompt: {
            noShow: false,
            isEnabled: true,
            content: {}
        },
        preferences_prompt: {
            single_cookie: false,
            noShow: false,
            isEnabled: true,
            defaultState: false,
            content: {},
            categories: {
                "uncategorized": {
                    "enabled": "0",
                    "id": 16
                },
                "social": {
                    "enabled": "0",
                    "id": 7
                },
                "display_ads": {
                    "enabled": "1",
                    "id": 3
                },
                "personalization": {
                    "id": 6,
                    "enabled": "1"
                },
                "crm": {
                    "enabled": "0",
                    "id": 15
                },
                "engagement": {
                    "id": 13,
                    "enabled": "0"
                },
                "misc": {
                    "enabled": "1",
                    "id": 9
                },
                "monitoring": {
                    "enabled": "0",
                    "id": 14
                },
                "big_data": {
                    "id": 8,
                    "enabled": "0"
                },
                "search": {
                    "id": 4,
                    "enabled": "1"
                },
                "mobile": {
                    "enabled": "0",
                    "id": 12
                },
                "analytics": {
                    "id": 1,
                    "enabled": "1"
                },
                "cookiematch": {
                    "id": 10,
                    "enabled": "1"
                },
                "affiliates": {
                    "id": 2,
                    "enabled": "0"
                },
                "cdp": {
                    "id": 11,
                    "enabled": "1"
                },
                "email": {
                    "id": 5,
                    "enabled": "0"
                }
            }
        },
        doNotSell: {
            noShow: false,
            isEnabled: true
        },
        getCategories: function(onlyEnabledCats) {
            if (!(utag.gdpr.preferences_prompt && utag.gdpr.preferences_prompt.categories)) {
                return [];
            }
            var length = utag.gdpr.keys(utag.gdpr.preferences_prompt.categories).length
              , cats = new Array(length)
              , gdpr_cats = utag.gdpr.preferences_prompt.categories;
            for (var cat in gdpr_cats) {
                if (!gdpr_cats.hasOwnProperty(cat)) {
                    continue;
                }
                var isCatEnabled = gdpr_cats[cat].enabled === true || gdpr_cats[cat].enabled == 1;
                if (onlyEnabledCats && !isCatEnabled) {
                    continue;
                }
                cats[gdpr_cats[cat].id - 1] = cat;
            }
            for (var i = cats.length - 1; i >= 0; i--) {
                if (cats[i] === undefined) {
                    cats.splice(i, 1);
                }
            }
            return cats;
        },
        getSelectedCategories: function() {
            var sc = [], gc = utag.gdpr.getCategories(true), cs = utag.gdpr.getConsentState(), i;
            try {
                if (typeof cs === "number") {
                    return (parseInt(cs) === 1) ? gc : sc;
                } else {
                    for (i in utag.loader.GV(cs)) {
                        if ("1" === cs[i].ct) {
                            sc.push(cs[i].name);
                        }
                    }
                }
            } catch (e) {
                utag.DB(e);
            }
            return sc;
        },
        getCategoryLanguage: function(category) {
            if (!(utag.gdpr.preferences_prompt && utag.gdpr.preferences_prompt.categories)) {
                return [];
            }
            var language = utag.gdpr.getLanguage(utag.gdpr.preferences_prompt);
            return utag.gdpr.preferences_prompt.languages[language].categories[category];
        },
        getConsentState: function() {
            var re = /^c\d+/
              , cd = utag.gdpr.getCookieValues()
              , np = 1
              , gc = utag.gdpr.getCategories()
              , pc = (function(gc) {
                var pc = [];
                for (var i = 0; i < gc.length; i++) {
                    pc.push({
                        ct: null,
                        name: gc[i]
                    });
                }
                return pc;
            }(gc))
              , filteredCD = (function(cd) {
                var d = {};
                for (var prop in cd) {
                    if (!cd.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (re.test(prop)) {
                        d[prop] = cd[prop];
                    }
                }
                return d;
            }(cd));
            filteredCD = utag.gdpr.sortedObject(filteredCD, function(val1, val2) {
                var idx1 = parseInt((val1 || "").substring(1), 10)
                  , idx2 = parseInt((val2 || "").substring(1), 10);
                if (isNaN(idx1) || isNaN(idx2)) {
                    return 0;
                }
                return idx1 > idx2 ? 1 : -1;
            });
            for (var cn in utag.loader.GV(filteredCD)) {
                if (cn.match(re)) {
                    var idx = parseInt(cn.substring(1), 10) - 1
                      , ct = gc[idx];
                    pc[idx].ct = cd[cn];
                    if (cd[cn] * 1 !== 1) {
                        np = 0;
                    }
                }
            }
            if (cd.consent) {
                if (cd.consent === true || cd.consent === "true") {
                    return np ? np : pc;
                } else {
                    return -1;
                }
            } else if (np === 0) {
                return pc;
            } else {
                return 0;
            }
        },
        getCookieValues: function() {
            var values = {}
              , rcd = (function() {
                var value = "; " + document.cookie;
                var parts = value.split("; " + utag.gdpr.cookieNS + "=");
                if (parts.length == 2)
                    return utag.ut.decode(parts.pop().split(";").shift());
            }())
              , cd = utag.gdpr.typeOf(rcd) === "string" ? rcd : "";
            if (utag.data && cd) {
                utag.data["cp." + utag.gdpr.cookieNS] = cd;
            }
            if (cd) {
                var i, optOut, optOutData = decodeURI(cd).split("|");
                for (i = 0; i < optOutData.length; i++) {
                    optOut = optOutData[i].split(":");
                    values[optOut[0]] = optOut[1];
                }
            }
            utag.gdpr.values = values;
            return values;
        },
        getDeTokenizedContent: function(data, _lang) {
            if (utag.gdpr.isEmpty(data))
                return null;
            var tokenRegExpPattern = /{{(.*?)}}/gm
              , token_match = /[{}]/g
              , two_part = /display_ads|big_data/;
            var lang = utag.gdpr.getLanguage(data, _lang)
              , langData = utag.gdpr.clone(data.languages[lang]);
            for (var t1 in utag.gdpr.sortedObject(langData.common_tokens)) {
                if (!langData.common_tokens.hasOwnProperty(t1)) {
                    continue;
                }
                langData.common_tokens[t1] = tokenReplace(langData.common_tokens[t1]);
            }
            for (var t2 in utag.gdpr.sortedObject(langData.custom_tokens)) {
                if (!langData.custom_tokens.hasOwnProperty(t2)) {
                    continue;
                }
                langData.custom_tokens[t2] = tokenReplace(langData.custom_tokens[t2]);
            }
            function tokenReplace(str) {
                if (!str)
                    return str;
                var replacements = str.match(tokenRegExpPattern);
                if (!replacements)
                    return str;
                for (var i = 0; i < replacements.length; i++) {
                    var token = replacements[i].replace(token_match, "") || "";
                    var regExpReplaceAll = new RegExp(replacements[i],"g");
                    if (langData.common_tokens[token]) {
                        str = str.replace(regExpReplaceAll, langData.common_tokens[token]);
                    } else if (langData.custom_tokens[token]) {
                        str = str.replace(regExpReplaceAll, langData.custom_tokens[token]);
                    } else if (langData.categories && token.indexOf("category_") > -1) {
                        var split_token = token.split("_");
                        if (token.match(two_part)) {
                            split_token[1] = split_token[1] + "_" + split_token[2];
                            split_token.splice(2, 1);
                        }
                        var category = langData.categories[split_token[1]]
                          , key = {
                            "title": "name",
                            "description": "notes"
                        }[split_token[2]];
                        if (category[key]) {
                            str = str.replace(regExpReplaceAll, category[key]);
                        }
                    }
                }
                return str;
            }
            return {
                language: lang,
                tokens: langData,
                js: tokenReplace(data.content.js),
                html: tokenReplace(data.content.html),
                css: tokenReplace(data.content.css)
            };
        },
        getLanguage: function(promptData, preferredLang) {
            var udoName = window.utag.udoname || "utag_data";
            var dataObject = window.utag.data || window[udoName];
            var langLocale = (preferredLang || dataObject[window.utag.cfg.gdprDLRef] || (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage)).toLowerCase();
            var lang = (langLocale || "").split("-")[0];
            if (!promptData) {
                return langLocale;
            }
            var languages = promptData.languages;
            return languages[langLocale] ? langLocale : languages[lang] ? lang : promptData.defaultLang;
        },
        getTokenLanguage: function(promptData, token, lang) {
            if (utag.gdpr.isEmpty(promptData))
                return null;
            if (utag.gdpr.isEmpty(token))
                return null;
            var getDeTokenizedContent = utag.gdpr.getDeTokenizedContent(promptData, lang);
            var langData = getDeTokenizedContent.tokens;
            if (lang && getDeTokenizedContent.language !== lang)
                return null;
            if (utag.gdpr.isEmpty(langData))
                return null;
            if (langData.common_tokens[token]) {
                return langData.common_tokens[token];
            } else if (langData.custom_tokens[token]) {
                return langData.custom_tokens[token];
            } else if (langData.categories && token.indexOf("category_") > -1) {
                var split_token = token.split("_")
                  , category = langData.categories[split_token[1]];
                if (category[split_token[2]]) {
                    return category[split_token[2]];
                }
            }
            return null;
        },
        refreshCookie: function() {
            if (utag && utag.DB) {
                utag.DB("utag.gdpr.refreshCookie has been deprecated");
            }
        },
        setCookie: function(cookieData) {
            utag.DB("Consent Manager: Set Cookie");
            if (utag.gdpr.typeOf(cookieData) !== "object") {
                return;
            }
            if (utag.gdpr.keys(cookieData).length === 0) {
                return;
            }
            var consentType = utag.gdpr.typeOf(cookieData.consent);
            if (consentType === "number") {
                cookieData.consent = cookieData.consent == 1;
                consentType = utag.gdpr.typeOf(cookieData.consent);
            }
            if (consentType !== "boolean" && !(consentType === "string" && (cookieData.consent.toLowerCase() === "true" || cookieData.consent.toLowerCase() === "false"))) {
                utag.DB("Invalid option sent to setCookie [consent must be true/false]");
                return;
            }
            if (utag.gdpr.typeOf(cookieData.ts) !== "number" || (cookieData.ts.toString().length !== 13)) {
                cookieData.ts = new Date().getTime();
            }
            utag.gdpr.values = cookieData;
            var mo2Val = [];
            for (var i in utag.loader.GV(cookieData)) {
                if (/^(consent|dns|ts|id|c\d+)$/.test(i)) {
                    mo2Val.push(i + ":" + cookieData[i]);
                } else {
                    utag.DB("Invalid option sent to setCookie [" + i + "], is unknown");
                }
            }
            var daysToSet = utag.gdpr.consentPeriod;
            if (!daysToSet) {
                var expiryMonths = cookieData.dns == undefined ? 12 : 13;
                var today = new Date();
                today.setMonth(today.getMonth() + expiryMonths);
                daysToSet = Math.ceil((today.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            }
            var expiry = new Date(cookieData.ts);
            expiry.setDate(expiry.getDate() + daysToSet);
            var cookie_string = [utag.gdpr.cookieNS + "=" + encodeURI(mo2Val.join("|")), "path=" + utag.gdpr.path, "expires=" + expiry.toGMTString()];
            if (utag.gdpr.domain) {
                cookie_string.push("domain=" + utag.gdpr.domain);
            }
            document.cookie = cookie_string.join("; ");
            utag.data["cp." + utag.gdpr.cookieNS] = mo2Val.join("|");
        },
        defaultConsentForDoNotSell: function(key, cookieData) {
            if (key === 'dns') {
                var consentType = utag.gdpr.typeOf(cookieData.consent);
                if (consentType === "undefined") {
                    utag.DB("Consent Manager: Defaulting missing consent for Do Not Sell.");
                    cookieData.consent = "true";
                }
            }
            return cookieData;
        },
        setCookieValue: function(key, value) {
            utag.DB("Consent Manager: Set Cookie Value");
            if (!key || (utag.gdpr.typeOf(value) === "undefined" || utag.gdpr.typeOf(value) === "null"))
                return;
            var cookieData = utag.handler.C(utag.gdpr.getCookieValues());
            cookieData[key] = value;
            cookieData = utag.gdpr.defaultConsentForDoNotSell(key, cookieData);
            utag.gdpr.setCookie(cookieData);
        },
        setConsentValue: function(_response) {
            utag.DB("Consent Manager: Set Consent Value: " + _response);
            var valid = {
                true: 1,
                "true": 1,
                1: 1,
                false: 0,
                "false": 0,
                0: 0
            };
            if (!valid.hasOwnProperty(_response)) {
                throw new Error("No response supplied");
            }
            var response = valid[_response] === 1;
            utag.gdpr.setCookieValue("ts", new Date().getTime());
            utag.gdpr.setCookieValue("consent", response);
            utag.gdpr.processQueue(response);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://collect.tealiumiq.com/event");
            var consentInfo = response ? '"tealium_event":"grant_full_consent","consent_categories":' + JSON.stringify(utag.gdpr.getCategories(true)) + ',' : '"tealium_event":"decline_consent","consent_categories":[],';
            var cookieName = "trace_id=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            var cookie = ca.find(item => item.includes(cookieName));
            cookie = cookie ? cookie.trim() : cookie;
            var traceIdValue = cookie ? cookie.substring(cookieName.length, cookie.length) : "";
            var traceIdInfo = traceIdValue ? '"cp.trace_id":"' + traceIdValue + '",' : "";
            xhr.send('{"tealium_account":"tealiumlabs",' + '"tealium_profile":"' + (utag.gdpr.eventProfile || "main") + '",' + consentInfo + '"policy":"gdpr", ' + traceIdInfo + '"tealium_visitor_id" : "' + utag.data['cp.utag_main_v_id'] + '"}');
            try {
                var decision = response ? utag.gdpr.getCategories(true) : []
                decision.unshift('always_on');
                decision.type = 'explicit';
                window.tealiumConsentRegister.addConsentDecision(decision);
            } catch (e) {
                utag.DB(e);
            }
        },
        setPreferencesValues: function(categories, noCollect) {
            utag.DB("Consent Manager: Set Preferences Values");
            var i, fld, cookie_data = utag.gdpr.getCookieValues(), lookup = {}, rgx = /\D/, names = utag.gdpr.getCategories(), chosen_list = [], consent_seen = false, decline_seen = false, crgx = /c\d/;
            if (utag.gdpr.typeOf(categories) !== "object") {
                utag.DB("Categories is not type object.");
                return;
            }
            try {
                for (i = 0; i < names.length; i++) {
                    lookup[names[i]] = "c" + (i + 1);
                }
                for (var cat in categories) {
                    if (!categories.hasOwnProperty(cat)) {
                        continue;
                    }
                    if (categories[cat] !== "1" && categories[cat] !== "0" && categories[cat] !== 1 && categories[cat] !== 0) {
                        continue;
                    }
                    if (cat.match(rgx)) {
                        cookie_data[lookup[cat]] = categories[cat];
                        if (categories[cat] != 0) {
                            chosen_list.push(cat);
                        }
                    } else {
                        cookie_data["c" + cat] = categories[cat];
                        if (categories[cat] != 0) {
                            chosen_list.push(names[cat - 1]);
                        }
                    }
                }
                for (fld in utag.loader.GV(cookie_data)) {
                    if (fld.match(crgx)) {
                        if (cookie_data[fld] != 0) {
                            consent_seen = true;
                        } else {
                            decline_seen = true;
                        }
                    }
                }
                cookie_data["ts"] = new Date().getTime();
                cookie_data["consent"] = consent_seen;
                utag.gdpr.setCookie(cookie_data);
                utag.gdpr.processQueue(consent_seen);
            } catch (e) {
                utag.DB(e);
            }
            if (noCollect) {
                return;
            }
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://collect.tealiumiq.com/event");
            var tealiumEvent = '"tealium_event":';
            var consentCategories = '"consent_categories":';
            if (decline_seen) {
                if (consent_seen) {
                    tealiumEvent += '"grant_partial_consent",';
                    consentCategories += JSON.stringify(chosen_list) + ",";
                } else {
                    tealiumEvent += '"decline_consent",';
                    consentCategories += "[],";
                }
            } else if (!decline_seen && consent_seen) {
                tealiumEvent += '"grant_full_consent",';
                consentCategories += JSON.stringify(utag.gdpr.getCategories(true)) + ',';
            }
            var cookieName = "trace_id=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            var cookie = ca.find(item => item.includes(cookieName));
            cookie = cookie ? cookie.trim() : cookie;
            var traceIdValue = cookie ? cookie.substring(cookieName.length, cookie.length) : "";
            var traceIdInfo = traceIdValue ? '"cp.trace_id":"' + traceIdValue + '",' : "";
            xhr.send('{"tealium_account":"tealiumlabs",' + '"tealium_profile":"' + (utag.gdpr.eventProfile || "main") + '",' + tealiumEvent + consentCategories + '"policy":"gdpr",' + traceIdInfo + '"tealium_visitor_id":"' + utag.data['cp.utag_main_v_id'] + '"}');
            try {
                var decision = (function() {
                    var consentCategories;
                    if (decline_seen) {
                        if (consent_seen) {
                            consentCategories = utag.gdpr.getSelectedCategories();
                        } else {
                            consentCategories = [];
                        }
                    } else if (!decline_seen && consent_seen) {
                        consentCategories = utag.gdpr.getSelectedCategories();
                    }
                    consentCategories.unshift('always_on');
                    consentCategories.type = 'explicit';
                    return consentCategories;
                }());
                decision.type = 'explicit';
                window.tealiumConsentRegister.addConsentDecision(decision);
            } catch (e) {
                utag.DB(e);
            }
        },
        setAllCategories: function(state, noCollect) {
            utag.DB("Consent Manager: Set Preferences All Categories: " + state);
            if (state === undefined)
                return;
            if (utag.gdpr.typeOf(state) !== "boolean")
                return;
            var allCats = utag.gdpr.getCategories()
              , prefs = {};
            for (var i = 0; i < allCats.length; i++) {
                prefs["" + (i + 1)] = state ? "1" : "0";
            }
            utag.gdpr.setPreferencesValues(prefs, noCollect);
        },
        setPreferencesFromList: function(list) {
            utag.DB("Consent Manager: Set Preferences From List");
            var prefs = {}
              , allCats = utag.gdpr.getCategories();
            if (utag.gdpr.typeOf(list) !== "array") {
                utag.DB("List should be of type array");
                return;
            }
            for (var i = 0; i < list.length; i++) {
                prefs[list[i]] = "1";
            }
            for (var j = 0; j < allCats.length; j++) {
                if (!prefs[allCats[j]]) {
                    prefs[allCats[j]] = "0";
                }
            }
            utag.gdpr.setPreferencesValues(prefs);
        },
        processQueue: function(consent_seen) {
            utag.DB("Consent Manager: Processing Consent Queue");
            if (utag.gdpr.noqueue) {
                return;
            }
            if (!consent_seen) {
                utag.gdpr.queue = [];
                return;
            }
            utag.DB("Consent Manager: Processing Consent Queue Length: " + utag.gdpr.queue.length);
            var event, data, conds = {};
            utag.gdpr.merge(conds, utag.cond);
            for (var i = 0; i < utag.gdpr.queue.length; i++) {
                event = utag.gdpr.queue[i];
                if (!(event.cfg && event.cfg.uids)) {
                    data = {};
                    utag.loader.RD(data, event.event);
                    utag.gdpr.merge(data, event.data, true);
                    for (var cond in conds) {
                        if (!conds.hasOwnProperty(cond)) {
                            continue;
                        }
                        conds[cond] = 0;
                    }
                    utag.handler.RE(event.event, data, "blr");
                    utag.loader.loadrules(data, conds);
                    event.cfg = event.cfg || {};
                    event.cfg.uids = [];
                    event.data = data;
                    utag.cond = conds;
                    utag.loader.initcfg();
                    utag.gdpr.applyConsentState();
                    var consentState = utag.gdpr.getConsentState();
                    var csType = utag.gdpr.typeOf(consentState);
                    for (var id in utag.loader.GV(utag.loader.cfg)) {
                        if (utag.gdpr.omittedTags[id])
                            continue;
                        var tag = utag.loader.cfg[id];
                        if (tag.load && tag.send) {
                            if (tag.tcat !== 0) {
                                if ((csType === "array" && consentState[tag.tcat - 1].ct == "1") || (csType === "number" && consentState == 1)) {
                                    event.cfg.uids.push(id);
                                }
                            } else if (tag.tcat === 0) {
                                event.cfg.uids.push(id);
                            }
                        }
                    }
                }
                (function(event) {
                    setTimeout(function() {
                        if (event.cfg.uids) {
                            for (var indexCfgUID = event.cfg.uids.length - 1; indexCfgUID > -1; indexCfgUID--) {
                                if (!utag.gdpr.omittedTags[event.cfg.uids[indexCfgUID]])
                                    continue;
                                event.cfg.uids.splice(indexCfgUID, 1);
                            }
                        }
                        utag.track_old.call(this, event);
                    }, 150 * i);
                }
                )(event);
            }
            utag.gdpr.queue = [];
        },
        typeOf: function(e) {
            return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        },
        merge: function(a, b, c, d) {
            if (c) {
                for (d in utag.loader.GV(b)) {
                    a[d] = b[d];
                }
            } else {
                for (d in utag.loader.GV(b)) {
                    if (typeof a[d] == "undefined")
                        a[d] = b[d];
                }
            }
        },
        getEnforcementMode: function() {
            utag.gdpr.promptEnabledSetting();
            var optOutModulesAreActive = (utag.gdpr.consent_prompt && utag.gdpr.consent_prompt.isEnabled === true);
            var optInModuleIsActive = (utag.gdpr.doNotSell && utag.gdpr.doNotSell.isEnabled === true);
            var enforcementMode = 'opt-in';
            if (!optOutModulesAreActive && optInModuleIsActive)
                enforcementMode = 'opt-out';
            if (!optOutModulesAreActive && !optInModuleIsActive)
                enforcementMode = 'none';
            return enforcementMode;
        },
        shouldBlockTag: function(taguid) {
            if (!taguid)
                return true;
            var enforcementMode = utag.gdpr.getEnforcementMode();
            if (enforcementMode === 'none')
                return false;
            var lc = utag.loader.cfg
              , cs = utag.gdpr.getConsentState()
              , uid = taguid;
            if (utag.gdpr.typeOf(uid) === "undefined")
                return true;
            utag.DB("Consent Manager: Applying consent: " + uid);
            var csTYpe = utag.gdpr.typeOf(cs);
            var tag = lc[uid];
            if (typeof tag !== "object") {
                utag.DB("Consent Manager: Missing/inactive tag: " + uid + " not allowed to send (nothing to fire anyway)");
                return true;
            }
            var blockedTagLookup = utag.gdpr.dns ? utag.gdpr.dns.getBlockedDnsTagLookup() : {};
            if (enforcementMode === 'opt-out' && tag.send && tag.tcat !== 0) {
                if (blockedTagLookup === null) {
                    utag.DB("Consent Manager: Applying consent: " + uid + " allowed to send (enforcement is off).");
                    return false;
                }
                if (parseInt(blockedTagLookup[uid]) !== 1) {
                    utag.DB("Consent Manager: Applying consent: " + uid + " allowed to send");
                    return false;
                }
            }
            if (enforcementMode === 'opt-in') {
                if ((utag.gdpr.omittedTags[uid] || tag.tcat == 0) && tag.send) {
                    utag.DB("Consent Manager: Omitted Tag: " + uid + " allowed to send");
                    return false;
                }
                if ((csTYpe === "array" && cs[tag.tcat - 1].ct == "1") || (csTYpe === "number" && cs == 1)) {
                    utag.DB("Consent Manager: Applying consent: " + uid + " allowed to send");
                    return false;
                }
            }
            utag.DB("Consent Manager: Applying consent: " + uid + " not allowed to send");
            return true;
        },
        applyConsentState: function() {
            var enforcementMode = utag.gdpr.getEnforcementMode()
            if (enforcementMode === 'none')
                return;
            utag.DB("Consent Manager: Applying consent");
            try {
                var i, lc = utag.loader.cfg, cs = utag.gdpr.getConsentState(), ot = utag.gdpr.omittedTags;
                if (typeof cs === "number") {
                    if ((utag.gdpr.consent_prompt.isEnabled && parseInt(cs) !== 1) || ((!utag.gdpr.consent_prompt.isEnabled && utag.gdpr.preferences_prompt.isEnabled) && parseInt(cs) === -1)) {
                        utag.DB("Consent Manager: Setting all tags to off");
                        for (i in utag.loader.GV(lc)) {
                            if (typeof ot[i] === "undefined") {
                                lc[i].load = 0;
                            }
                        }
                    }
                } else if (utag.gdpr.consent_prompt.isEnabled || utag.gdpr.preferences_prompt.isEnabled) {
                    utag.DB("Consent Manager: Partial Consent");
                    for (i in utag.loader.GV(lc)) {
                        if (typeof ot[i] === "undefined") {
                            if (lc[i].tcat > 0 && cs[lc[i].tcat - 1].ct != "1") {
                                lc[i].load = 0;
                            }
                        }
                    }
                }
                var btl = utag.gdpr.dns ? utag.gdpr.dns.getBlockedDnsTagLookup() : null;
                utag.DB("Consent Manager: Do Not Sell Tags");
                if (enforcementMode === 'opt-out' && btl) {
                    for (i in utag.loader.GV(lc)) {
                        if (parseInt(btl[i]) === 1) {
                            lc[i].load = 0;
                        }
                    }
                }
                try {
                    if (window.tealiumConsentRegister && window.tealiumConsentRegister.currentDecision === null) {
                        var cookieValues = utag.gdpr.getCookieValues();
                        var hasDnsCookie = typeof cookieValues.dns === 'string';
                        var hasConsentCookie = typeof cookieValues.consent === 'string';
                        var decisionType = (enforcementMode === 'opt-in' && hasConsentCookie) || (enforcementMode === 'opt-out' && hasDnsCookie) ? 'explicit' : 'implicit';
                        var decision = (decisionType === 'implicit' && enforcementMode === 'opt-in') ? [] : utag.gdpr.getSelectedCategories();
                        decision.unshift('always_on');
                        decision.type = decisionType;
                        window.tealiumConsentRegister.addConsentDecision(decision);
                    }
                } catch (e) {
                    utag.DB(e);
                }
            } catch (e) {
                utag.DB(e);
            }
        },
        updateConsentCookie: function(consent_categories) {
            utag.DB("Consent Manager: Updating consent cookie");
            var list, listType = utag.gdpr.typeOf(consent_categories);
            if (listType === "string") {
                list = consent_categories.split(/\s*,\s*/);
            } else if (listType !== "array") {
                list = [];
            } else {
                list = consent_categories.slice();
            }
            if (list.length === 0) {
                utag.gdpr.setConsentValue(false);
                utag.gdpr.setAllCategories(false);
                return;
            }
            utag.gdpr.setPreferencesFromList(list);
        },
        keys: function(obj) {
            if (Object.keys) {
                return Object.keys(obj);
            }
            var array = [];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }
                array.push(prop);
            }
            return array;
        },
        sortedObject: function(obj, func) {
            var _obj = {};
            if (obj !== undefined) {
                var _k1 = utag.gdpr.keys(obj).sort(func);
                for (var z = 0; z < _k1.length; z++) {
                    _obj[_k1[z]] = obj[_k1[z]];
                }
            }
            return _obj;
        },
        clone: function(a) {
            var level = 0;
            return cloner(a);
            function cloner(a) {
                var b = {};
                var c;
                level++;
                if (level === 5)
                    return a;
                for (c in utag.loader.GV(a)) {
                    if (utag.gdpr.typeOf(a[c]) === "array") {
                        b[c] = a[c].slice(0)
                    } else if (utag.gdpr.typeOf(a[c]) === "object") {
                        b[c] = cloner(a[c]);
                    } else {
                        b[c] = a[c];
                    }
                }
                level--;
                return b;
            }
        },
        isEmpty: function(obj) {
            var t = utag.gdpr.typeOf(obj);
            switch (t) {
            case "string":
            case "array":
                return obj.length === 0;
            case "object":
                for (var p in obj) {
                    if (!obj.hasOwnProperty(p)) {
                        continue;
                    }
                    return false;
                }
            default:
                return true;
            }
        },
        getTraceId: function() {
            var cookieName = "trace_id=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            var cookie = ca.find(item => item.trim().startsWith(cookieName));
            cookie = cookie ? cookie.trim() : cookie;
            return cookie ? cookie.substring(cookieName.length, cookie.length) : "";
        },
        setVisitorId: function() {
            var visitorId;
            var consentCookies = utag.gdpr.getCookieValues();
            if (consentCookies && consentCookies.id) {
                visitorId = consentCookies.id;
            } else if (utag.data['cp.utag_main_v_id']) {
                visitorId = utag.data['cp.utag_main_v_id'];
            } else {
                visitorId = utag.ut.vi((new Date()).getTime());
            }
            utag.gdpr.setCookieValue('id', visitorId)
            return visitorId;
        },
        queue: [],
        domain: window.utag_cfg_ovrd && window.utag_cfg_ovrd.domain || utag.cfg.domain,
        path: window.utag_cfg_ovrd && window.utag_cfg_ovrd.cookie_path || "/",
        noqueue: window.utag_cfg_ovrd && window.utag_cfg_ovrd.nogdprqueue || false,
        noview: window.utag_cfg_ovrd && window.utag_cfg_ovrd.noview || false,
        consentPeriod: (window.utag_cfg_ovrd && window.utag_cfg_ovrd.consentPeriod) || 0,
        cookieNS: window.utag_cfg_ovrd && window.utag_cfg_ovrd.cmcookiens || "CONSENTMGR",
        eventProfile: window.utag_cfg_ovrd && window.utag_cfg_ovrd.cmeventprofile || "main" || "main",
        omittedTags: {
            "11": 1,
            "5322": 1,
            "5588": 1,
            "2": 1,
            "3940": 1
        }
    };
    if (window.utag_cfg_ovrd && window.utag_cfg_ovrd.domain == "") {
        utag.gdpr.domain = "";
    }
    utag.loader.initdataOld = utag.loader.initdata;
    utag.loader.initdata = function() {
        utag.loader.initdataOld();
        if (utag.gdpr.getConsentState() !== 0)
            return;
        if (utag.gdpr.noview)
            return;
        if (!utag.loader.rd_flag && !utag.gdpr.noqueue) {
            utag.gdpr.queue.push({
                event: "view",
                data: utag.handler.C(utag.data)
            });
        }
    }
    ;
    utag.gdpr.promptEnabledSetting = function() {
        if (!utag.gdpr.dr && (utag.cfg.readywait || utag.cfg.waittimer)) {
            utag.gdpr.dr = 1;
            return;
        }
        if (utag.gdpr.consent_prompt.isEnabled === true && !(1)) {
            utag.gdpr.consent_prompt.isEnabled = false;
        }
        if (utag.gdpr.doNotSell.isEnabled === true && !(utag.cond[617])) {
            utag.gdpr.doNotSell.isEnabled = false;
        }
    }
    utag.preOld = utag.pre;
    utag.pre = function() {
        utag.preOld();
        utag.gdpr.promptEnabledSetting();
        utag.pre = utag.preOld;
    }
    ;
    utag.gdpr.consent_prompt.languages = {
        "en": {
            "display_name": "English (en)",
            "isDefault": "true",
            "custom_tokens": {
                "optin": "Opt-In",
                "optout": "Opt-Out",
                "preferencesdialog": "Advanced Consent Options",
                "company_logo_url": ""
            },
            "common_tokens": {
                "message": "This website uses cookies and tracks data. By checking Opt-in, you agree to our use of cookies and to track data. For more information, please see our <a href=\"{{privacy_policy_url}}\" target=\"_blank\">privacy policy</a>.",
                "title": "Consent Opt-in",
                "confirmation_button": "Submit"
            }
        },
        "aa": {
            "custom_tokens": {
                "company_logo_url": "",
                "preferencesdialog": "",
                "optin": "",
                "optout": ""
            },
            "common_tokens": {
                "message": "",
                "title": "",
                "confirmation_button": ""
            },
            "isDefault": "false",
            "display_name": "Afar (aa)"
        }
    };
    utag.gdpr.consent_prompt.content.css = ".privacy_prompt {      position: absolute;      width: 600px;      top: 100px;      left: 50%;      margin-left: -300px;      text-align: left;      border: 1px solid #CCC;      border-radius: 4px;      background-color: #FFF;      color: #444;      font-size: 14px;      z-index: 1000;      word-break: break-word;   }    .privacy_prompt a {      text-decoration: none;      color: #0077bf;  }    .privacy_prompt_content {      padding: 20px;      font-size: 0.9em;  }    .privacy_prompt h1 {      font-size: 1.3em;      color: #444;      font-weight: 400;  }    .privacy_prompt .option {      margin: 10px 0px;      color: #444;  }    .privacy_prompt_footer {      padding: 0px 20px 20px 20px;      overflow: auto;  }    .privacy_prompt_footer a {      font-size: 0.9em;  }    .privacy_prompt_footer .button {      font-size: 1.0em;      border: 1px solid #CCC;      padding: 4px 15px;      min-width: 50px;      text-align: center;      border-radius: 4px;      background-color: #EEE;      box-shadow: inset 0px 1px 4px rgba(255, 255, 255, 1);      text-shadow: 1px 1px 3px rgba(255, 255, 255, 1);      color: #000;      cursor: pointer;  }    .privacy_prompt .button.right {      float: right;  }    .privacy_prompt .button.left {      float: left;  }    .privacy_prompt > .close_btn_thick {      position: absolute;      display: block;      top: 10px;      right: 10px;      text-decoration: none;      text-shadow: 0 1px 0 #fff;      color: #777;      font: 14px/100% arial, sans-serif;      cursor: pointer;  }    .privacy_prompt > .close_btn_thick:after {      content: \"\\2716\";   }    .privacy_prompt .logo {      float: right;  }    .privacy_prompt table {      padding: 0px;      border-collapse: collapse;  }    .privacy_prompt table tr {  }    .privacy_prompt table th {      background-color: #FAFAFA;      border-bottom: 1px solid #EEE;      margin: 0px;      padding: 5px 8px;      font-weight: 400;      text-align: center;  }    .privacy_prompt table td {      vertical-align: top;      padding: 10px 8px 5px 8px;  }    .privacy_prompt table tr td:first-child {      min-width: 120px;      font-weight: 600;      color: #666;  }    .privacy_prompt table tr td:last-child {      text-align: center;      min-width: 100px;  }    .privacy_prompt input[type=\"checkbox\"].toggle {      opacity: 0;      position: absolute;      left: -99999px;  }    .privacy_prompt input[type=\"checkbox\"].toggle + label {      height: 24px;      line-height: 24px;      background-color: #ccc;      padding: 0px 16px;      border-radius: 16px;      display: inline-block;      position: relative;      cursor: pointer;      -moz-transition: all 0.25s ease-in;      -o-transition: all 0.25s ease-in;      -webkit-transition: all 0.25s ease-in;      transition: all 0.25s ease-in;      -moz-box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);      -webkit-box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);      box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);  }    .privacy_prompt input[type=\"checkbox\"].toggle + label:before, .privacy_prompt input[type=\"checkbox\"].toggle + label:hover:before {      content: \" \";      position: absolute;      top: 2px;      left: 2px;      width: 26px;      height: 20px;      background: #fff;      z-index: 2;      -moz-transition: all 0.25s ease-in;      -o-transition: all 0.25s ease-in;      -webkit-transition: all 0.25s ease-in;      transition: all 0.25s ease-in;      -moz-border-radius: 14px;      -webkit-border-radius: 14px;      border-radius: 14px;  }    .privacy_prompt input[type=\"checkbox\"].toggle + label .off, .privacy_prompt input[type=\"checkbox\"].toggle + label .on {      color: #fff;  }    .privacy_prompt input[type=\"checkbox\"].toggle + label .off {      margin-left: 20px;      display: inline-block;  }    .privacy_prompt input[type=\"checkbox\"].toggle + label .on {      display: none;  }    .privacy_prompt input[type=\"checkbox\"].toggle:checked + label .off {      display: none;  }    .privacy_prompt input[type=\"checkbox\"].toggle:checked + label .on {      margin-right: 20px;      display: inline-block;  }    .privacy_prompt input[type=\"checkbox\"].toggle:checked + label, .privacy_prompt input[type=\"checkbox\"].toggle:focus:checked + label {      background-color: #3278c0;  }    .privacy_prompt input[type=\"checkbox\"].toggle:checked + label:before, .privacy_prompt input[type=\"checkbox\"].toggle:checked + label:hover:before, .privacy_prompt input[type=\"checkbox\"].toggle:focus:checked + label:before, .privacy_prompt input[type=\"checkbox\"].toggle:focus:checked + label:hover:before {      background-position: 0 0;      top: 2px;      left: 100%;      margin-left: -28px;  }   .privacy_prompt input[type=\"checkbox\"].toggle + label {     overflow: hidden;     text-overflow: ellipsis;     max-height: 24px;     height: 24px;     } @media (max-width: 780px) {    #__tealiumGDPRecModal .privacy_prompt {     width: 90%;     margin: 0 auto;     left: 5%;    } }  ";
    utag.gdpr.consent_prompt.content.html = "<div class=\"privacy_prompt\">    <div class=\"privacy_prompt_content\">      <h1>{{title}}</h1>      <p>{{message}}</p>      <div class=\"option_set\">        <div class=\"option\">          <input type=\"radio\" id=\"privacy_pref_optin\" name=\"privacy_pref\" value=\"optin\">          <label for=\"privacy_pref_optin\">{{optin}}</label>        </div>        <div class=\"option\">          <input type=\"radio\" id=\"privacy_pref_optout\" name=\"privacy_pref\" value=\"optout\">          <label for=\"privacy_pref_optout\">{{optout}}</label>        </div>        <!--div class=\"option\">          <input type=\"radio\" id=\"privacy_pref_optin\" name=\"privacy_pref\" value=\"optin\">          <label for=\"privacy_pref_optin\">{{opt_in}}</label>          <input type=\"radio\" id=\"privacy_pref_optout\" name=\"privacy_pref\" value=\"optout\">          <label for=\"privacy_pref_optout\">{{opt_out}}</label>        </div-->        <div><a href=\"javascript:document.getElementsByClassName(\'privacy_prompt\')[0].style.display=\'none\';utag.gdpr.showConsentPreferences();\">Advanced Consent Options</a></div>      </div>    </div>    <div class=\"privacy_prompt_footer\">      <div id=\"consent_prompt_submit\" class=\"button right\">        {{confirmation_button}}      </div>    </div>    <div class=\"close_btn_thick\"></div></div>";
    utag.gdpr.consent_prompt.content.js = "(function consent_prompt(){var $el=document.getElementById(\"consent_prompt_submit\"),$modal=document.getElementById(\"__tealiumGDPRecModal\"),$closeBtn=$modal.getElementsByClassName(\"close_btn_thick\")[0],$privacy_pref_optin=document.getElementById(\"privacy_pref_optin\"),$privacy_pref_optout=document.getElementById(\"privacy_pref_optout\");var consentState=utag.gdpr.getConsentState();if(typeof consentState===\"number\"){if(consentState===1){$privacy_pref_optin.checked=true;}else if(consentState===-1){$privacy_pref_optout.checked=true;}}else{$privacy_pref_optin.checked=true;}var callBack=function(){if($privacy_pref_optin.checked){utag.gdpr.setConsentValue(1);}else if($privacy_pref_optout.checked){utag.gdpr.setConsentValue(0);}else{return;}closePrompt();};var closePrompt=function(){$modal.style.display=\"none\";};if(document.addEventListener){$el.addEventListener(\"click\",callBack,false);$closeBtn.addEventListener(\"click\",closePrompt,false);}else if(document.attachEvent){$el.attachEvent(\"click\",callBack);$closeBtn.attachEvent(\"click\",closePrompt);}else{$el.onclick=callBack;$closeBtn.onclick=closePrompt;}}());";
    utag.gdpr.consent_prompt.defaultLang = "en";
    utag.gdpr.showExplicitConsent = function(_lang) {
        var cn = document.getElementById("__tealiumGDPRecStyle");
        if (cn) {
            cn.parentNode.removeChild(cn);
        }
        var hn = document.getElementById("__tealiumGDPRecModal");
        if (hn) {
            hn.parentNode.removeChild(hn);
        }
        var sn = document.getElementById("__tealiumGDPRecScript");
        if (sn) {
            sn.parentNode.removeChild(sn);
        }
        var dtc = utag.gdpr.getDeTokenizedContent(utag.gdpr.consent_prompt, _lang);
        var head = document.head || document.getElementsByTagName("head")[0]
          , style = document.createElement("style")
          , mDiv = document.createElement("div")
          , scr = document.createElement("script")
          , body = document.body || document.getElementsByTagName("body")[0];
        style.type = "text/css";
        style.id = "__tealiumGDPRecStyle";
        if (style.styleSheet) {
            style.styleSheet.cssText = dtc.css;
        } else {
            style.appendChild(document.createTextNode(dtc.css));
        }
        head.appendChild(style);
        mDiv.innerHTML = dtc.html;
        mDiv.id = "__tealiumGDPRecModal";
        body.appendChild(mDiv);
        scr.language = "javascript";
        scr.type = "text/javascript";
        scr.text = "try{" + dtc.js + "} catch(e){utag.DB(e)}";
        scr.id = "__tealiumGDPRecScript";
        head.appendChild(scr);
    }
    ;
    utag.gdpr.preferences_prompt.languages = {
        "en": {
            "isDefault": "true",
            "custom_tokens": {
                "company_logo_url": "https://tealium.com/images/logo.svg",
                "privacy_policy_url": "https://tealium.com/privacy/"
            },
            "categories": {
                "cdp": {
                    "name": "CDP",
                    "notes": "To creates a persistent, unified customer database that is accessible to all of our systems."
                },
                "email": {
                    "name": "Email",
                    "notes": "To track when visitors are entering our site to determine effectiveness of our targeting efforts."
                },
                "search": {
                    "name": "Search",
                    "notes": "To help deliver better search results based on customers visiting our site."
                },
                "mobile": {
                    "name": "Mobile",
                    "notes": "iOS and Android capabilities"
                },
                "analytics": {
                    "notes": "The measurement, collection, analysis and reporting of web data.",
                    "name": "Analytics"
                },
                "cookiematch": {
                    "name": "Cookie Match",
                    "notes": "To ensure we are serving relevant ads off site."
                },
                "affiliates": {
                    "notes": "To pay commission to other online entities for referring your business to our website.",
                    "name": "Affiliates"
                },
                "misc": {
                    "name": "Misc",
                    "notes": "Functionality important to delivery an optimal website experience."
                },
                "engagement": {
                    "notes": "Tools such as live chat that assist in your website experience.",
                    "name": "Engagement"
                },
                "monitoring": {
                    "notes": "Tools that allow us to measure the performance of page loading.",
                    "name": "Monitoring"
                },
                "big_data": {
                    "name": "Big Data",
                    "notes": "Data sets that may be analyzed computationally to reveal patterns, trends, and associations."
                },
                "uncategorized": {
                    "name": "",
                    "notes": ""
                },
                "social": {
                    "notes": "To better generate, target, and deliver marketing communications via Social networks.",
                    "name": "Social"
                },
                "display_ads": {
                    "name": "Display Ad",
                    "notes": "Online advertising that comes in several forms, including banner ads, rich media and more. "
                },
                "personalization": {
                    "name": "Personalization",
                    "notes": "To create customized experiences for visitors to our website. "
                },
                "crm": {
                    "name": "CRM",
                    "notes": "Tools that allow us to manage your customer/account information cross device."
                }
            },
            "common_tokens": {
                "category": "Category",
                "status": "Opt-In?",
                "yes": "Yes",
                "confirmation_button": "Submit",
                "no": "No",
                "message": "In order to tailor your site experience based on your affinities, our service providers collect information about your use of this site. Please opt-in to allow use of this information which helps support this site and offers the best product selections to you and your fellow customers. For more information, please see our <a href=\"{{privacy_policy_url}}\" target=\"_blank\">privacy policy</a>.",
                "title": "Consent Preferences Tracking",
                "description": "Description"
            }
        }
    };
    utag.gdpr.preferences_prompt.content.css = ".privacy_prompt {   position: absolute;   width: 50%;   text-align: left;   border: 1px solid #CCC;   border-radius: 4px;   background-color: #FFF;   color: #444;   font-size: 14px;  top: 15%;  left: 25%;  margin: 0 auto;  z-index: 10000;  padding: 10px;}.privacy_prompt a {    text-decoration: none;    color: #0077bf;}.privacy_prompt_content {    padding: 20px;    font-size: 0.9em;}.privacy_prompt h1 {    font-size: 1.3em;    color: #444;    font-weight: 400;}.option_set {}.option {    margin: 10px 0px;    color: #444;}.privacy_prompt_footer {    padding: 0px 20px 20px 20px;    overflow: auto;}.privacy_prompt_footer a {    font-size: 0.9em;}.privacy_prompt_footer .button {    font-size: 1.0em;    border: 1px solid #CCC;    padding: 4px 15px;    min-width: 50px;    text-align: center;    border-radius: 4px;    background-color: #EEE;    box-shadow: inset 0px 1px 4px rgba(255, 255, 255, 1);    text-shadow: 1px 1px 3px rgba(255, 255, 255, 1);    color: #000;    cursor: pointer;}.privacy_prompt .button.right {    float: right;}.privacy_prompt .button.left {    float: left;}.privacy_prompt > .close_btn_thick {    position: absolute;    display: block;    top: 10px;    right: 10px;    text-decoration: none;    text-shadow: 0 1px 0 #fff;    color: #777;    font: 14px/100% arial, sans-serif;}.privacy_prompt > .close_btn_thick:after {  content:  \"\\2716\"; }.privacy_prompt .logo {    float: right;    width: 25%;    background-color: #3399cc;}.privacy_prompt .prefmessage {    float: left;    width: 72%;    margin-right: 3%;}.privacy_prompt table {    padding: 0px;    border-collapse: collapse;    width: 100%;}.privacy_prompt table th {    background-color: #FAFAFA;    border-bottom: 1px solid #EEE;    margin: 0px;    padding: 5px 8px;    font-weight: 400;    text-align: center;}.privacy_prompt table tr {}.privacy_prompt table td {    vertical-align: top;    padding: 10px 8px 5px 8px;}.privacy_prompt table tr td:first-child {    min-width: 120px;    font-weight: 600;    color: #666;}.privacy_prompt table tr td:last-child {    text-align: center;    min-width: 100px;}.privacy_prompt input[type=\"checkbox\"].toggle {    opacity: 0;    position: absolute;    left: -99999px;}.privacy_prompt input[type=\"checkbox\"].toggle + label {    height: 24px;    line-height: 24px;    background-color: #ccc;    padding: 0px 16px;    border-radius: 16px;    display: inline-block;    position: relative;    cursor: pointer;    -moz-transition: all 0.25s ease-in;    -o-transition: all 0.25s ease-in;    -webkit-transition: all 0.25s ease-in;    transition: all 0.25s ease-in;    -moz-box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);    -webkit-box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);}.privacy_prompt input[type=\"checkbox\"].toggle + label:before, .privacy_prompt input[type=\"checkbox\"].toggle + label:hover:before {  content:  \" \";     position: absolute;    top: 2px;    left: 2px;    width: 26px;    height: 20px;    background: #fff;    z-index: 2;    -moz-transition: all 0.25s ease-in;    -o-transition: all 0.25s ease-in;    -webkit-transition: all 0.25s ease-in;    transition: all 0.25s ease-in;    -moz-border-radius: 14px;    -webkit-border-radius: 14px;    border-radius: 14px;}.privacy_prompt input[type=\"checkbox\"].toggle + label .off, .privacy_prompt input[type=\"checkbox\"].toggle + label .on {    color: #fff;}.privacy_prompt input[type=\"checkbox\"].toggle + label .off {    margin-left: 20px;    display: inline-block;}.privacy_prompt input[type=\"checkbox\"].toggle + label .on {    display: none;}.privacy_prompt input[type=\"checkbox\"].toggle:checked + label .off {    display: none;}.privacy_prompt input[type=\"checkbox\"].toggle:checked + label .on {    margin-right: 20px;    display: inline-block;}.privacy_prompt input[type=\"checkbox\"].toggle:checked + label, .privacy_prompt input[type=\"checkbox\"].toggle:focus:checked + label {    background-color: #3278c0;}.privacy_prompt input[type=\"checkbox\"].toggle:checked + label:before, .privacy_prompt input[type=\"checkbox\"].toggle:checked + label:hover:before, .privacy_prompt input[type=\"checkbox\"].toggle:focus:checked + label:before, .privacy_prompt input[type=\"checkbox\"].toggle:focus:checked + label:hover:before {    background-position: 0 0;    top: 2px;    left: 100%;    margin-left: -28px;}@media (max-width: 780px) {    #__tealiumGDPRcpPrefs .privacy_prompt {        width: 90%;        left: 5%;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content .prefmessage {        float: none;        width: 100%;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content h1 {        text-align: center;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content img {        float: none;        margin: 0 auto 10px auto;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content table,    #__tealiumGDPRcpPrefs .privacy_prompt_content thead,    #__tealiumGDPRcpPrefs .privacy_prompt_content tbody,    #__tealiumGDPRcpPrefs .privacy_prompt_content th,    #__tealiumGDPRcpPrefs .privacy_prompt_content td,    #__tealiumGDPRcpPrefs .privacy_prompt_content tr {        position: relative;        height: 100%;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content table tbody tr {        display: block;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content tbody tr {        margin: 0 0 1rem 0;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content tbody tr td:first-child {        display: inline-block;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content tbody tr td:nth-child(2) {        width: 100%;        display: block;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content tbody tr td:nth-child(3) {        min-width: 0 !important;        position: absolute;        right: 0;        top: -2%;        padding-right: 0px;    }    #__tealiumGDPRcpPrefs .privacy_prompt_content tbody tr:first-child {        position: absolute;        top: -9999px;        left: -9999px;    }}";
    utag.gdpr.preferences_prompt.content.html = "<div class=\"privacy_prompt consent_preferences\">	<div class=\"privacy_prompt_content\">	    <div>    		<h1>{{title}}</h1>    	</div>    	<div>    		<img src=\"{{company_logo_url}}\" class=\"logo\">    		<p class=\"prefmessage\">{{message}}</p>    	</div>		<table>			<tr>				<th>{{category}}</th>				<th>{{description}}</th>				<th>{{status}}</th>			</tr>			<tr>				<td>{{category_analytics_title}}</td>				<td>{{category_analytics_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat1\"/>					<label for=\"toggle_cat1\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<!--tr>				<td>{{category_affiliates_title}}</td>				<td>{{category_affiliates_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat2\"/>					<label for=\"toggle_cat2\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr-->			<tr>				<td>{{category_display_ads_title}}</td>				<td>{{category_display_ads_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat3\"/>					<label for=\"toggle_cat3\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<tr>				<td>{{category_search_title}}</td>				<td>{{category_search_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat4\"/>					<label for=\"toggle_cat4\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<!--tr>				<td>{{category_email_title}}</td>				<td>{{category_email_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat5\"/>					<label for=\"toggle_cat5\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr-->			<tr>				<td>{{category_personalization_title}}</td>				<td>{{category_personalization_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat6\"/>					<label for=\"toggle_cat6\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<!--tr>				<td>{{category_social_title}}</td>				<td>{{category_social_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat7\"/>					<label for=\"toggle_cat7\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr-->			<tr>				<td>{{category_big_data_title}}</td>				<td>{{category_big_data_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat8\"/>					<label for=\"toggle_cat8\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<tr>				<td>{{category_misc_title}}</td>				<td>{{category_misc_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat9\"/>					<label for=\"toggle_cat9\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<tr>				<td>{{category_cookiematch_title}}</td>				<td>{{category_cookiematch_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat10\"/>					<label for=\"toggle_cat10\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<tr>				<td>{{category_cdp_title}}</td>				<td>{{category_cdp_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat11\"/>					<label for=\"toggle_cat11\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<!--tr>				<td>{{category_mobile_title}}</td>				<td>{{category_mobile_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat12\"/>					<label for=\"toggle_cat12\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr-->			<tr>				<td>{{category_engagement_title}}</td>				<td>{{category_engagement_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat13\"/>					<label for=\"toggle_cat13\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<tr>				<td>{{category_monitoring_title}}</td>				<td>{{category_monitoring_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat14\"/>					<label for=\"toggle_cat14\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr>			<!--tr>				<td>{{category_crm_title}}</td>				<td>{{category_crm_description}}</td>				<td>					<input type=\"checkbox\" class=\"toggle\" id=\"toggle_cat15\"/>					<label for=\"toggle_cat15\"> <span class=\"on\">{{yes}}</span> <span class=\"off\">{{no}}</span></label>				</td>			</tr-->		</table>	</div>	<div class=\"privacy_prompt_footer\">		<div id=\"preferences_prompt_submit\" class=\"button right\"> {{confirmation_button}}</div>	</div>	<div class=\"close_btn_thick\"></div></div>";
    utag.gdpr.preferences_prompt.content.js = "(function preferences_prompt(){var $el=document.getElementById(\"preferences_prompt_submit\"),$modal=document.getElementById(\"__tealiumGDPRcpPrefs\"),$closeBtn=$modal.getElementsByClassName(\"close_btn_thick\")[0],$body=$modal.getElementsByClassName(\"consent_preferences\")[0],reg_match=/\\d+$/,i;var callBack=function(){var inputs=$body.getElementsByClassName(\"toggle\"),cats={};for(var i=0;i<inputs.length;i++){var obj=inputs[i];cats[obj.id.match(reg_match)[0]]=obj.checked?1:0;}closePrompt();utag.gdpr.setPreferencesValues(cats);setTimeout(function(){if(window.utag&&window.utag.udoname||window.utag_data){utag.view(window[window.utag&&window.utag.udoname||\"utag_data\"]);}},0);};var closePrompt=function(){$modal.style.display=\"none\";};var consentState=utag.gdpr.getConsentState();if(typeof consentState===\"number\"){var _state=false;if(consentState===1||consentState===-1){_state=consentState===1;}else{_state=!!utag.gdpr.preferences_prompt.defaultState;}for(i=0;i<utag.gdpr.getCategories().length;i++){if(document.getElementById(\"toggle_cat\"+(i+1)))document.getElementById(\"toggle_cat\"+(i+1)).checked=_state;}}else{for(i=0;i<consentState.length;i++){if(consentState[i].ct!==\"1\"){continue;}if(document.getElementById(\"toggle_cat\"+(i+1)))document.getElementById(\"toggle_cat\"+(i+1)).checked=true;}}if(document.addEventListener){$el.addEventListener(\"click\",callBack,false);$closeBtn.addEventListener(\"click\",closePrompt,false);}else if(document.attachEvent){$el.attachEvent(\"click\",callBack);$closeBtn.attachEvent(\"click\",closePrompt);}else{$el.onclick=callBack;$closeBtn.onclick=closePrompt;}}());";
    utag.gdpr.preferences_prompt.defaultLang = "en";
    utag.gdpr.showConsentPreferences = function(_lang) {
        function cloneObject(source, target, depth) {
            if (depth === undefined) {
                depth = 1;
            } else if (depth === -1) {
                utag.DB("Max Clone depth exceeded, using reference");
                return source;
            }
            if (window.JSON) {
                return JSON.parse(JSON.stringify(source));
            }
            target = target || {};
            for (var prop in source) {
                if (!source.hasOwnProperty(prop)) {
                    continue;
                }
                switch (utag.gdpr.typeOf(source[prop])) {
                case "array":
                    target[prop] = source[prop].slice(0);
                    break;
                case "object":
                    target[prop] = cloneObject(source[prop], target[prop], --depth);
                    break;
                default:
                    target[prop] = source[prop];
                }
            }
            return target;
        }
        try {
            if (utag.gdpr.preferences_prompt.noShow) {
                return;
            }
            var cn = document.getElementById("__tealiumGDPRcpStyle");
            if (cn) {
                cn.parentNode.removeChild(cn);
            }
            var hn = document.getElementById("__tealiumGDPRcpPrefs");
            if (hn) {
                hn.parentNode.removeChild(hn);
            }
            var sn = document.getElementById("__tealiumGDPRcpPrefsScript");
            if (sn) {
                sn.parentNode.removeChild(sn);
            }
            var promptData = cloneObject(utag.gdpr.preferences_prompt);
            var activeCats = utag.gdpr.getCategories(true);
            var cats = '';
            var id;
            for (var i = 0; i < activeCats.length; i++) {
                id = utag.gdpr.preferences_prompt.categories[activeCats[i]].id;
                cats += '<tr><td>{{category_' + activeCats[i] + '_title}}</td><td>{{category_' + activeCats[i] + '_description}}</td><td><input type="checkbox" class="toggle" id="toggle_cat' + id + '"/><label for="toggle_cat' + id + '"> <span class="on">{{yes}}</span> <span class="off">{{no}}</span></label></td></tr>';
            }
            promptData.content.html = promptData.content.html.replace('<!--CATEGORIES-->', cats);
            var dtc = utag.gdpr.getDeTokenizedContent(promptData, _lang);
            var head = document.head || document.getElementsByTagName("head")[0]
              , style = document.createElement("style")
              , mDiv = document.createElement("div")
              , scr = document.createElement("script")
              , body = document.body || document.getElementsByTagName("body")[0];
            style.type = "text/css";
            style.id = "__tealiumGDPRcpStyle";
            if (style.styleSheet) {
                style.styleSheet.cssText = dtc.css;
            } else {
                style.appendChild(document.createTextNode(dtc.css));
            }
            head.appendChild(style);
            mDiv.innerHTML = dtc.html;
            mDiv.id = "__tealiumGDPRcpPrefs";
            body.appendChild(mDiv);
            scr.language = "javascript";
            scr.type = "text/javascript";
            scr.text = "try{" + dtc.js + "} catch(e){utag.DB(e)}";
            scr.id = "__tealiumGDPRcpPrefsScript";
            head.appendChild(scr);
        } catch (e) {
            utag.DB(e);
        }
    }
    ;
    utag.gdpr.dns = {
        tagLookup: {
            "5572": "0",
            "5575": "0",
            "5": "0",
            "10": "0",
            "4696": "0",
            "5582": "0",
            "21": "0",
            "3": "0",
            "4": "0",
            "2": "0",
            "5603": "0",
            "5667": "0",
            "11": "0",
            "4133": "0",
            "5764": "0",
            "2250": "0",
            "3940": "0",
            "3282": "0",
            "1": "1",
            "5588": "0",
            "6": "1",
            "5760": "0",
            "5308": "0",
            "24": "0",
            "7": "0",
            "3939": "0",
            "5578": "0",
            "5577": "0",
            "4180": "0",
            "5762": "0",
            "5580": "0",
            "5579": "0",
            "4871": "0",
            "5576": "0",
            "2193": "0",
            "22": "0",
            "5307": "0",
            "5322": "0",
            "9": "0",
            "4105": "1",
            "5844": "0",
            "5602": "0",
            "5387": "1",
            "8": "0",
            "5597": "0",
            "4711": "0",
            "5401": "0",
            "5761": "0"
        },
        getBlockedDnsTagLookup: function() {
            var cookie_data = utag.gdpr.getCookieValues();
            return ("true" == cookie_data["dns"]) ? utag.gdpr.dns.tagLookup : null;
        },
        getDnsState: function() {
            var cookie_data = utag.gdpr.getCookieValues();
            return cookie_data["dns"];
        },
        setDnsState: function(dnsState) {
            var valid = {
                true: "true",
                "true": "true",
                1: "true",
                false: "false",
                "false": "false",
                0: "false"
            };
            if (!valid.hasOwnProperty(dnsState)) {
                throw new Error("Invalid DNS state : " + dnsState);
            }
            var state = valid[dnsState];
            utag.gdpr.setCookieValue("dns", state);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://collect.tealiumiq.com/event");
            if (state == "true") {
                xhr.send('{"tealium_account":"tealiumlabs","tealium_profile":"' + (utag.gdpr.eventProfile || "main") + '","tealium_event":"grant_partial_consent","do_not_sell":[7110,7133,6037,3108],"consent_categories":"","policy":"ccpa", "tealium_visitor_id" : "' + utag.data['cp.utag_main_v_id'] + '"}');
            } else {
                xhr.send('{"tealium_account":"tealiumlabs","tealium_profile":"' + (utag.gdpr.eventProfile || "main") + '","tealium_event":"grant_full_consent","consent_categories":"","policy":"ccpa", "tealium_visitor_id" : "' + utag.data['cp.utag_main_v_id'] + '"}');
            }
        }
    };
    utag.gdpr.doNotSell.banner = utag.gdpr.doNotSell.banner ? utag.gdpr.doNotSell.banner : {};
    utag.gdpr.doNotSell.banner.languages = {
        "en": {
            "isDefault": "true",
            "custom_tokens": {},
            "common_tokens": {
                "cookie_statement_text": "Cookie Policy",
                "details_button": "Do not sell my personal information",
                "privacy_policy_url": "http://www.tealiumecommerce.com/privacy-policy-cookie-restriction-mode/",
                "privacy_policy_text": "CCPA Privacy Policy",
                "continue_button": "Continue",
                "cookie_statement_url": "https://tealium.com/cookie-policy/",
                "title": "CCPA: We need your data",
                "message": "This website tracks data. By clicking Continue to Site Button, you agree to our use of data. For more information, please see our privacy policy."
            }
        }
    };
    utag.gdpr.doNotSell.banner.content = utag.gdpr.doNotSell.banner.content ? utag.gdpr.doNotSell.banner.content : {};
    utag.gdpr.doNotSell.banner.content.css = "#__tealiumDNS_banner {  position: fixed;  bottom: 0px;  z-index: 9998;  color: #fff;  text-align: center;  width: 100%;}#__tealiumDNS_banner .privacy_prompt {  display: block;  text-align: left;  border-radius: 4px;  background-color: #FFF;  color: #444;  font-size: 14px;  z-index: 1000;  word-break: break-word;  box-shadow: 0px 0px 8px 6px #666;  width: 100%;  min-width: 300px;  margin: auto;}#__tealiumDNS_banner .privacy_prompt a {  text-decoration: none;  color: #0077bf;}#__tealiumDNS_banner .privacy_prompt h1 {  font-size: 1.3em;  color: #444;  font-weight: 400;}#__tealiumDNS_banner .privacy_prompt .button.right {  float: right;}#__tealiumDNS_banner .privacy_prompt > .close_btn_thick {  position: absolute;  display: block;  top: 10px;  right: 1%;  text-decoration: none;  text-shadow: 0 1px 0 #fff;  color: #777;  font: 14px/100% arial, sans-serif;  cursor: pointer;}#__tealiumDNS_banner .privacy_prompt > .close_btn_thick:after {  content: \"\\2716\";}#__tealiumDNS_banner .privacy_prompt .privacy_prompt_content {  padding: 20px;  font-size: 0.9em;  background-color: white;  margin: auto;}#__tealiumDNS_banner .privacy_prompt .privacy_prompt_footer {  padding: 0px 20px 20px 20px;  overflow: auto;}#__tealiumDNS_banner .privacy_prompt .privacy_prompt_footer a {  font-size: 0.9em;}#__tealiumDNS_banner .privacy_prompt .privacy_prompt_footer .button {  font-size: 1em;  border: 1px solid #CCC;  padding: 4px 15px;  min-width: 50px;  text-align: center;  border-radius: 4px;  background-color: #EEE;  box-shadow: inset 0px 1px 4px #ffffff;  text-shadow: 1px 1px 3px #ffffff;  color: #000;  cursor: pointer;  margin: 0 5px;}@media (max-width: 780px) {#__tealiumDNS_banner #__tealiumGDPRcpPrefs .privacy_prompt {    width: 90%;    margin: 0 auto;    left: 5%;  }  #__tealiumDNS_banner #__tealiumGDPRcpPrefs .privacy_prompt_content > .close_btn_thick {    right: 11%;  }  #__tealiumDNS_banner #__tealiumGDPRcpPrefs .privacy_prompt_content h1 {    text-align: center;  }}";
    utag.gdpr.doNotSell.banner.content.html = "<div class=\"privacy_prompt consent_doNotSell\">  <div class=\"privacy_prompt_content\">    <h1>{{title}}</h1>    <p>{{message}}</p>  <div class=\"privacy_prompt_footer\">    <div class=\"button right\" id=\"consent_doNotSell_close\">{{continue_button}}</div>    <div class=\"button right\" id=\"consent_doNotSell_button\">{{details_button}}</div>  </div>    <div>      <a href=\"{{privacy_policy_url}}\">{{privacy_policy_text}}</a>      <a href=\"{{cookie_statement_url}}\">{{cookie_statement_text}}</a>    </div>  </div>  <div class=\"close_btn_thick\"></div></div>";
    utag.gdpr.doNotSell.banner.content.js = "(function consent_doNotSell(){var $modal=document.getElementById(\"__tealiumDNS_banner\"),$dnsBtn=document.getElementById(\"consent_doNotSell_button\"),$closeBtn=document.getElementById(\"consent_doNotSell_close\"),$closeXBtn=$modal.getElementsByClassName(\"close_btn_thick\")[0];var callBack=function(){utag.gdpr.showDoNotSellPrompt();closePrompt();};var closePrompt=function(){$modal.style.display=\"none\";};var closeAndContinue=function(){closePrompt();window.utag.gdpr.dns.setDnsState(false);};if(document.addEventListener){$dnsBtn.addEventListener(\"click\",callBack,false);$closeXBtn.addEventListener(\"click\",closePrompt,false);$closeBtn.addEventListener(\"click\",closeAndContinue,false);}else if(document.attachEvent){$dnsBtn.attachEvent(\"click\",callBack);$closeXBtn.attachEvent(\"click\",closePrompt);$closeBtn.attachEvent(\"click\",closeAndContinue);}else{$dnsBtn.onclick=callBack;$closeXBtn.onclick=closePrompt;$closeBtn.onclick=closeAndContinue;}}());";
    utag.gdpr.doNotSell.defaultLang = "en";
    utag.gdpr.showDoNotSellBanner = function(_lang) {
        var styleId = "__tealiumDNSStyle_banner"
          , htmlId = "__tealiumDNS_banner"
          , scriptId = "__tealiumDNSScript_banner";
        var cn = document.getElementById(styleId);
        if (cn)
            cn.parentNode.removeChild(cn);
        var hn = document.getElementById(htmlId);
        if (hn)
            hn.parentNode.removeChild(hn);
        var sn = document.getElementById(scriptId);
        if (sn)
            sn.parentNode.removeChild(sn);
        var dtc = utag.gdpr.getDeTokenizedContent(utag.gdpr.doNotSell.banner, _lang);
        var head = document.head || document.getElementsByTagName("head")[0]
          , style = document.createElement("style")
          , mDiv = document.createElement("div")
          , scr = document.createElement("script")
          , body = document.body || document.getElementsByTagName("body")[0];
        style.type = "text/css";
        style.id = styleId;
        if (style.styleSheet) {
            style.styleSheet.cssText = dtc.css;
        } else {
            style.appendChild(document.createTextNode(dtc.css));
        }
        head.appendChild(style);
        mDiv.innerHTML = dtc.html;
        mDiv.id = htmlId;
        body.appendChild(mDiv);
        scr.language = "javascript";
        scr.type = "text/javascript";
        scr.text = "try{" + dtc.js + "} catch(e){utag.DB(e)}";
        scr.id = scriptId;
        head.appendChild(scr);
    }
    ;
    utag.gdpr.doNotSell.prompt = utag.gdpr.doNotSell.prompt ? utag.gdpr.doNotSell.prompt : {};
    utag.gdpr.doNotSell.prompt.languages = {
        "en": {
            "common_tokens": {
                "company_logo_url": "https://tealium.com/images/logo.svg",
                "message": "Text to explain what kind of data is being sold and to whom\n- List of tags",
                "title": "Privacy Settings",
                "confirmation_button": "Confirm",
                "do_not_sell_description": "Do not sell my personal information"
            },
            "custom_tokens": {},
            "isDefault": "true"
        }
    };
    utag.gdpr.doNotSell.prompt.content = utag.gdpr.doNotSell.prompt.content ? utag.gdpr.doNotSell.prompt.content : {};
    utag.gdpr.doNotSell.prompt.content.css = "#__tealiumDNS_prompt {  display: block;  position: fixed;  left: 0;  top: 0;  z-index: 9999;  width: 100%;  height: 100%;  padding-top: 5%;  background-color: black;  background-color: rgba(0, 0, 0, 0.4);  overflow: auto;}#__tealiumDNS_prompt .privacy_prompt {  display: block;  position: absolute;  width: 600px;  top: 100px;  left: 50%;  margin-left: -300px;  text-align: left;  border: 1px solid #CCC;  border-radius: 4px;  background-color: #FFF;  color: #444;  font-size: 14px;  z-index: 1000;  word-break: break-word;}#__tealiumDNS_prompt .privacy_prompt > .close_btn_thick {  position: absolute;  display: block;  top: 10px;  right: 10px;  text-decoration: none;  text-shadow: 0 1px 0 #fff;  color: #777;  font: 14px/100% arial, sans-serif;  cursor: pointer;}#__tealiumDNS_prompt #consent_doNotSell_checkbox {      margin-top: 60px;  width: 15px;  height: 15px;}#__tealiumDNS_prompt .privacy_prompt > .close_btn_thick:after {  content: \"\\2716\";}#__tealiumDNS_prompt .privacy_prompt .privacy_prompt_content {  padding: 20px;  font-size: 0.9em;  background-color: white;  margin: auto;}#__tealiumDNS_prompt .privacy_prompt .privacy_prompt_content a {  text-decoration: none;  color: #0077bf;}#__tealiumDNS_prompt .privacy_prompt .privacy_prompt_content h1 {  font-size: 1.3em;  color: #444;  font-weight: 400;}#__tealiumDNS_prompt .privacy_prompt .privacy_prompt_content img {   float: right;   width: 25%;  background-color: #3399cc; }#__tealiumDNS_prompt .privacy_prompt .privacy_prompt_footer {  padding: 0px 20px 20px 20px;  overflow: auto;}#__tealiumDNS_prompt .privacy_prompt .privacy_prompt_footer a {  font-size: 0.9em;}#__tealiumDNS_prompt .privacy_prompt .privacy_prompt_footer .button {  font-size: 1em;  border: 1px solid #CCC;  padding: 4px 15px;  min-width: 50px;  text-align: center;  border-radius: 4px;  background-color: #EEE;  box-shadow: inset 0px 1px 4px #ffffff;  text-shadow: 1px 1px 3px #ffffff;  color: #000;  cursor: pointer;}#__tealiumDNS_prompt .privacy_prompt .privacy_prompt_footer .button.right {  float: right;}@media (max-width: 780px) {  #__tealiumDNS_prompt #__tealiumGDPRcpPrefs .privacy_prompt {    width: 90%;    margin: 0 auto;    left: 5%;  }  #__tealiumDNS_prompt #__tealiumGDPRcpPrefs .privacy_prompt .privacy_prompt_content h1 {    text-align: center;  }}";
    utag.gdpr.doNotSell.prompt.content.html = "<div class=\"privacy_prompt consent_doNotSell\">    <div class=\"privacy_prompt_content\">       <h1>{{title}}</h1>       <img src=\"{{company_logo_url}}\" class=\"logo\">       <p>{{message}}</p>       <input id=\'consent_doNotSell_checkbox\' type=\'checkbox\' />       {{do_not_sell_description}}   </div>   <div class=\"privacy_prompt_footer\">       <div class=\"button right\" id=\"consent_doNotSell_submit\">{{confirmation_button}}</div>   </div>   <div class=\"close_btn_thick\"></div></div>";
    utag.gdpr.doNotSell.prompt.content.js = "(function consent_doNotSell(){var $el=document.getElementById(\"consent_doNotSell_submit\"),$modal=document.getElementById(\"__tealiumDNS_prompt\"),$closeBtn=$modal.getElementsByClassName(\"close_btn_thick\")[0],$checkBox=document.getElementById(\"consent_doNotSell_checkbox\");$checkBox.checked=(utag.gdpr.dns.getDnsState()==\"true\");var callBack=function(){utag.gdpr.dns.setDnsState($checkBox.checked);closePrompt();};var closePrompt=function(){$modal.style.display=\"none\";};if(document.addEventListener){$el.addEventListener(\"click\",callBack,false);$closeBtn.addEventListener(\"click\",closePrompt,false);}else if(document.attachEvent){$el.attachEvent(\"click\",callBack);$closeBtn.attachEvent(\"click\",closePrompt);}else{$el.onclick=callBack;$closeBtn.onclick=closePrompt;}}());";
    utag.gdpr.doNotSell.defaultLang = "en";
    utag.gdpr.showDoNotSellPrompt = function(_lang) {
        var styleId = "__tealiumDNSStyle_prompt"
          , htmlId = "__tealiumDNS_prompt"
          , scriptId = "__tealiumDNSScript_prompt";
        var cn = document.getElementById(styleId);
        if (cn)
            cn.parentNode.removeChild(cn);
        var hn = document.getElementById(htmlId);
        if (hn)
            hn.parentNode.removeChild(hn);
        var sn = document.getElementById(scriptId);
        if (sn)
            sn.parentNode.removeChild(sn);
        var dtc = utag.gdpr.getDeTokenizedContent(utag.gdpr.doNotSell.prompt, _lang);
        var head = document.head || document.getElementsByTagName("head")[0]
          , style = document.createElement("style")
          , mDiv = document.createElement("div")
          , scr = document.createElement("script")
          , body = document.body || document.getElementsByTagName("body")[0];
        style.type = "text/css";
        style.id = styleId;
        if (style.styleSheet) {
            style.styleSheet.cssText = dtc.css;
        } else {
            style.appendChild(document.createTextNode(dtc.css));
        }
        head.appendChild(style);
        mDiv.innerHTML = dtc.html;
        mDiv.id = htmlId;
        body.appendChild(mDiv);
        scr.language = "javascript";
        scr.type = "text/javascript";
        scr.text = "try{" + dtc.js + "} catch(e){utag.DB(e)}";
        scr.id = scriptId;
        head.appendChild(scr);
    }
    ;
    utag.track_old = utag.track;
    utag.track = function(a, b, c, d) {
        if (typeof a == "string")
            a = {
                event: a,
                data: b,
                cfg: {
                    cb: c,
                    uids: d
                }
            };
        if (a.event === "update_consent_cookie" && b.consent_categories) {
            utag.gdpr.updateConsentCookie(b.consent_categories);
        } else if (a.event === "set_dns_state" && typeof b.do_not_sell !== 'undefined') {
            utag.gdpr.dns.setDnsState(b.do_not_sell);
        } else {
            if (utag.gdpr.getConsentState() === 0) {
                if (!utag.gdpr.noqueue)
                    utag.gdpr.queue.push({
                        event: a.event,
                        data: utag.handler.C(a.data),
                        cfg: utag.handler.C(a.cfg)
                    });
            }
            if (a.cfg && a.cfg.uids) {
                var uids = [];
                for (var i = 0; i < a.cfg.uids.length; i++) {
                    if (!utag.gdpr.shouldBlockTag(a.cfg.uids[i])) {
                        uids.push(a.cfg.uids[i]);
                    }
                }
                a.cfg.uids = uids;
            }
            return utag.track_old.apply(this, arguments);
        }
    }
    ;
    utag.loader.OU_old = utag.loader.OU;
    utag.loader.OU = function(tid) {
        try {
            utag.gdpr.applyConsentState();
        } catch (e) {
            utag.DB(e);
        }
    }
    ;
    if (utag.gdpr.preferences_prompt.single_cookie) {
        window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
        utag.loader.SC("utag_main", null, "da");
        window.utag_cfg_ovrd.nocookie = true;
    }
    if (!utag.gdpr.consent_prompt.isEnabled && !utag.gdpr.doNotSell.isEnabled && utag.gdpr.getConsentState() == 0) {
        utag.gdpr.setAllCategories(utag.gdpr.preferences_prompt.defaultState, !0);
    }
    class TealiumConsentRegister {
        constructor() {
            this.currentDecision = null;
            this.decisions = [];
        }
        addConsentDecision(decision) {
            if (!decision || (decision.type !== 'implicit' && decision.type !== 'explicit')) {
                return;
            }
            if (!this.isNewDecision(this.currentDecision, decision)) {
                return;
            }
            const eventType = this.currentDecision === null ? 'consent_loaded' : 'consent_updated';
            this.currentDecision = decision;
            this.decisions.push(decision);
            const event = new CustomEvent(eventType,{
                detail: {
                    decision: decision
                }
            });
            window.dispatchEvent(event);
        }
        getCurrentDecision() {
            return this.currentDecision;
        }
        getAllDecisions() {
            return this.decisions;
        }
        isNewDecision(desc1, desc2) {
            if (!desc1 || !desc2 || desc1.length !== desc2.length || desc1.type !== desc2.type)
                return true;
            for (let i = 0; i < desc1.length; i++) {
                if (desc1[i] !== desc2[i]) {
                    return true;
                }
            }
            return false;
        }
    }
    window.tealiumConsentRegister = window.tealiumConsentRegister || new TealiumConsentRegister();
    if (typeof utag_cfg_ovrd != 'undefined') {
        for (utag._i in utag.loader.GV(utag_cfg_ovrd))
            utag.cfg[utag._i] = utag_cfg_ovrd[utag._i]
    }
    ;utag.loader.PINIT = function(a, b, c) {
        utag.DB("Pre-INIT");
        if (utag.cfg.noload) {
            return;
        }
        try {
            this.GET();
            if (utag.handler.RE('view', utag.data, "blr")) {
                utag.handler.LR(utag.data);
            }
        } catch (e) {
            utag.DB(e)
        }
        ;a = this.cfg;
        c = 0;
        for (b in this.GV(a)) {
            if (a[b].block == 1 || (a[b].load > 0 && (typeof a[b].src != 'undefined' && a[b].src != ''))) {
                a[b].block = 1;
                c = 1;
                this.bq[b] = 1;
            }
        }
        if (c == 1) {
            for (b in this.GV(a)) {
                if (a[b].block) {
                    a[b].id = b;
                    if (a[b].load == 4)
                        a[b].load = 1;
                    a[b].cb = function() {
                        var d = this.uid;
                        utag.loader.cfg[d].cbf = 1;
                        utag.loader.LOAD(d)
                    }
                    ;
                    this.AS(a[b]);
                }
            }
        }
        if (c == 0)
            this.INIT();
    }
    ;
    utag.loader.INIT = function(a, b, c, d, e) {
        utag.DB('utag.loader.INIT');
        if (this.ol == 1)
            return -1;
        else
            this.ol = 1;
        if (utag.cfg.noview != true)
            utag.handler.RE('view', utag.data, "alr");
        utag.rpt.ts['i'] = new Date();
        d = this.cfgsort;
        for (a = 0; a < d.length; a++) {
            e = d[a];
            b = this.cfg[e];
            b.id = e;
            if (b.block != 1) {
                if (utag.loader.bk[b.id] || ((utag.cfg.readywait || utag.cfg.noview) && b.load == 4)) {
                    this.f[b.id] = 0;
                    utag.loader.LOAD(b.id)
                } else if (b.wait == 1 && utag.loader.rf == 0) {
                    utag.DB('utag.loader.INIT: waiting ' + b.id);
                    this.wq.push(b)
                    this.f[b.id] = 2;
                } else if (b.load > 0) {
                    utag.DB('utag.loader.INIT: loading ' + b.id);
                    this.lq.push(b);
                    this.AS(b);
                }
            }
        }
        if (this.wq.length > 0)
            utag.loader.EV('', 'ready', function(a) {
                if (utag.loader.rf == 0) {
                    utag.DB('READY:utag.loader.wq');
                    utag.loader.rf = 1;
                    utag.loader.WQ();
                }
            });
        else if (this.lq.length > 0)
            utag.loader.rf = 1;
        else if (this.lq.length == 0)
            utag.loader.END();
        return 1
    }
    ;
    utag.loader.EV('', 'ready', function(a) {
        if (utag.loader.efr != 1) {
            utag.loader.efr = 1;
            try {
                if (utag.cfg.readywait || utag.cfg.waittimer) {
                    utag.loader.EV("", "ready", function() {
                        setTimeout(function() {
                            utag.gdpr.promptEnabledSetting();
                            cmExplicitDomReady();
                            cmDNSDomReady();
                        }, utag.cfg.waittimer || 1);
                    });
                } else {
                    utag.gdpr.promptEnabledSetting();
                    cmExplicitDomReady();
                    cmDNSDomReady();
                }
                function cmExplicitDomReady() {
                    try {
                        if (utag.gdpr.consent_prompt.isEnabled) {
                            if (!utag.gdpr.consent_prompt.noShow) {
                                if (!utag.gdpr.getConsentState()) {
                                    utag.gdpr.showExplicitConsent();
                                }
                            }
                        }
                    } catch (e) {
                        utag.DB(e);
                    }
                }
                function cmDNSDomReady() {
                    try {
                        if (utag.gdpr.doNotSell.isEnabled) {
                            if (!utag.gdpr.doNotSell.noShow) {
                                if (!utag.gdpr.dns.getDnsState()) {
                                    utag.gdpr.showDoNotSellBanner();
                                }
                            }
                        }
                    } catch (e) {
                        utag.DB(e);
                    }
                }
            } catch (e) {
                utag.DB(e);
            }
            try {
                try {
                    if (1) {
                        var noticeContainer = document.createElement('div');
                        noticeContainer.id = 'notice-container';
                        noticeContainer.style.cssText = 'background-color: orange; color: black; width: 100%; padding: 10px 20px; text-align: center; border-top: 4px solid white; position: fixed; bottom:0px; z-index:999999;';
                        var noticeP = document.createElement('p');
                        noticeP.style.cssText = 'font-size:12px;line-height:16px;margin-bottom:0;text-align:left;';
                        var noticeText = 'ATTENTION: This Website is for training and demonstration purposes only. It is not intended to be a live production website and the privacy notices we provide in our live websites do not apply to this website.';
                        var br = document.createElement('br');
                        var bri = document.createElement('br');
                        var moreText = 'If you provide your personal data during the training or demonstrations, we will collect and store your personal information as part of the training and demonstration functions of the website. This information will be used solely to provide the training and demonstrations and for no other purposes. It is possible that some third party technology is implemented as part of this website. Such third-party technology may collect and store the information provided by you. We recommend that you do not provide any personal information to us in your use of this website. However, if you do participate in the training or demonstrations of this website, the information you provide is solely in your discretion and at your own risk. If you do not wish to participate please do not use this website.';
                        var notice = document.createTextNode(noticeText);
                        var secondP = document.createTextNode(moreText);
                        var parentEl = document.body;
                        var pageUrl = window.location.href;
                        var referenceEl;
                        if (pageUrl.indexOf('fiserv') > -1) {
                            referenceEl = document.querySelector('div.wrapper');
                        } else if (pageUrl.indexOf('ecommerce') > -1) {
                            referenceEl = document.querySelector('div.wrapper');
                        } else if (pageUrl.indexOf('media') > -1) {
                            referenceEl = document.querySelector('div.wraper');
                        } else if (pageUrl.indexOf('lead') > -1) {
                            referenceEl = document.querySelector('header.banner');
                        } else if (pageUrl.indexOf('travel') > -1) {
                            referenceEl = document.querySelector('div#page');
                        } else if (pageUrl.indexOf('gtm') > -1) {
                            referenceEl = document.querySelector('div.body-wrap');
                        } else if (pageUrl.indexOf('react') > -1) {
                            referenceEl = document.querySelector('div#container');
                        } else if (pageUrl.indexOf('amp') > -1) {
                            referenceEl = document.querySelector('#sidebar');
                            document.querySelector('nav.navbar').style.position = 'unset';
                            document.querySelector('a[data-vars-nav-category="articleone-category"]').style.display = 'none';
                        } else {
                            console.log('no url match');
                        }
                        noticeP.appendChild(notice);
                        noticeP.appendChild(br);
                        noticeP.appendChild(bri);
                        noticeP.appendChild(secondP);
                        noticeContainer.appendChild(noticeP);
                        parentEl.insertBefore(noticeContainer, referenceEl);
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (1) {
                        console.log('Moments API LS Check // VIP Check and Sticky Promo Banner Code');
                        if (localStorage.getItem('visitor_loyalty_status') === 'VIP') {
                            showPromoBanner();
                        }
                        if (window.location.pathname == "/checkout/onepage/" || '/checkout/onepage/index/') {
                            console.log('Moments API // On Checkout Page');
                            function handleCheckoutButtonClick(event) {
                                console.log("Moments API // Place Order Button clicked", event);
                                utag.link({
                                    tealium_event: 'before_purchase',
                                    cart_subtotal: utag.data['cp.cart_subtotal']
                                });
                            }
                            const observer = new MutationObserver( (mutationsList, observer) => {
                                mutationsList.forEach( (mutation) => {
                                    mutation.addedNodes.forEach( (node) => {
                                        if (node.nodeType === Node.ELEMENT_NODE) {
                                            const checkoutBtn = node.querySelector('button.button.btn-checkout');
                                            if (checkoutBtn) {
                                                checkoutBtn.addEventListener('click', handleCheckoutButtonClick);
                                                console.log('Moments API // Place Order Button On Page', checkoutBtn);
                                            }
                                        }
                                    }
                                    );
                                }
                                );
                            }
                            );
                            observer.observe(document.body, {
                                childList: true,
                                subtree: true
                            });
                        }
                        function showPromoBanner() {
                            const css = `#mapi-promo-banner{width:100%;height:40px;background-color:black;margin-bottom:5px;padding:10px;border-bottom:1px solid#e6e6e6;}
.sticky{position:fixed;top:0;width:100%;z-index:999999;box-shadow:0px 5px 15px 0px rgba(0,0,0,0.5);}`;
                            const targetElement = document.querySelector("header#header");
                            const promoBanner = document.createElement("div");
                            const promoText = document.createElement("p");
                            const head = document.head || document.getElementsByTagName('head')[0];
                            styleTag = document.createElement('style');
                            styleTag.type = 'text/css';
                            head.appendChild(styleTag);
                            styleTag.appendChild(document.createTextNode(css));
                            promoText.innerHTML = '&starf; Welcome back VIP! Use code: <u>FREESHIP</u> for Free Shipping on All Orders! &starf;';
                            promoText.style.color = "white";
                            promoText.style.textAlign = "center";
                            promoBanner.id = "mapi-promo-banner";
                            promoBanner.appendChild(promoText);
                            if (targetElement) {
                                targetElement.parentNode.insertBefore(promoBanner, targetElement);
                                console.log("VIP Checkout Banner inserted before the checkout button");
                                window.onscroll = function() {
                                    stickyHeader()
                                }
                                ;
                            } else {
                                console.log("targetElement not found");
                            }
                            function stickyHeader() {
                                if (window.scrollY > 40) {
                                    promoBanner.classList.add("sticky");
                                } else {
                                    promoBanner.classList.remove("sticky");
                                }
                            }
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (utag.data['page_name'].toString().toLowerCase().indexOf('Home'.toLowerCase()) > -1) {
                        const favoritekey = "moments_25dc6de0-6c04-4e8d-82aa-53235b2d2a15_properties";
                        var containsMomentsFavorite = false;
                        function visitorFavoriteCheck(key, valueToCheck) {
                            if (localStorage.getItem(key)) {
                                const storedValue = JSON.parse(localStorage.getItem(key));
                                for (const [key,value] of Object.entries(storedValue)) {
                                    if (key === "Favorite Product (favorite)" && value === "Bowery Chino Pants") {
                                        console.log("Moments API LS Check // localStorage contains favorite: ", valueToCheck);
                                        containsMomentsFavorite = true;
                                        return true;
                                    }
                                }
                                return false;
                            } else {
                                console.log("Moments API LS Check // localStorage does NOT contain favorite");
                                containsMomentsFavorite = false;
                                return false;
                            }
                        }
                        const checkForFavorite = {
                            "Favorite Product (favorite)": "Bowery Chino Pants"
                        };
                        visitorFavoriteCheck(favoritekey, checkForFavorite);
                        if (containsMomentsFavorite === true) {
                            console.log("Moments API LS Check // Visitor has favorite - trying to add a banner ... ");
                            const anchor = document.createElement("a");
                            anchor.href = "https://ecommerce.tealiumdemo.com/men/bowery-chino-pants.html";
                            const imgDiv = document.createElement("div");
                            imgDiv.style.backgroundImage = 'url(https://s3.amazonaws.com/tealiumdemo.com/assets/bower-chino-banner-160h.jpg)';
                            imgDiv.style.backgroundSize = 'contain';
                            imgDiv.style.backgroundPosition = 'center';
                            imgDiv.style.backgroundRepeat = 'no-repeat';
                            imgDiv.style.width = "100%";
                            imgDiv.style.minHeight = "160px";
                            imgDiv.style.height = "auto";
                            imgDiv.style.marginBottom = "10px";
                            anchor.appendChild(imgDiv);
                            const slideshowContainer = document.querySelector("div.slideshow-container");
                            if (slideshowContainer) {
                                slideshowContainer.parentNode.insertBefore(anchor, slideshowContainer);
                                document.querySelector(".slideshow-container .slideshow").style.border = "none";
                                console.log("Anchor and image tag inserted before the slideshow container");
                            } else {
                                console.log("Slideshow container not found");
                            }
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (typeof utag.data['occasion'] != 'undefined' && utag.data['occasion'] != '') {
                        var occasion = utag.data.occasion
                          , occasionMap = {
                            "Evening": "29",
                            "Career": "30",
                            "Casual": "31"
                        };
                        if (occasion) {
                            var allLinks = document.querySelectorAll('#nav a');
                            allLinks.forEach(function(link) {
                                var url = new URL(link.href);
                                url.searchParams.set('occasion', occasionMap[occasion]);
                                link.href = url;
                            });
                        }
                        var closeBtn = document.querySelector('div.currently > ol > li > a');
                        closeBtn.addEventListener('mouseup', function(event) {
                            sessionStorage.removeItem('moments_answer_5667');
                        }, false);
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (1) {
                        ;(function(d, u) {
                            d.getElementById('newsletter-validate-detail').addEventListener('submit', function() {
                                var attr1 = u.data.page_name
                                  , _customer_email_non_encrypted = d.getElementById('newsletter').value;
                                utag.link({
                                    "event_target": "Newsletter",
                                    "event_type": "submit",
                                    "event_attr1": attr1,
                                    "ga_event_name": "sign_up",
                                    "tealium_event": "sign_up_newsletter",
                                    "_customer_email_non_encrypted": _customer_email_non_encrypted
                                });
                            });
                        }
                        )(document, utag);
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (utag.data['page_name'].toString().toLowerCase() == 'contact us'.toLowerCase()) {
                        jQuery('button[title="Submit"]').on('click', function() {
                            utag.link({
                                "contact_email": jQuery('#email').val(),
                                "comment": jQuery('#comment').val(),
                                "name": jQuery('#name').val(),
                                "contact_phone": jQuery('#telephone').val()
                            }, null, [11])
                        });
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (utag.data['dom.url'].toString().indexOf('/checkout/onepage/') > -1) {
                        jQuery('#billing-buttons-container button.button:nth-child(1)').click(function(e) {
                            vid = jQuery('input.input-text.validate-email.required-entry.validation-passed').val();
                            utag.link({
                                '_customer_email': vid,
                                '_customer_email_non_encrypted': vid,
                                'tealium_event': 'checkout'
                            });
                            e.stopPropagation();
                        });
                        jQuery('#login-form+ div.buttons-set button.button').click(function(e) {
                            vid = jQuery('#login-email').val();
                            utag.link({
                                '_customer_email': vid,
                                '_customer_email_non_encrypted': vid,
                                'tealium_event': 'checkout'
                            })
                            e.stopPropagation();
                        });
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                if (typeof utag.runonce == 'undefined')
                    utag.runonce = {};
                utag.jdh = function(h, i, j, k) {
                    h = utag.jdhc.length;
                    if (h == 0)
                        window.clearInterval(utag.jdhi);
                    else {
                        for (i = 0; i < h; i++) {
                            j = utag.jdhc[i];
                            k = jQuery(j.i).is(":visible") ? 1 : 0;
                            if (k != j.s) {
                                if (j.e == (j.s = k))
                                    jQuery(j.i).trigger(j.e ? "afterShow" : "afterHide")
                            }
                        }
                    }
                }
                ;
                utag.jdhi = window.setInterval(utag.jdh, 250);
                utag.jdhc = [];
                if (1) {
                    if (typeof utag.runonce[2] == 'undefined') {
                        utag.runonce[2] = 1;
                        jQuery(document.body).on('click', 'button.button.btn-cart', function(e) {
                            utag.link({
                                "event_target": 'Add To Cart',
                                "event_type": 'Button',
                                "enh_action": 'add',
                                "product_name": utag.data['product_name'],
                                "product_id": utag.data['product_id'],
                                "product_list_price": utag.data['product_list_price'],
                                "product_quantity": [jQuery(".product-shop #qty").val()],
                                "ga_event_name": 'add_to_cart',
                                "product_category": utag.data['product_category'],
                                "product_brand": utag.data['product_brand'],
                                "ut.event": 'link',
                                "tealium_event": 'add_to_cart'
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                if (utag.data['dom.url'].toString().toLowerCase().indexOf('/checkout/cart/'.toLowerCase()) > -1) {
                    if (typeof utag.runonce[1509] == 'undefined') {
                        utag.runonce[1509] = 1;
                        jQuery(document.body).on('mousedown', 'a.btn-remove', function(e) {
                            utag.link({
                                "event_target": 'Remove From Cart',
                                "event_type": 'Button',
                                "tealium_event": 'cart_remove',
                                "product_sku": jQuery("#shopping-cart-table td.product-cart-remove a").parent().prev().prev().prev().prev().find("div.product-cart-sku").text().trim().replace("SKU: ", ""),
                                "product_name": jQuery("#shopping-cart-table td.product-cart-remove a").parent().prev().prev().prev().prev().find("h2.product-name a").text(),
                                "product_unit_price": jQuery("#shopping-cart-table td.product-cart-remove a").parent().prev().prev().prev().find("span.price").text().replace("$", ""),
                                "product_quantity": jQuery("#shopping-cart-table td.product-cart-remove a").parent().prev().prev().children("input[name *='cart']").val(),
                                "ga_event_name": 'remove_from_cart',
                                "ut.event": 'link'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                if (1) {
                    if (typeof utag.runonce[1657] == 'undefined') {
                        utag.runonce[1657] = 1;
                        jQuery(document.body).on('mousedown', '.account-create form button.button', function(e) {
                            utag.link({
                                "customer_first_name": jQuery("#firstname").val(),
                                "customer_last_name": jQuery("#lastname").val(),
                                "tealium_event": 'create_account'
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                if (1) {
                    if (typeof utag.runonce[2298] == 'undefined') {
                        utag.runonce[2298] = 1;
                        jQuery(document.body).on('click', '.social-media', function(e) {
                            utag.link({
                                "ga_event_name": 'social_share',
                                "event_name": 'social_share',
                                "tealium_event": 'social_share'
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if (utag.data['dom.url'].toString().indexOf('vip') > -1) {
                        utag.ut.loader({
                            src: utag.cfg.path + 'utag.modalExt_2312.js?utv=' + utag.cfg.v,
                            cb: function() {
                                utag.extn.mdlW.load();
                            }
                        });
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if ((utag.cond[2])) {
                        (function(cssSelector, runOnce, percentVisible, minimumDuration, trackingEvent) {
                            var elements;
                            try {
                                elements = document.querySelectorAll(cssSelector);
                            } catch (e) {
                                elements = [];
                                if (utag && utag.DB) {
                                    utag.DB(e);
                                } else {
                                    console.log(e);
                                }
                            }
                            numTrackedElements = elements.length,
                            refreshIntervalId = 0,
                            firedAlways = [],
                            firedOnce = [];
                            var data = {
                                "tealium_event": "view_last_item_product_grid",
                                "iq_event_id": "element_visibility_events_2376",
                            };
                            function triggerEvent() {
                                var visibilityData = {
                                    percent_visible: percentVisible,
                                    duration: minimumDuration
                                };
                                utag.ut.merge(visibilityData, data, true);
                                utag.track(trackingEvent, visibilityData);
                            }
                            function onIntersection(entries) {
                                entries.forEach(el => {
                                    if (el.isIntersecting) {
                                        el.target.dataset.lastViewStarted = el.time;
                                        el.target.dataset.visible = true;
                                    } else {
                                        el.target.dataset.visible = false;
                                        el.target.dataset.lastViewStarted = 0;
                                        el.target.dataset.totalViewTime = 0;
                                        if (!runOnce) {
                                            firedAlways.splice(firedAlways.indexOf(data.iq_event_id), 1);
                                        }
                                    }
                                }
                                );
                            }
                            var observer = new IntersectionObserver(onIntersection,{
                                root: null,
                                threshold: percentVisible / 100
                            });
                            for (var i = 0; i < elements.length; i++) {
                                observer.observe(elements[i]);
                            }
                            function updateTimer(el) {
                                var lastStarted = el.dataset.lastViewStarted;
                                var curTime = performance.now();
                                if (lastStarted) {
                                    var diff = curTime - lastStarted;
                                    el.dataset.totalViewTime = parseFloat(el.dataset.totalViewTime || 0) + diff;
                                    if (el.dataset.totalViewTime >= (minimumDuration * 1000)) {
                                        if (runOnce && firedOnce.indexOf(data.iq_event_id) === -1) {
                                            triggerEvent();
                                            firedOnce.push(data.iq_event_id);
                                        } else if (!runOnce && firedAlways.indexOf(data.iq_event_id) === -1) {
                                            triggerEvent();
                                            firedAlways.push(data.iq_event_id);
                                        }
                                    }
                                }
                                el.dataset.lastViewStarted = curTime;
                            }
                            function handleRefreshInterval() {
                                for (var i = 0; i < elements.length; i++) {
                                    if (elements[i].dataset.visible === "true") {
                                        updateTimer(elements[i]);
                                    }
                                    ;
                                }
                            }
                            refreshIntervalId = window.setInterval(handleRefreshInterval, 500);
                        }
                        )(".products-grid .item:last-child > a", false, 100, 2, "link");
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if ((utag.cond[2])) {
                        (function(vertMilestones, vertUnits, horizMilestones, horizUnits, cssSelector, trackingEvent) {
                            try {
                                var vertMilestonesTracking = vertMilestones.reduce(function(obj, key) {
                                    obj[key] = false;
                                    return obj;
                                }, {}), horizMilestonesTracking = horizMilestones.reduce(function(obj, key) {
                                    obj[key] = false;
                                    return obj;
                                }, {}), initialYOffset, initialXOffset, supportsPassive = false, element, totalHeight, totalWidth;
                                try {
                                    var opts = Object.defineProperty({}, "passive", {
                                        get: function() {
                                            supportsPassive = true;
                                        }
                                    });
                                    window.addEventListener("testPassive", null, opts);
                                    window.removeEventListener("testPassive", null, opts);
                                } catch (e) {
                                    if (utag && utag.DB) {
                                        utag.DB(e);
                                    } else {
                                        console.log(e);
                                    }
                                }
                                element = cssSelector ? document.querySelector(cssSelector) : document;
                                initialYOffset = cssSelector ? element.scrollTop : window.pageYOffset;
                                initialXOffset = cssSelector ? element.scrollLeft : window.pageXOffset;
                                totalHeight = cssSelector ? element.scrollHeight : document.body.scrollHeight;
                                totalWidth = cssSelector ? element.scrollWidth : document.body.scrollWidth;
                                element.addEventListener("scroll", function tealiumScrollCb(event) {
                                    var viewportHeight = cssSelector ? element.offsetHeight : innerHeight, viewportWidth = cssSelector ? element.offsetWidth : innerWidth, viewportTop = cssSelector ? element.scrollTop : window.pageYOffset, viewportBottom = viewportHeight + viewportTop, viewportLeft = cssSelector ? element.scrollLeft : window.pageXOffset, viewportRight = viewportWidth + viewportLeft, vertPercentScrolled = viewportBottom / totalHeight * 100, horizPercentScrolled = viewportRight / totalWidth * 100, scrollData;
                                    if (viewportTop > initialYOffset) {
                                        vertMilestones.forEach(function(milestone) {
                                            if (!vertMilestonesTracking[milestone]) {
                                                if ((vertUnits === "pixels" && viewportBottom >= milestone) || (vertUnits === "percent" && vertPercentScrolled >= milestone)) {
                                                    vertMilestonesTracking[milestone] = true;
                                                    scrollData = {
                                                        scroll_depth: milestone,
                                                        scroll_direction: "vertical",
                                                        scroll_depth_type: vertUnits
                                                    };
                                                    var data = {
                                                        "tealium_event": "scroll_100",
                                                        "iq_event_id": "scroll_depth_events_2372",
                                                    };
                                                    utag.ut.merge(scrollData, data, true);
                                                    utag.track(trackingEvent, scrollData);
                                                }
                                            }
                                        });
                                    }
                                    if (viewportLeft > initialXOffset) {
                                        horizMilestones.forEach(function(milestone) {
                                            if (!horizMilestonesTracking[milestone]) {
                                                if ((horizUnits === "pixels" && viewportRight >= milestone) || (horizUnits === "percent" && horizPercentScrolled >= milestone)) {
                                                    horizMilestonesTracking[milestone] = true;
                                                    scrollData = {
                                                        scroll_depth: milestone,
                                                        scroll_direction: "horizontal",
                                                        scroll_depth_type: horizUnits
                                                    };
                                                    var data = {
                                                        "tealium_event": "scroll_100",
                                                        "iq_event_id": "scroll_depth_events_2372",
                                                    };
                                                    utag.ut.merge(scrollData, data, true);
                                                    utag.track(trackingEvent, scrollData);
                                                }
                                            }
                                        });
                                    }
                                }, supportsPassive ? {
                                    passive: true
                                } : false);
                            } catch (error) {
                                if (utag && utag.DB) {
                                    utag.DB(error);
                                } else {
                                    console.log(error);
                                }
                            }
                        }
                        )([100], "percent", [], "percent", "", "link");
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                try {
                    if ((utag.cond[10])) {
                        (function(cssSelector, runOnce, trackingEvent, dataLayer) {
                            document.body.addEventListener("click", function tealiumMeCb(event) {
                                try {
                                    var element = event.target;
                                    if (cssSelector) {
                                        if (element.matches(cssSelector)) {
                                            tealiumToCb(event, element);
                                        }
                                    } else {
                                        tealiumToCb(event, element);
                                    }
                                    function tealiumToCb(event, element) {
                                        var data = {
                                            "tealium_event": "click_vip_modal_close",
                                            "iq_event_id": "dom_events_2375",
                                        };
                                        if (runOnce) {
                                            document.body.removeEventListener("click", tealiumMeCb);
                                        }
                                        utag.track(trackingEvent, data);
                                    }
                                    ;
                                } catch (e) {
                                    utag.DB(e);
                                }
                            });
                        }
                        )("#_tealiumModalClose", false, "link");
                    }
                } catch (e) {
                    utag.DB(e)
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
        }
    })
    if (utag.cfg.readywait || utag.cfg.waittimer) {
        utag.loader.EV('', 'ready', function(a) {
            if (utag.loader.rf == 0) {
                utag.loader.rf = 1;
                utag.cfg.readywait = 1;
                utag.DB('READY:utag.cfg.readywait');
                setTimeout(function() {
                    utag.loader.PINIT()
                }, utag.cfg.waittimer || 1);
            }
        })
    } else {
        utag.loader.PINIT()
    }
}
