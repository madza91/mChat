const expressApp = require('express')();
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
    // ToDo Make server for serving images
    // expressApp.get('/', (req, res) => res.send('Hello world'))
    // expressApp.listen(4000, () => {
    //   console.log('Listening port 4000')
    // })

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

  /**
   * Start listening
   */
  return server.listen(config.SERVER_PORT,() => {
    debugging.log(`Started server on ${ config.SERVER_HOST }, port ${ config.SERVER_PORT }`);
  });
}
