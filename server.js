const Screenshot = require('url-to-screenshot')
const fs = require('fs')
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;  

app.get('/http://:url', function (req, res) {
console.log(req.params.url);

if(req.headers.origin=="https://israelmarmar.github.io"){
new Screenshot("http://"+req.params.url)
  .width(800)
  .height(600)
  .clip()
  .capture()
  .then(img =>{
    fs.writeFileSync(__dirname + '/screen.png', img)
    console.log('open screen.png')
    res.sendFile(__dirname + '/screen.png');
  })
}else{
	res.json({"msg": "Permission denied. Unidentified origin"});
}

})


app.get('/https://:url', function (req, res) {
console.log(req.params.url);

if(req.headers.origin=="https://israelmarmar.github.io"){
new Screenshot("https://"+req.params.url)
  .width(800)
  .height(600)
  .clip()
  .capture()
  .then(img =>{
    fs.writeFileSync(__dirname + '/screen.png', img)
    console.log('open screen.png')
    res.sendFile(__dirname + '/screen.png');
  })
}else{
	res.json({"msg": "Permission denied. Unidentified origin"});
}

})

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });


app.get('/cons/https://:url', function (req, res) {
console.log(req.params.url);
console.log(req.headers);
    res.json(req.headers);


})



app.get('/cons/http://:url', function (req, res) {
console.log(req.params.url);
console.log(req.headers);
    res.json(req.headers);


})

app.listen(port, function () {
 console.log("ligado");
});