const botEmit       = require('../../sockets/emit/botEmit');
const tableTemplate = require('../templates/tableTemplate');

/**
 * User is asking for help, bot responses to him
 * @param User
 * @param command
 */
module.exports = (User, command) => {
  if (command) {
    return emitSingleCommand(User, command);
  }

  return emitAllCommands(User);
};

/**
 * @param User
 * @param command
 */
emitSingleCommand = (User, command) => {
  const foundCommand = commandsList.find((item) => {
    return item.command === command
  })

  if (foundCommand) {
    const commandPrefix = commandIdentifier + command;
    const usage = foundCommand.params ? `${ commandPrefix} ${ foundCommand.params }` : commandPrefix;

    return botEmit(User, tableTemplate({
      command: command,
      usage: usage,
      description: foundCommand.description,
      permission: foundCommand.permission
    }));
  }

  return botEmit(User, `Command ${ command } is not existing, try /help for all available commands.`);
}

/**
 * @param User
 */
emitAllCommands = (User) => {
  botEmit(User, tableTemplate(commandsList.map(item => {
    return {
      k: commandIdentifier + item.command,
      v: item.description
    }
  })));
}
