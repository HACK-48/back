'use strict';
const config = require('config-yml'),
    server = require('./server');

server.listen(process.env.PORT);
console.log('Serveur ecoute sur le port ' + config.port);

server.on('error', err => {
    console.error(err);
});