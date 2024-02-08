<?php
/* Si se intenta acceder sin haber seleccionado una cita, se regresa al index. */
  if (!isset($_POST["citaSeleccionada"])) header("Location: index.php");
?>
<html>
  </head>
  <?php
// Se incluye el miniscript de tratamiento de fechas
    include ("inc/fechas.php");
// Se incluye el miniscript que abre la base de datos.
    include ("inc/usarBD.php");
  ?>
  <script language="javascript" type="text/javascript">
    function volver(){
      document.retorno.submit();
    }
  </script>
  </head>

  <body onLoad="javascript:volver();">
  <?php
/* Se crea una consulta para eliminar la cita que se haya seleccionado en la p�gina principal.
La cita se designa aa trav�s del campo 'idCita', cuyo valor queda asignado a los botones de
radio de la pagina index.php (ver c�digo).*/
    $consulta="DELETE FROM citas WHERE idcita='".$_POST["citaSeleccionada"]."';";

    $stmt = $conexion->prepare($consulta);
    $stmt->execute();
    $stmt->close();


// Se ejecuta la consulta de eliminaci�n.
// $hacerConsulta=mysql_query($consulta, $conexion);
// Se liberan recursos y se cierra la base de datos.
//    @mysql_free_result ($hacerConsulta);
//    mysql_close ($conexion);
  ?>
  <form action="index.php" method="post" name="retorno" id="retorno">
    <input type="hidden" name="fechaEnCurso" id="fechaEnCurso" value="<?php echo ($fechaEnCurso); ?>">
  </form>
  </body>
</html>

