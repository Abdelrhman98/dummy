var db = require('./database/connection');
var uploadImage = require('./helpers/photoUploader');
var qr = require('./database/query');

var ruQr = require('./database/query')
const queryBuilder = require('./database/dbStringUtil');

module.exports = function (app) {
    app.get("/", function (req, res) {
        var news = req.news;
        var dbClient = db.dbOpenConnection();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query("SELECT * FROM photos WHERE type = 'index'", function (err, rows) {
        dbClient.end();
        res.render('pagecontainer', { renpath:'./incviews/index.ejs', photos: rows, news: news});
        })
    });

    app.get("/selectindexphoto", function (req, res) {
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
                    }
                    dbClient.end();

                    res.render('editnobtgya', { news: globalNews.news, nobtgyaName: "", type: "submitindexphoto" });
                });
            }
        });
    });

    app.post("/submitindexphoto", function (req, res) {
        var dbClient = db.dbOpenConnection();
        var imgName = "index_" + Date.now();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query("INSERT INTO photos (name,type) VALUES ('" + imgName + "','index')", function (err, results, fields) {
            if (err) {
                console.log("insert new photo error", err);
            } else {
                upload = uploadImage(imgName);
                upload(req, res, (err) => {
                    if (err) {
                        res.render('editnobtgya', {
                            msg: err,
                            nobtgyaName: `${req.file.filename}`,
                            type: "/submitindexphoto"
                        });
                    } else {
                        if (req.file == undefined) {
                            res.render('editnobtgya', {
                                msg: 'برجاء إختيار صورة',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitindexphoto"
                            });
                        } else {
                            res.render('editnobtgya', {
                                msg: 'تم التعديل',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitindexphoto"
                            });
                        }
                    }
                });
            }
        });
    });
    app.get("/qada",(req, res)=>{
        var news = req.news;
        var dbClient = db.dbOpenConnection();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query("SELECT * FROM qada", function (err, rows) {
            //console.log(rows[0].name);
            res.render('pagecontainer', {renpath:'./incviews/qada', news: news,qada: rows });
        });
        
    })

    app.get("/test",(req, res)=>{
        console.log(qr().query("SELECT * FROM news LIMIT 5"))
    })



    app.get("/add_new_dabet", (req, res)=>{
        var news = req.news
        var dbClient = db.dbOpenConnection();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query("SELECT * FROM shoon_branches", function (err, rows) {
            dbclient.query("SELECT * FROM shoon_ranks", function (err, rows2) {
                //console.log(rows[0].branchName)
                res.render("pagecontainer",{renpath:"./incviews/forms/dobat", news:news, branches:rows, ranks:rows2})
            }
            );
        })
        
    })

    app.post("/test2", (req,res)=>{
        const dabet_name = req.body.da.name
        const dabet_rank = req.body.da.rank
        const dabet_branch = req.body.da.branch

        var dbClient = db.dbOpenConnection();
        const query = "INSERT INTO shoon_dobat (`fullName`, `rank_id`, `branch_name`) VALUES ('"+ dabet_name+"',"+ dabet_rank+","+dabet_branch+")"

        //console.log(query);
        dbclient.query(query, function (err, rows) {
            if(err){
                console.log(err)
            }else{
                res.redirect("/add_new_dabet")
            }
        })

        //console.log(dabet_name)
    })
}