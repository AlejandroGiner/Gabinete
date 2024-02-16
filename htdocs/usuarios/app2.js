const URL_GET_USER = '/api/obtenerUsuario.php';
const URL_ADD_USER = '/api/agregarUsuario.php';
const URL_EDIT_USER = '/api/editarUsuario.php';
const URL_DELETE_USER = '/api/borrarUsuario.php';
const URL_GET_APPOINTMENT = '/api/obtenerCita.php';
const URL_GET_EXPEDIENTE = '/api/obtenerExpediente.php';

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
    const row = event.target.parentElement.parentElement
    console.log(row)

    var dni = row.getAttribute('data-dni');
    var nombre = row.getAttribute('data-nombre');
    var apellidos = row.getAttribute('data-apellidos');
    var telefono = row.getAttribute('data-telefono');
    var email = row.getAttribute('data-email');
    var fechaNac = row.getAttribute('data-fecha-nac');
    var direccion = row.getAttribute('data-direccion');
    var id_usuario = row.getAttribute('data-id')

    // Set values in the form fields
    document.getElementById('dni').value = dni;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellidos').value = apellidos;
    document.getElementById('telefono').value = telefono;
    document.getElementById('email').value = email;
    document.getElementById('fecha-nac').value = fechaNac;
    document.getElementById('direccion').value = direccion;
    document.getElementById('id_usuario_modificar').value = id_usuario;
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

    userRow.setAttribute('data-id', user.id_usuario)
    userRow.setAttribute('data-dni', user.DNI)
    userRow.setAttribute('data-nombre', user.Nombre)
    userRow.setAttribute('data-apellidos', user.Apellidos)
    userRow.setAttribute('data-telefono', user.Telefono)
    userRow.setAttribute('data-email', user.Email)
    userRow.setAttribute('data-fecha-nac', user.Fecha_nac)
    userRow.setAttribute('data-direccion', user.Direccion)

    // Modify user button
    modifyButton = generateButton(['btn', 'btn-secondary', 'bi', 'bi-pencil-square'], '#modificarUsuarioModal', ' Modificar')
    modifyButton.addEventListener('click', getUserInfo)

    // Delete user button
    deleteButton = generateButton(['btn', 'btn-danger', 'bi', 'bi-person-dash'], '#eliminarUsuarioModal', ' Eliminar')
    deleteButton.addEventListener('click',setDeleteID)

    // Show appointments button
    showAppointmentsButton = generateButton(['btn', 'btn-primary', 'vercitas', 'bi', 'bi-calendar4-event'], '#verCitasModal', ' Ver Citas')
    showAppointmentsButton.setAttribute('data-id', user.id_usuario)
    showAppointmentsButton.addEventListener('click', getAppointments)

    // Expediente
    expedienteButton = generateButton(['btn', 'btn-secondary', 'expediente', 'bi', 'bi-file-earmark-person-fill'], '#verExpedienteModal', 'Ver expediente')
    expedienteButton.setAttribute('data-id', user.id_usuario)
    expedienteButton.addEventListener('click', getExpediente)


    userRow.appendChild(generateButtonCell(modifyButton))
    userRow.appendChild(generateButtonCell(deleteButton))
    userRow.appendChild(generateButtonCell(showAppointmentsButton))
    userRow.appendChild(generateButtonCell(expedienteButton))

    return userRow
}


async function getExpediente(event) {

    const tbody = document.querySelector('#verExpedienteModal tbody')
    tbody.replaceChildren()

    // look at user ID of button pressed
    const id_usuario = event.target.getAttribute('data-id')

    // get expediente for that user

    try {
        const response = await fetch(URL_GET_EXPEDIENTE,
            {
                method: 'POST',
                body: JSON.stringify({'id_usuario': id_usuario})
            }
        );

        const expediente = await response.json()
        const expedienteDiv = document.createElement('p')
        expedienteDiv.innerText = expediente.comentario

        tbody.appendChild(expedienteDiv)
    }

    catch (error) {
        console.log(error)
    }


    // get comments for that user's appointments

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

            const apptRow = document.createElement('tr')
            apptRow.appendChild(generateTextCell(appt.comentario))
            tbody.appendChild(apptRow)

        }
    }

    catch (error) {
        console.log(error)
    }
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

document.getElementById('delete-button').addEventListener('click',deleteUser)

// DELETE USER

/**
 * Deletes a user with a given user ID.
 */
async function deleteUser(event) {
    event.preventDefault()
    const id_usuario = document.getElementById('eliminar_id').value
    console.log(`ELIMINANDO ${id_usuario}`)
    try {
        const response = await fetch(URL_DELETE_USER,
            {
                method: 'DELETE',
                body: JSON.stringify({ 'id_usuario': id_usuario })
            }
        );
        const responseJSON = await response.json()
        console.log(responseJSON)
    }

    catch (error) {
        console.log(error)
    }
    location.reload()
}

async function setDeleteID(event) {
    const row = event.target.parentElement.parentElement
    const id_usuario = row.getAttribute('data-id')
    document.getElementById('eliminar_id').value = id_usuario
}



botonModificarUsuario = document.getElementById('botonModificarUsuario')

botonModificarUsuario.addEventListener('click',modificarUsuario)

async function modificarUsuario(event){
    event.preventDefault()

    id_usuario = document.getElementById('id_usuario_modificar').value
    dni = document.getElementById('dni').value
    nombre = document.getElementById('nombre').value
    apellidos = document.getElementById('apellidos').value
    telefono = document.getElementById('telefono').value
    email = document.getElementById('email').value
    fecha_nac = document.getElementById('fecha-nac').value
    direccion = document.getElementById('direccion').value

    console.log(`Modificando ${id_usuario} - ${nombre}`)

    try {
        const response = await fetch(URL_EDIT_USER,
            {
                method: 'PUT',
                body: JSON.stringify({
                    'id_usuario': id_usuario,
                    'DNI': dni,
                    'Nombre': nombre,
                    'Apellidos': apellidos,
                    'Telefono': telefono,
                    'Email': email,
                    'Fecha_nac': fecha_nac,
                    'Direccion': direccion
                })
            }
        );
    }
    catch (error) {
        console.log(error)
    }
    location.reload()
}


// Crear usuario

botonCrearUsuario = document.getElementById('botonCrearUsuario')

botonCrearUsuario.addEventListener('click',crearUsuario)

async function crearUsuario(event){
    event.preventDefault()

    dni = document.getElementById('dni-crear').value
    nombre = document.getElementById('nombre-crear').value
    apellidos = document.getElementById('apellidos-crear').value
    telefono = document.getElementById('telefono-crear').value
    email = document.getElementById('email-crear').value
    fecha_nac = document.getElementById('fecha-nac-crear').value
    direccion = document.getElementById('direccion-crear').value

    console.log(`Creando ${nombre}`)

    try {
        const response = await fetch(URL_ADD_USER,
            {
                method: 'POST',
                body: JSON.stringify({
                    'dni': dni,
                    'nombre': nombre,
                    'apellidos': apellidos,
                    'telefono': telefono,
                    'email': email,
                    'fecha_nac': fecha_nac,
                    'direccion': direccion
                })
            }
        );
    }
    catch (error) {
        console.log(error)
    }
    location.reload()
}