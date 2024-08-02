function validarCampos(nombre, apellido, email, telefono, consulta) {

    // Defino constantes que voy a utilizar para validar
    const soloLetras = /^[A-Za-z]+$/; //Solo letras ^inicio de cadena; + al menos 1 caracter; $ final cadena
    const soloNumeros = /^\d+$/; //Solo numeros
 
    
    // Validaciones para todos los campos
    if (!nombre || !apellido || !email || !telefono || !consulta) {
        return 'Todos los campos son obligatorios.';
    }
    if (!soloLetras.test(nombre)) {
        return 'El nombre debe contener solo letras.';
    }
    if (!soloLetras.test(apellido)) {
        return 'El apellido debe contener solo letras.';
    }
    if (!soloNumeros.test(telefono) || telefono.length !== 10) {
        return 'El telefono debe contener exactamente 10 caracteres numericos.';
    }
    if (consulta.length < 10) {
        return 'La consulta debe tener al menos 10 caracteres.';
    }
    
    return ''; // Retorna una cadena vacia si todas las validaciones son correctas
}

function guardarContacto() {

    // Obtengo el valor ingresado en los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const consulta = document.getElementById('consulta').value;

    // Respuesta de la validacion
    const mensajeError = validarCampos(nombre, apellido, email, telefono, consulta); //Me devuelve el resultado de la funcion de validacion (mensaje vacio, o error)
    
    // Si hay errores, mostrar el mensaje y salir
    if (mensajeError) {
        document.getElementById('mensaje-contacto').innerText = mensajeError;
        return;
    }

    // Creo una cadena de texto con todos los datos del contacto 
    const data = `Nombre: ${nombre}, Apellido: ${apellido}, Email: ${email}, Teléfono: ${telefono}, Consulta: ${consulta}\n`;

    // Creo un objeto Blob con los datos de texto y especifico que es texto plano
    const blob = new Blob([data], { type: 'text/plain' });

    // Genero una URL temporal que apunta al Blob
    const url = URL.createObjectURL(blob);

    // Creo un elemento 'a' (link) para simular la descarga del archivo
    const a = document.createElement('a');

    // Establezco la URL del Blob como el destino del enlace
    a.href = url;

    // Asigno el nombre 'contacto.txt' al archivo que se va a descargar
    a.download = 'contacto.txt';

    // Cuando hago click en enviar, se inicia la descarga del archivo contacto.txt
    a.click();

    // Una vez que el archivo se descargo, vacio la url temporal
    URL.revokeObjectURL(url);

    // Capturo el elemento "mensaje-contacto" (inicialmente en blanco), y le asigno el texto que se va a ver en pantalla luego de apretar enviar
    document.getElementById('mensaje-contacto').innerText = 'Consulta enviada correctamente.';
}

