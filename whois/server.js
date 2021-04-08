var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var whoisAPI = require('./controllers/whois.controller');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended=false}));
app.use('/', whoisAPI);
app.use(express.static(__dirname + '/public/'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
  next();
});

app.listen(5001);

console.log("Server up and running on port 5001");