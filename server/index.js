'use strict';

const  express 		= require('express');
const bodyParser  	= require('body-parser');
const server 		= express();
const helmet 		= require('helmet');
const cors          = require('cors');

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `hack48-api.osc-fr1.scalingo.io`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

server.use(helmet());
server.use(cors({
    origin: '*',
}));
server.use(allowCrossDomain);

// parse application/x-www-form-urlencoded 
server.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// parse application/json 
server.use(bodyParser.json({limit: '50mb'}));

require('../routes')(server);

module.exports = server;