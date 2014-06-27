var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
exports.sendRedirect = function(res, loc, status){
  status = status || 302;
  res.writeHead(status, {Location: loc});
  res.end();
};

exports.readListOfUrls = function(list, theURL){
  list = list.split('\n');
  for (var i = 0; i < list.length; i++) {
    if (theURL === list[i]) {
      return true;
    }
  }
  return false;
};

exports.isUrlInList = function(theURL){
  var found = false;
  //putting in the encoding to force data into a string
  fs.readFile(exports.paths.list, {encoding: "utf8"}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      found = exports.readListOfUrls(data, theURL);
    }
    return found;
  });
  // jsafsdf(){found = true}
  // return found
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
  // var found = false;
  // jsafsdf(){found = true}
  // return found
};

exports.downloadUrls = function(){
};
