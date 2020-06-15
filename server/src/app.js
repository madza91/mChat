/**
 * This is server file for mChat
 * This server uses Node and Socket.io
 * Author: Nemanja Madžovski
 * Date: 21.05.2020
 */

// Classes
const Users    = require('./classes/Users');
const Channels = require('./classes/Channels');

// Data
const Commands = require('./data/commands.json');

// Modules
const eventConnect = require('./sockets/events/connectEvent');
const eventMessage = require('./sockets/events/messageEvent');
const eventLeave   = require('./sockets/events/leaveEvent');

// Globals
global.io                = require('./modules/server')();
global.commandIdentifier = '/';
global.incMessage        = 0;
global.incChannel        = 0;
global.incUser           = 0;
global.serverBuild       = new Date();
global.userList          = new Users();
global.channelList       = new Channels();
global.commandsList      = Commands;

/**
 * New Client connection
 */
io.on('connect', function (Socket) {
    /**
     * Handle new Client
     */
    eventConnect(Socket);

    /**
     * Message from Client
     * It can be message for channel, private to user or command
     */
    Socket.on('message', (data) => {
        eventMessage(Socket, data);
    });

    /**
     * Client error
     */
    Socket.on('error', () => {
        eventLeave(Socket);
    });

    /**
     * Client has been disconnected
     */
    Socket.on('disconnect', () => {
        eventLeave(Socket);
    });
});
