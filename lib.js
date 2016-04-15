module.exports = function (config) {
    var urls = [];
    for (var i = config.from; i <= config.max; i = i + 1) {
        urls.push(config.base + i);
    }
    return urls;
};