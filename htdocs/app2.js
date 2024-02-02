const URL_GET_USER = '/api/obtenerUsuario.php';
const URL_ADD_USER = '/api/agregarUsuario.php';
const URL_EDIT_USER = '/api/editarUsuario.php';
const URL_DELETE_USER = '/api/borrarUsuario.php';
const URL_GET_APPOINTMENT = '/api/obtenerCita.php';

/**
 * Generates a td element with a value inside.
 * @param {string} value - The text contained by the cell.
 * @returns 
 */
function generateTextCell(value) {
    const cell = document.createElement('td');
    cell.innerText = value;
    return cell;
}

/**
 * Generates a button element with specified classes, Bootstrap toggle, Bootstrap target and text.
 * @param {Array<string>} classes 
 * @param {string} target 
 * @param {string} text 
 * @param {string} toggle 
 * @returns 
 */
function generateButton(classes, target, text, toggle = 'modal') {
    const button = document.createElement('button')
    button.classList.add(...classes)
    button.setAttribute('data-bs-toggle', toggle)
    button.setAttribute('data-bs-target', target)
    button.innerText = text
    return button
}

/**
 * Generates a cell containing a specified button.
 * @param {*} button 
 * @returns 
 */
function generateButtonCell(button) {
    const cell = document.createElement('td');
    cell.appendChild(button);
    return cell;
}

/**
 * Populates the appointments modal body with appointments.
 */
async function getAppointments(event) {
    const tbody = document.querySelector('#verCitasModal tbody')
    tbody.replaceChildren()
    const id_usuario = event.target.getAttribute('data-id')
    console.log(`Viendo citas de ${id_usuario}`)
    try {
        const response = await fetch(URL_GET_APPOINTMENT,
            {
                method: 'POST',
                body: JSON.stringify({'id_usuario': id_usuario})
            }
            );
        appointments = await response.json()
        console.log(appointments)
        for (appt of appointments) {

            const userRow = generateAppointmentRow(appt)
            tbody.appendChild(userRow)

        }
    }

    catch (error) {
        console.log(error)
    }
}



function generateAppointmentRow(appt) {
    const apptRow = document.createElement('tr')
    apptRow.appendChild(generateTextCell(appt.fecha_cita))
    apptRow.appendChild(generateTextCell(appt.hora_inicio))
    apptRow.appendChild(generateTextCell(appt.hora_fin))
    apptRow.appendChild(generateTextCell(appt.tipo_cita))
    apptRow.appendChild(generateTextCell(appt.facturada))
    apptRow.appendChild(generateTextCell(appt.comentario))

    return apptRow
}

/**
 * Generates a row for a table based on a specific user.
 * @param {*} user 
 * @returns 
 */
function generateUserRow(user) {
    const userRow = document.createElement('tr')
    userRow.appendChild(generateTextCell(user.Nombre))
    userRow.appendChild(generateTextCell(user.Apellidos))
    userRow.appendChild(generateTextCell(user.Telefono))

    modifyButton = generateButton(['btn', 'btn-secondary'], '#modificarUsuarioModal', 'Modificar')
    deleteButton = generateButton(['btn', 'btn-danger'], '#eliminarUsuarioModal', 'Eliminar')
    showAppointmentsButton = generateButton(['btn', 'btn-primary', 'vercitas'], '#verCitasModal', 'Ver Citas')
    showAppointmentsButton.setAttribute('data-id',user.id_usuario)
    showAppointmentsButton.addEventListener('click',getAppointments)

    userRow.appendChild(generateButtonCell(modifyButton))
    userRow.appendChild(generateButtonCell(deleteButton))
    userRow.appendChild(generateButtonCell(showAppointmentsButton))

    return userRow
}

/**
 * Populates the table body with user rows.
 */
async function getUsers() {
    try {
        const response = await fetch(URL_GET_USER);
        users = await response.json()

        const tbody = document.querySelector('#main-table-body')

        for (user of users) {

            const userRow = generateUserRow(user)
            tbody.appendChild(userRow)

        }
    }

    catch (error) {
        console.log(error)
    }
}

getUsers()
