const Screenshot = require('url-to-screenshot')
const fs = require('fs')
const app=require("express")
 


app.get('/', function (req, res) {

new Screenshot('http://g1.globo.com/')
  .width(800)
  .height(600)
  .clip()
  .capture()
  .then(img =>{
    fs.writeFileSync(__dirname + '/example.png', img)
    console.log('open example.png')
  })

})

app.listen(port, function () {
 console.log("ligado");
});