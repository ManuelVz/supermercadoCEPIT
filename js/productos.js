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

// Esta función se encarga de cargar los productos en la página
function cargarProductos() {
    // Obtengo el elemento de la página donde se van a listar los productos
    const lista = document.getElementById('productos-lista');
    
    // Recorro el array de productos utilizando foreach para crear y añadir cada uno a la página
    productos.forEach((producto, index) => {
        // Creo un nuevo elemento div para cada producto
        const item = document.createElement('div');
        item.classList.add('producto'); // Agrego una clase para aplicar estilos
        
        // Inserto el HTML necesario para mostrar el producto
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">  <!-- Imagen del producto -->
            <span>${producto.nombre}</span>  <!-- Nombre del producto -->
            <span class="precio">$${producto.precio}</span>  <!-- Precio del producto -->
            <span class="stock">Stock: ${producto.stock}</span>  <!-- Cantidad disponible en stock -->
            <input type="number" id="cantidad-${index}" min="0" max="${producto.stock}" placeholder="Cantidad">  <!-- Campo para ingresar la cantidad deseada -->
        `;
        
        // Añado el nuevo elemento a la lista de productos en la página
        lista.appendChild(item);
    });
}

// Esta función calcula el total de la compra y muestra un mensaje
function comprar() {
    let total = 0;  // Inicializo la variable para almacenar el total de la compra
    let mensaje = '';  // Inicializo la variable para almacenar el mensaje que se mostrara
    
    // Recorro el array de productos para calcular el total de la compra
    productos.forEach((producto, index) => {
        // Obtengo la cantidad ingresada por el usuario para cada producto
        let cantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
        
        // Si la cantidad ingresada no es un número, la configuro en 0 (esto resuelve el problema de los campos vacios)
        if (isNaN(cantidad)) {
            cantidad = 0;
        }
        
        // Verifico si la cantidad ingresada es válida (no puede ser menor a 0 o mayor al stock disponible)
        if (cantidad < 0 || cantidad > producto.stock) {
            mensaje = `Error: Cantidad superior al stock para ${producto.nombre}.`;  // Si no es válida, configuro el mensaje de error
            return;  // Salgo de la función para no sumar el total en caso de error
        }
        
        // Si la cantidad es válida, la multiplico por el precio y sumo al total
        total += cantidad * producto.precio;
    });
    
    // Si no hay mensaje de error, configuro el mensaje con el total de la compra
    if (!mensaje) {
        mensaje = `Total de la compra: $${total}`;
    }
    
    // Muestra el mensaje en el elemento con id 'mensaje'
    document.getElementById('mensaje').innerText = mensaje;
}

// Al cargar la pagina, llamo a la función para cargar los productos
window.onload = cargarProductos;

