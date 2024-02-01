const URL_GET_APPOINTMENT = '/api/obtenerCita.php';

/**
 * Populates the appointments modal body with appointments.
 */
async function getAppointments() {
    console.log(`Viendo citas de ${1}`)
    try {
        const response = await fetch(URL_GET_USER);
        users = await response.json()

        const tbody = document.getElementById('main-table-body')

        for (user of users) {

            const userRow = generateUserRow(user)
            tbody.appendChild(userRow)

        }
    }

    catch (error) {
        console.log(error)
    }
}

appointmentButtons = document.querySelectorAll('.ver-citas')
console.log(appointmentButtons)
for (const button of appointmentButtons) {
    button.addEventListener('click',getAppointments)
    console.log(`Added event listener to button`)
}
