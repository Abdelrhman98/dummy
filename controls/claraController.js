var globalNews = require('./globals/news');
var db = require('./database/connection');

module.exports = function (app) {
    app.get("/clara", function (req, res) {
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
                            }
                            dbClient.end();
                            globalNews.news.reverse();
                            res.render('clara', { news: globalNews.news });
                        });
                    }
                });
            });
        } else {

            res.render('clara', { news: globalNews.news });
        }
        console.log("3sor url is hitted");
    });
    app.get("/selectclaranophoto", function (req, res) {
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

                    res.render('editnobtgya', { news: globalNews.news, nobtgyaName: "", type: "submitclaraphoto" });
                });
            }
        });
    });
    app.post("/submitclaraphoto", function (req, res) {
        var dbClient = db.dbOpenConnection();
        var imgName = "clara_" + Date.now();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query("INSERT INTO photos (name,type) VALUES ('" + imgName + "','clara')", function (err, results, fields) {
            if (err) {
                console.log("insert new photo error", err);
            } else {
                upload = uploadImage(imgName);
                upload(req, res, (err) => {
                    if (err) {
                        res.render('editnobtgya', {
                            msg: err,
                            nobtgyaName: `${req.file.filename}`,
                            type: "/submitclaraphoto"
                        });
                    } else {
                        if (req.file == undefined) {
                            res.render('editnobtgya', {
                                msg: 'برجاء إختيار صورة',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitclaraphoto"
                            });
                        } else {
                            res.render('editnobtgya', {
                                msg: 'تم التعديل',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitclaraphoto"
                            });
                        }
                    }
                });
            }
        });
    });

}