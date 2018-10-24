var express = require('express');
var router = express.Router();
const request = require('request');
var clientsData = require('../db/FHIRPatientData.json');
var patientdata = require('../db/FHIRPatient.json');
var fhirobservation = require('../db/FHIRObservation.json');

var Datastore = require('nedb');
var db = new Datastore();


var refobsid= 1;

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("req1" + req.query.id);
    refobsid = req.query.id;
    res.render('Observation', { title: 'Patient Observation', obsid: req.query.id });
});

/* GET home page. */
router.get('/Data/', function(req, res, next) {
    console.log("refobsid" + refobsid);
    let url = "https://h4awl8tfn4.execute-api.us-west-2.amazonaws.com/Prod/Observation?patient-ref-id=" +refobsid 
    request(url, function(err, response, body) {
        if (err) {
            console.log("In error  ");
        }
        else {
            let patientlist = JSON.parse(body);
            //var pl = list<FHIRPatient>

            // pl =   patientlist["entry"][1];
            //console.log(FHIRPatient);
            //console.log("patientlsit + " + FHIRPatient.resource.name[0].family);
            res.json(patientlist["entry"]);
        }
    });
    // res.json(patientlist);

});

module.exports = router;
