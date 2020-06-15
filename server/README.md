# mChat Server

Socket server for mChat application, that is using NodeJS and Socket.IO for communicating with the client.

### Server &#x27A1; Client
**Type**|**Sent to**|**Description**|**On event**
-----|:-----:|-----|:-----:
`channels_list`|User|Sends list of all channels|Connect
`users_list`|User|Sends list of all online users|Connect
`welcome`|User|Welcomes new user with generated SocketID and chosen Nickname|Connect
`channel`|Channel|Sends a message to all users in selected channel|Message
`private`|Channel|Sends privately a message to selected user|Message
`channel_join`|All Users|Informs users that new user has joined channel|Join
`channel_leave`|All Users|Informs users that new user has left channel|Join
`server_join`|All Users|Informs users that new user has joined mChat|Join
`server_leave`|All Users|Informs users that users has left mChat|Leave

---

### Client &#x27A1; Server
**Type**|**Description**
----|----
`message`|Sends a command or message to channel/user
