var globalNews = require('./globals/news');
var db = require('./database/connection');

module.exports = function (app) {
    app.get("/pool", function (req, res) {
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
                        dbclient.query("SELECT * FROM news ORDER BY id ASC", function (err, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                globalNews.news.push(rows[i].content);
                                globalNews.news.reverse();
                            }
                            dbClient.end();
                            globalNews.news.reverse();
                            res.render('pool', { news: globalNews.news });
                        });
                    }
                });
            });
        } else {

            res.render('pool', { news: globalNews.news });
        }
        console.log("3sor url is hitted");
    });

    app.get("/selectpoolphoto", function (req, res) {
        globalNews.news = [];
        console.log("index url is hitted");
        var dbClient = db.dbOpenConnection();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query("SELECT * FROM news LIMIT 5", function (err, rows) {
            if (err) {
                console.log("getting all news error", err);
            } else {
                dbclient.query("SELECT * FROM news", function (err, rows) {
                    for (var i = 0; i < rows.length; i++) {
                        globalNews.news.push(rows[i].content);
                        globalNews.news.reverse();
                        console.log("global news ", globalNews.news);
                        console.log(" -> content: " + rows[i].content
                            + " (" + rows[i].id + ")");
                    }
                    dbClient.end();

                    res.render('editnobtgya', { news: globalNews.news, nobtgyaName: "", type: "submitpoolphoto" });
                });
            }
        });
    });
    app.post("/submitpoolphoto", function (req, res) {
        var dbClient = db.dbOpenConnection();
        var imgName = "pool_" + Date.now();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query("INSERT INTO photos (name,type) VALUES ('" + imgName + "','pool')", function (err, results, fields) {
            if (err) {
                console.log("insert new photo error", err);
            } else {
                upload = uploadImage(imgName);
                upload(req, res, (err) => {
                    if (err) {
                        res.render('editnobtgya', {
                            msg: err,
                            nobtgyaName: `${req.file.filename}`,
                            type: "/submitpoolphoto"
                        });
                    } else {
                        if (req.file == undefined) {
                            res.render('editnobtgya', {
                                msg: '?????????? ???????????? ????????',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitpoolphoto"
                            });
                        } else {
                            res.render('editnobtgya', {
                                msg: '???? ??????????????',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitpoolphoto"
                            });
                        }
                    }
                });
            }
        });
    });

}