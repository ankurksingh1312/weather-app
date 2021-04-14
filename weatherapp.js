const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/weatherapp.html");
    
});

app.post("/",function(req,res){
    var queryCity=req.body.cityName;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+queryCity+"&appid=40ee1bf15a3037e9fb3c334550119a60";
   https.get(url,function(res1){
        console.log(res1.statusCode);
        res1.on("data",function(data){
            const weatherData=JSON.parse(data);
            var weatherDataTemp=weatherData.main.temp-273.15;
            res.write(`<p> weather in ${queryCity} is ${weatherData.weather[0].description} </p>`);
            res.write(`<h1> temp in ${queryCity} is ${weatherDataTemp} </h1>`);
            var iconUrl="http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png";
            console.log(iconUrl);
            res.write(`<img src=${iconUrl}>`);
            res.send();
            
        });
       
    });


});


app.listen(3000,function(){
    console.log("server running at port 3000");
});
