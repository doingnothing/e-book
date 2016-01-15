var fs = require("fs");

var data = require("./data/computer.json");
var o = [];
for (var i = 0, len = data.length; i < len; i = i + 1) {
    var data1 = data[i];
    for (var j = 0, len1 = data1.length; j < len1; j = j + 1) {
        o.push(data1[j]);
    }
}
fs.write("./o.json", JSON.stringify(o), "w");