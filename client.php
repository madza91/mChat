<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Client chat</title>
    <link rel="stylesheet" href="assets/styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="assets/funcs.js"></script>
</head>
<body>

<div class="chat_wrapper">
    <div class="message_box" id="message_box"></div>
    <div class="users_box" id="users_box">
        <ul id="users_list" style="list-style-type:disc"></ul>
    </div>
    <div class="panel">
        <input type="text" name="message" id="message" placeholder="Message" maxlength="80" onkeydown="onEnter()"/>
    </div>
    <button id="send-btn" onclick="sendMessage()" class="button">Send</button>
</div>

</body>
</html>
