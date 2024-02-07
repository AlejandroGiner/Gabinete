<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");

require "./conexion.php";

$json = file_get_contents("php://input");
$payload = json_decode($json);

$stmt = $pdo->prepare("INSERT INTO usuarios (DNI, Nombre, Apellidos, Telefono, Email, Fecha_nac, Direccion) VALUES (:dni, :nombre, :apellidos, :telefono, :email, :fecha_nac, :direccion)");

$stmt->bindParam(':dni', $payload->dni);
$stmt->bindParam(':nombre', $payload->nombre);
$stmt->bindParam(':apellidos', $payload->apellidos);
$stmt->bindParam(':telefono', $payload->telefono);
$stmt->bindParam(':email', $payload->email);
$stmt->bindParam(':fecha_nac', $payload->fecha_nac);
$stmt->bindParam(':direccion', $payload->direccion);

$status = $stmt->execute();

if ($status) {
    $response = array('message' => 'Operation successful');
} else {
    http_response_code(500);
    $response = array('message' => 'Internal Server Error. Please try again later.');
}

echo json_encode($response);
