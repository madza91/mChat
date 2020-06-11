module.exports = {
  run: (User, statusMessage) => {
    console.log('Away command:', User, statusMessage)

    const tmpStatus = (statusMessage === '') ? 'online' : 'away';
    const foundUser = userList.findByNick(User.nick);
    foundUser.status = tmpStatus;
    foundUser.statusMessage = statusMessage;

    return {
      type: 'command',
      command: 'status',
      userId: User.id,
      status: tmpStatus,
      message: statusMessage
    };
  }
};
