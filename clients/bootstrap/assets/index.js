(function () {

    var chat = {
        userNick: false,
        lastChatNick: false,
        settings: false,
        isConnected: false,
        msgHistory: [],
        msgHistoryIndex: 0,
        totalUsers: 0,
        init: function () {
            this.cacheDOM();
            this.bindEvents();
            $('.connection_info').show();
        },
        cacheDOM: function () {
            this.$body = $('body');
            this.$chatHistory = $('.chat-history');
            this.$chatHistoryList = this.$chatHistory.find('ul');
            this.$peopleList = $('.list');
            this.$totalUsers = $('#total_users');
            this.$textarea = $('#message-to-send');
            this.$searchField = $('#search-field');
            this.$tempMessage = $("#message-template");
            this.$tempMessageOnly = $("#message-nonick-template");
            this.$tempMessageResponse = $("#message-response-template");
            this.$tempMessageResponseOnly = $("#message-response-nonick-template");
            this.$connectBtn = $('#connect');
            this.$connectControl = $('#connection_control');
            this.$uploadProgress = $('#upload_status');
            this.$uploadInput = $(':file');
            this.$uploadButton = $('#attach-button');
        },
        bindEvents: function () {
            this.$connectBtn.on('click', this.connect.bind(this));
            this.$textarea.on('keyup', this.addMessageEnter.bind(this));
            this.$body.on('keydown', this.checkFocus.bind(this));
            this.$uploadInput.on('change', this.uploadFile.bind(this));
        },
        connect: function () {
            var localUserNick = localStorage.getItem("madzaChatNick");
            if (localUserNick === null) {
                this.setNick(prompt('Please choose your nickname:'));
            } else {
                this.setNick(localUserNick);
            }
            connection.init();
        },
        render: function (from, message, visibility) {
            this.scrollToBottom();
            if (typeof message !== 'undefined') {
                var templateEl = '';
                var cssClass = (visibility === 'public') ? 'my': 'private';
                var previousSender = (this.lastChatNick === from);
                var isMe = (this.userNick === from);
                var context = {
                    name: from,
                    messageOutput: message,
                    time: this.getCurrentTime(),
                    type: cssClass
                };

                if (isMe) {
                    templateEl = previousSender ? this.$tempMessageOnly: this.$tempMessage;
                } else {
                    templateEl = previousSender ? this.$tempMessageResponseOnly: this.$tempMessageResponse;
                    this.sendNotification(from + ': ' + message);
                    this.playSound();
                }

                var templateBody = Handlebars.compile(templateEl.html());
                var preparedMessage = templateBody(context);
                preparedMessage = this.urlify(preparedMessage);
                preparedMessage = this.emoticonify(preparedMessage);
                this.$chatHistoryList.append(preparedMessage);
                this.scrollToBottom();
                this.lastChatNick = from;
            }
        },
        setNick: function (newNick) {
            var oldNick = this.userNick;
            if (typeof newNick === 'undefined' || newNick === null) {
                this.userNick = 'guest' + this.getRandomInt(1000, 5000);
            } else {
                this.userNick = newNick;
            }
            localStorage.madzaChatNick = this.userNick;
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
                    this.sendNotification(user + ' joined.');
                    this.writeMessage('system', user + ' joined.');
                }
            }

        },
        addBots: function (total) {
            for (var i = 0; i < total; i++) {
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
            tmpElement.addClass('shake-it');
            setTimeout(function(){
                tmpElement.removeClass('shake-it');
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
            this.searchFilter();
        },
        addSystemMessage: function (message) {
            this.scrollToBottom();
            var templateSystemMessage = Handlebars.compile($("#system-message-template").html());
            var contextSystem = {
                message: message,
                time: this.getCurrentTime()
            };
            this.$chatHistoryList.append(templateSystemMessage(contextSystem));
            this.lastChatNick = false;
            this.scrollToBottom();
        },
        addMessage: function () {
            this.render(this.userNick, this.$textarea.val());
        },
        playSound: function () {
            var audio = document.getElementById("audio");
            audio.currentTime = 0;
            audio.play();
        },
        sendNotification: function (message) {
            if (window.Notification) {
                if (!Notification || !document.hidden) {
                    // Not available in user's browser
                    return;
                }

                if (Notification.permission !== "granted")
                    Notification.requestPermission();
                else {
                    var title = 'Madza\'s tiny chat';
                    var icon = 'http://madza.rs/templates/portfolio/img/logo.png';
                    var notification = new Notification(title, {
                        body: message,
                        icon: icon
                    });

                    notification.addEventListener('click', function (e) {
                        parent.focus();
                        window.focus();
                        e.target.close();
                    }, false);
                }
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
        checkFocus: function (ev) {
            if (!ev.ctrlKey) {
                var isInputFocused = this.$textarea.is(':focus');
                var isSearchFocused = this.$searchField.is(':focus');
                if (!isInputFocused && !isSearchFocused) {
                    this.$textarea.focus();
                }
            }
        },
        disable: function (disabled) {
            this.$peopleList.html('');
            this.$textarea.prop('disabled', disabled);
            this.$uploadInput.attr('disabled', disabled);
            this.$uploadButton.attr('disabled', disabled);
            if (!disabled) {
                this.isConnected = true;
                this.$textarea.focus();
                this.$connectControl.hide();
            } else {
                this.isConnected = false;
                this.$connectControl.show();
            }
        },
        clear: function () {
            this.$chatHistoryList.html('');
            this.lastChatNick = false;
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
        urlify: function (text) {
            var urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;
            return text.replace(urlRegex, function(url) {
                var a = document.createElement('a');
                if (text.indexOf('://') === -1) {
                    url = 'http://' + url;
                }
                a.href = url;
                return '<a title="' + url + '" href="' + url + '" target="_blank">' + a.hostname + '</a>';
            })
        },
        emoticonify: function (text) {

            var map = {
                ':-)': 'blush',
                ':-D': 'smiley',
                ':-(': 'worried',
                ':-O': 'anguished',
                ':-P': 'stuck_out_tongue',
                ':-*': 'kissing_heart',
                ':-/': 'confused',
                ':-|': 'neutral_face',
                ';-)': 'wink',
                '(y)': '--1',
                '(n)': '-1',
                ':pig:': 'pig'
            };

            Object.keys(map).forEach(function (ico) {
                var icoE = ico.replace(/([.?*+^$[\]\\(){}<|-])/g, "\\$1");
                text = text.replace(new RegExp(icoE, 'g'), '<i class="em em-' + map[ico] + '"></i>');
            });

            return text;
        },
        uploadFile: function() {
            var file = this.$uploadInput[0].files[0];

            if (file.size > 5242880) {
                this.writeMessage('system', 'Chosen file is too big! Maximum allowed size is 5mb.');
                return;
            }

            $.ajax({
                url: '../../server/attach.php',
                type: 'POST',

                // Form data
                data: new FormData($('form')[0]),
                cache: false,
                contentType: false,
                processData: false,

                // Custom XMLHttpRequest
                xhr: function() {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        // For handling the progress of the upload
                        chat.$uploadInput.attr('disabled', true);
                        chat.$uploadButton.attr('disabled', true);
                        chat.$uploadProgress.show();
                        myXhr.upload.addEventListener('progress', function(e) {
                            if (e.lengthComputable) {
                                chat.$uploadProgress.animate({
                                    width: (e.loaded / e.total) * 100 + '%'
                                }, 150);
                            }
                        } , false);
                    }
                    return myXhr;
                }
            })
                .done(function(data) {
                    connection.send('message', data);
                })
                .fail(function(data) {
                    console.log(data);
                    chat.writeMessage('system', 'Error on file uploading (' + data.responseText + ')');
                })
                .always(function() {
                    chat.$uploadProgress.hide();
                    chat.$uploadProgress.width('0%');
                    chat.$uploadInput.attr('disabled', false);
                    chat.$uploadButton.attr('disabled', false);
                });
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
        socket: false,
        init: function () {
            var thisChat = this;
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', '../../config.json', true);
            xobj.onreadystatechange = function() {
                if (xobj.readyState === 4 && xobj.status === 200) {
                    var config = JSON.parse(xobj.responseText);
                    var server = config.server;
                    chat.settings = config.settings;
                    thisChat.open('http://' + server.host + ':' + server.port + '/?user=' + chat.userNick);
                }
            };
            xobj.send(null);
        },
        open: function (url) {
            socket = io(url);
            socket.on('connect', function (ev) {
                // Connection is open
                connection.onOpen(ev);
            });

            socket.on('sMessage', function (data) {
                // Message received from server
                connection.onMessage(data);
            });

            socket.on('error', function(ev) {
                // Connection error
                connection.onError(ev);
            });

            socket.on('disconnect', function(ev) {
                // Closed connection
                connection.onClose(ev);
            });
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

            socket.emit('cMessage', msg);
        },
        onOpen: function () {
            chat.disable(false);
        },
        onMessage: function (msg) {
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
                    if (myNick === msg.nick) {
                        socket.disconnect();
                    }
                    chat.removeUser(msg.nick);
                    break;
                case 'users_list':
                    jQuery.each(msg.users, function (index, item) {
                        chat.addUser(item.nick, item.status);
                    });
                    break;
                case 'status':
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
                                if (msg.reason) {
                                    chat.writeMessage('system', 'Your nick is invalid. You are renamed to ' + msg.newNick + ' (' + msg.reason + ')');
                                } else {
                                    chat.writeMessage('system', 'You successfully changed nick to ' + msg.newNick);
                                }
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
                            chat.sendNotification(msg.nick + ' says hello!');
                            break;
                        case 'help':
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
        onClose: function () {
            chat.disable(true);
            chat.writeMessage('system', 'Connection is closed');
            $('.chat-num-messages').html('You are offline.');
        }
    };

    // request permission on page load
    if (window.Notification) {
        document.addEventListener('DOMContentLoaded', function () {
            if (Notification.permission !== "granted")
                Notification.requestPermission();
        });
    }

    window.addEventListener("beforeunload", function (e) {
        if (chat.isConnected) {
            var confirmationMessage = "\o/";
            (e || window.event).returnValue = confirmationMessage;
            return confirmationMessage;
        }
    });

    chat.init();
    chat.disable(true);

})();
