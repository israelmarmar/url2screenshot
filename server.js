const Screenshot = require('url-to-screenshot')
const fs = require('fs')
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;  

app.get('/http://:url', function (req, res) {
console.log(req.params.url);

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

})


app.get('/https://:url', function (req, res) {
console.log(req.params.url);

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

})



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