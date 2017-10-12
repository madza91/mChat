//create a new WebSocket object.
var wsUri = "ws://localhost:9000/demo/server.php";
websocket = new WebSocket(wsUri);

var myColour = randomColor();

// connection is open
websocket.onopen = function (ev) {
    writeMessage('system_msg', 'Connected!'); //notify user
}

$('#send-btn').click(function () { //use clicks message send button
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
});

//#### Message received from server?
websocket.onmessage = function (ev) {
    var msg = JSON.parse(ev.data); //PHP sends Json data
    var type = msg.type; //message type
    var umsg = msg.message; //message text
    var uname = msg.name; //user name
    var ucolor = msg.color; //color

    if (type == 'usermsg') {
        $('#message_box').append("<div><span class=\"user_name\" style=\"color:#" + ucolor + "\">" + uname + "</span> : <span class=\"user_message\">" + umsg + "</span></div>");
    }
    if (type == 'system') {
        writeMessage('system_msg', umsg);
    }

    $('#message').val(''); //reset text

    var objDiv = document.getElementById("message_box");
    objDiv.scrollTop = objDiv.scrollHeight;
};

websocket.onerror = function (ev) {
    writeMessage('system_error', 'Error Occured - ' + ev.data);

};
websocket.onclose = function (ev) {
    writeMessage('system_msg', 'Connection Closed');
};


function randomColor() {
    var colours = ['007AFF', 'FF7000', '15E25F', 'CFC700', 'CF1100', 'CF00BE', 'F00'];
    return colours[Math.floor(Math.random() * colours.length)]
}

function onEnter() {
    if (event.keyCode == 13) {
        document.getElementById('send-btn').click();
    }
}

function writeMessage(type, message) {
    switch (type) {
        case 'system_msg':
            $('#message_box').append('<div class="system_msg">' + message + '</div>');
            break;
        case 'system_error':
            $('#message_box').append('<div class="system_error">' + message + '</div>');
            break;
    }
}