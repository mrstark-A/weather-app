const { json } = require("express");
const request = require("request");
const constants = require("../config");

const weatherData = (address, callback) => {
  const url =
    constants.openWheatherMap.BASE_URL +
    encodeURIComponent(address) +
    "&appid=" +
    constants.openWheatherMap.SECRET_KEY;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log("can't find fetch dat from open weather map api", undefined);
    } else if (
      !body.main ||
      !body.main.temp ||
      !body.name ||
      !body.weather ||
      !body.sys
    ) {
      callback("Unable to find required data, try another location", undefined);
    } else {
      callback(undefined, {
        temperature: body.main.temp,
        description: body.weather[0].description,
        cityName: body.name,
        country: body.sys.country,
      });
    }
  });
};

module.exports = weatherData;
