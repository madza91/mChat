(function(){
  
  var chat = {
    messageToSend: '',
    messageFrom: '',
    userNick: '',
    init: function() {
      this.cacheDOM();
      this.bindEvents();
      this.render();
      this.setNick();
    },
    cacheDOM: function() {
      this.$chatHistory = $('.chat-history');
      this.$peopleList = $('.list');
      this.$button = $('button');
      this.$textarea = $('#message-to-send');
      this.$chatHistoryList =  this.$chatHistory.find('ul');
    },
    bindEvents: function() {
      this.$button.on('click', this.addMessage.bind(this));
      this.$textarea.on('keyup', this.addMessageEnter.bind(this));
    },
    render: function() {
      this.scrollToBottom();
      if (this.messageToSend.trim() !== '') {

        var template = '';
        var context = {
          name: this.messageFrom,
          messageOutput: this.messageToSend,
          time: this.getCurrentTime()
        };

        if (this.messageFrom === this.userNick) {
            template = Handlebars.compile( $("#message-template").html());
        } else {
            template = Handlebars.compile( $("#message-response-template").html());
        }

        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
      }
      
    },
    setNick: function() {
        this.userNick = myNick = 'guest' + this.getRandomInt(1000, 5000);
        $('.chat-with').html(this.userNick);
    },
    getNick: function() {
      return this.userNick;
    },
    addUser: function(user) {
        var templateOnlineUser = Handlebars.compile( $("#people-list-template").html());
        var contextResponsePeople = {
            name: user,
            status: 'online'
        };
        this.$peopleList.append(templateOnlineUser(contextResponsePeople));
    },
    addSystemMessage: function(msg) {
      var templateSystemMessage = Handlebars.compile( $("#system-message-template").html());
      var contextSystem = {
          message: msg,
          time: this.getCurrentTime()
      };
      this.$chatHistoryList.append(templateSystemMessage(contextSystem));
    },
    addMessage: function() {
      this.messageFrom = getNick();
      this.messageToSend = this.$textarea.val();
      this.render();         
    },
    writeMessage: function(type, message) {

        switch (type) {
            case 'system_msg':
              this.addSystemMessage(message);
              break;
            case 'system_error':
              this.addSystemMessage(message);
              break;
            case 'chat_msg':
                var umsg = message.message; //message text
                var uname = message.name; //user name
                var ucolor = message.color; //color

                this.messageFrom = uname;
                this.messageToSend = umsg;
                this.render();
        }

    },
    addMessageEnter: function(event) {
        // enter was pressed
        if (event.keyCode === 13) {
          sendMessage(this.$textarea.val());
          this.$textarea.val('');
        }
    },
    scrollToBottom: function() {
       this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function() {
      return new Date().toLocaleTimeString().
              replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    randomColor: function() {
      var colours = ['007AFF', 'FF7000', '15E25F', 'CFC700', 'CF1100', 'CF00BE', 'F00'];
      return colours[Math.floor(Math.random() * colours.length)];
    },
    getRandomInt: function() {
        return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    }
  };

  chat.init();

    var myColour = chat.randomColor();

    //create a new WebSocket object.
    var wsUri = "ws://localhost:9000/demo/server.php";
    websocket = new WebSocket(wsUri);

    // Connection is open
    websocket.onopen = function (ev) {
        // elementsDisable(false);
        // chat.writeMessage('system_msg', 'Connected!'); //notify user
    };

    // Message received from server?
    websocket.onmessage = function (ev) {
        var msg = JSON.parse(ev.data); //PHP sends Json data
        var type = msg.type;
        var myNick = chat.getNick();

        switch (type) {
            case 'user':
                chat.writeMessage('chat_msg', msg);
                break;
            case 'system':
                chat.writeMessage('system_msg', msg.message);
                break;
            case 'identify':
                var newMsg = {
                    type: type,
                    name: myNick
                };
                websocket.send(JSON.stringify(newMsg));
                break;
            case 'join':
                chat.addUser(msg.nick);
                searchFilter.init();
                if (msg.nick === myNick) {
                    chat.writeMessage('system_msg', 'Welcome ' + myNick);
                } else {
                    chat.writeMessage('system_msg', msg.nick + ' joined.');
                }
                break;
            case 'leave':
                $('.people-list ul li:contains("' + msg.nick + '")').remove();
                chat.writeMessage('system_msg', msg.nick + ' disconnected.');
                searchFilter.init();
                break;
            case 'users_list':
                console.log(msg.users);
                jQuery.each(msg.users, function(index, item) {
                    if (index > 0) {
                        chat.addUser(this);
                    }
                });
                searchFilter.init();
        }

    };

    // Error
    websocket.onerror = function (ev) {
        chat.writeMessage('system_error', 'Error Occurred - ' + ev.data);
    };

// Closed connection
    websocket.onclose = function (ev) {
        // elementsDisable(true);
        chat.writeMessage('system_msg', 'Connection Closed');
    };

    function sendMessage(myMessage) {
        if (typeof myMessage === 'undefined' || myMessage === '') {
            return;
        }

        //prepare json data
        var msg = {
            type: 'message',
            message: myMessage,
            name: myNick,
            color: myColour
        };
        //convert and send data to server
        websocket.send(JSON.stringify(msg));
    }
  
  var searchFilter = {
    options: { valueNames: ['name'] },
    init: function() {
      var userList = new List('people-list', this.options);
      console.log(userList.items);
      var noItems = $('<li id="no-items-found">No items found</li>');
      
      userList.on('updated', function(list) {
        if (list.matchingItems.length === 0) {
          $(list.list).append(noItems);
        } else {
          noItems.detach();
        }
      });
    }
  };
  

  
})();