'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

exports.createPicture = function(req, res) {

  var fileExt, filePath;
  var newFileName, newFilePath;
  var shasum = crypto.createHash('sha1');

  filePath = path.normalize(req.files.file.path);
  fileExt = path.extname(filePath);

  fs.readFile(filePath, function(err, data) {
    if(err) {
      res.jsonp(404, {message: err});
    } else {
      // Using photo data for uniqueness, this way if two users upload same picture
      // picture will be re-used. TODO <-- is this good? or should we use a random seed?
      // prev TODO : For example shasum.update(crypto.randomBytes(20))?
      newFileName = shasum.update(data).digest('hex') + fileExt.toLowerCase();
      newFilePath = path.join(__dirname, '../../public/pictures/' + newFileName);

      console.log('New File Added to: ', newFilePath);

      fs.writeFile(newFilePath, data, function(err) {
        if(err) {
          res.jsonp(409, {message: err});
        } else {
          res.jsonp(201, newFileName);
        }
      });
    }
  });

};

