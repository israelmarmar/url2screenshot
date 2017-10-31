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

var options = {
  quality:30,
  defaultWhiteBackground: "true"
};
 
 console.log(req.params.url);

var renderStream = webshot(req.params.url, options);
var file = fs.createWriteStream('screen.jpeg', {encoding: 'binary'});
 
renderStream.on('data', function(data) {
  file.write(data.toString('binary'), 'binary' ,function(err){
    console.log("gravado");
    res.json({msg: "gravado"});
    res.end();
    file.close();
  });

});




});

app.listen(port, function () {
 console.log("ligado");
});