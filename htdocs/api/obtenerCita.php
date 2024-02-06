<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require "conexion.php";

$json = file_get_contents("php://input");

$payload = array();
$payload = json_decode($json, true);
if (is_null($payload)) {
    $payload = array();
}

$sql = "SELECT * FROM citas WHERE 1";

foreach ($payload as $column => $value) {
    $sql .= " AND $column = :$column";
}

$stmt = $pdo->prepare($sql);
foreach ($payload as $column => $value) {
    $stmt->bindParam(":$column", $value);
}

$stmt->execute();
$results = $stmt->fetchAll();
echo json_encode($results);
