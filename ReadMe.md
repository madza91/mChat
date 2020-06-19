# websocketChat
This is a very fast and tiny chat for group chat via web sockets.

### Features
* Channels / Group chat
* Private messaging
* Search for online users & channels
* Notifications
* 10 Commands (combined IRC and custom)
* Responsive design & Progressive Web Application
* Dark mode supported

### Installation
Run these commands from project root:
* `cd server; npm install`
* `cd vue-client; npm install`

### Setup
Before starting server and client, you need to set up .env for both server and client folder

### Server start
Run these commands from project root:
* `cd server; npm start` or `forever start server/src/app.js`
* `cd vue-client; npm run serve`

### Client build
* `cd vue-client; npm run serve`

### More
For more detailed information, visit server/README.md and vue-client/README.md

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
