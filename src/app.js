const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geoCode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicPathDirectory))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name:'Suvam Das'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Suvam Das'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        name: 'Suvam Das',
        message: 'This page will provide you with the solutions to the problem you are facing.'
    })
})

//app.com/weather
app.get('/weather', ({query}, res)=>{
    if(!query.address){
        return res.send({
            error: 'Must provide address!'
        })
    }
    
        geoCode(query.address, (error, {latitude, longitude, placeName}={})=>{
            if(error){
                return res.send({error})
                }
                
                    forecast(query.address, (error, forecastData) =>{
                        if(error){
                            return res.send({error})
                        }
                        
                            res.send({
                                latitude,
                                longitude,
                                location: placeName,
                                forecastData
                            })
                        
                    })
                
            })
      
    })
   

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Must provide search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title:'ERROR 404! ',
        message: 'Help page article found.',
        name:'Suvam Das'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 'ERROR 404!',
        message: 'Page not found.',
        name:'Suvam Das'
    })
})

app.listen(port, ()=>{
    console.log('Server is up at port ' + port)
})