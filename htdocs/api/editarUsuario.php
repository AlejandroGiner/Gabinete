<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require "conexion.php";

$json = file_get_contents("php://input");
$payload = json_decode($json);

$sql = "UPDATE usuarios SET ";

$updates = array_map(fn($column, $value) => "$column=:$column", array_keys($payload), $payload);

//  TODO remove id_usuario from SET!!

$sql .= implode(",", $updates);

$sql .= " WHERE id_usuario=:id_usuario";

$stmt = $pdo->prepare($sql);

foreach ($payload as $column => $value) {
    $stmt->bindParam(":$column", $value);
}
$stmt->execute();

$jsonRespuesta = array('msg' => 'OK');
// convertimos la variable php en un json y es lo que enviamos a app.js
echo json_encode($jsonRespuesta);
