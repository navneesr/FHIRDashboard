var express = require('express');
var router = express.Router();
const request = require('request');
var clientsData = require('../db/FHIRPatientData.json');
var patientdata = require('../db/FHIRPatient.json');

var Datastore = require('nedb');
var db = new Datastore();
db.insert(clientsData);

var getClientFilter = function(query) {
    var result = {
        id: new RegExp(query.id, "i"),
        gender: new RegExp(query.gender, "i")
    };

    if (query.id) {
        result.id = query.id === 'true' ? true : false;
    }

    if (query.gender && query.gender !== '0') {
        result.gender = parseInt(query.gender, 10);
    }

    return result;
};

var prepareItem = function(source) {
    var result = source;
   
    return result;
};

router.get('/', function(req, res, next) {
    console.log("entering router");
    db.find(getClientFilter(req.query), function(err, items) {
        let url = `https://h4awl8tfn4.execute-api.us-west-2.amazonaws.com/Prod/Patient`
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
});

router.post('/', function(req, res, next) {
    db.insert(prepareItem(req.body), function(err, item) {
        res.json(item);
    });
});

router.put('/', function(req, res, next) {
    var item = prepareItem(req.body);

    db.update({ _id: item._id }, item, {}, function(err) {
        res.json(item);
    });
});

router.delete('/', function(req, res, next) {
    var item = prepareItem(req.body);

    db.remove({ _id: item._id }, {}, function(err) {
        res.json(item);
    });
});


module.exports = router;
