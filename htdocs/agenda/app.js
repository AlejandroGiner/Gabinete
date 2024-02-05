function createCalendar(elem, year, month, day) {

    let mon = month - 1; // los meses en JS son 0..11, no 1..12
    let d = new Date(year, mon);

    cadena = '<br><br>' + year + '-' + month + '-' + day + '<br><br>';

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

    alert("la antigua fecha es: " + $fecha);

    $annioActual = $fecha.substring(0, 4);
    $mesActual = $fecha.substring(5, 7);
    //alert ("el mes actual es"+$mesActual)
    $diaActual = num;
    if ($diaActual.length == 1) {
        $diaActual = "0" + $diaActual;
    }

    $fec = $annioActual + "-" + $mesActual + "-" + $diaActual

    alert("la fecha seleccionada es " + $fec)

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


// var $fecha = document.getElementById("fechaEnCurso").value;
//alert ($fecha)
var $annioActual = ""
var $mesActual = ""

$annioActual = $fecha.substring(0, 4);
$mesActual = $fecha.substring(5, 7);
$diaActual = $fecha.substring(8, 10);

calendarContainer = document.getElementById('calendar-container')
createCalendar(calendarContainer, $annioActual, $mesActual, $diaActual);
