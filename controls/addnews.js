var db = require('./database/connection');
var bodyParser = require('body-parser');
var globalNews = require('./globals/news');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function (app) {
    app.get("/addnews", function (req, res) {
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
                            globalNews.news.reverse();
                            res.render('addnews', { news: globalNews.news });
                        });
                    }
                });
            });
        } else {
            res.render('addnews', { news: globalNews.news });
        }
        console.log("3sor url is hitted");
    });

    app.get("/editnews/:id", function (req, res) {
        var dbClient = db.dbOpenConnection();
        dbclient.query("SELECT * FROM news WHERE id = " + req.params.id, function (err, rows) {
            if (err) {
                console.log("getting all news error", err);
            } else {
                console.log("results : ", rows[0].content);
                res.render('editnews', { content: rows[0].content, id: rows[0].id });
                dbClient.end();
            }
        });

    });

    app.get("/deletenews/:id", function (req, res) {
        var dbClient = db.dbOpenConnection();
        dbclient.query("DELETE FROM news WHERE id = " + req.params.id, function (err, rows) {
            if (err) {
                console.log("getting all news error", err);
            } else {
                dbclient.query("SELECT * FROM news", function (err, rows) {
                    if (err) {
                        console.log("getting all news error", err);
                    } else {
                        dbClient.end();
                        res.render('allnews', { news: rows });

                    }
                });
            }
        });

    });

    app.post("/editnews", urlencodedParser, function (req, res) {
        var dbClient = db.dbOpenConnection();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        if (req.body.new != "") {
            console.log("query of edit -> UPDATE news SET content='" + req.body.new + " ' " + " WHERE id = " + req.body.id);
            dbclient.query("UPDATE news SET content='" + req.body.new + " ' " + " WHERE id = " + req.body.id, function (err, results, fields) {
                if (err) {
                    console.log("insert new 5abr error", err);
                } else {
                    console.log("insert new 5abr result :", results);
                    dbclient.query("SELECT * FROM news", function (err, rows) {
                        if (err) {
                            console.log("getting all news error", err);
                        } else {
                            res.render('allnews', { news: rows });
                            dbClient.end();
                        }
                    });
                }
            });
        } else {
        }

    });
    app.post("/addnews", urlencodedParser, function (req, res) {
        var dbClient = db.dbOpenConnection();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        if (req.body.new != "") {
            dbclient.query("INSERT INTO news (content) VALUES ('" + req.body.new + "')", function (err, results, fields) {
                if (err) {
                    console.log("insert new 5abr error", err);
                } else {
                    dbclient.query("SELECT * FROM news", function (err, rows) {
                        if (err) {
                            console.log("getting all news error", err);
                        } else {
                            dbClient.end();
                            res.render('allnews', { news: rows });

                        }
                    });
                }
            });
        } else {
            if (globalNews.news.length == 0) {
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
                            res.render('addnews', { news: globalNews.news });
                        });
                    }
                });
            } else {
                dbClient.end();
                res.render('addnews', { news: globalNews.news });
            }
        }
    });
}