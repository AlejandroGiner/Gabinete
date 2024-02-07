<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: PUT");

require "conexion.php";

$json = file_get_contents("php://input");
$payload = json_decode($json);

$sql = "UPDATE usuarios SET ";

$updates = array_filter($payload,fn($key) => $key !== 'id_usuario');
$updates = array_map(fn($column) => "$column=:$column", array_keys($payload));


$sql .= implode(",", $updates);

$sql .= " WHERE id_usuario=:id_usuario";

$stmt = $pdo->prepare($sql);

foreach ($payload as $column => $value) {
    $stmt->bindParam(":$column", $value);
}

$status = $stmt->execute();

if ($status) {
    $response = array('message' => 'Operation successful');
} else {
    http_response_code(500);
    $response = array('message' => 'Internal Server Error. Please try again later.');
}

echo json_encode($response);
