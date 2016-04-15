var fs = require('fs');

var Crawler = require("crawler");

var makeURLS = require('./lib');

// 小说
var config = {
    base: 'http://www.duokan.com/list/14-',
    from: 1,
    max: 811,
    filename: 'xiaoshuo-url.json',
    at: 1
};

var urls = [];
var c = new Crawler({
    maxConnections : 10,
    callback : function (error, result, $) {
        $('.j-list > li').each(function (index, ele) {
            urls.push($(ele).find('.title').attr('href'));
        });
        console.log(config.at);
        config.at += 1;
        if (config.at >= config.max) {
            console.log(urls);
            fs.writeFileSync(config.filename, JSON.stringify(urls), 'utf8');
            process.exit();
        }
    }
});

c.queue(makeURLS(config));