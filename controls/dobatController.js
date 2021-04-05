var globalNews = require('./globals/news');

var db = require('./database/connection');
var bodyParser = require('body-parser');
var globalNews = require('./globals/news');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');
const { values } = require('lodash');

module.exports = function (app) {

    app.post('/testupload/:type',(req, res)=>
    {
        var nobatgyatFiles  = [];
        var deletedDir      = "";
        const folderPath   = './assets/nobtgyat/';
        const requestType = req.params.type
        
        fs.readdir(folderPath,(err, files)=>{
            nobatgyatFiles = files;
            files.forEach(file=>{
                if(file.indexOf(requestType)!=-1){
                    deletedDir = file;
                }
            })
        })
        console.log(deletedDir)
        if(deletedDir!="")
            fs.unlink(folderPath + deletedDir ,()=>{console.log(folderPath + " is deleted.")})
        var form = new formidable.IncomingForm();
        form.parse(
            req, 
            function (err, fields, files) 
            {
                const imgName  = req.params.type;
                const dotIndex = files.nobtgyaImage.name.indexOf('.');
                const memeType = files.nobtgyaImage.name.substr(dotIndex);
                var oldpath = files.nobtgyaImage.path;

                var dbClient = db.dbOpenConnection();
                dbclient.connect(function (err, results) {
                    if (err) {
                        console.log("open connection error", err);
                    }
                });
                var value1 = imgName
                var value2 = requestType.substr(0,imgName.indexOf('.'))
                var queryStr = "UPDATE nobthyatimage SET imgName = '"+ value1+ "' WHERE type='" + value2 +"'"
                console.log(queryStr)
                dbclient.query(queryStr , function (err, rows) {
                    
                });
                //console.log(imgName);
                var newpath = './assets/nobtgyat/' + imgName ;
                console.log( )
                //imgName
                mv(oldpath,newpath,(err)=>{
                    //console.log(err)
                })
                res.redirect('/managenobtgyat')
            })
    })

}