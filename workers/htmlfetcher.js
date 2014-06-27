var http = require('http');
var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('../web/http-helpers.js');
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to ac{tually download the urls you want} to download.

//loop through sites.txt
  //try to open each file
  //if it opens
    //don't do nothin
  //else
    //download that varmint
    //
    //

fs.readFile(archive.paths.list, {encoding: "utf8"}, function(err, data){
  if (err) {throw err;}
  else {
    var arr = data.split('\n');
    console.log(arr.length);
    for (var i = 0; i < arr.length; i++){
      fs.open(archive.paths.archivedSites + '/' + arr[i], "r", function(err, fd){
        if (err){
          scrapeHTML('www.cnn.com');
        }
      });
    }
  }



});

function scrapeHTML(urlName){
  console.log('http://' + urlName)
  http.get('http://' + urlName, function(res) {
    var data = '';
    res.on('data', function(datum){
      data += datum;
    });
    res.on('end', function(error){
      if (error) {throw error;}
      else {
        fs.writeFile(archive.paths.archivedSites + '/' + urlName, data, function(err){
          if (err) {throw error;}
          httpHelpers.serveAssets(res, data, 302)
        });
      }
    });
  }).on('error', function(error){
    console.log(error);
  });
}
    //store in sites folda
