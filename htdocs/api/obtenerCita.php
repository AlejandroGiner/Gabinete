<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");

require "conexion.php";

$json = file_get_contents("php://input");

$payload = json_decode($json, true);
if (is_null($payload)) {
    $payload = array();
}

$sql = "SELECT * FROM citas c JOIN tipo_cita t ON (c.tipo_cita=t.tipo) WHERE 1 AND ";

$conditions = array_map(fn($column) => "$column = :$column", array_keys($payload));
$sql .= implode(" AND ", $conditions);

$stmt = $pdo->prepare($sql);
foreach ($payload as $column => $value) {
    $stmt->bindParam(":$column", $payload[$column]);
}

$stmt->execute();
$results = $stmt->fetchAll();
echo json_encode($results);
