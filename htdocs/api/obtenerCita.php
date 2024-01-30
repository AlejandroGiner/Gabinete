<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";

    $json = file_get_contents("php://input");
    
    $objId = json_decode($json);

    $sql = "SELECT * FROM citas WHERE DNI='$objId->idUsuario'";
    
    // PRUEBAS
    //$usuario = "cheko";
    
    //$sql = "SELECT * FROM citas ";


    $query = $mysqli->query($sql);
    
    $datos = array();
    
    while($resultado = $query->fetch_assoc()) {
        $datos[] = $resultado;
    }
        
    echo json_encode($datos);