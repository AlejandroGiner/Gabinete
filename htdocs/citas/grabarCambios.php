<?php
// Se incluye el miniscript que abre la base de datos.
  include ("inc/usarBD.php");
// Se toman todos los datos necesarios del formulario de modificaciones.
  $nuevaHora=$_POST["hora"].":".$_POST["minutos"];
  $nuevaFecha=$_POST["annio"]."-".$_POST["mes"]."-".$_POST["dia"];
// Se monta y ejecuta la consulta de actualizaci�n.
  $consulta="UPDATE citas SET fecha_cita='".$nuevaFecha."', hora_inicio='".$nuevaHora."', asunto='".$_POST["asunto"]."' WHERE id_cita=".$_POST["citaSeleccionada"].";";

  $hacerConsulta = $conexion->query($consulta);

  //$hacerConsulta=mysql_query($consulta, $conexion);
// Se liberan recursos y se cierra la base de datos.
  //@mysql_free_result($hacerConsulta);
  //mysql_close ($conexion);
?>
<html>
  <head>
    <script language="javascript" type="text/javascript">
/* Cuando se ha cargado la p�gina (ya se ha hecho la actualizaci�n) se vuelve a
index, pasando la fecha en curso como un campo oculto.*/
      function volver(){
        document.retorno.submit();
      }
    </script>
  </head>
  <body onLoad="javascript:volver();">
<!-- El siguiente formulario es para volver a index xon la fecha en curso. -->
    <form action="index.php" method="post" name="retorno" id="retorno">
	  <input type="hidden" name="fechaEnCurso" id="fechaEnCurso" value="<?php echo ($_POST['fechaEnCurso']);?>">
	</form>
  </body>
</html>
