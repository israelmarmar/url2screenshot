const Screenshot = require('url-to-screenshot')
const fs = require('fs')
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;  

app.get('/:url', function (req, res) {
console.log(req.params.url);


new Screenshot(decodeURI(req.params.url))
  .width(1200)
  .height(800)
  .capture()
  .then(img =>{
    fs.writeFileSync(__dirname + '/screen.png', img)
    console.log('open screen.png')
    res.sendFile(__dirname + '/screen.png');
  })

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