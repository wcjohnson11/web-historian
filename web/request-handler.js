var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  //serve index.html
  if (req.url === '/' || req.url[1] === '?') {
    var html =  fs.readFileSync(archive.paths.siteAssets + '/index.html');
    httpHelpers.serveAssets(res, html, 200);
  }
  //on get request
    //loop through sites file to srch for requested site
      //if exists, serve file
      //else if requested site in sites.txt
        //serve loading page
      //else write to sites.txt
      //serve loading page

  //res.end(archive.paths.list);
};
