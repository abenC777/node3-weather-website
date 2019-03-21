const path = require("path")
const express = require('express')
const hbs = require('hbs')
const request = require('request')

// geocode and forecast functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aben Cermeno'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Aben Cermeno'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Aben Cermeno'
    })
})

app.get('/weather', (req, res) => {
    const locationEntered = req.query.address
    if (!locationEntered) {
        return res.send({
            error: 'You must provide an address to search'
        })
    }
    geocode(locationEntered, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                'forecast': forecastData,
                'Address entered': locationEntered
            })

        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help Page not found',
        errorMessage: 'Help article not found',
        name: 'Aben Cermeno'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page not found',
        errorMessage: 'Page not found',
        name: 'Aben Cermeno'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
