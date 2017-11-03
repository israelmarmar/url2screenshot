var page = require('webpage').create();
page.open('https://davidwalsh.name/', function() {
  page.render('davidwalshblog.png');
  phantom.exit();
});