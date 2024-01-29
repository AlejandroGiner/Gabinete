<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require "conexion.php";

// recibimos el JSON desde app.js 
$json = file_get_contents("php://input");
// convertimos el json en una variable php para poderla utilizar en el pgm
$objEmpleado = json_decode($json);

$sql = "UPDATE usuarios SET Nombre='$objEmpleado->nombre', Apellidos='$objEmpleado->apellidos', Telefono='$objEmpleado->telefono' WHERE DNI='$objEmpleado->dni'";

$query = $mysqli->query($sql);

$jsonRespuesta = array('msg' => 'OK');
// convertimos la variable php en un json y es lo que enviamos a app.js
echo json_encode($jsonRespuesta);
