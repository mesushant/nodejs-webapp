const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// define path for express config
const staticPath = path.join(__dirname, '../public');
const viewsPath= path.join(__dirname, '../templates/views');
const partialsPath= path.join(__dirname, '../templates/partials');


const app = express();
console.log(staticPath);

// setup handle bar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve static files
app.use(express.static(staticPath));  


app.get('', (req, res)=>{
    const msg = {forecast:"Its raining now", location:"Pune"};
    res.render('index',{
        title: "Weather app",
        name: "Sushant"
    });
});



app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About Me",
        info: "Sushant Ghige"
    });
});


app.get('/weather', (req, res)=>{
    if (!req.query.address){
        console.log("No address  provided");    
        return res.send({error:"Please provide the address"});
    }

    geocode(req.query.address, (error, {lattitude, longitude, location}={})=>{
        if (error){
            return res.send({error:" Provide valiid address"});
        }
        forecast(lattitude, longitude, (error, forcastData)=>{
            if(error){
                return res.send(error);
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })

});

app.get('/products', (req, res)=>{
    if (!req.query.search){
        console.log("No serach term provided");    
        return res.send({error:"Please provide the search term"});
         
    }
    console.log(req.query.key);
    res.send({products:[]});
});

app.get('/help', (req, res)=>{
    res.render('help',{
        title: "Help",
        info: "Help content"
    });
});

app.get('/help/*', (req, res)=>{

    res.send("Help article not found")
});

app.get('*', (req, res)=>{

    res.render('notfound',{
        title:"This page doesnot exists",
         name:"Error: 404"    
    });
});

app.listen(5000, ()=>{
    console.log("server started on port 5000...");
});

