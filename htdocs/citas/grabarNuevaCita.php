<html>
  <head>
  <script language="javascript" type="text/javascript">
    function volver(){
      document.retorno.submit();
    }
  </script>
  </head>
  <body onLoad="javascript:volver();">
  <?php
// Se incluye el miniscript de tratamiento de fechas
  include ("inc/fechas.php");
// Se incluye el miniscript que abre la base de datos.
  include ("inc/usarBD.php");
// Se crea la hora, a partir de las horas y minutos establecidos en el formulario de nueva cita.
  $horaDeCita=$_POST["hora"].":".$_POST["minutos"];
// Se monta la consulta para grabar una nueva cita.
  $consulta="INSERT INTO citas (fecha_cita, hora_inicio, asunto) VALUES ('$fechaEnCurso','$horaDeCita','".$_POST["asunto"]."');";
// Se ejecuta la consulta.
  $stmt = $conexion->prepare($consulta);
  $stmt->execute();
  $stmt->close();
  
  
  //$hacerConsulta=mysql_query ($consulta,$conexion);
  // Se liberan recursos y se cierra la base de datos.
  //@mysql_free_result($hacerConsulta);
  //mysql_close($conexion);
  ?>
  <form action="index.php" name="retorno" id="retorno" method="post">
    <input type="hidden" name="fechaEnCurso" id="fechaEnCurso" value="<?php echo ($fechaEnCurso); ?>">
  </form>
  </body>
</html>
