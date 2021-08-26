"use strict";

var request = require('request');

var forecast = function forecast(latitude, longitude, callback) {
  var url = 'http://api.weatherstack.com/current?access_key=3f60b673b2cfeb4898b6867d0c703c1f&query=' + latitude + ',' + longitude + '&units=f';
  request({
    url: url,
    json: true
  }, function (error, response) {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.");
    }
  });
};

module.exports = forecast;