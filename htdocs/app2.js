const urlObtenerUsuario = '/api/obtenerUsuario.php';
const urlAgregarUsuario = '/api/agregarUsuario.php';
const urlEditarUsuario = '/api/editarUsuario.php';
const urlBorrarUsuario = '/api/borrarUsuario.php';

async function obtenerEmpleados() {
    try {
        const res = await fetch(urlObtenerUsuario,
            {
                method: 'GET',

            });

        //console.log(`datos devueltos primer fetch${res}`)
        listaEmpleados = await res.json()
        console.log(listaEmpleados)

        let keysinobj = Object.keys(listaEmpleados)
        parrafo = document.getElementById("demo")
        cadena = ""
        if (keysinobj.length == 0) {

            cadena = "<h3>No Hay Pacientes en la BBDD</h3>"
            parrafo.innerHTML = cadena

        } else {
            //mostrarEmpleados()

            listaEmpleados.forEach(empleado => {
                //const {dniUsuario, nombre, apellidos, telefono} = empleado

                console.log(empleado)

                cadena += "<tr><td> " + empleado.DNI + "</td><td> " + empleado.Nombre + "</td><td> " + empleado.Apellidos + "</td><td> " + empleado.Telefono + "</td>"

                cadena += "<td><button onclick=\"eliminarEmpleado('" + empleado.DNI + "')\" class=\"btn btn-eliminar\">Eliminar</button></td>"
                cadena += "<td><button onclick=\"cargarEmpleado('" + empleado.DNI + "','" + empleado.Nombre + "','" + empleado.Apellidos + "','" + empleado.Telefono + "')\" class=\"btn btn-editar\">Modificar</button></tr></td>"
                //<button onclick="eliminarEmpleado(${idUsuario})" class="btn btn-eliminar">Eliminar</button>
                //<button onclick="cargarEmpleado(${idUsuario}, '${nombre}', '${contrasena}', '${email}')" class="btn btn-editar">Modificar</button>


            })
            cadena2 = "<table class= \"table table-striped\">" + cadena + "</table>"
            console.log(cadena2)
            parrafo.innerHTML = cadena2

        }

    }
    catch (error) {
        console.log(error)
    }

}

obtenerEmpleados()