const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const port = process.env.PORT || 3000;
const validUrl = require('valid-url');

var parseUrl = function(url) {
    url = decodeURIComponent(url)
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'http://' + url;
    }

    return url;
};

app.get('/', function(req, res) {
    var urlToScreenshot = parseUrl(req.query.url);

    if(req.headers.referer=="https://israelmarmar.com/portifolio/"){
    if (validUrl.isWebUri(urlToScreenshot)) {
        console.log('Screenshotting: ' + urlToScreenshot);
        (async() => {
            const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage','--single-process']
            });

            const page = await browser.newPage();
            
            await page.setViewport({ width: 1440, height: 900 });

            await page.goto(urlToScreenshot);

            if(req.query.delay)
            await page.waitFor(parseInt(req.query.delay));
            
            await page.evaluate(() => {
               let dom = document.querySelector('#main-header');
                if (dom){
                    dom.innerHTML = "";
                    dom.classList.remove("main-header");
                }
            });

            
            await page.screenshot().then(function(buffer) {
                res.setHeader('Content-Disposition', 'attachment;filename="' + urlToScreenshot + '.png"');
                res.setHeader('Content-Type', 'image/png');
                res.send(buffer);
            });

            await browser.close();
        })();
    } else {
        res.send('Invalid url: ' + urlToScreenshot);
    }
        
  }else{
  console.log({msg:"Origin is not allowed"});
  res.json({msg:"Origin is not allowed"});
  }

});

app.listen(port, function() {
    console.log('App listening on port ' + port)
})
