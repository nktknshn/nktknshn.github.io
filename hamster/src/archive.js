
var ArchiveJsRequest = function () {
    this.responseType = "text";
};

ArchiveJsRequest.DONE = 4;

ArchiveJsRequest.prototype.open = function (e, r) {
    this.url = r;
};

ArchiveJsRequest.prototype.send = function () {
    var e = function () {
        var e,
            r,
            n = function () {
                var n = (new Date()).getTime();
                console.log(t.url + ": decode " + (r - e) + " ms, onload() " + (n - r) + " ms");
            },
            t = this;
        if ("undefined" == typeof ARCHIVEJS_DATA) {
            console.warn("⚠️⚠️⚠️ DefoldGames_archive.js is not loaded.");
            t.onerror();
        } else if (ARCHIVEJS_DATA[t.url]) {
            var o = ARCHIVEJS_DATA[t.url];
            t.readyState = 4;
            t.status = 200;
            e = (new Date()).getTime();
            var s = B64_Len(o[1]),
                a = new Uint8Array(o[0]),
                i = 0,
                u = new fzstd.Decompress(function (e, s) {
                    a.set(e, i);
                    i += e.byteLength;
                    t.onprogress({ lengthComputable: !0, total: o[0], loaded: i });
                    if (i == o[0]) {
                        delete ARCHIVEJS_DATA[t.url];
                        if ("text" == t.responseType || "json" == t.responseType) {
                            ArrayBuffer_ToString(a, function (e) {
                                t.response = e;
                                r = (new Date()).getTime();
                                t.onload();
                                n();
                            });
                        } else {
                            t.response = a;
                            r = (new Date()).getTime();
                            t.onload();
                            n();
                        }
                    }
                }),
                f = 33333,
                l = 0,
                d = function () {
                    f = Math.min(s - l, f);
                    u.push(B64_U8(o[1], l, f));
                    (l += f) == s ? u.push(new Uint8Array(0), !0) : setTimeout(d, 0);
                };
            setTimeout(d, 0);
        } else {
            console.warn("⚠️⚠️⚠️ " + t.url + ": not found");
            t.onerror();
        }
    }.bind(this);
    
    "undefined" != typeof ARCHIVEJS_DATA ? setTimeout(e, 0) : window.addEventListener("load", e);
};
