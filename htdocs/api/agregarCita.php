<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");

require "./conexion.php";

$json = file_get_contents("php://input");
$payload = json_decode($json);

$stmt = $pdo->prepare("INSERT INTO citas (id_cliente, fecha_cita, hora_inicio, hora_fin, tipo_cita, facturada, comentario, asunto) VALUES (:id_cliente, :fecha_cita, :hora_inicio, :hora_fin, :tipo_cita, :facturada, :comentario, :asunto)");

$stmt->bindParam(':id_cliente', $payload->id_cliente);
$stmt->bindParam(':fecha_cita', $payload->fecha_cita);
$stmt->bindParam(':hora_inicio', $payload->hora_inicio);
$stmt->bindParam(':hora_fin', $payload->hora_fin);
$stmt->bindParam(':tipo_cita', $payload->tipo_cita);
$stmt->bindParam(':facturada', $payload->facturada);
$stmt->bindParam(':comentario', $payload->comentario);
$stmt->bindParam(':asunto', $payload->asunto);

$status = $stmt->execute();

if ($status) {
    $response = array('message' => 'Operation successful');
} else {
    http_response_code(500);
    $response = array('message' => 'Internal Server Error. Please try again later.');
}

echo json_encode($response);
