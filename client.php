<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Client chat</title>
    <link rel="stylesheet" href="assets/styles.css">
    <script type="text/javascript" src="assets/jquery-3.1.1.js"></script>
    <script type="text/javascript" src="assets/funcs.js"></script>
</head>
<body>

<div class="chat_wrapper">
    <div class="message_box" id="message_box"></div>
    <div class="panel">
        <input type="text" name="name" id="name" placeholder="Your Name" maxlength="15"/>
        <input type="text" name="message" id="message" placeholder="Message" maxlength="80" onkeydown="onEnter()"/>
    </div>
    <button id="send-btn" onclick="sendMessage()" class=button>Send</button>
</div>

</body>
</html>
