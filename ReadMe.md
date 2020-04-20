# websocketChat
This is a very fast and tiny chat for group chat via web sockets.

## Features
* Group chat
* Private chat
* Sending (upload) image files
* Search online users
* Sending browser notifications
* Sound on received message
* Commands (combined IRC and custom)
* PWA Enabled

## Installation
* npm install

## Server start
* `npm start` or `forever start server/server.js`

## Chat commands
In this chat you can use commands starting with slash (/).
Available commands:
* nick - IRC command
* me - IRC command
* hello - Shake your nickname in users list and sends notification to all users
* away - IRC command
* exit, disconnect, quit - Disconnects from chat
* whois - IRC command
* simulate - Simulate joining new users (bots)
* help - Get list of all available commands

## Requirements - Server
* npm
* node
* socket.io
* Websockets enabled on server

## Helpful links
* [Visit chat online](https://chat.madza.rs)

## Credits
Written by Nemanja Madžovski (nemanja at madza dot rs)