const path = require("path")
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsDirectoryPath = path.join(__dirname, "../templates/views")
const partialsDirectoryPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: "Weather",
        name: "Andrew Mead"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: "About",
        name: "Andrew Mead"
    })
})


app.get('/help', (req, res) => {
    res.render('help',{
        title: "Help",
        helpText: "This is some helpfull text",
        name: "Andrew Mead"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide a location"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        // console.log(data)
        if(error){
            return res.send({error})
        }
        // console.log('Location: ' + location)
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            console.log(forecastdata)
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })

})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:"You have to specify an search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

app.all('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("The server is up and running on port " + port)
})