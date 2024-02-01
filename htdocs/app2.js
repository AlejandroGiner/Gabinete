const URL_GET_USER = '/api/obtenerUsuario.php';
const URL_ADD_USER = '/api/agregarUsuario.php';
const URL_EDIT_USER = '/api/editarUsuario.php';
const URL_DELETE_USER = '/api/borrarUsuario.php';

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
    showAppointmentsButton = generateButton(['btn', 'btn-primary', 'ver-citas'], '#verCitasModal', 'Ver Citas')

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
