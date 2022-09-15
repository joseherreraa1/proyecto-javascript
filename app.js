//Array de carrito
const productosCarrito = [];

//Funciones Local Storage
function guardarProductos(productos){
    localStorage.setItem("productos", JSON.stringify(productos));
}
function obtenerProductos(){
    return JSON.parse(localStorage.getItem("productos")) || [];
}
function guardarProductosCarrito(carrito){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function obtenerProductosCarrito(){
    return JSON.parse(localStorage.getItem("carrito")) || [];
}
guardarProductosCarrito(productosCarrito);

//Compra total
let compraTotal = 0;

//Constructor de productos
class celulares{
    constructor(id, marca, nombre, precio, imagen){
        this.id = parseInt(id);
        this.marca = marca;
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.imagen = imagen;
    }
}
//Productos
const samsungS20 = new celulares (1,"Samsung", "Samsung S20", 180000, "../recursos/s20.png");
const samsungA73 = new celulares (2,"Samsung", "Samsung A73", 110000, "../recursos/a73.png");
const iphone13 = new celulares (3,"iPhone", "iPhone 13", 250000, "../recursos/iphone13.png");
const iphone12 = new celulares (4,"iPhone", "iPhone 12", 200000, "../recursos/iphone12.png");
const huaweiY9 = new celulares (5,"Huawei", "Huawei Y9", 90000, "../recursos/huaweiy9.png");
const huaweiP40 = new celulares (6,"Huawei", "Huawei P40", 230000, "../recursos/huaweip40.png");
const xiaominote = new celulares(7,"Xiaomi", "Xiaomi Note 11", 190000, "../recursos/xiaominote11.png");
const xiaomipoco = new celulares(8,"Xiaomi", "Xiaomi Poco M3", 140000, "../recursos/xiaomipocom3.png")

//Array de Productos
const productos = [
    samsungS20,
    samsungA73,
    iphone13,
    iphone12,
    huaweiY9,
    huaweiP40,
    xiaominote,
    xiaomipoco,
];
guardarProductos(productos);

//Secciones HTML

const seccionProductos = document.getElementById("productos");

//Carrito
const seccionCarrito = document.getElementById("carrito");
const productosEnCarrito = document.getElementById("productosCarrito");
const seccionTotal = document.getElementById("totalConfirmar");

//Botones Carrito

let abrirCarrito = document.getElementById("abrirCarrito");

abrirCarrito.onclick = () => {
    seccionCarrito.classList.add("carritoActivo");
}

let cerrarCarrito = document.getElementById("cerrarCarrito");

cerrarCarrito.onclick = () => {
    seccionCarrito.classList.remove("carritoActivo");
}

//Renderizado de productos

function renderProductos(){
    obtenerProductos();
    for(const producto of productos){
        const tarjetas = document.createElement("div");
        tarjetas.className = "tarjeta";
        tarjetas.innerHTML = `  <img src="${producto.imagen}" alt="${producto.nombre}">
                                <h3>${producto.nombre}</h3>
                                <h4>$ ${producto.precio}</h4>
                                <button class="boton1" onclick="agregarCarrito(${producto.id})" >Añadir al carrito</button>
                                `
        seccionProductos.appendChild(tarjetas);
    }    
}

//Elemento seleccionado

function seleccionado (id){
    return productos.find(x => x.id == id);
}

//Agregar elemento al carrito
function agregarCarrito(id){
    let productoSeleccionado = seleccionado(id);
    let carritoProductos = obtenerProductosCarrito();
    productoSeleccionado.cantidad = 1;
    carritoProductos.push(productoSeleccionado);
    guardarProductosCarrito(carritoProductos);
        const elementoAñadido = document.createElement("div");
        elementoAñadido.className = "elementoAñadido";
        elementoAñadido.innerHTML = `
                                    <div>
                                    <h3>${productoSeleccionado.nombre}</h3>
                                    <h4>${productoSeleccionado.precio}$</h4>
                                    <button class="boton1" onclick="eliminarCarrito(${productoSeleccionado.id})">Eliminar</button>
                                    </div>
                                    <div>
                                    <img class="imgCarrito" src="${productoSeleccionado.imagen}" alt="">
                                    </div>
                                    `
        productosEnCarrito.appendChild(elementoAñadido);
        seccionTotal.innerHTML = "";
        if(carritoProductos.length > 0){
            seccionTotal.innerHTML = `
                                    <button class="boton2" onclick="confirmarCompra()">Confirmar compra</button>
                                    <h4>Total a pagar: $${compraTotal = compraTotal + productoSeleccionado.precio}</h4>
                                    `
        }
}

//Eliminar elemento del carrito
function eliminarCarrito(id){
    let carritoProductos = obtenerProductosCarrito();
    let productoSeleccionado = seleccionado(id);
    console.log(productoSeleccionado);
    let posicion = carritoProductos.findIndex(x => x.id == id);
    carritoProductos[posicion].cantidad -= 1;
    compraTotal = 0;
    if(carritoProductos[posicion].cantidad == 0){
        carritoProductos.splice(posicion, 1);
        productosEnCarrito.innerHTML = "";
        seccionTotal.innerHTML = "";
        for(let producto of carritoProductos){
            const elementoAñadido = document.createElement("div");
            elementoAñadido.className = "elementoAñadido";
            elementoAñadido.innerHTML = `
                                        <div>
                                        <h3>${producto.nombre}</h3>
                                        <h4>${producto.precio}$</h4>
                                        <button class="boton1" onclick="eliminarCarrito(${producto.id})">Eliminar</button>
                                        </div>
                                        <div>
                                        <img class="imgCarrito" src="${producto.imagen}" alt="">
                                        </div>
                                        `
            productosEnCarrito.appendChild(elementoAñadido);
            seccionTotal.innerHTML = `
            <button class="boton2" onclick="confirmarCompra()">Confirmar compra</button>
            <h4>Total a pagar: $${compraTotal = compraTotal + producto.precio}</h4>
            `
        }
        guardarProductosCarrito(carritoProductos);
    }
}

//Evento confirmar compra
function confirmarCompra(){
    let carritoProductos = obtenerProductosCarrito();
    seccionTotal.innerHTML = "";
    seccionTotal.innerHTML = `
                            <h4>
                                Compra confirmada
                            </h4>
                            `
    productosEnCarrito.innerHTML = "";
    carritoProductos = [];
    guardarProductosCarrito(carritoProductos);
}


//Renderizado de productos
renderProductos();
