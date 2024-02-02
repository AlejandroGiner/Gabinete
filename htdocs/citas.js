const URL_GET_APPOINTMENT = '/api/obtenerCita.php';



appointmentButtons = document.querySelectorAll('button.vercitas')
console.log(appointmentButtons)
for (const button of appointmentButtons) {
    button.addEventListener('click',getAppointments)
    console.log(`Added event listener to button`)
}
