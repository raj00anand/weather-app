const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/app.html");
    
});
app.post("/", function(req, res){
    
    
    const city = req.body.city;
    const unit = "metric";
    const apiKey = "182323fab195e022fa3214d150a25d12"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+apiKey;
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const img = weatherData.weather[0].icon
            res.write("<p>The weather is currently "+ des +"<img src=http://openweathermap.org/img/wn/"+img+"@2x.png></img></p>")
            res.write("<h1>The Temperature of "+city+" is "+ temp +" </h1>")
            res.send();
        })
    })
});


app.listen(3000, function(){
    console.log("Servere running on port 3000");
})