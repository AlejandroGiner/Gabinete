<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

//echo "estamos en agregarUsuario...";
require "./conexion.php";

$json = file_get_contents("php://input");

$objEmpleado = json_decode($json);
//echo $objEmpleado;

$sql = "INSERT INTO usuarios(DNI, Nombre, Apellidos, Telefono) VALUES('$objEmpleado->dni','$objEmpleado->nombre','$objEmpleado->apellidos', '$objEmpleado->telefono')";

$query = $mysqli->query($sql);

//$jsonRespuesta = array('msg2' => 'OK');
$jsonRespuesta = array('msg1' => 'OK', 'msg2' => 'Chachi', 'msg3' => 'Guay');
echo json_encode($jsonRespuesta);
    //return $jsonRespuesta;