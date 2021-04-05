var globalNews = require('./globals/news');
var db = require('./database/connection');

module.exports = function (app) {
    app.get("/modeer", function (req, res) {
        var news = req.news;

        res.render('pagecontainer', { renpath:"./incviews/modeer",news: globalNews.news });
    });
}