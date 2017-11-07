<?php

$projectDir = dirname(dirname(__FILE__));
$target_dir = $projectDir . "/uploads/";

$maxSize = 5242880;
$allowedTypes = ['audio', 'text', 'image', 'video'];

$wwwDir = str_replace('server/attach.php', '', $_SERVER['HTTP_ORIGIN'] . $_SERVER['SCRIPT_NAME']);


if (isset($_FILES["file"])) {
    $file = $_FILES["file"];
    $fileExt = pathinfo(basename($file["name"]),PATHINFO_EXTENSION);
    $fileType = explode('/', $file['type']);

    if ($file['error']) {
        setResponse('Damaged file', 400);
        exit;
    }

    if (!in_array($fileType[0], $allowedTypes)) {
        setResponse("Unsupported file type", 400);
    }

    if($file['size'] <= $maxSize){
        $target_file = 'attachment' . rand(10000, 9999999) . '.' . $fileExt;

        if (move_uploaded_file($file["tmp_name"], $target_dir . $target_file)) {
            setResponse($wwwDir . 'uploads/' . $target_file);
        } else {
            setResponse("Sorry, there was an error uploading your file", 400);
        }

    } else {
        setResponse("Uploaded file is bigger then allowed file size", 400);
    }
} else {
    setResponse('File is not set', 400);
}

function setResponse($message, $code = 200) {
    http_response_code($code);
    echo $message;
    exit;
}
