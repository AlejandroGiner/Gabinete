<?php

$config = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/../config.ini");

$username = $config["username"];
$passwd = $config["passwd"];
$db = $config["db"];
$hostname = $config["hostname"];


$pdo = new PDO("mysql:host=$hostname;dbname=$db", $username, $passwd, array(
    PDO::ATTR_PERSISTENT => true
));
