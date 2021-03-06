const express = require("express");
const {validator} = require('/src/helpers')
const {createHash} = require('/src/service/passwordManager');
const {makeAuthRoutes} = require("./auth");
const {makeUserRoutes} = require("./user");
const {makeGameRoutes} = require("./games");
const {makeShopRoutes} = require("./shop");

const makeRoutes = ({database}) => {
   const router = express.Router();
   
   router.use("/api/auth", makeAuthRoutes({database, validator, createHash}));
   router.use("/api/user", makeUserRoutes({database, createHash}));
   router.use("/api/games", makeGameRoutes({database}));
   router.use("/api/shop", makeShopRoutes({database}));
   return router;
}

module.exports = {makeRoutes};