const expressApp = require('express')();
const localServer = require('./localServer');
const http       = require('http');
const https      = require('https');
const fs         = require('fs');
const socketIO   = require('socket.io')
const config     = require('./config');
const debugging  = require('./debugging');

/**
 * SocketIO Server
 * @returns {Server|undefined}
 */
module.exports = () => {
  localServer.run()

  return socketIO(server(), {
    path: '/',
    serveClient: false
  })
}

/**
 * Http Server
 * @returns {Server}
 */
server = () => {
  let server;

  /**
   * Create HTTP(S) server
   */
  if (config.SERVER_SSL_KEY && config.SERVER_SSL_CERT) {
    server = https.createServer({
      key: fs.readFileSync(config.SERVER_SSL_KEY),
      cert: fs.readFileSync(config.SERVER_SSL_CERT)
    }, expressApp);
  } else {
    debugging.log(`SSL Keys are not available, started not secure server`);
    server = http.createServer();
  }

  /**
   * Handle server exceptions
   */
  process.on('uncaughtException', error => {
    debugging.log(`Error: ${ error.message } (${ error.errno })`);
    console.log('error', error);
    process.exit(1);
  })

  process.on('exit', code => {
    debugging.log(`Server is turned off (code ${ code })`);
  })

  /**
   * Start listening
   */
  return server.listen(config.SERVER_PORT,() => {
    debugging.log(`Started server on ${ config.SERVER_HOST }, port ${ config.SERVER_PORT }`);
  });
}
