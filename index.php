<?php
/**
 * Created by PhpStorm.
 * User: Nemanja
 * Date: 24-Oct-17
 * Time: 00:12
 */

// Get default client from config
$configFile = file_get_contents('config.json');
$jsonArray = json_decode($configFile, true);
$client = $jsonArray['client']['default'];

/**
 * Just include default template
 */

include("clients/{$client}/index.html");
