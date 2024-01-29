<?php
    
    // Variables de la conexion a la DB
    $mysqli = new mysqli("mysql_iaw","root","root","gabinetedb");
    // echo "intentando conectar....";
    // Comprobamos la conexion
    if($mysqli->connect_errno) {
        die("Fallo la conexion");
    } else {
        //echo "Conexion exitosa";
    }