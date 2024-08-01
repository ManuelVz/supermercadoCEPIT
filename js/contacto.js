function guardarContacto(event) {
    // Evito que el formulario se envíe de forma predeterminada para poder manejar el envío manualmente
    event.preventDefault();

    // Obtengo el valor ingresado en los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const consulta = document.getElementById('consulta').value;

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
