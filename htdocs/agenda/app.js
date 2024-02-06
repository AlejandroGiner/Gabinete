function createCalendar(elem, year, month, day) {
    let d = new Date(year, month);

    // Create container div
    let container = document.createElement('div');

    // Display date
    let dateHeader = document.createElement('div');
    dateHeader.textContent = year + '-' + month + '-' + day;
    container.appendChild(dateHeader);

    // Create table element
    let table = document.createElement('table');

    // Create table header row
    let headerRow = table.createTHead().insertRow();
    ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].forEach(day => {
        let th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });

    // Create table body
    let tbody = table.createTBody();

    // Create first row with empty cells up to the start of the month
    let currentRow = tbody.insertRow();
    for (let i = 0; i < getDay(d); i++) {
        currentRow.insertCell();
    }

    // Populate table with days
    while (d.getMonth() === month) {
        let cell = currentRow.insertCell();
        cell.textContent = d.getDate();

        if (getDay(d) % 7 === 6) { // Sunday, start new row
            currentRow = tbody.insertRow();
        }

        d.setDate(d.getDate() + 1);
    }

    // Add empty cells after the last day of the month to complete the last row
    if (getDay(d) !== 0) {
        for (let i = getDay(d); i < 7; i++) {
            currentRow.insertCell();
        }
    }

    // Add table to container div
    container.appendChild(table);

    // Modify cell content to include buttons
    for (let i = 1; i <= 31; i++) {
        let cells = container.getElementsByTagName('td');
        for (let cell of cells) {
            if (cell.textContent == i) {
                let button = document.createElement('input');
                button.type = 'button';
                button.value = i;
                button.addEventListener('click', function() {
                    cambiarDia(this.value);
                });

                if (i === day) {
                    button.style.backgroundColor = 'black';
                    button.style.color = 'white';
                }

                cell.innerHTML = '';
                cell.appendChild(button);
            }
        }
    }

    // Set container as the content of the provided element
    elem.innerHTML = '';
    elem.appendChild(container);
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
const date = new Date()
var year = date.getFullYear()
var month = date.getMonth()
var day = date.getDate()

calendarContainer = document.getElementById('calendar-container')
createCalendar(calendarContainer, year, month, day);



// FUNCIONES ALEJANDRO
const URL_GET_APPOINTMENT = '/api/obtenerCita.php';


async function getAppointments(date) {
    console.log(JSON.stringify({ 'fecha_cita': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` }))
    try {
        const response = await fetch(URL_GET_APPOINTMENT,
            {
                method: 'POST',
                body: JSON.stringify({ 'fecha_cita': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` })
            }
        );
        appointments = await response.json()
        console.log(appointments)
        // for (appt of appointments) {

        //     const userRow = generateAppointmentRow(appt)
        //     tbody.appendChild(userRow)

        // }
    }
    catch (error) {
        console.log(error)
    }
}

getAppointments(new Date())