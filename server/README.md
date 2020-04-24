# mChat Server

Socket server for mChat application, that is using NodeJS and Socket.IO for communicating with the client.


### Server &#x27A1; Client
**Type**|**Sent to**|**Description**
-----|-----|-----
`users_list`|User|Sends list of all online users when user opens client
`user`|All Users|Sends a message to all online users
`welcome`|User|Welcomes new user with generated SocketID and chosen Nickname
`join`|All Users|Informs users that new user has joined chat
`leave`|All Users|Informs users that users has left chat

---

### Client &#x27A1; Server
**Type**|**Description**
----|----
`client_auth`|Sends nickname to the Server
