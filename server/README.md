# mChat Server

Socket server for mChat application, that is using NodeJS and Socket.IO for communicating with the client.


### Server &#x27A1; Client
**Type**|**Sent to**|**Description**|**On event**
-----|-----|-----|-----
`users_list`|User|Sends list of all online users|Connect
`channels_list`|User|Sends list of all channels|Connect
`user`|All Users|Sends a message to all online users|Message
`welcome`|User|Welcomes new user with generated SocketID and chosen Nickname|Connect
`join`|All Users|Informs users that new user has joined chat|Join
`leave`|All Users|Informs users that users has left chat|Leave

---

### Client &#x27A1; Server
**Type**|**Description**
----|----
`message`|Sends a message to channel, user or command
