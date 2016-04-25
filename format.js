//var metas = require('./data/computer-meta.json');
var metas = require('./data/xiaoshuo-meta.json');

var data = [];
var xxx = function (str) {
    str = str.replace('¥ ', '') || 0;
    return +str;
};
var yyy = function (str) {
    var res = {};
    var strs = str.split('万字');

    if (strs.length < 2) {
        res.size = parseFloat(strs[0]);
        return res;
    }

    if (strs[0]) {
        res.number = +strs[0];
    }
    if (strs[1]) {
        res.size = parseFloat(strs[1]);
    }
    return res;
};
console.log(metas.length);
metas.filter(function (ele, index) {
    return ele.currentPrice && ele.oldPrice && ele.paperPrice && xxx(ele.currentPrice);
}).map(function (ele, index) {
    var n_s = yyy(ele.size);
    var one = {
        name: ele.name,
        price: xxx(ele.currentPrice) || 0,
        oldPrice: xxx(ele.oldPrice),
        paperPrice: xxx(ele.paperPrice),
        score: +ele.score,
        count: +ele.count,
    };
    if (n_s.number) {
        one.number = n_s.number;
    }
    if (n_s.size) {
        one.size = n_s.size;
    }
    if (ele.tags.length > 0) {
        one.tags = ele.tags;
    }
    data.push(one);
});
console.log(data.length);

//require('fs').writeFileSync('data/computer.json', JSON.stringify(data), 'utf8');
require('fs').writeFileSync('data/xiaoshuo1.json', JSON.stringify(data), 'utf8');