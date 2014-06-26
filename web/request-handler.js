var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var http = require('http');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  //serve index.html
  if (req.method === 'POST'){
    //var html =  fs.readFileSync(archive.paths.archivedSites + req.url);
    if (true){
      req.on('data', function(chunk){
        var chunk = chunk.slice(4).toString();
        var javastuff = '<script>window.location.href = "http://127.0.0.1:8080/' + chunk +'"</script>';
        httpHelpers.serveAssets(res, javastuff, 200);
      })
    }
    //get the data
    //if the data is in sites
    //  serve file
    // call get
    //if the data is not in sites.txt
    //  write to sites.txt
    //
    //
  } else if (req.method === 'GET'){
    if (req.url[1] !== undefined){
      fs.readFile(archive.paths.archivedSites + req.url, function(err,data) {
        if (err){
          console.log("Yarrrrrg, here there be errorrs");
        } else {
          console.log(data);
          httpHelpers.serveAssets(res, data, 200);
        }
      });
    }
    if (req.url === '/') {
      var html =  fs.readFileSync(archive.paths.siteAssets + '/index.html');
      httpHelpers.serveAssets(res, html, 200);
    } else if(req.url === '/styles.css'){
       var css = fs.readFileSync(archive.paths.siteAssets + '/styles.css');
       httpHelpers.serveAssets(res, css, 200);
    }
  //serving the file
  }

    //loop through sites file to srch for requested site
      //if exists, serve file
      //else if requested site in sites.txt
        //serve loading page
      //else write to sites.txt
      //serve loading page

 //res.end(archive.paths.list);
};
//fs.existSync(filepath)

//blah = fs.createReadStream(filename)
//blah.on ('open')
//blah.pipe(res)

