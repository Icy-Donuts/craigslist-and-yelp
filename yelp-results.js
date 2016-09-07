var apiKey = require('./api-key.js');
var request = require('request');
var OAuth   = require('oauth-1.0a');
var sampleYelpResults = require('./yelp-results.json');
var yelp = require('node-yelp');

// given a place and a search term, return a list of the top 20 results
//var oauth = OAuth({
//  consumer: {
//    public: apiKey.Consumer_Key,
//    secret: apiKey.Consumer_Secret,
//  },
//  signature_method: 'HMAC-SHA1',
//});
//var searchYelp = function(term, location) {
//var client = yelp.createClient({
//oauth: {
//'consumer_key': apiKey.Consumer_Key,
//'consumer_secret': apiKey.Consumer_Secret,
//'token': apiKey.Token,
//'token_secret': apiKey.Token_Secret,
//}
//})
//// var location = req.body.location;
//var location = 'sanfrancisco' // from user's input
// var term = req.body.term;
//var term = 'museum' // from user's input

//var token = {
//  public: apiKey.Token,
//  secret: apiKey.Token_Secret
//};

//var data;
//var yelpResults;
//var makeYelpRequest = function(location, term) {
//var request_data = {
//// returned results are hard coded as 10 per request
////url: 'https://api.yelp.com/v2/search?location=' + location + '&term=' + term + '&limit=10',
//url: 'https://api.yelp.com/v2/search',
//method: 'GET',
//};
//request({
//url: request_data.url,
//method: request_data.method,
//headers: [
//oauth.toHeader(oauth.authorize(request_data, token))
//],
//qs: {
//term: term,
//limit: 10,
//sort: 2,
//location: location,
//},

//client.search({
//terms: term,
//limit: 10,
//sort: 2,
//location: location,
//}).then(function(body) {
//if (error) { throw error };
//var data = [];
//// console.log(body);
//resData = JSON.parse(body);
//console.log(resData);
//for (var i = 0; i < resData.businesses.length; i++) {
//data.push({
//name: resData.businesses[i].name,
//rating: resData.businesses[i].rating,
//reviewCount: resData.businesses[i].review_count,
//url: resData.businesses[i].url,
//phone: resData.businesses[i].display_phone,
//address: resData.businesses[i].location.display_address,
//neighborhoods: resData.businesses[i].location.neighborhoods
//});
//}
//console.log(data.region.businesses);
//return yelpResults = data.businesses;
//});
//};
//
var request = require('request');
var request_data = {
  method: 'GET',
  url: 'https://api.yelp.com/v2/search'
}
var searchYelp = function(term, location) {
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
      return console.log('it got fucked: ', err);
    }
    var data = [];
    console.log('success: ', response.body);
    resData = JSON.parse(body);
    console.log(resData);
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
    console.log(data.region.businesses);
    return yelpResults = data.businesses;
  });
};
searchYelp('san francisco', 'matcha');
  /*
     var getNeighborhoods = function(results) {
     var neighborhoodCount = {};
     console.log(results);
     results.map(function(item, index) {
     for (var i = 0; i < item.neighborhoods.length; i++) {
     if (!neighborhoodCount[item.neighborhoods[i]]) {
     neighborhoodCount[item.neighborhoods[i] = [item]];
     }
     else {
     neighborhoodCount[item.neighborhoods[i]].push(item);
     }
     }
     });
     console.log(neighborhoodCount);
     return neighborhoodCount;
     };

     var neighborhoods = getNeighborhoods(sampleYelpResults);
     */
