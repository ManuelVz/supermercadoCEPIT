//Para generar el producto aleatorio en oferta
function mostrarOferta() {
    const ofertaDiv = document.querySelector('.oferta');
    // Seleccionar un producto aleatorio
    const productoAleatorio = productos[Math.floor(Math.random() * productos.length)];
    
        // Actualizo el contenido HTML del elemento con la clase 'oferta' para mostrar la oferta del producto
        ofertaDiv.innerHTML = `
            <!-- Titulo de la oferta con 30% de descuento -->
            
            <h2>Producto en Oferta (30% OFF)</h2>
            
            <!-- Imagen del producto -->
            <img src="${productoAleatorio.imagen}" alt="${productoAleatorio.nombre}" style="width: 100px; height: auto;">
            
            <!-- Nombre, precio y stock disponible -->
            <p>${productoAleatorio.nombre} - $${productoAleatorio.precio} (Stock: ${productoAleatorio.stock})</p>
            
            <!-- Linkeado para ver el producto -->
            <a href="productos.html#producto-${productos.indexOf(productoAleatorio)}" class="boton-oferta">Ver Producto</a>
        `;

}

// Al cargar la pagina, llamo a la funcion para cargar la oferta aleatoria
window.onload = mostrarOferta;