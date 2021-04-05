var globalNews = require('./globals/news');
var db = require('./database/connection');

module.exports = function (app) {
    app.get("/manage", function (req, res) {
        if (globalNews.news.length == 0) {
            var dbClient = db.dbOpenConnection();
            dbclient.connect(function (err, results) {
                if (err) {
                    console.log("open connection error", err);
                }
                dbclient.query("SELECT * FROM news LIMIT 5", function (err, rows) {
                    if (err) {
                        console.log("getting all news error", err);
                    } else {
                        dbclient.query("SELECT * FROM news  ORDER BY id ASC", function (err, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                globalNews.news.push(rows[i].content);
                                console.log("global news ", globalNews.news);
                                console.log(" -> content: " + rows[i].content
                                    + " (" + rows[i].id + ")");
                            }
                            dbClient.end();
                            globalNews.news.reverse();
                            res.render('manage', { news: globalNews.news });
                        });
                    }
                });
            });
        } else {
            res.render('manage', { news: globalNews.news });
        }
        console.log("3sor url is hitted");
    });
}