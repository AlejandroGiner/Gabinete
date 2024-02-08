<?php

$config = parse_ini_file($_SERVER['DOCUMENT_ROOT']."/../config.ini");

$username = $config["username"];
$passwd = $config["passwd"];
$db = $config["db"];
$hostname = $config["hostname"];

$conexion = new mysqli($hostname, $username, $passwd, $db);

if ($conexion->connect_errno) {
    die("Fallo la conexion");
} else {
    //echo "Conexion exitosa";
}
