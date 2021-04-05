var globalNews = require('./globals/news');
var db = require('./database/connection');

module.exports = function (app) {
    app.get("/monasabat", (req,res)=>{
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
                        dbclient.query("SELECT * FROM news   ORDER BY id ASC", function (err, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                globalNews.news.push(rows[i].content);
                                globalNews.news.reverse();
                                console.log("global news ", globalNews.news);
                                console.log(" -> content: " + rows[i].content
                                    + " (" + rows[i].id + ")");
                            }
                            dbClient.end();
                            globalNews.news.reverse();
                            res.render('monasabat', { news: globalNews.news });
                        });
                    }
                });
            });
        } else {
            res.render('monasabat', { news: globalNews.news });
        }
    })

    app.get('/monasabat/:id',(req,res)=>{
        let monasabatArray = [
            "مسجد المشير طنطاوي",
            "مسجد آل رشدان",
            "مسجد النزهة",
            "مسجد الزهراء مدينة نصر"
        ]
        const path = "../assets/monasabat/img";
        var imgSrc = [];
        for(i=0;i<monasabatArray.length;i++){
            const index = i+1;
            imgSrc.push([path + index + ".png"])
        }
        imgSrc[0].push(path+'1a'+'.png');
        imgSrc[0].push(path+'1b'+'.png');
        imgSrc[0].push(path+'1c'+'.png');

        imgSrc[1].push(path+'2a'+'.png');
        imgSrc[1].push(path+'2b'+'.png');

        imgSrc[2].push(path+'1a'+'.png');
        imgSrc[2].push(path+'1b'+'.png');

        imgSrc[3].push(path+'1a'+'.png');


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
                        dbclient.query("SELECT * FROM news   ORDER BY id ASC", function (err, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                globalNews.news.push(rows[i].content);
                                globalNews.news.reverse();
                                console.log("global news ", globalNews.news);
                                console.log(" -> content: " + rows[i].content
                                    + " (" + rows[i].id + ")");
                            }
                            dbClient.end();
                            globalNews.news.reverse();
                            res.render('placeContainer', { news: globalNews.news , title:monasabatArray[req.params.id-1], imgSrc:imgSrc[req.params.id-1]});
                        });
                    }
                });
            });
        } else {
            res.render('placeContainer', { news: globalNews.news , title:monasabatArray[req.params.id-1], imgSrc:imgSrc[req.params.id-1]});
        }
    })

    app.get("/monzfat", function (req, res) {
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
                        dbclient.query("SELECT * FROM news   ORDER BY id ASC", function (err, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                globalNews.news.push(rows[i].content);
                                globalNews.news.reverse();
                                console.log("global news ", globalNews.news);
                                console.log(" -> content: " + rows[i].content
                                    + " (" + rows[i].id + ")");
                            }
                            dbClient.end();
                            globalNews.news.reverse();
                            res.render('monzfat', { news: globalNews.news });
                        });
                    }
                });
            });
        } else {
            res.render('monzfat', { news: globalNews.news });
        }
        console.log("3sor url is hitted");
    });

    app.get('/5admat',(req, res)=> {
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
                        dbclient.query("SELECT * FROM news   ORDER BY id ASC", function (err, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                globalNews.news.push(rows[i].content);
                                globalNews.news.reverse();
                                console.log("global news ", globalNews.news);
                                console.log(" -> content: " + rows[i].content
                                    + " (" + rows[i].id + ")");
                            }
                            dbClient.end();
                            globalNews.news.reverse();
                            res.render('5admat', { news: globalNews.news });
                        });
                    }
                });
            });
        } else {
            res.render('5admat', { news: globalNews.news });
        }
        console.log("3sor url is hitted");
    })

    
    app.get('/monasabat',(req, res)=> {
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
                        dbclient.query("SELECT * FROM news   ORDER BY id ASC", function (err, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                globalNews.news.push(rows[i].content);
                                globalNews.news.reverse();
                                console.log("global news ", globalNews.news);
                                console.log(" -> content: " + rows[i].content
                                    + " (" + rows[i].id + ")");
                            }
                            dbClient.end();
                            globalNews.news.reverse();
                            res.render('monasabat', { news: globalNews.news });
                        });
                    }
                });
            });
        } else {
            res.render('5admat', { news: globalNews.news });
        }
        console.log("3sor url is hitted");
    })

    app.get("/selectmonzfatphoto", function (req, res) {
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
                dbclient.query("SELECT * FROM news   ORDER BY id ASC", function (err, rows) {
                    for (var i = 0; i < rows.length; i++) {
                        globalNews.news.push(rows[i].content);
                        globalNews.news.reverse();
                        console.log("global news ", globalNews.news);
                        console.log(" -> content: " + rows[i].content
                            + " (" + rows[i].id + ")");
                    }
                    dbClient.end();
                    globalNews.news.reverse();
                    res.render('editnobtgya', { news: globalNews.news, nobtgyaName: "", type: "submitmonzfatphoto" });
                });
            }
        });
    });

    app.get("/tarfeh33/:id",(req, res)=>{
        titleArray = [
            //0
            "قرية سيدي كرير", 
            //1
            "قرية باغوش",
            //2
            "نادي وفندق بلطيم",
            //3
            "عمارة كسفريت",
            //4
            "نادي وفندق 6 اكتوبر جمصة",
            //5
            "نادي وفنادق الانفوشي",
            //6
            "نادي الابطال بعين الصيرة",
            //7
            "خدمات إستخرجات",
            //8
            "نادي و فندق 6 اكتوبر ابوقير",
            //9
            "نادي وفندق 6 اكتوبر فايد",
            //10
            "نادي وفندق رأس البر",
            //11
            "نادي وفندق 6 اكتوبر ببورسعيد",
            //12
            "مسرح وسينما الزمالك",
            //13
            "سينما المستقبل",
            //14
            "سينما السلام",
            //15
            "نادي وفندق 6 اكتوبر الحلمية",
            //16
            "نادي وفندق 6 اكتوبر السلام",
            //17
            "النادي الاجتماعي بالهايكستب",
            //18
            "مركب النايل لوتس",
            //19
            "تنظيم الحفلات",
            //20
            "الإشتراك في القنوات المشفرة"
];
        const path = "../assets/5admat/img";
        const total = titleArray.length;
        //console.log(total);
        var imgSrc = [];
        for(i=0;i<total;i++){
            const iplus = i+1;
            imgSrc.push([path+ iplus +'.png'])
        }
        imgSrc[20].push(path+'21a' +'.png')
        imgSrc[20].push(path+'21b' +'.png')


        console.log(imgSrc);
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
                        dbclient.query("SELECT * FROM news   ORDER BY id ASC", function (err, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                globalNews.news.push(rows[i].content);
                                globalNews.news.reverse();
                            }
                            dbClient.end();
                            globalNews.news.reverse();
                            res.render('placeContainer', { news: globalNews.news , title:titleArray[req.params.id-1], imgSrc:imgSrc[req.params.id-1]});
                        });
                    }
                });
            });
        } else {
            res.render('placeContainer', { news: globalNews.news , title:titleArray[req.params.id-1], imgSrc:imgSrc[req.params.id-1]});
        }
        console.log(titleArray[0])
        
    })
        
    

    app.post("/submitmonzfatphoto", function (req, res) {
        var dbClient = db.dbOpenConnection();
        var imgName = "monzfat_" + Date.now();
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query("INSERT INTO photos (name,type) VALUES ('" + imgName + "','monzfat')", function (err, results, fields) {
            if (err) {
                console.log("insert new photo error", err);
            } else {
                upload = uploadImage(imgName);
                upload(req, res, (err) => {
                    if (err) {
                        res.render('editnobtgya', {
                            msg: err,
                            nobtgyaName: `${req.file.filename}`,
                            type: "/submitmonzfatphoto"
                        });
                    } else {
                        if (req.file == undefined) {
                            res.render('editnobtgya', {
                                msg: 'برجاء إختيار صورة',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitmonzfatphoto"
                            });
                        } else {
                            res.render('editnobtgya', {
                                msg: 'تم التعديل',
                                nobtgyaName: `${req.file.filename}`,
                                type: "/submitmonzfatphoto"
                            });
                        }
                    }
                });
            }
        });
    });
}