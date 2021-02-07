const express= require("express");
const https= require('https');
const bodyParser= require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html")
  
});

app.post("/", (req ,res)=>{
  const query =req.body.cityname;
    const units ="metric";

const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid=a287acd2e785d4d93cbff4935045e57e&units="+units+"#";
https.get(url, (response)=>{
    console.log(response.statusCode);
    response.on("data", (data)=>{
       const weatherData= JSON.parse(data);
       const discription= weatherData.weather[0].description;
       const temp = weatherData.main.temp;
       console.log(discription);
       res.write("<h1>the description of weather of "+query+" is " +discription+ " </h1>")
       res.write("<p> the temp of the "+query+" is "+ temp+" degree celcius.</p>")
    }); 
});
});


app.listen(2000 , ()=>{
console.log("server is run on port 3000");
});
