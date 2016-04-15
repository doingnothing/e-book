var fs = require('fs');

var Crawler = require("crawler");

var urls = require('./computer-url.json');

urls = urls.map(function (path, index) {
    return 'http://www.duokan.com' + path;
});


console.log(urls.length);
var config = {
    from: 1,
    max: urls.length,
    filename: 'computer-meta.json',
    at: 1
};

var data = [];
var c = new Crawler({
    maxConnections : 10,
    callback : function (error, result, $) {
        var meta = {};
        var price = $('.m-bookdata .price');
        meta.name = $('.desc h3').text();
        meta.currentPrice = price.find('em').text();
        meta.oldPrice = price.find('del').eq(0).text();
        meta.paperPrice = price.find('del').eq(1).text();

        var stargrade = $('.u-stargrade');
        meta.score = stargrade.find('.score').text();
        meta.count = stargrade.find('.num span').text();

        meta.size = $('.m-bookdetail .size').text();

        meta.tags = [];
        $('.u-taglist a').map(function (index, ele) {
            meta.tags.push($(ele).text());
        });
        data.push(meta);

        console.log(config.at);
        config.at += 1;
        if (config.at >= config.max) {
            //console.log(urls);
            fs.writeFileSync(config.filename, JSON.stringify(data), 'utf8');
            process.exit();
        }
    }
});
c.queue(urls);