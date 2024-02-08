<?php
// Se establece la conexi�n con el motor de BBDD.
  $conectado=mysqli_connect("localhost","root","root");
  
// Se crea una consulta para crear la base de datos, si esta no existe a�n.
  $consulta="CREATE DATABASE IF NOT EXISTS agenda;";
  $hacerConsulta=mysqli_query ($conectado, $consulta);
// Se selecciona la base de datos reci�n creada.
  mysqli_select_db ($conectado, "agenda");
// Se elimina la tabla, si esta existiera, para poder crearla nueva.
  $consulta="DROP TABLE IF EXISTS citas;";
  $hacerConsulta=mysqli_query ($conectado, $consulta);
// Se crea la estructura de la tabla.
  $consulta="CREATE TABLE citas (idcita INT PRIMARY KEY AUTO_INCREMENT,	horacita TIME, diacita DATE, asuntocita VARCHAR(255));";
  $hacerConsulta=mysqli_query ($conectado,$consulta);
/* Se comprueba si se ha podido completar correctamente la �ltima operaci�n,
lo que, en este caso, implicar� que tambi�n se han llevado a cabo, sin problemas,
las operaciones anteriores. El resultado se muestra en la p�gina. */
  if ($hacerConsulta){
	  echo ("La Base de datos y la tabla han sido creadas.");
  } else {
	  echo ("Ha surgido alg�n problema durante la creaci�n de la BBDD y/o la tabla.<br>");
	  echo ("El problema es el siguiente:<br>");
	  echo ("C�digo: <b>".mysql_errno ()."</b><br>");
	  echo ("Descripci�n:: <b>".mysql_error ()."</b><br>");
  }
// Se liberan recursos y se cierra la base de datos.
  //@mysql_free_result ($hacerConsulta);
  //mysqli_free_result($this->result);
  mysqli_close ($conectado);
?>
