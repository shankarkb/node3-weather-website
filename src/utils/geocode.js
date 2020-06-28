const request = require("request")

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmhhdmFuaWticzc5IiwiYSI6ImNrOXNraTltZjE0eGYzaG4xbGRkMzM0bHIifQ.5okgMPxTwq7eQEW-0y_8uA&limit=1'
    console.log(url)
    request({url, json:true},(error, response) => {
        if(error){
            callback('Unable to connect to the server!', undefined)
        }else if(response.body.features.length<1){
            callback('No matching data found. Try another search!', undefined)
        }else{
            callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode