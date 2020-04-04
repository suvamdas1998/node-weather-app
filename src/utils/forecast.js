const request = require('request')

const forecast = (address, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=1c600e4f09b1ab2441a9bd7c3ab002a3&query='+ encodeURIComponent(address)

    request({ url, json: true }, (error, {body})=>{
        if(error){
            callback('Unable to find weather services!', undefined)
        }
        else if(body.error){
            callback('Unable to find Location. Try new search.', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions + '. It is '+ body.current.temperature+ ' degrees. There is a '+ body.current.precip+'% chance of rain')
        }
    })

}

module.exports = forecast