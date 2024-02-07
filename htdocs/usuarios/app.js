
const formu = document.getElementById('formulario')
console.log(formu)
let usuariodni = document.getElementById('dni')
let usuarionombre = document.getElementById('nombre')
let usuarioapellidos = document.getElementById('apellidos')
let usuariotelefono = document.getElementById('telefono')

formu.addEventListener('submit', validarFormulario)

const urlObtenerUsuario = '/api/obtenerUsuario.php'
const urlAgregarUsuario = '/api/agregarUsuario.php'
const urlEditarUsuario = '/api/editarUsuario.php'
const urlBorrarUsuario = '/api/borrarUsuario.php'

let listaEmpleados = []
let editando = false

const objEmpleado = {
  dni: '',
  nombre: '',
  apellidos: '',
  telefono: ''
}


async function obtenerEmpleados() {
  try {
    const res = await fetch(urlObtenerUsuario,
      {
        method: 'GET',

      });

    // waits until the request completes...

    //console.log(`datos devueltos primer fetch${res}`)
    listaEmpleados = await res.json()
    //console.log(`datos devueltos segundo fetch${listaEmpleados}`)
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

function validarFormulario(evt) {
  //console.log("Form Submitted ")
  evt.preventDefault();

  if ([usuariodni.value, usuarionombre.value, usuarioapellidos.value, usuariotelefono].includes('')) {
    alert('Todos los campos son obligatorios')
    return
  }
  //console.log(usuariodni.value + usuarionombre.value + usuarioapellidos.value + usuariotelefono.value)
  //alert ("estoy en validar formulario")

  objEmpleado.dni = usuariodni.value
  objEmpleado.nombre = usuarionombre.value
  objEmpleado.apellidos = usuarioapellidos.value
  objEmpleado.telefono = usuariotelefono.value
  console.log(editando)
  alert(editando)
  if (editando) {
    editarEmpleado()
    editando = false
  } else {
    //agregamos nuevo paciente
    agregarEmpleado()
  }

}

async function agregarEmpleado() {
  alert("estoy en agregar empleado")
  alert(objEmpleado)
  console.log(objEmpleado)
  try {
    const res = await fetch(urlAgregarUsuario,
      {
        method: 'POST',
        body: JSON.stringify(objEmpleado)
      })
    if (!res.ok) {
      throw { ok: false, msg: "error 404" };
    }
    console.log(res)
    //alert ("esta es la respuesta después del fetch" + res)
    const data = await res.json()
    console.log(data)

    //pruebas para recorrer el objeto json
    console.log(data.msg1)
    console.log(data.msg2)
    console.log(data.msg3)

    for (d in data) {
      console.log(d)
      console.log(data[d])
    }
    alert('Se registro exitosamente')
    limpiarHTML()
    obtenerEmpleados()

    formulario.reset()
    limpiarObjeto()


  } catch (error) {
    console.log(error)
  } finally {
    //console.log("estoy en el finally de agregar empleado")
  }

}


async function editarEmpleado() {
  alert("estoy en editar empleado")
  //aqui uso el then para consumir las promesas. Es otra forma de hacerlo
  const res = await fetch(urlEditarUsuario,
    {
      method: 'POST',
      body: JSON.stringify(objEmpleado)
    })
    .then(respuesta => respuesta.json())
    .then(data => data)
    .catch(error => alert(error))

  if (res.msg === 'OK') {
    alert('Se actualizó correctamente')

    limpiarHTML()
    obtenerEmpleados()
    formulario.reset()

    limpiarObjeto()
  }

  formu.querySelector('button[type="submit"]').textContent = 'Agregar';

  editando = false

}

function cargarEmpleado(id, nom, ape, tfno) {
  //const {idUsuario, nombre, contrasena, email} = empleado
  //console.log(id+nom+ape+tfno)
  usuariodni.value = id
  usuarionombre.value = nom
  usuarioapellidos.value = ape
  usuariotelefono.value = tfno

  objEmpleado.dni = id
  editando = true
  alert("editando vale: " + editando)
  formu.querySelector('button[type="submit"').textContent = 'Actualizar'


}



function limpiarHTML() {
  const divEmpleados = document.querySelector('#demo');
  while (divEmpleados.firstChild) {
    divEmpleados.removeChild(divEmpleados.firstChild)
  }
}

function limpiarObjeto() {
  objEmpleado.idUsuario = ''
  objEmpleado.usuario = ''
  objEmpleado.contrasena = ''
  objEmpleado.email = ''
}


async function eliminarEmpleado(id) {
  let confirmar = confirm("¿Confirma el borrado del paciente con DNI: " + id + "?");
  if (confirmar == true) {
    const res = await fetch(urlBorrarUsuario,
      {
        method: 'POST',
        body: JSON.stringify({ 'idUsuario': id })
      })
      .then(respuesta => respuesta.json())
      .then(data => data)
      .catch(error => alert(error))

    if (res.msg === 'OK') {
      alert('Se borró exitosamente')

      limpiarHTML()
      obtenerEmpleados()
      limpiarObjeto()
    }

  }
}

obtenerEmpleados()
