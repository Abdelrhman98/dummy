var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');

var globalNews = require('./globals/news');
var db = require('./database/connection');
var uploadImage = require('./helpers/photoUploader');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var formidable = require('formidable');
const { mapValues } = require('lodash');

module.exports = function (app) {
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));
    app.get("/managenobtgyat", function (req, res) {
            var news = req.news;
            var dbClient = db.dbOpenConnection();

            dbclient.connect(function (err, results) {
                if (err) {
                    console.log("open connection error", err);
                }
                dbclient.query("SELECT * FROM nobthyatimage", function (err, rows) {
                    if (err) {
                        console.log("getting all news error", err);
                    } else {
                        var nobatgyatArr = {manob:"", dabetnob:"",dabeteda:"" };
                        rows.forEach(row=>{
                            if(row.type == "manob")
                                nobatgyatArr.manob = row.imgName
                            else if (row.type == "dabetnobtgy")
                                nobatgyatArr.dabetnob = row.imgName
                            else if (row.type == "dabetedary")
                                nobatgyatArr.dabeteda = row.imgName
                        })
                        console.log(nobatgyatArr)
                        res.render('pagecontainer', {renpath:'./incviews/manageNobtgyat', news: news , nobatImgs:nobatgyatArr});
                        dbClient.end();
                    }
                });
            });
    });

    app.get("/editnobtgya/:name", function (req, res) {
        var news = req.news;
        var dbClient = db.dbOpenConnection();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
            dbclient.query("SELECT * FROM nobthyatimage", function (err, rows) {
                if (err) {
                    console.log("getting all news error", err);
                } else {
                    var nobatgyatArr = {manob:"", dabetnob:"",dabeteda:"" };
                    rows.forEach(row=>{
                        if(row.type == "manob")
                            nobatgyatArr.manob = row.imgName
                        else if (row.type == "dabetnobtgy")
                            nobatgyatArr.dabetnob = row.imgName
                        else if (row.type == "dabetedary")
                            nobatgyatArr.dabeteda = row.imgName
                    })
                    var imgPath = "";
                    if(req.params.name == 'manob')imgPath = nobatgyatArr.manob
                    if(req.params.name == 'dabetnobtgy')imgPath = nobatgyatArr.dabetnob
                    if(req.params.name == 'dabetedary')imgPath = nobatgyatArr.dabeteda
                    //console.log(nobatgyatArr);
                    //console.log(req.params.name +" "+imgPath)
                    res.render('pagecontainer', { renpath:"./incviews/editnobtgya",news: news, nobtgyaName: imgPath , type: "/submitphoto" });
                    dbClient.end();
                }
            });
        });        
    });

    app.post("/submitphoto", function (req, res) {
        fs.unlink("./assets/nobtgyat/" + req.session.nobtgyaName + ".png", function (err) {
            if (err) {
                console.log("delete file error", err)
            } else {
                upload = uploadImage(req.session.nobtgyaName);
                upload(req, res, (err) => {
                    if (err) {
                        res.render('editnobtgya', {
                            msg: err,
                            nobtgyaName: `${req.file.filename}`,
                            type: "/submitphoto"
                        });
                    } else {
                        if (req.file == undefined) {
                            res.render('editnobtgya', {
                                msg: 'برجاء إختيار صورة',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitphoto"
                            });
                        } else {
                            var form = new formidable.IncomingForm();
                            form.parse(req, function (err, fields, files) {
                                var oldpath = files.filetoupload.path;
                                var newpath = './assets/nobtgyat/' + req.session.nobtgyaName;
                                mv(oldpath, newpath, ()=>{
                                    console.log(oldpath,oldpath)
                                })
                            })
                            console.log()
                            //mv(req)
                            res.render('editnobtgya', {
                                msg: 'تم التعديل',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitphoto"
                            });
                        }
                    }
                });
            }
        })
    });
}