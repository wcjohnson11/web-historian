var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var http = require('http');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  //serve index.html
  if (req.method === 'POST'){
    //var html =  fs.readFileSync(archive.paths.archivedSites + req.url, function(err, data) {if (err)});
    req.on('data', function(chunk){
      var slicedChunk = chunk.slice(4).toString();
      fs.open(archive.paths.archivedSites + '/' + slicedChunk, 'r', function(err, fd){
        if(err){//doesn't exist
          if (archive.isUrlInList(slicedChunk)) {//if exists in sites.txt
            console.log('hey');
            var loadingPage = 'loading.html';
            var loadingScript = '<script>window.location.href = "http://127.0.0.1:8080/' + loadingPage +'"</script>';
            httpHelpers.serveAssets(res, loadingScript, 302);
          } else {
            //write file to archive.paths.list
            //add \n so that each url is placed on a new line
            slicedChunk = slicedChunk + "\n";
            fs.writeFile(archive.paths.list, slicedChunk, function(err){
              if (err){
              httpHelpers.serveAssets(res,null,404);
              } else {
                //make it serve up the freshly archived site to replace
                //the loading site once the site has been archived by chron
                var loadingPage = 'loading.html';
                var loadingScript = '<script>window.location.href = "http://127.0.0.1:8080/' + loadingPage +'"</script>';
                httpHelpers.serveAssets(res, loadingScript, 302);
              }

            });
          }
        } else {
          var javastuff = '<script>window.location.href = "http://127.0.0.1:8080/' + slicedChunk +'"</script>';
          httpHelpers.serveAssets(res, javastuff, 200);
        }
      });


    });

    //if the data is not in sites.txt
    //  write to sites.txt
    //
    //
  } else if (req.method === 'GET'){
    if (req.url === '/loading.html') {
      fs.readFile(archive.paths.siteAssets + '/loading.html', function(err, data){
        if (err) {
          console.log(err);
        }
        httpHelpers.serveAssets(res, data, 200);
      });
    } else if(req.url === '/styles.css'){
      fs.readFile(archive.paths.siteAssets + '/styles.css', function(err, data){
        if (err) {
          console.log(err);
        }
        httpHelpers.serveAssets(res, data, 200);
       });
    } else if (req.url[1] !== undefined){
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
      fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data){
        if (err) {
          console.log(err);
        }
        httpHelpers.serveAssets(res, data, 200);
      });
  //serving the file
    }
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
