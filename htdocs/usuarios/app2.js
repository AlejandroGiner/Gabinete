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
                body: JSON.stringify({ 'id_cliente': id_usuario })
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

/**
 * Populates the modify modal with info about a specific user.
 */
async function getUserInfo(event) {
    const modifyButton = event.target
    console.log(modifyButton)

    var dni = modifyButton.getAttribute('data-dni');
    var nombre = modifyButton.getAttribute('data-nombre');
    var apellidos = modifyButton.getAttribute('data-apellidos');
    var telefono = modifyButton.getAttribute('data-telefono');
    var email = modifyButton.getAttribute('data-email');
    var fechaNac = modifyButton.getAttribute('data-fecha-nac');
    var direccion = modifyButton.getAttribute('data-direccion');

    // Set values in the form fields
    document.getElementById('dni').value = dni;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellidos').value = apellidos;
    document.getElementById('telefono').value = telefono;
    document.getElementById('email').value = email;
    document.getElementById('fecha-nac').value = fechaNac;
    document.getElementById('direccion').value = direccion;
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

    // Button to modify a user
    modifyButton = generateButton(['btn', 'btn-secondary', 'bi', 'bi-pencil-square'], '#modificarUsuarioModal', ' Modificar')
    modifyButton.setAttribute('data-dni', user.DNI)
    modifyButton.setAttribute('data-nombre', user.Nombre)
    modifyButton.setAttribute('data-apellidos', user.Apellidos)
    modifyButton.setAttribute('data-telefono', user.Telefono)
    modifyButton.setAttribute('data-email', user.Email)
    modifyButton.setAttribute('data-fecha-nac', user.Fecha_nac)
    modifyButton.setAttribute('data-direccion', user.Direccion)
    modifyButton.addEventListener('click', getUserInfo)


    deleteButton = generateButton(['btn', 'btn-danger', 'bi', 'bi-person-dash'], '#eliminarUsuarioModal', ' Eliminar')

    showAppointmentsButton = generateButton(['btn', 'btn-primary', 'vercitas', 'bi', 'bi-calendar4-event'], '#verCitasModal', ' Ver Citas')
    showAppointmentsButton.setAttribute('data-id', user.id_usuario)
    showAppointmentsButton.addEventListener('click', getAppointments)


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
