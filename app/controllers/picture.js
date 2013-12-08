'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

exports.createPicture = function(req, res, next) {

  var fileExt, filePath;
  var newFileName, newFilePath;
  var shaSum = crypto.createHash('sha1');

  filePath = path.normalize(req.files.file.path);
  fileExt = path.extname(filePath);

  fs.readFile(filePath, function(err, data) {
    if(err) {
      next({code: 404, message: err});
    } else {

      newFileName = shaSum.update(data).digest('hex') + fileExt.toLowerCase();
      newFilePath = path.join(__dirname, '../../public/pictures/' + newFileName);

      console.log('New File Added to: ', newFilePath);

      fs.writeFile(newFilePath, data, function(err) {
        if(err) {
          next({code: 409, message: err});
        } else {
          res.jsonp(201, newFileName);
        }
      });
    }
  });

};

