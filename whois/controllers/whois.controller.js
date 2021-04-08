var pgp = require('pg-promise');

var databaseConnection = require('../config/db_connection.js');
var express = require("express")


var connection = databaseConnection.getConnection();
var bcryptTutorial = require("../public/createdJS/bcryptTutorial.js");

let retries = 5;
while(retries) {
	try{
		connection.connect();
		break;
	} catch(error){
		console.log(error);
		retries -= 1;
		//await new Promise(response => setTimeout(response, 5000));
	}
}
var router = express.Router();

router.use(
  express.urlencoded({
    extended: true
  })
);

router.use(express.json());
/*
const query =  new pgp.QueryFile('./prepare_data/db.sql', { minify: false });
connection.any(query, []).then(records => {
	console.log("Whois table is created.");
}).catch(error => {	
	console.log("Error:" + error); // print the error;
});
*/
router.get('/search', function (request, response) {
	var searchedString = request.query.domain;
	console.log(request.query.domain);
	connection.one("SELECT * FROM whois WHERE domain_name LIKE '%"+ searchedString +"%' LIMIT 1")
		.then(records => {
			response.render('detail.ejs', { 'data': records });
		})
		.catch(error => {
			
			if( error instanceof pgp.errors.QueryResultError  ){
				response.redirect('/?error=' + encodeURIComponent('Not found!'));
			} else {
				console.log("Error: "+error); // print the error;
				response.send("Error: "+error);
			}
	});
});

router.get('/bcryptIntro', function (request, response) {
	response.render('bcryptIntro.ejs', { salt: "15", inputText: "hello", outputText: "", guessedText: "", givenHash: "", resultComparation: "" });
});

router.post('/bcryptIntro', function (request, response) {
	var salt = request.body.salt;
	var inputText = request.body.inputText;
	if(salt == ""){
		response.render('bcryptIntro.ejs', { salt: salt, inputText: inputText, outputText: "Salt can't be empty string!", guessedText: "", givenHash: "", resultComparation: "" });
		return;
	}
	if(Number(salt) > 25){
		response.render('bcryptIntro.ejs', { salt: salt, inputText: inputText, outputText: "Greater values then 25 for salt are not allowed! Processing can last more then 1 hour!", guessedText: "", givenHash: "", resultComparation: "" });
		return;
	}

	bcryptTutorial.convertBCrypt(Number(salt), inputText).then(
		result => response.render('bcryptIntro.ejs', { salt: salt, inputText: inputText, outputText: result, guessedText: "", givenHash: "", resultComparation: "" }));
});

router.post('/bcryptIntroValidator', function (request, response) {
	var guessedText = request.body.guessedText;
	var givenHash = request.body.givenHash;
	
	bcryptTutorial.compareBCrypt(guessedText, givenHash).then(
		result => {
			if(result){
				response.render('bcryptIntro.ejs', { guessedText: guessedText, givenHash: givenHash, resultComparation: result, salt: "15", inputText: "hello", outputText: "" });
			} else {
				response.status(500);
				response.render('bcryptIntro.ejs', { guessedText: guessedText, givenHash: givenHash, resultComparation: result, salt: "15", inputText: "hello", outputText: "" });
			}
			});
});

var fs = require('fs');
router.get('/', function(req, res){
	fs.readFile('./index.html',function(error, content){
		if(error){
			res.writeHead(500);
			res.end();
		} else {
			res.writeHead(200, { 'Content-type': 'text/html' });
			res.end(content, 'utf-8');
		}
	});
});

/*
router.get('/whois', (request, response) => {
	connection.many('SELECT * FROM whois LIMIT 10')
		.then(records => {
			console.log(records);
			response.send(records);
		})
		.catch(error => {
			console.log("Error: "+error); // print the error;
			response.send("Error: "+error);
	});
});
*/

	
module.exports = router