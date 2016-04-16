var fs = require('fs');

var a1 = require('./xiaoshuo-meta1.json');
var a2001 = require('./xiaoshuo-meta2001.json');
var a4001 = require('./xiaoshuo-meta4001.json');
var a7001 = require('./xiaoshuo-meta7001.json');
var a10001 = require('./xiaoshuo-meta10001.json');
var a11001 = require('./xiaoshuo-meta11001.json');

var data = a1.concat(a2001).concat(a4001).concat(a7001).concat(a10001).concat(a11001);
fs.writeFileSync('xiaoshuo-meta.json', JSON.stringify(data), 'utf8');