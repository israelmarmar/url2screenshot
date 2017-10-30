const Screenshot = require('url-to-screenshot')
const fs = require('fs')
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;  

app.get('/', function (req, res) {
console.log(req);
new Screenshot(req.query.url)
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

app.listen(port, function () {
 console.log("ligado");
});