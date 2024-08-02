// Defino un array de productos con stock, precio, e imagen
const productos = [
    { nombre: "Yerba", precio: 100, stock: 10, imagen: "./data/Yerba.jpg" },
    { nombre: "Azucar", precio: 200, stock: 5, imagen: "./data/Azucar.jpg" },
    { nombre: "Pan", precio: 150, stock: 8, imagen: "./data/Pan.jpg" },
    { nombre: "Vino", precio: 120, stock: 12, imagen: "./data/Vino.jpg" },
    { nombre: "Gaseosa", precio: 90, stock: 20, imagen: "./data/Gaseosa.jpg" },
    { nombre: "Servilletas", precio: 300, stock: 7, imagen: "./data/Servilletas.jpg" },
    { nombre: "Detergente", precio: 250, stock: 15, imagen: "./data/Detergente.jpg" },
];

// Variable global para almacenar el producto en oferta
let productoEnOferta;

// Esta función selecciona un producto aleatorio y lo marca como el producto en oferta
function seleccionarProductoEnOferta() {
    // Selecciono un producto aleatorio del array de productos
    productoEnOferta = productos[Math.floor(Math.random() * productos.length)];
    // Guardar el producto en oferta en localStorage (esto es para que no se genere un nuevo producto al recargar o cambiar de pagina, es solo para el ejercicio)
    localStorage.setItem('productoEnOferta', JSON.stringify(productoEnOferta));
}

// Esta funcion muestra el producto en oferta en la página principal
function mostrarOferta() {
    // Selecciono el elemento donde se va a mostrar la oferta
    const ofertaDiv = document.getElementById('oferta');

    // Actualizo el contenido HTML del elemento con la clase 'oferta' para mostrar la oferta del producto
    ofertaDiv.innerHTML = `
        <!-- Titulo de la oferta con 30% de descuento -->
        <h2>Oferta ${productoEnOferta.nombre} (30% OFF)</h2>
        
        <!-- Imagen del producto -->
        <img src="${productoEnOferta.imagen}" alt="${productoEnOferta.nombre}" style="width: 100px; height: auto;">
        
        <!-- Nombre, precio y stock disponible -->
        <p>$${productoEnOferta.precio} (Stock: ${productoEnOferta.stock})</p>
        
        <!-- Linkeado para ver el producto -->
        <a href="productos.html#producto-${productos.indexOf(productoEnOferta)}" class="boton-oferta">Ver Producto</a>
    `;
}

// Esta funcion se encarga de cargar los productos en la pagina de productos
function cargarProductos() {
    // Obtengo el elemento de la pagina donde se van a listar los productos
    const lista = document.getElementById('productos-lista');

    // Recorro el array de productos utilizando foreach para crear y añadir cada uno a la página
    productos.forEach((producto, index) => {
        // Creo un nuevo elemento div para cada producto
        const item = document.createElement('div');
        item.classList.add('producto'); // Agrego una clase para aplicar estilos

        // Verifico si este producto es el que esta en oferta (comparo el nombre del producto actual, con el nombre del producto que esta en oferta)
        let esOferta = producto.nombre === productoEnOferta.nombre;

        // Inserto el HTML necesario para mostrar el producto, incluyendo la oferta si corresponde
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">  <!-- Imagen del producto -->
            <span>${producto.nombre}${esOferta ? ' - Oferta (30% OFF)' : ''}</span>  <!-- Nombre del producto, incluyendo 'Oferta' si aplica -->
            <span class="precio">$${producto.precio}</span>  <!-- Precio del producto -->
            <span class="stock">Stock: ${producto.stock}</span>  <!-- Cantidad disponible en stock -->
            <input type="number" id="cantidad-${index}" min="0" max="${producto.stock}" placeholder="Cantidad">  <!-- Campo para ingresar la cantidad deseada -->
        `;

        // Añado el nuevo elemento a la lista de productos en la página
        lista.appendChild(item);
    });
}

// Esta funcion calcula el total de la compra y muestra un mensaje
function comprar() {
    let total = 0;  // Inicializo la variable para almacenar el total de la compra
    let mensaje = '';  // Inicializo la variable para almacenar el mensaje que se mostrara

    // Recorro el array de productos para calcular el total de la compra
    productos.forEach((producto, index) => {
        // Obtengo la cantidad ingresada por el usuario para cada producto
        let cantidad = parseInt(document.getElementById(`cantidad-${index}`).value); //Utilizo parseInt para solucionar el problema de los decimales

        // Si la cantidad ingresada no es un numero, la configuro en 0 (esto resuelve el problema de los campos vacios)
        if (isNaN(cantidad)) {
            cantidad = 0;
        }

        // Verifico si la cantidad ingresada es válida (no puede ser menor a 0 o mayor al stock disponible)
        if (cantidad < 0 || cantidad > producto.stock) {
            mensaje = `Error: Revise la cantidad ingresada del producto ${producto.nombre}.`;  // Si no es válida, configuro el mensaje de error
            return;  // Salgo de la función para no sumar el total en caso de error
        }

        // Si la cantidad es valida, la multiplico por el precio y sumo al total
        total += cantidad * producto.precio;
    });

    // Si no hay mensaje de error, configuro el mensaje con el total de la compra
    if (!mensaje) {
        mensaje = `Total de la compra: $${total}`;
    }

    // Muestra el mensaje en el elemento con id 'mensaje'
    document.getElementById('mensaje').innerText = mensaje; //Error o total de la compra
}

// Esta funcion maneja la carga de la página principal y de productos
function cargarPagina() {
    // Verifico si hay un producto en oferta guardado en localStorage
    const productoEnOfertaGuardado = localStorage.getItem('productoEnOferta');
    if (productoEnOfertaGuardado) {
        productoEnOferta = JSON.parse(productoEnOfertaGuardado);
    } else {
        // Si no hay producto en oferta en localStorage, selecciono uno nuevo
        seleccionarProductoEnOferta();
    }
    
    // Verifico si estoy en la pagina de productos o en la pagina principal
    if (document.getElementById('oferta')) {  //Si encuentro el elemento con id oferta
        // Si estoy en la pagina principal, muestro la oferta
        mostrarOferta();
    } else if (document.getElementById('productos-lista')) { //Si encuentro el elemento con id productos-lista
        // Si estoy en la pagina de productos, cargo los productos
        cargarProductos();
    }
}

// Al cargar la pagina, llamo a la funcion para manejar la carga de la pagina
window.onload = cargarPagina;


