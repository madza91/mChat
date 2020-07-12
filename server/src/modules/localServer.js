const expressApp = require('express')();
const config     = require('./config');
const debugging  = require('./debugging');

/**
 * Local API for external APIs
 */
module.exports = {
  run: () => {
    // Check for online user by SocketID
    expressApp.get('/user-check/:socketID', (req, res) => {
        const { socketID } = req.params;
        const isUser = !!userList.findBySocket(socketID)
        const status = isUser ? 200 : 404;

        res.json({ isUser }, status)
      }
    )

    expressApp.listen(config.LOCAL_API_PORT, () => {
      debugging.log(`Started local API server on port ${ config.LOCAL_API_PORT }`);
    })
  }
}
