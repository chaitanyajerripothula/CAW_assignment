//Depenencies
const express = require("express");

//routing files
const def = require("./defaults");

const users = require("./../routes/users");
const images = require("./../routes/images");

const auth = require('./authmiddleware');

const _ = express.Router();

//tokens
_.post("/users/gettoken", users.post);
//json patch
_.patch("/users/username",auth.isAuthorized,users.patch);
_.all("/users", def._405);

//Image to Thumbnail
_.post("/images/getThumnail",auth.isAuthorized,images.post);



//404 handler
_.all("*", def._404);

module.exports = _;