var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'nemai1234.cyelmj7smxyj.us-east-1.rds.amazonaws.com', //mysql database host name
  user     : 'nemai1234', //mysql database user name
  password : 'nemai1234', //mysql database password
  database : 'nemai1234', //mysql database name
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

  var host = 'ec2-54-147-43-135.compute-1.amazonaws.com'
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
