var globalNews = require('./globals/news');
var db = require('./database/connection');
var fs = require('fs');
var path = require('path');
var util = require('util')

const { forEach } = require('lodash');
const { homedir } = require('os');

var ruQr = require('./database/query')
const queryBuilder = require('./database/dbStringUtil');

module.exports = function (app) {
    app.get("/tel_index", async function (req, res) {
        var news = req.news;
        var con  = new queryBuilder("shoon_branches")
        ruQr.query(con.select("*",{"inShoon":1}," ORDER BY orderB ASC"),(rows)=>{
            ruQr.query(con.select("*",{"inShoon":0}," ORDER BY orderB ASC"),(outr)=>{
                ruQr.query(con.select("*",{"inShoon":2}," ORDER BY orderB ASC"),(tabr)=>{
                    res.render('pagecontainer', {renpath:'./incviews/tele_branches', news:news, branches:rows, obranches:outr, tbranches:tabr})
                })
                
            })
        })
    });

    app.get("/tel_index/:id", async function (req, res) {
        var news = req.news;        
        var dbClient = db.dbOpenConnection();
        const branch_id = req.params.id;
        var query = "SELECT * FROM `shoon_tele_photo` INNER JOIN shoon_branches ON shoon_tele_photo.branchID = shoon_branches.id where shoon_tele_photo.branchID="
        query+=branch_id
        console.log(query)
        dbclient.connect(function (err, results) {
            if (err) {
                console.log("open connection error", err);
            }
        });
        dbclient.query(query, function (err, rows) {
            var to = (rows[0].to)?rows[0].to:rows[0].from
            console.log(to)
            res.render('pagecontainer', {renpath:'./incviews/tele', news:news, from:rows[0].from, to:to})
        })
    });
}