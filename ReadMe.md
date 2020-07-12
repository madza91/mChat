# mChat
Very fast and light chat application written in NodeJS and VueJS, using SocketIO for connection.

## Features
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
* Emoji support
* Dark mode support

## Server requirements
* Apache
* Node / NPM
* WebSockets enabled on server

## Installation
You have to install both `client` and `server` in their directories:
* `npm install`

## Setup
Before starting the server and client, you need to set up .env for both server and client directory.

## Server & client start
Run these commands from project root:
* `server` directory: `npm start`
* `client` directory: `npm run serve`

## Client build
* `client` directory: `npm run build`

## Commands
The list of all available user commands that can do various things, as changing his nickname, status, or even channels topic.

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

## Socket messages
The server and client communicate with socket messages and every message has its unique type.

#### Server &#x27A1; Client
**Type**|**Sent to**|**Description**|**On event**
-----|:-----:|-----|:-----:
`channel_join`|Channel|Informs users that new user has joined channel|Join
`channel_leave`|Channel|Informs users that new user has left channel|Leave
`channel_message`|Channel|Sends a message to all users in selected channel|Message
`channel_system`|Channel|Sends system message to the Channel|System
`channel_topic`|Channel|Sends new channel topic information|System
`private_message`|User|Sends privately a message to selected user|Message
`private_system`|User|Sends privately a system message to selected user|Message
`server_channels`|User|Sends list of all channels|Connect
`server_command`|All/User|Sends specific command to user or all users|Command
`server_join`|All Users|Informs users that new user has joined mChat|Join
`server_leave`|All Users|Informs users that users has left mChat|Leave
`server_users`|User|Sends list of all online users|Connect
`server_validation`|User|Sends invalid nickname message|Connect
`server_welcome`|User|Welcomes new user with generated SocketID and chosen Nickname|Connect

#### Client &#x27A1; Server
**Type**|**Description**
----|----
`message`|Sends a command or message to channel/user

## More
For more information, visit `server/README.md` and `client/README.md`

## Helpful links
* [Chat demo](https://chat.madza.rs)
* [Official webpage](https://madza.rs)

## Credits
Written by Nemanja Madžovski (nemanja at madza dot rs)
