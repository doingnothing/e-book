var fs = require('fs');

var Crawler = require("crawler");

var makeURLS = require('./lib');

var config = {
    base: 'http://www.duokan.com/list/6-',
    from: 1,
    max: 110,
    at: 1,
    filename: 'computer-url.json'
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