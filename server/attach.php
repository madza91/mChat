<?php

$projectDir = dirname(dirname(__FILE__));
$target_dir = $projectDir . "/uploads/";

$wwwDir = str_replace('server/attach.php', '', $_SERVER['HTTP_ORIGIN'] . $_SERVER['SCRIPT_NAME']);


if (isset($_FILES["file"])) {
    $file = $_FILES["file"];
    $imageFileType = pathinfo(basename($file["name"]),PATHINFO_EXTENSION);

    if ($file['error']) {
        setResponse('Damaged file', 400);
        exit;
    }

    $check = getimagesize($file["tmp_name"]);
    $uploadOk = ($check !== false) ? true: false;
    if($uploadOk){
        $target_file = 'attachment' . rand(10000, 9999999) . '.' . $imageFileType;

        if (move_uploaded_file($file["tmp_name"], $target_dir . $target_file)) {
            setResponse($wwwDir . 'uploads/' . $target_file);
        } else {
            setResponse("Sorry, there was an error uploading your file.", 400);
        }

    };
} else {
    setResponse('File is not set.', 400);
}

function setResponse($message, $code = 200) {
    http_response_code($code);
    echo $message;
}
