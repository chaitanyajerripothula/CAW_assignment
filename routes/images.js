const { get } = require("lodash");
const {download,imageToThumbnail} =  require('./../services/image.service');
const rootpath = require('app-root-path');
const path = `${rootpath}/lib/`


const _ = {
  post: async (req, res) => {
    download(req.body.uri,function(filename){
      imageToThumbnail(filename,function(filename){
        res.download(filename);
      })
      
    })
  }
};

module.exports = _;