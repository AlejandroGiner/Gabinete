<html>

<head>


  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">


  <style>
    table {
      border-collapse: collapse;
    }

    td,
    th {
      border: 1px solid black;
      padding: 3px;
      text-align: center;
    }

    th {
      font-weight: bold;
      background-color: #E6E6E6;
    }
  </style>


  <title>Mini-agenda</title>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>

<body>


  <div id="calendar"></div>

  <br><br>

  <?php
  // Se incluye el miniscript que abre la base de datos.
  include("inc/fechas.php");

  // Se incluye el miniscript de tratamiento de fechas
  include("inc/usarBD.php");
  //echo $fechaEnCurso;
  /* Se crea una consulta para recuperar todos los datos de las citas con fecha del d�a en curso.
La consulta de selecci�n se crea de tal modo que ordene las citas por la hora. */
  $consulta = "SELECT * FROM citas WHERE fecha_cita='" . $fechaEnCurso . "' ORDER BY hora_inicio;";
  /* Se ejecuta la consulta de selecci�n.*/
  //$hacerConsulta=mysql_query($consulta, $conexion);

  $hacerConsulta = $conexion->query($consulta);

  /* Se determina el n�mero de registros recuperados por el cursor, porque si es 0 el
dise�o de la p�gina (parte HTML) es diferente que si hay registros. */
  //$numeroDeCitasDelDia=mysql_num_rows($hacerConsulta);
  $numeroDeCitasDelDia = $hacerConsulta->num_rows;


  echo ("Tienes las siguientes Citas: " . $numeroDeCitasDelDia . salto);
  ?>
  <form action="index.php" method="post" name="retorno" id="retorno">
    <input type="hidden" name="fechaEnCurso" id="fechaEnCurso" value="<?php echo ($fechaEnCurso); ?>">
  </form>
  AGENDA DEL D&Iacute;A:
  <?php
  /* Se muestra la fecha del d�a. */
  echo ($diaActual . " del " . $mesActual . " de " . $annioActual);
  //echo ($fechaEnCurso);
  ?>
  <!-- El formulario no tiene valor en el par�metro action porque se le
asigna por una funci�n javascript antes de enviarlo. La funci�n que se ejecute
y, por tanto, el valor de este par�metro, depende del bot�n pulsado por el usuario.-->
  <form action="" method="post" name="formularioCitasPrincipal" id="formularioCitasPrincipal">
    <!-- El siguiente campo oculto almacena la fecha en curso, obtenida desde PHP.
Este dato se enviar� a otros formularios y, a su vez, se rcuperar� desde la 
p�gina de cambio de fecha actual. -->
    <input type="hidden" name="fechaEnCurso" id="fechaEnCurso" value="<?php echo ($fechaEnCurso); ?>">
    <table width="500" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <th>CITAS</th>
      </tr>
    </table>
    <hr>
    <?php
    /* Se comprueba si hay citas en el cursor. Si es as�, se dibujar� una
tabla en la que se mostrar�n las citas y unos botones de selecci�n. */
    if ($numeroDeCitasDelDia > 0) {
      echo ("<table width='500' border='0' cellspacing='0' cellpadding='0'>");
      //while ($cita = mysql_fetch_array($hacerConsulta, MYSQL_ASSOC)) {
      while ($cita = $hacerConsulta->fetch_array()) {
        echo ("<tr><td>" . $cita["hora_inicio"] . "</td>");
        echo ("<td>" . $cita["asunto"] . "</td>");
        /* Cada cita tiene asociado un bot�n de selecci�n para si el usuario quiere
modificarla o borrarla. El valor del bot�n es el identificativo de la cita,
de modo que se usar� en las correspondientes consultas de actualizaci�n o
eliminaci�n en las p�ginas que proceda.*/
        echo ("<td><input type='radio' id='citaSeleccionada' name='citaSeleccionada' value='" . $cita["id_cita"] . "'>");
        echo ("</td></tr>");
      }
      echo ("</table>");
      /* Si existen citas se mostrar�n los botones de borrar y modificar. */
      echo ("<input name='borrarCita' type='button' id='borrarCita' value='Eliminar Cita' onClick='javascript:saltar(\"eliminarCita.php\");'>" . salto);
      echo ("<input name='cambiarCita' type='button' id='cambiarCita' value='Modificar cita' onClick='javascript:saltar(\"cambiarCita.php\");'>" . salto);
    }
    /* En todo caso se mostrar�n los botones de agregar cita y cambiar la fecha en curso. */
    echo ("<input name='nuevaCita' type='button' id='nuevaCita' value='Agregar cita' onClick='javascript:saltar(\"agregarCita.php\");'>" . salto);
    echo ("<input name='cambiarFecha' type='button' id='cambiarFecha' value='Otro d&iacute;a' onClick='javascript:saltar(\"cambiarFecha.php\");'>" . salto);
    ?>
  </form>


  <script language="javascript" type="text/javascript">
    function createCalendar(elem, year, month, day) {

      let mon = month - 1; // los meses en JS son 0..11, no 1..12
      let d = new Date(year, mon);

      cadena = '<br><br>' + year + '-' + month + '-' + day + '<br><br>';
      //alert (cadena)

      let table = cadena + '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';

      // espacios en la primera línea
      // desde lunes hasta el primer día del mes
      // * * * 1  2  3  4
      for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
      }

      // <td> con el día  (1 - 31)
      while (d.getMonth() == mon) {
        table += '<td>' + d.getDate() + '</td>';

        if (getDay(d) % 7 == 6) { // domingo, último dia de la semana --> nueva línea
          table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
      }

      // espacios después del último día del mes hasta completar la última línea
      // 29 30 31 * * * *
      if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
          table += '<td></td>';
        }
      }

      // cerrar la tabla
      table += '</tr></table>';
      //alert (table)
      table2 = "";

      for (let $i = 1; $i <= 31; $i++) {

        if ($i == day) {
          table2 = table.replace("<td>" + $i + "</td>", "<td><input type=\"button\" style=\"background-color:black;color:white\" value=\"" + $i + "\" onClick=\"cambiarDia(this.value)\"></td>");
        } else {
          table2 = table.replace("<td>" + $i + "</td>", "<td><input type=\"button\" value=\"" + $i + "\" onClick=\"cambiarDia(this.value)\"></td>");
        }


        table = table2;
        //alert (cad)
      }

      //table2=table.replace("<td>1</td>", "<td><input type=\"button\" value=\"1\" onClick=\"cambiarDia(this.value)\"></td>");
      //alert (table2);
      elem.innerHTML = table2;
    }

    function getDay(date) { // obtiene el número de día desde 0 (lunes) a 6 (domingo)
      let day = date.getDay();
      if (day == 0) day = 7; // hacer domingo (0) el último día
      return day - 1;
    }

    function cambiarDia(num) {

      // cambiamos el valor de fecha en curso

      var $fecha = document.getElementById("fechaEnCurso").value;

      //alert (num);  

      $annioActual = $fecha.substring(0, 4);
      $mesActual = $fecha.substring(5, 7);
      //alert ("el mes actual es"+$mesActual)
      $diaActual = num;
      if ($diaActual.length == 1) {
        $diaActual = "0" + $diaActual;
      }

      $fec = $annioActual + "-" + $mesActual + "-" + $diaActual

      document.getElementById("fechaEnCurso").value = $fec;

      document.retorno.submit();

    }


    /* Las siguiente funci�n de JavaScript env�a el formulario a la p�gina que corresponda al bot�n pulsado. */
    /* es un truco para tener un solo formulario con el action parametrizable dependiendo del botón que se pulsa */
    function saltar(pagina) {
      //actualiza el action del formulario y fuerza el submit
      document.formularioCitasPrincipal.action = pagina;
      document.formularioCitasPrincipal.submit();
    }
    /* Aqu� termina la funci�n de env�o del formulario. */


    var $fecha = document.getElementById("fechaEnCurso").value;
    //alert ($fecha)
    var $annioActual = ""
    var $mesActual = ""

    $annioActual = $fecha.substring(0, 4);
    $mesActual = $fecha.substring(5, 7);
    $diaActual = $fecha.substring(8, 10);

    calendar = document.getElementById('calendar')
    createCalendar(calendar, $annioActual, $mesActual, $diaActual);
  </script>


</body>

</html>