<?php

$config = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/../config.ini");

$username = $config["username"];
$passwd = $config["passwd"];
$db = $config["db"];
$hostname = $config["hostname"];


$pdo = new PDO("mysql:host=$hostname;dbname=$db", $username, $passwd, array(
    PDO::ATTR_PERSISTENT => true
));
// $mysqli = new mysqli($hostname, $username, $passwd, $db);

// if ($mysqli->connect_errno) {
//     die("Fallo la conexion");
// } else {
//     //echo "Conexion exitosa";
// }
// try {
//     $dbh = new PDO('mysql:host=$hostname;dbname=$db',$username,$passwd);
// } catch (PDOException $e) {
//     // attempt to retry the connection after some timeout for example
//     die("Fallo de conexión");
// }