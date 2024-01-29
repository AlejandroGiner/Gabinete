<?php

$config = parse_ini_file($_SERVER['DOCUMENT_ROOT']."/../config.ini");

$username = $config["username"];
$passwd = $config["passwd"];
$db = $config["db"];
$hostname = $config["hostname"];

$mysqli = new mysqli($hostname, $username, $passwd, $db);

if ($mysqli->connect_errno) {
    die("Fallo la conexion");
} else {
    //echo "Conexion exitosa";
}
