<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require "conexion.php";

$json = file_get_contents("php://input");

$payload = json_decode($json);
$stmt = $pdo->prepare("DELETE FROM usuarios WHERE DNI=?");
$stmt->bindParam(1, $payload->id_usuario);
$stmt->execute();
// $results = $stmt->fetchAll();
// echo json_encode($results);

$jsonRespuesta = array('msg' => 'OK');
echo json_encode($jsonRespuesta);
