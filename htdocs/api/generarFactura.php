<?php
// Este fichero API recibe una id_cliente y una id_cita, genera una factura para la cita correspondiente, y la marca como facturada.
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");

require "./conexion.php";

$json = file_get_contents("php://input");
$payload = json_decode($json);

$stmt = $pdo->prepare("INSERT INTO factura (fecha, id_cliente, id_cita) VALUES (:fecha, :id_cliente, :id_cita)");

$stmt->bindValue(':fecha', date('Y-m-d'));
$stmt->bindParam(':id_cliente', $payload->id_cliente);
$stmt->bindParam(':id_cita', $payload->id_cita);

$status = $stmt->execute();

$appt_update = $pdo->prepare("UPDATE citas SET facturada=1 WHERE id_cita=:id_cita");
$appt_update->bindParam(':id_cita', $payload->id_cita);
$status2 = $appt_update->execute();


if ($status && $status2) {
    $response = array('message' => 'Operation successful');
} else {
    http_response_code(500);
    $response = array('message' => 'Internal Server Error. Please try again later.');
}

echo json_encode($response);
