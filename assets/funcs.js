//create a new WebSocket object.
var wsUri = "ws://localhost:9000/demo/server.php";
websocket = new WebSocket(wsUri);

var isConnected = false;
var myColour = randomColor();

// Connection is open
websocket.onopen = function (ev) {
    elementsDisable(false);
    isConnected = true;
    writeMessage('system_msg', 'Connected!'); //notify user
}

// Message received from server?
websocket.onmessage = function (ev) {
    var msg = JSON.parse(ev.data); //PHP sends Json data
    var type = msg.type;

    if (type == 'user') {
        writeMessage('chat_msg', msg);
    }
    if (type == 'system') {
        writeMessage('system_msg', msg.message);
    }

    var objDiv = document.getElementById("message_box");
    objDiv.scrollTop = objDiv.scrollHeight;
};

// Error
websocket.onerror = function (ev) {
    writeMessage('system_error', 'Error Occured - ' + ev.data);
};

// Closed connection
websocket.onclose = function (ev) {
    elementsDisable(true);
    writeMessage('system_msg', 'Connection Closed');
};


function randomColor() {
    var colours = ['007AFF', 'FF7000', '15E25F', 'CFC700', 'CF1100', 'CF00BE', 'F00'];
    return colours[Math.floor(Math.random() * colours.length)]
}

function onEnter() {
    if (event.keyCode == 13) {
        sendMessage();
    }
}

function sendMessage() {
    var mymessage = $('#message').val(); //get message text
    var myname = $('#name').val(); //get user name

    if (myname == "") { //empty name?
        alert("Enter your Name please!");
        return;
    }
    if (mymessage == "") { //emtpy message?
        alert("Enter Some message Please!");
        return;
    }
    document.getElementById("name").style.visibility = "hidden";

    var objDiv = document.getElementById("message_box");
    objDiv.scrollTop = objDiv.scrollHeight;
    //prepare json data
    var msg = {
        message: mymessage,
        name: myname,
        color: myColour
    };
    //convert and send data to server
    websocket.send(JSON.stringify(msg));
}

function writeMessage(type, message) {
    switch (type) {
        case 'system_msg':
            $('#message_box').append('<div class="system_msg">' + message + '</div>');
            break;
        case 'system_error':
            $('#message_box').append('<div class="system_error">' + message + '</div>');
            break;
        case 'chat_msg':
            var umsg = message.message; //message text
            var uname = message.name; //user name
            var ucolor = message.color; //color

            $('#message_box').append('<div><span class="user_name" style="color:#' + ucolor + '">' + uname + '</span> : <span class="user_message">' + umsg + '</span></div>');
            $('#message').val(''); //reset text
    }
}

function elementsDisable(disabled) {
    $("#name").prop('disabled', disabled);
    $("#message").prop('disabled', disabled);
    $("#send-btn").prop('disabled', disabled);
}