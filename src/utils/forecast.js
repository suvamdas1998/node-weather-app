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
            callback(undefined, 'The weather condition is ' + body.current.weather_descriptions +'. '+
                 'The temperature is ' + body.current.temperature + ' degrees. '+
                 'It feels like '+body.current.feelslike+' degrees. '+
                 'The wind speed is '+body.current.wind_speed+' kph. '+
                'The wind direction is '+body.current.wind_dir+'. '+
                'The humidity is '+body.current.humidity+'%. '+
                'Precipitation is '+body.current.precip+' cm. '+
                 'The UV index is '+body.current.uv_index+'. '
            )
        }
    })

}

module.exports = forecast