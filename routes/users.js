const { get } = require("lodash");
import { getToken} from './../services/user.service';
const RequestError = require('./../errors/request');


const _ = {
  post: async (req, res) => {
    try {
      if(!req.body.username || !req.body.password) {
        const code = 500;
        return res.status(code).json(new RequestError(code,"requires username and password"));
      }
      const token = await getToken(req.body);
      res.status(200).json(token);
    } catch (err) {
      res.status(500).end();
    }
  },
  patch:async (req,res)=>{
    try{
      if(!req.body.data || !req.body.patch) res.status(500).end();
      const data = req.body.data;
      Object.keys(req.body.patch).forEach(key=>{
        if(req.body.data.hasOwnProperty(key)){
          data[key]=req.body.patch[key];
        }
      })
      res.status(200).json(data);
    }catch(err){
      res.status(500).end();
    }
      }
};

module.exports = _;