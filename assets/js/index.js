(function () {

    var chat = {
        userNick: '',
        msgHistory: [],
        msgHistoryIndex: 0,
        init: function () {
            this.cacheDOM();
            this.bindEvents();
            this.render();
            this.setNick();
        },
        cacheDOM: function () {
            this.$chatHistory = $('.chat-history');
            this.$chatHistoryList = this.$chatHistory.find('ul');
            this.$peopleList = $('.list');
            this.$button = $('#btn_send');
            this.$textarea = $('#message-to-send');
        },
        bindEvents: function () {
            this.$button.on('click', this.addMessage.bind(this));
            this.$textarea.on('keyup', this.addMessageEnter.bind(this));
        },
        render: function (from, message, visibility) {
            this.scrollToBottom();
            if (typeof message !== 'undefined') {
                var template = '';
                var cssClass = (visibility === 'public') ? 'my': 'private';
                var context = {
                    name: from,
                    messageOutput: message,
                    time: this.getCurrentTime(),
                    type: cssClass
                };

                if (from === this.userNick) {
                    template = Handlebars.compile($("#message-template").html());
                } else {
                    template = Handlebars.compile($("#message-response-template").html());
                }
                this.$chatHistoryList.append(template(context));

                this.scrollToBottom();
            }

        },
        setNick: function (newNick) {
            var oldNick = this.userNick;
            if (typeof newNick === 'undefined') {
                this.userNick = 'guest' + this.getRandomInt(1000, 5000);
            } else {
                this.userNick = newNick;
            }
            $('.chat-with').html(this.userNick);
            this.renameUser(oldNick, newNick);
        },
        addUser: function (user) {
            var templateOnlineUser = Handlebars.compile($("#people-list-template").html());
            var contextResponsePeople = {
                name: user,
                status: 'online'
            };
            var item = $(templateOnlineUser(contextResponsePeople)).hide().fadeIn(300);
            this.$peopleList.append(item);

            this.searchFilter();
            if (user === this.userNick) {
                chat.writeMessage('system_msg', 'Welcome ' + this.userNick);
            } else {
                chat.writeMessage('system_msg', user + ' joined.');
            }

        },
        removeUser: function(user) {
            var tmpElement = $('.people-list ul li:contains("' + user + '")');
            tmpElement.fadeOut(300, function () {
                tmpElement.remove();
            });
        },
        shakeUser: function(user) {
            var tmpElement = $('.people-list ul li:contains("' + user + '")');
            tmpElement.addClass('shakeit');
            setTimeout(function(){
                tmpElement.removeClass('shakeit');
                }, 3000);
        },
        renameUser: function(user, newName) {
            var templateOnlineUser = Handlebars.compile($("#people-list-template").html());
            var contextResponsePeople = {
                name: newName,
                status: 'online'
            };
            var tmpElement = $('.people-list ul li:contains("' + user + '")');
            $(templateOnlineUser(contextResponsePeople)).insertBefore(tmpElement);
            tmpElement.remove();
        },
        addSystemMessage: function (msg) {
            this.scrollToBottom();
            var templateSystemMessage = Handlebars.compile($("#system-message-template").html());
            var contextSystem = {
                message: msg,
                time: this.getCurrentTime()
            };
            this.$chatHistoryList.append(templateSystemMessage(contextSystem));
            this.scrollToBottom();
        },
        addMessage: function () {
            this.render(this.userNick, this.$textarea.val());
        },
        writeMessage: function (type, message) {

            switch (type) {
                case 'system_msg':
                    this.addSystemMessage(message);
                    break;
                case 'system_error':
                    this.addSystemMessage(message);
                    break;
                case 'chat_msg':
                case 'private_msg':
                    var uname = message.nick; //user name
                    var umsg = message.message; //message text
                    var upvt = (type === 'private_msg') ? 'private': 'public';
                    this.render(uname, umsg, upvt);
            }

        },
        addMessageEnter: function (event) {
            // enter was pressed
            switch (event.keyCode) {
                case 13:
                    connection.send('message', this.$textarea.val());
                    this.$textarea.val('');
                    break;
                case 38:
                    this.$textarea.val(this.msgHistory[this.msgHistoryIndex]);
                    if (this.msgHistoryIndex === 0) {
                        this.msgHistoryIndex = this.msgHistory.length;
                    }
                    this.msgHistoryIndex--;
                    break;
                case 40:
                    this.msgHistoryIndex++;
                    if (this.msgHistoryIndex === (this.msgHistory.length)) {
                        this.msgHistoryIndex = 0;
                    }
                    this.$textarea.val(this.msgHistory[this.msgHistoryIndex]);

                    break;
            }
        },
        disableChat: function (disabled) {
            this.$peopleList.html('');
            this.$textarea.prop('disabled', disabled);
            this.$button.prop('disabled', disabled);
            if (!disabled) {
                this.$textarea.focus();
            }
        },
        insertHistory: function (message) {
            this.msgHistoryIndex = this.msgHistory.length;
            this.msgHistory.push(message);
        },
        scrollToBottom: function () {
            this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
        },
        getCurrentTime: function () {
            return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        },
        getRandomInt: function () {
            return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        },
        searchFilter: function () {
            var userList = new List('people-list', {valueNames: ['name']});
            var noItems = $('<li id="no-items-found">No items found</li>');

            userList.on('updated', function (list) {
                if (list.matchingItems.length === 0) {
                    $(list.list).append(noItems);
                } else {
                    noItems.detach();
                }
            });
        }
    };

    var connection = {
        wsUri: 'ws://localhost:9000/demo/server.php',
        init: function () {
            this.open(this.wsUri);
        },
        open: function (url) {
            websocket = new WebSocket(url);
            websocket.onopen = function (ev) {
                // Connection is open
                connection.onOpen(ev);
            };
            websocket.onmessage = function (ev) {
                // Message received from server
                connection.onMessage(ev);
            };
            websocket.onerror = function (ev) {
                // Connection error
                connection.onError(ev);
            };
            websocket.onclose = function (ev) {
                // Closed connection
                connection.onClose(ev);
            };
        },
        send: function (type, message) {
            if (typeof message === 'undefined' || message === '') {
                return;
            }

            //store in message history
            chat.insertHistory(message);

            type = (typeof type === 'undefined') ? 'message': type;

            //prepare json data
            var msg = {
                type: type,
                message: message,
                name: chat.userNick
            };
            //convert and send data to server
            websocket.send(JSON.stringify(msg));
        },
        onOpen: function (ev) {
            chat.disableChat(false);
        },
        onMessage: function (ev) {
            var msg = JSON.parse(ev.data); //PHP sends Json data
            var type = msg.type;
            var myNick = chat.userNick;

            switch (type) {
                case 'user':
                    chat.writeMessage('chat_msg', msg);
                    break;
                case 'private':
                    chat.writeMessage('private_msg', msg);
                    break;
                case 'system':
                    chat.writeMessage('system_msg', msg.message);
                    break;
                case 'identify':
                    connection.send('identify', true);
                    break;
                case 'join':
                    chat.addUser(msg.nick);
                    break;
                case 'leave':
                    chat.removeUser(msg.nick);
                    chat.writeMessage('system_msg', msg.nick + ' disconnected.');
                    this.searchFilter();
                    break;
                case 'users_list':
                    jQuery.each(msg.users, function (index, item) {
                        chat.addUser(this);
                    });
                    break;
                case 'command':
                    if (msg.command === 'nick') {
                        if (msg.oldNick === myNick) {
                            chat.setNick(msg.newNick);
                            chat.writeMessage('system_msg', 'You successfully changed nick to ' + msg.newNick);
                        } else {
                            chat.renameUser(msg.oldNick, msg.newNick);
                            chat.writeMessage('system_msg', msg.oldNick + ' changed nick to ' + msg.newNick);
                        }

                    } else if (msg.command === 'clear') {
                        chat.$chatHistoryList.html('');
                        // $chatHistory.html('<ul></ul>');
                    } else if (msg.command === 'simulate') {

                        if (msg.total) {
                            for (i = 0; i < msg.total; i++) {
                                chat.addUser('bot' + chat.getRandomInt());
                            }
                        }
                        this.searchFilter();
                    } else if (msg.command === 'noticeme') {
                        chat.shakeUser(msg.nick);
                    }
            }
        },
        onError: function (ev) {
            chat.writeMessage('system_error', 'Error Occurred - ' + ev.data);
        },
        onClose: function (ev) {
            chat.disableChat(true);
            chat.writeMessage('system_msg', 'Connection Closed');
        }
    };

    chat.init();
    chat.disableChat(true);
    connection.init();

})();