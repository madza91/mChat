/**
 * Socket server for mChat app
 * @type {app}
 */

const expressApp = require('express')();
const https      = require('https');
const fs         = require('fs');
const config     = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const request    = require('request');
const debugging  = require('./modules/debugging');

// HTTPS Server
const secureServer = https.createServer({
  key: fs.readFileSync(config.server.sslKey),
  cert: fs.readFileSync(config.server.sslCert)
}, expressApp);

secureServer.listen(config.server.port, () => {
  debugging.log(`Started server on ${config.server.host}, port ${config.server.port}`);
});

// Socket Server
const io = require('socket.io')(secureServer, {
  path: '/',
  serveClient: false
});

io.on('connection', function (socket) {

})
