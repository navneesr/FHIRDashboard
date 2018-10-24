// const http = require("http");
// const PORT = 8080;

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '*****************';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use('/', routes);
app.use('/FHIRPatient', FHIRPatient);


// // const requestHandler = (req, res) => {
// // 	res.end("Hello from AWS Cloud9!")
// // }

// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });


// const server = http.createServer(requestHandler);

// server.listen(8080, (err) => {
// 	if (err) {
// 		console.log("Error occurred", err) ;
// 	}
// 	console.log(`Server is listening on ${PORT}`);
// })

// express = require("express");
// var app     = express();
// var path    = require("path");

// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs')


app.get('/',function(req,res){
  //res.sendFile(path.join(__dirname+'/views/PatientPortal.html'));
  //__dirname : It will resolve to your project folder.
  res.render('PatientPortal', {patientlist: null, error: null});
});


app.post('/', function (req, res) {
  //let city = req.body.city;
  let url = `https://h4awl8tfn4.execute-api.us-west-2.amazonaws.com/Prod/Patient`

  request(url, function (err, response, body) {
    if(err){
      res.render('PatientPortal', {patientlist: null, error: 'Error, please try again'});
    } else {
      let patientlist = JSON.parse(body)
      jsgrid.data  = patientlist;
      res.render('PatientPortal', {patientlist: patientlist, error: null});
      // if(weather.main == undefined){
      //   res.render('index', {weather: null, error: 'Error, please try again'});
      // } else {
      //   let patientlist = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      //   res.render('PatientPortal', {patientlist: patientlist, error: null});
      // }
    }
  });
})



//app.listen(8080);

console.log("Running at Port 8080");