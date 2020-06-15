# websocketChat
This is a very fast and tiny chat for group chat via web sockets.

### Features
* Channels / Group chat
* Private messaging
* Search online users
* Notifications
* 10 Commands (combined IRC and custom)
* Responsive design & Progressive Web Application
* Dark mode supported

### Installation
* npm install

### Server start
Run these commands from project root:
* `cd server; npm start` or `forever start server/src/app.js`
* `cd vue-client; npm run serve`

### Client build
* `cd vue-client; npm run serve`

### Chat commands
In this chat you can use commands starting with slash (/).

Available commands:

**Command**|**Description**
-----|-----
`/nick`|Allows you to change your chat nickname
`/whois`|Returns all available information about the user
`/away`|Changes your status to away with the message. If {message} is omitted, the away status is removed
`/me`|Sends an action message to the current channel or private window
`/hello`|Sends notice with shake animation to the user. If {nick} is omitted, it will be sent to all users
`/topic`|Allows you to set the channel topic
`/help`|Returns usage and description about command. If {command} is omitted, return all available commands
`/quit`|Disconnects you from chat. Aliases: disconnect, offline, exit
`/version`|Returns information about server build number
`/about`|Returns short note about mChat

### Requirements - Server
* apache
* node
* Websockets enabled on server

### Helpful links
* [Visit chat online](https://chat.madza.rs)

### Credits
Written by Nemanja Madžovski (nemanja at madza dot rs)
