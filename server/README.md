# mChat Server

Socket server for mChat application, that is using NodeJS and Socket.IO for communicating with the client.

### Server &#x27A1; Client
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
---

### Client &#x27A1; Server
**Type**|**Description**
----|----
`message`|Sends a command or message to channel/user
