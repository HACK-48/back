'use strict';

const  express 		= require('express');
const bodyParser  	= require('body-parser');
const server 		= express();
const helmet 		= require('helmet');
const cors          = require('cors');

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE, OPTION`);
  res.header(`Access-Control-Allow-Headers`, "Origin, X-Requested-With, Content-Type, Accept");
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