var globalNews = require('./globals/news');
var db = require('./database/connection');

module.exports = function (app) {
    app.get("/nobtgyat", function (req, res) {
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
                    //console.log(nobatgyatArr)
                    res.render('pagecontainer', {renpath:'./incviews/nobtgyat', news: news , nobatImgs:nobatgyatArr});
                    dbClient.end();
                }
            });
        });
    });
}