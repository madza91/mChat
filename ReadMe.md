# mChat
Very fast and light chat application written in NodeJS and VueJS, using SocketIO for connection.

### Features
* Channels / Group chat
* Private chat
* Search for online users & channels
* Native Web Notifications
* Commands (server & client)
* Animated Gifs (Giphy)
* Sending images (from device)
* Chatbot (assistant)
* Responsive design
* Progressive Web Application
* Native emoji support
* Dark mode support

### Installation
You have to install both `client` and `server` in their directories:
* `npm install`

### Setup
Before starting the server and client, you need to set up .env for both server and client directory.

### Server & client start
Run these commands from project root:
* `server` directory: `npm start`
* `client` directory: `npm run serve`

### Client build
* `client` directory: `npm run build`

### More
For more detailed information, visit server/README.md and client/README.md

**Command**|**Description**|**Destination**
-----|-----|-----
`/nick`|Allows you to change your chat nickname|server
`/whois`|Returns all available information about the user|server
`/away`|Changes your status to away with the message. If {message} is omitted, the away status is removed|server
`/me`|Sends an action message to the current channel or private window|server
`/hello`|Sends notice with shake animation to the user. If {nick} is omitted, it will be sent to all users|server
`/topic`|Allows you to set the channel topic|server
`/help`|Returns usage and description about command. If {command} is omitted, return all available commands|server
`/quit`|Disconnects you from chat. Aliases: `disconnect`, `offline`, `exit`|server
`/version`|Returns information about server build number|server
`/about`|Returns short note about mChat|server
`/giphy`|Search for any gif animation by query term|client

### Requirements - Server
* Apache
* Node / NPM
* WebSockets enabled on server

### Helpful links
* [Visit chat online](https://chat.madza.rs)

### Credits
Written by Nemanja Madžovski (nemanja at madza dot rs)
