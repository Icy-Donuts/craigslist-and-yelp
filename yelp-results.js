var apiKey = require('./api-key.js');
var request = require('request');
var OAuth   = require('oauth-1.0a');
var sampleYelpResults = require('./yelp-results.json');
var yelp = require('node-yelp');

var request = require('request');
var searchYelp = function(location, term) {
  var request_data = {
    method: 'GET',
    url: 'https://api.yelp.com/v2/search?'
  }

  request({
    url: request_data.url,
    method: request_data.method,
    oauth: {
      consumer_key: apiKey.Consumer_Key,
      consumer_secret: apiKey.Consumer_Secret,
      token: apiKey.Token,
      token_secret: apiKey.Token_Secret,
      signature_method: 'HMAC-SHA1',
    },
    qs: {
      location: location,
      term: term,
      limit: 10,
      sort: 2,
    }
  }, function(err, response, body) {
    if (err) {
      return console.log('Error: ', err);
    }
    var data = [];
    console.log('success: ', response.body);
    resData = JSON.parse(body);
    for (var i = 0; i < resData.businesses.length; i++) {
      data.push({
        name: resData.businesses[i].name,
        rating: resData.businesses[i].rating,
        reviewCount: resData.businesses[i].review_count,
        url: resData.businesses[i].url,
        phone: resData.businesses[i].display_phone,
        address: resData.businesses[i].location.display_address,
        neighborhoods: resData.businesses[i].location.neighborhoods
      });
    }
    return data;
  });
};

var getNeighborhoods = function(results) {
  var neighborhoodCount = {};
  results.map(function(item, index) {
    for (var i = 0; i < item.neighborhoods.length; i++) {
      if (!neighborhoodCount[item.neighborhoods[i]]) {
        neighborhoodCount[item.neighborhoods[i]] = 1;
      } else {
        neighborhoodCount[item.neighborhoods[i]]++;
      }
    }
  });
  var neighborhoods = [];
  for (neighborhood in neighborhoodCount) {
    neighborhoods.push({neighborhood: neighborhood, value: neighborhoodCount[neighborhood]});
  }
  sortedNeighborhoods = neighborhoods.sort(function(a, b) {
    return b.value - a.value;
  });
  var top3 = sortedNeighborhoods.slice(0, 3);
  console.log(top3);
  return top3;
};


getNeighborhoods(sampleYelpResults);
