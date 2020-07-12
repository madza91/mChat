const expressApp = require('express')();
const config     = require('./config');

/**
 * Local API for external APIs
 */
module.exports = {
  run: () => {
    // Route
    expressApp.get('/user-check/:socketId', (req, res) => {
        const { socketId } = req.params;
        const isUser = !!userList.findBySocket(socketId)
        res.json({ isUser })
      }
    )

    expressApp.listen(config.LOCAL_API_PORT, () => {
      console.log(`Listening port ${config.LOCAL_API_PORT}`)
    })
  }
}
