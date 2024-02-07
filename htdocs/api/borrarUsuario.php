<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: DELETE");
header("Allow: DELETE");

require "conexion.php";

$json = file_get_contents("php://input");

$payload = json_decode($json);
$stmt = $pdo->prepare("DELETE FROM usuarios WHERE id_usuario=?");
$stmt->bindParam(1, $payload->id_usuario);

$status = $stmt->execute();
// TODO report if nothing was deleted?

if ($status) {
    $response = array('message' => 'Operation successful');
} else {
    http_response_code(500);
    $response = array('message' => 'Internal Server Error. Please try again later.');
}

echo json_encode($response);
