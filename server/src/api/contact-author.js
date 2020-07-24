const config = require('./../modules/config');
const axios = require('axios');

/**
 * Call mAPI - contact-author
 */
module.exports = (subject, content) => {
  if (oAuthToken) {
    axios({
      method: 'post',
      url: `${config.M_API_HOST}/mchat/contact-author`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${oAuthToken.token.access_token}`
      },
      data: {
        subject,
        content
      }
    }).then(data => {
      console.log('Success:', data.data)
    }).catch(err => {
      console.log('Error:', err.response.statusText)
    })
  }
}
