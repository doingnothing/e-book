var fs = require('fs');

var Crawler = require("crawler");

var makeURLS = require('./he');

// computer url list
//var config = {
//    base: 'http://www.duokan.com/list/6-',
//    from: 1,
//    max: 110,
//    at: 1,
//    filename: 'computer.json'
//};

// 小说
var config = {
    base: 'http://www.duokan.com/list/14-',
    from: 1,
    max: 807,
    filename: 'xiaoshuo.json',
    at: 1
};

var urls = [];
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server

        $('.j-list > li').each(function (index, ele) {
            urls.push($(ele).find('.title').attr('href'));
        });
        //console.log(urls);
        config.at += 1;

        if (config.at >= config.max) {
            console.log(urls);
            fs.writeFileSync(config.filename, JSON.stringify(urls), 'utf8');
            process.exit();
        }
    }
});

c.queue(makeURLS(config));