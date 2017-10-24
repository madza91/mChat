(function () {

    var chatServer = 'localhost:9000';

    var chat = {
        userNick: '',
        msgHistory: [],
        msgHistoryIndex: 0,
        totalUsers: 0,
        init: function () {
            this.cacheDOM();
            this.bindEvents();
            this.setNick();
        },
        cacheDOM: function () {
            this.$chatHistory = $('.chat-history');
            this.$chatHistoryList = this.$chatHistory.find('ul');
            this.$peopleList = $('.list');
            this.$totalUsers = $('#total_users');
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
                    this.sendNotification('Notification from chat', '', message, '');
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
        addUser: function (user, status, log) {
            this.totalUsers++;
            status = (typeof status === 'undefined' || status === false) ? 'online': status;
            var templateOnlineUser = Handlebars.compile($("#people-list-template").html());
            var contextResponsePeople = {
                name: user,
                status: status
            };
            var item = $(templateOnlineUser(contextResponsePeople)).hide().fadeIn(300);
            this.$peopleList.append(item);
            this.$totalUsers.html(this.totalUsers);

            this.searchFilter();
            if (log) {
                if (user === this.userNick) {
                    this.writeMessage('system', 'Welcome ' + this.userNick + '! Please use ' + this.mark('/help') + ' command for list of all available commands.');
                } else {
                    this.writeMessage('system', user + ' joined.');
                }
            }

        },
        addBots: function (total) {
            for (i = 0; i < total; i++) {
                this.addUser('bot' + this.getRandomInt(), 'bot');
            }
        },
        removeUser: function(user) {
            var tmpElement = $('.people-list ul li:contains("' + user + '")');
            this.totalUsers--;
            tmpElement.fadeOut(300, function () {
                tmpElement.remove();
            });
            this.$totalUsers.html(this.totalUsers);
            chat.writeMessage('system', user + ' disconnected.');
            this.searchFilter();
        },
        shakeUser: function(user) {
            var tmpElement = $('.people-list ul li:contains("' + user + '")');
            tmpElement.addClass('shakeit');
            setTimeout(function(){
                tmpElement.removeClass('shakeit');
                }, 3000);
        },
        renameUser: function(user, newName, status) {
            status = (typeof status === 'undefined') ? 'online': status;
            var templateOnlineUser = Handlebars.compile($("#people-list-template").html());
            var contextResponsePeople = {
                name: newName,
                status: status
            };
            var tmpElement = $('.people-list ul li:contains("' + user + '")');
            $(templateOnlineUser(contextResponsePeople)).insertBefore(tmpElement);
            tmpElement.remove();
        },
        addSystemMessage: function (message) {
            this.scrollToBottom();
            var templateSystemMessage = Handlebars.compile($("#system-message-template").html());
            var contextSystem = {
                message: message,
                time: this.getCurrentTime()
            };
            this.$chatHistoryList.append(templateSystemMessage(contextSystem));
            this.scrollToBottom();
        },
        addMessage: function () {
            this.render(this.userNick, this.$textarea.val());
        },
        sendNotification: function (title, icon, body, url) {
            if (!Notification) {
                // Not available in user's browser
                return;
            }

            if (Notification.permission !== "granted")
                Notification.requestPermission();
            else {
                var notification = new Notification(title, {
                    icon: icon,
                    body: body,
                });

                notification.onclick = function () {
                    window.open(url);
                };
            }

        },
        writeMessage: function (type, data) {
            switch (type) {
                case 'system':
                    this.addSystemMessage(data);
                    break;
                case 'user':
                case 'private':
                    var uname = data.nick; //user name
                    var umsg = data.message; //message text
                    var upvt = (type === 'private') ? 'private': 'public';
                    this.render(uname, umsg, upvt);
            }
        },
        addMessageEnter: function (event) {
            switch (event.keyCode) {
                case 13:
                    connection.send('message', this.$textarea.val());
                    this.$textarea.val('');
                    break;
                case 38:
                    // up
                    if (this.msgHistoryIndex > 0) {
                        this.msgHistoryIndex--;
                    }
                    this.$textarea.val(this.msgHistory[this.msgHistoryIndex]);
                    break;
                case 40:
                    // down
                    if (this.msgHistoryIndex < this.msgHistory.length) {
                        this.msgHistoryIndex++;
                    }
                    this.$textarea.val(this.msgHistory[this.msgHistoryIndex]);
                    break;
            }
        },
        disable: function (disabled) {
            this.$peopleList.html('');
            this.$textarea.prop('disabled', disabled);
            this.$button.prop('disabled', disabled);
            if (!disabled) {
                this.$textarea.focus();
            }
        },
        clear: function () {
            this.$chatHistoryList.html('');
        },
        insertHistory: function (message) {
            if (typeof message !== 'boolean') {
                this.msgHistory.push(message);
                this.msgHistoryIndex = this.msgHistory.length;
            }
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
        mark: function (value) {
            return '<span class="mark">' + value + '</span>';
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
        init: function () {
            this.open('ws://' + chatServer + '/' + chat.userNick);
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
            chat.disable(false);
        },
        onMessage: function (ev) {
            var msg = JSON.parse(ev.data); //PHP sends Json data
            var type = msg.type;
            var myNick = chat.userNick;

            switch (type) {
                case 'user':
                case 'private':
                    chat.writeMessage(type, msg);
                    break;
                case 'system':
                    chat.writeMessage(type, msg.message);
                    break;
                case 'join':
                    chat.addUser(msg.nick, false, true);
                    break;
                case 'leave':
                    chat.removeUser(msg.nick);
                    break;
                case 'users_list':
                    jQuery.each(msg.users, function (index, item) {
                        chat.addUser(item.nick, item.status);
                    });
                    break;
                case 'status':
                    console.log(msg);
                    chat.renameUser(msg.nick, msg.nick, msg.status);
                    if (msg.message) {
                        chat.writeMessage('system', msg.nick + ' is away. Reason: ' + msg.message);
                    }
                    break;
                case 'command':
                    switch (msg.command) {
                        case 'nick':
                            if (msg.oldNick === myNick) {
                                chat.setNick(msg.newNick);
                                chat.writeMessage('system', 'You successfully changed nick to ' + msg.newNick);
                            } else {
                                chat.renameUser(msg.oldNick, msg.newNick);
                                chat.writeMessage('system', msg.oldNick + ' changed nick to ' + msg.newNick);
                            }
                            break;
                        case 'clear':
                            chat.clear();
                            break;
                        case 'simulate':
                            if (msg.total) {
                                chat.addBots(msg.total);
                            }
                            break;
                        case 'noticeme':
                            chat.shakeUser(msg.nick);
                            break;
                        case 'help':
                            console.log(msg);
                            var output = 'Available commands: ';
                            var total = msg.commands.length;
                            jQuery.each(msg.commands, function (index, item) {
                                output += chat.mark(item);
                                if (index !== total -1) {
                                    output += ' ';
                                }
                            });
                            chat.writeMessage('system', output);
                    }
            }
        },
        onError: function (ev) {
            chat.writeMessage('system', 'Error Occurred - ' + ev.data);
        },
        onClose: function (ev) {
            chat.disable(true);
            chat.writeMessage('system', 'Connection is closed');
            $('.chat-num-messages').html('You are offline.');
    }
    };

    // request permission on page load
    document.addEventListener('DOMContentLoaded', function () {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    });

    chat.init();
    // chat.disable(true);
    connection.init();

})();