const fs = require('fs')
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;  

var webshot = require('webshot');

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

app.get('/:url', function (req, res) {

var renderStream = webshot(req.params.url);
var file = fs.createWriteStream('screen.jpg', {encoding: 'binary'});
 
renderStream.on('data', function(data) {
  file.write(data.toString('binary'), 'binary');
  res.sendFile(__dirname+"/screen.jpg");
});

});

app.listen(port, function () {
 console.log("ligado");
});