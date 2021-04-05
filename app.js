var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use('/assets', express.static('./assets'));
var encodedParser = bodyParser.urlencoded({ extended: true });
var marqueeMiddleware = require('./controls/middlewares/marquee')
app.use(marqueeMiddleware)
app.use(express.urlencoded())
app.use(express.json())
var indexController     = require("./controls/indexController");
var darController       = require("./controls/darController");
var _3sorController     = require("./controls/3sorController");
var moderController     = require("./controls/moderController");
var monzfatController   = require("./controls/monzfatController");
var nmazegController    = require("./controls/nmazegController");
var sabqenController    = require("./controls/sabqenController");
var tare5Controller     = require("./controls/tare5Controller");
var manage              = require("./controls/manage");
var addnews             = require("./controls/addnews");
var allnews             = require("./controls/allNewsController");
var nobtgyat            = require("./controls/nobtgyatController");
var manageNobtgyat      = require("./controls/manageNobtgyatController");
var africano            = require("./controls/africanoController");
var pool                = require("./controls/poolController");
var shalehat            = require("./controls/shalehatControllers");
var clara               = require("./controls/claraController");
var lola                = require("./controls/lolaController");
var tel                 = require("./controls/telephoneIndexController");
var dobat               = require("./controls/dobatController");
indexController     (app);
darController       (app);
indexController     (app);
_3sorController     (app);
moderController     (app);
monzfatController   (app);/////////////////
nmazegController    (app);
sabqenController    (app);
tare5Controller     (app);
addnews             (app);
allnews             (app);
manage              (app);
nobtgyat            (app);
manageNobtgyat      (app);
africano            (app);
pool                (app);
shalehat            (app);
clara               (app);
lola                (app);
tel                 (app);
dobat               (app);
app.listen(3000);
console.log('work')