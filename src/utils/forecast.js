const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=5bce1d19417bd9253e5a52bd278885f1&query="+ encodeURIComponent(latitude)+","+encodeURIComponent(longitude)
    request({url, json: true}, (error, response, body) => {
    
            if(error){
                callback('Sorry, could not connect to weatherstack server!', undefined)
            } else if (response.body.error){
                callback('Sorry, these is no latitude/longitude!', undefined)
            } else {
                // const data = JSON.parse(response.body)
                callback(undefined, "<img src='" + body.current.weather_icons[0]+"' /> <br>" + body.current.weather_descriptions +'. It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain'+'<br> It feels like ' + response.body.current.feelslike + ' out.<br>Humidity: ' + response.body.current.humidity + '%')
            }
        
    })   
}

module.exports=forecast
