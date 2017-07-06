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
    });
};
