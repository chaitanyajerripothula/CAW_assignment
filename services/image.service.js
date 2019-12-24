const fs = require('fs');
const request = require('request');
const uuidv4 = require('uuid/v4');
const rootpath = require('app-root-path');
const sharp = require('sharp');
const path = `${rootpath}/lib/`
const download = function(uri, callback){
  request.head(uri, function(err, res, body){
    const _path = path+`downloads/`;
    const filename = uuidv4().toString()+uri.substring(uri.lastIndexOf("."));
    request(uri).pipe(fs.createWriteStream(_path+filename)).on('finish', function() {
        callback(filename);
    });
  });
};

const imageToThumbnail = function(filename,callback){
    const _path = path+`modified_downloads/`;
    sharp(path+`downloads/`+filename).resize({ height: 50, width: 50 ,fit: 'fill'}).toFile(_path+filename)
    .then(function(newFileInfo) {
      callback(_path+filename)
    })
    .catch(function(err) {
    });
};

export   {download,imageToThumbnail};