var db = require('./database/connection');
var globalNews = require('./globals/news');

module.exports = function (app) {
    app.get("/allnews", function (req, res) {
        var dbClient = db.dbOpenConnection();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query("SELECT * FROM news", function (err, rows) {
            if (err) {
                console.log("getting all news error", err);
            } else {
                if (globalNews.news.length == 0) {
                    dbclient.query("SELECT * FROM news", function (err, rows) {
                        for (var i = 0; i < rows.length; i++) {
                            globalNews.news.push(rows[i].content);
                            globalNews.news.reverse();
                        }
                        dbClient.end();

                        res.render('allnews', { news: rows });
                    });
                } else {
                    dbClient.end();
                    res.render('allnews', { news: rows });
                }
            }
        });
    });
}