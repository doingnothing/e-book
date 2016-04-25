var data = require('./data/computer.json');

console.log(data.length);
var a = {};
var b = [];

data.map(function (ele) {
    var rate = ele.price;
    if (a[rate]) {
        a[rate] += 1;
    } else {
        a[rate] = 1;
    }
    //if (ele.tags) {
    //    ele.tags.map(function (tag) {
    //        if (typeof a[tag] === 'undefined') {
    //            a[tag] = 0;
    //        }
    //        a[tag] += 1;
    //    })
    //}
});

for (var key in a) {
    if (a.hasOwnProperty(key)) {
        value = a[key];
        if (value > 10) {
            b.push([key, value]);
        }
    }
}

var c = b.sort(function (a, b) {
    return b[1] - a[1];
});
console.log(c);