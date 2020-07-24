const debugging = require('./debugging');
const config = require('./../modules/config');
const { ClientCredentials } = require('simple-oauth2');

/**
 * oAuth2 wrapper - get access token, refresh it...
 * @returns {string}
 */
module.exports = () => {
  debugging.log('Getting oAuth access token...')
  getOAuthToken().then((accessToken) => {
    debugging.log('Successfully received oAuth Token');

    // Set global variable
    global.oAuthToken = accessToken
  })
}

getOAuthToken = async () => {
  const client = new ClientCredentials({
    client: {
      id: config.M_API_OAUTH_CLIENT_ID,
      secret: config.M_API_OAUTH_CLIENT_SECRET
    },
    auth: {
      tokenHost: config.M_API_HOST,
      tokenPath: config.M_API_OAUTH_PATH
    }
  });

  try {
    return await client.getToken({
      scope: '*',
    })
  } catch (error) {
    debugging.log('Error getting oAuth token:', error.message);
  }
}
