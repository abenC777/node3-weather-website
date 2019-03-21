const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/a88355f5b50f3de6ae4dbd69263b0ede/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary}
            The highest temperature for today can be ${body.daily.data[0].temperatureHigh} degrees and the lowest ${body.daily.data[0].temperatureLow} degrees. It is currently ${body.currently.apparentTemperature} degrees out. There is a ${body.currently.precipProbability * 100}% chance of rain.`)
        }
    })
}

module.exports = forecast