var fs = require("fs");
//var j0 = require("./0.json");
//var subs = j0.sub;
//var len = subs.length;
//
//for (var i = 1; i <= len; i = i + 1) {
//    subs[i] = require("./" + i + ".json");
//}
//fs.write("./00.json", JSON.stringify(j0), "w");

var data = require("./data.json");
var d = [];
var at = 0;
for (var i = 0, len = data.sub.length; i < len; i = i + 1) {
    var a = data.sub[i];
    for (var j = 0, len1 = a.sub.length; j < len1; j = j + 1) {
        var b = a.sub[j];
        d[at] = {
            name: a.name + "|" + b.name,
            count: b.count,
            num: b.num,
            url: b.url.slice(0, b.url.indexOf("-") + 1)
        };
        at = at + 1;
    }
}
fs.write("./d.json", JSON.stringify(d), "w");
phantom.exit();