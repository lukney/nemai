var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : '', //mysql database password
  database : 'nemai', //mysql database name
  port     : '3306'  
});

connection.connect(function(err) {
  if (err) throw err
  
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));
//end body-parser configuration

//create app server
var server = app.listen(3008,   function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
app.post('/insert', function (req, res) {
	//get data
    var data = {
        name:req.body.name,
        mobileno:req.body.mobileno,
        
     };
   connection.query("INSERT INTO user set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });
});