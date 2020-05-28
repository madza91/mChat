/**
 * This is server file for mChat
 * This server uses Node and Socket.io
 * Author: Nemanja Madžovski
 * Date: 21.05.2020
 */

// Classes
const Users    = require('./classes/Users');
const Channels = require('./classes/Channels');

// Modules
const eventConnect = require('./sockets/events/connectEvent');
const eventMessage = require('./sockets/events/messageEvent');
const eventLeave   = require('./sockets/events/leaveEvent');

// Globals
global.io          = require('./modules/server')();
global.incremental = 0;
global.userList    = new Users();
global.channelList = new Channels();

/**
 * New Client connection
 */
io.on('connect', function (socket) {
    /**
     * Handle new Client
     */
    eventConnect(socket);

    /**
     * Message from Client
     * It can be message for channel, private to user or command
     */
    socket.on('message', (data) => {
        eventMessage(socket, data);
    });

    /**
     * Client error
     */
    socket.on('error', () => {
        eventLeave(socket);
    });

    /**
     * Client has been disconnected
     */
    socket.on('disconnect', () => {
        eventLeave(socket);
    });
});
