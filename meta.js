var fs = require('fs');

var Crawler = require("crawler");

var urls = require('./computer.json');

var config = {
    from: 1,
    //max: urls.length - 1,
    max: 1,
    filename: 'computer-meta.json'
};

var data = [];
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        // a lean implementation of core jQuery designed specifically for the server

        var meta = {};
        var price = $('.m-bookdata .price');
        meta.currentPrice = price.find('em').text();
        meta.oldPrice = price.find('del').eq(0).text();
        meta.paperPrice = price.find('del').eq(1).text();

        var stargrade = $('.u-stargrade');
        meta.score = stargrade.find('.score').text();
        meta.count = stargrade.find('.num span').text();

        data.push(meta);
        //console.log(urls);
        config.at += 1;

        if (config.at >= config.max) {
            //console.log(urls);
            fs.writeFileSync(config.filename, JSON.stringify(data), 'utf8');
            process.exit();
        }
    }
});
c.queue(urls);