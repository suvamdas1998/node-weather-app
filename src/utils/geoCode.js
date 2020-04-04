const request = require('request')

const geoCode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3V2YW1kYXMiLCJhIjoiY2s4a2M2azF0MDBjbzNvbnR3bXIwb2VteCJ9.iydYX-483ORKnX6AMnPhwA'

    request({ url, json: true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(body.features.length === 0){
            callback('Unaable to find location. Try new search.')
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode