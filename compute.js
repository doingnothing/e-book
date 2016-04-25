var data = require('./data/computer');

var a1 = 0, a2 = 0, a3 = 0;
var len = data.length;
data.map(function (ele, index) {
    a1 += (ele.price / ele.oldPrice);
    a2 += (ele.oldPrice / ele.paperPrice);
    a3 += (ele.price / ele.paperPrice);
});
//var sort = function (a) {
//    return a.sort(function (a, b) {
//        return a - b;
//    });
//};
//a1 = sort(a1);
//a2 = sort(a2);
//a3 = sort(a3);
//
//var get = function (a1) {
//    var at, b1;
//    //console.log(JSON.stringify(a1));
//    if (len % 2 == 0) {
//        at = len / 2;
//        console.log(a1[at], a1[at + 1]);
//        b1 = (a1[at] + a1[at + 1]) / 2;
//    } else {
//        at = (len + 1) / 2;
//        console.log(a1[at], a1[at + 1]);
//        b1 = a1[at];
//    }
//    return b1;
//};

var get = function (a1) {
    return a1 / len;
}

a1 = get(a1);
a2 = get(a2);
a3 = get(a3);

console.log('a1: ' + a1);
console.log('a2: ' + a2);
console.log('a3: ' + a3);
