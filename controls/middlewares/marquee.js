const { lowerFirst } = require('lodash');
var db = require('../database/connection');
var globalNews = require('../globals/news');
function transformNumer(number){
    var numbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']
    var arabicNumber = "";
    var numberN = number.toString();
    for(var i = 0; i<number.toString().length;i++)
        arabicNumber+=numbers[numberN[i]]
    return arabicNumber
}

module.exports = function(req, res, next) {
    var dbClient = db.dbOpenConnection();
    dbclient.connect(function (err, results) {
        if (err) {
            console.log("open connection error", err);
        }
    });
    var d = new Date()
    
    var months = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    var days = ["الأحد", "الأثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"];
    var manobDay = " دور خدمة المنوب عن يوم ";
    manobDay +=  days[d.getDay()] + " الموافق " 
    
    //console.log()
    //console.log(d.toLocaleDateString('ar'))
    manobDay+= transformNumer(d.getDate())+" "+months[d.getMonth()]+" "+transformNumer(d.getFullYear())
    transformNumer(d.getFullYear())
    
    //months[d.getMonth()]
    //d.getDate() day number
    // days[d.getDay()] day string
    //console.log(manobDay)
    //console.log()
    //var newString = 
    dbclient.query("SELECT * FROM news ORDER BY id ASC", function (err, rows) {
    for (var i = rows.length - 1; i >=0 ; i--) {
        if(i==1)
            globalNews.news.push(manobDay);
        else
            globalNews.news.push(rows[i].content);
    }
    //globalNews.news.push(manobDay)
    dbClient.end();

});
    req.news = globalNews.news;
    next();
};