const config = require('../config/config');
const request = require('request');

exports.testAPI = function(req, res){
    console.log("in yelp test api controller cb");
}

exports.autocompleteGen = function(req, res){
    const options = {
      url: 'https://api.yelp.com/v3/autocomplete?text=' + req.query.search,
      headers: {
        'Authorization': 'Bearer ' + config.yelp.ACCESS_TOKEN
      }
    };
    
    request(options, function (error, response, body) {
        if(error == null)
            res.send(body);    
        else 
            console.log(error);
    });
};

exports.searchByKeyword = function(req, res){
    const options = {
      url: 'https://api.yelp.com/v3/businesses/search?term=' + req.query.search + "&latitude=" + req.query.lat + "&longitude=" + req.query.long,
      headers: {
        'Authorization': 'Bearer ' + config.yelp.ACCESS_TOKEN
      }
    };
    
    request(options, function (error, response, response) {
        if(error == null) 
        {
            const json_resp = JSON.parse(response);
            res.send(json_resp.businesses);    
        }
        else 
        {
            console.log(error);
        }
    });
}

exports.businessDetails = function(req, res) {
    const options = {
      url: 'https://api.yelp.com/v3/businesses/' + req.query.id,
      headers: {
        'Authorization': 'Bearer ' + config.yelp.ACCESS_TOKEN
      }
    };
    
    request(options, function (error, response, response) {
        if(error == null) 
        {
            const json_resp = JSON.parse(response);
            res.send(json_resp);    
        }
        else 
        {
            console.log(error);
        }
    });
}

exports.businessReviews = function(req, res) {
    const options = {
      url: 'https://api.yelp.com/v3/businesses/' + req.query.id + '/reviews',
      headers: {
        'Authorization': 'Bearer ' + config.yelp.ACCESS_TOKEN
      }
    };
    
    request(options, function (error, response, response) {
        if(error == null) 
        {
            const json_resp = JSON.parse(response);
            res.send(json_resp);    
        }
        else 
        {
            console.log(error);
        }
    });
}