<?php
// Se define una secuencia para el salto de l�nea.
  define ("salto","\n<br>\n");
/* Se determina si existe una variable de formulario (POST) con la fecha en curso de la agenda.
Si existe, la variable de memoria de la fecha se ajusta al contenido de la del formulario
(proceda de donde proceda). Si no existe, se toma la fecha del sistema.*/
  if (isset($_POST["fechaEnCurso"])){
	  $fechaEnCurso=$_POST["fechaEnCurso"];
  } else {
	  $fechaEnCurso=date("Y-m-d");
    //echo ($fechaEnCurso);
  }
/* A partir de la variable de memoria con la fecha en curso, se obtiene el a�o, el mes y el dia. */
  $annioActual=substr($fechaEnCurso,0,4);
  $mesActual=substr($fechaEnCurso,5,2);
  $diaActual=substr($fechaEnCurso,8);
?>