const fs = require('fs');
const config = require('./config')
const FileType = require('file-type');

/**
 * ToDo Implement file save and socket logic
 * @param socket
 * @param data
 * @param messageId
 */
module.exports = (socket, data, messageId) => {
  const file = data.attachment;

  const nesto = async () => {
    const fileType = await FileType.fromBuffer(file)
    const filename = `${messageId}.${fileType.ext}`;

    fs.writeFile(`${ config.ATTACHMENT_PATH }/${ filename }`, file, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  };

  nesto();
}
