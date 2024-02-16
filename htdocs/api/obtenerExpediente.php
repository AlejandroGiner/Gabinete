<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");

require "conexion.php";

$json = file_get_contents("php://input");

$payload = json_decode($json, true);

$id_usuario = $payload['id_usuario'];

$sql = "SELECT * FROM expedientes WHERE id_usuario = ?";


$stmt = $pdo->prepare($sql);
$stmt->bindParam(1, $id_usuario);

$stmt->execute();
$results = $stmt->fetchAll();
echo json_encode($results[0]);
