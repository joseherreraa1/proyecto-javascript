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
const samsungS20 = new celulares (1,"Samsung", "Samsung S20", 180000, "recursos/s20.png");
const samsungA73 = new celulares (2,"Samsung", "Samsung A73", 110000, "recursos/a73.png");
const iphone13 = new celulares (3,"iPhone", "iPhone 13", 250000, "recursos/iphone13.png");
const iphone12 = new celulares (4,"iPhone", "iPhone 12", 200000, "recursos/iphone12.png");
const huaweiY9 = new celulares (5,"Huawei", "Huawei Y9", 90000, "recursos/huaweiy9.png");
const huaweiP40 = new celulares (6,"Huawei", "Huawei P40", 230000, "recursos/huaweip40.png");
const xiaominote = new celulares(7,"Xiaomi", "Xiaomi Note 11", 190000, "recursos/xiaominote11.png");
const xiaomipoco = new celulares(8,"Xiaomi", "Xiaomi Poco M3", 140000, "recursos/xiaomipocom3.png")

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

const contadorCarrito = document.getElementById("contadorCarrito");

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
    let carritoProductos = obtenerProductosCarrito();
    let posicion = carritoProductos.findIndex(x => x.id == id);

    if(posicion > -1){
        carritoProductos[posicion].cantidad = carritoProductos[posicion].cantidad + 1;
        compraTotal = compraTotal + carritoProductos[posicion].precio;
    }else{
        let productoSeleccionado = seleccionado(id);
        productoSeleccionado.cantidad = 1;
        compraTotal = compraTotal + productoSeleccionado.precio;
        carritoProductos.push(productoSeleccionado);
}


    guardarProductosCarrito(carritoProductos);
        productosEnCarrito.innerHTML = "";

        for(let producto of carritoProductos){
        const elementoAñadido = document.createElement("div");
        elementoAñadido.className = "elementoAñadido";
        elementoAñadido.innerHTML = `
                                    <div>
                                    <h3>${producto.nombre}</h3>
                                    <h4>${producto.precio}$</h4>
                                    <h5>Cantidad: ${producto.cantidad}</h5>
                                    <button class="boton1" onclick="eliminarCarrito(${producto.id})">Eliminar</button>
                                    </div>
                                    <div>
                                    <img class="imgCarrito" src="${producto.imagen}" alt="">                                    </div>
                                    `
        productosEnCarrito.appendChild(elementoAñadido);
        console.log(producto);
        }

        seccionTotal.innerHTML = "";
        //operador ternario

        carritoProductos.length > 0 ?   seccionTotal.innerHTML = `
                                        <button class="boton2" onclick="confirmarCompra()">Confirmar compra</button>
                                        <h4>Total a pagar: $${compraTotal}</h4>
                                        ` : seccionTotal.innerHTML = ""

        carritoProductos.length > 0 ? contadorCarrito.innerHTML = `${carritoProductos.length}` : 
                                    contadorCarrito.innerHTML = ""

//Notificacion
Toastify({
    text: "Has añadido un producto a tu carrito",
    duration: 3000,
    close: true,
    gravity: "top", 
    position: "left", 
    stopOnFocus: true, 
    style: {
        background: "linear-gradient(to right, #FD794F, #c95f3f)",
    },
}).showToast();
}


//Eliminar elemento del carrito
function eliminarCarrito(id){
    let carritoProductos = obtenerProductosCarrito();
    let productoSeleccionado = seleccionado(id);
    console.log(productoSeleccionado);
    let posicion = carritoProductos.findIndex(x => x.id == id);
    carritoProductos[posicion].cantidad -= 1;
    compraTotal = 0;
    guardarProductosCarrito(carritoProductos);
    if(carritoProductos[posicion].cantidad == 0){
        carritoProductos.splice(posicion, 1);
        guardarProductosCarrito(carritoProductos);
    }
    productosEnCarrito.innerHTML = "";
    seccionTotal.innerHTML = "";
    for(let producto of carritoProductos){
        compraTotal = compraTotal + producto.precio * producto.cantidad;
        const elementoAñadido = document.createElement("div");
        elementoAñadido.className = "elementoAñadido";
        elementoAñadido.innerHTML = `
                                    <div>
                                    <h3>${producto.nombre}</h3>
                                    <h4>${producto.precio}$</h4>
                                    <h5>Cantidad: ${producto.cantidad}</h5>
                                    <button class="boton1" onclick="eliminarCarrito(${producto.id})">Eliminar</button>
                                    </div>
                                    <div>
                                    <img class="imgCarrito" src="${producto.imagen}" alt="">
                                    </div>
                                    `
        productosEnCarrito.appendChild(elementoAñadido);
        seccionTotal.innerHTML = `
        <button class="boton2" onclick="confirmarCompra()">Confirmar compra</button>
        <h4>Total a pagar: $${compraTotal}</h4>
        `
    }
    guardarProductosCarrito(carritoProductos);
    carritoProductos.length > 0 ? contadorCarrito.innerHTML = `${carritoProductos.length}` : 
    contadorCarrito.innerHTML = ""
}


//Evento confirmar compra
function confirmarCompra(){

//Vaciamos Carrito
    let carritoProductos = obtenerProductosCarrito();
    carritoProductos = [];
    guardarProductosCarrito(carritoProductos);

//Creamos formulario
    const formulario = document.createElement("div");
    formulario.className = "form";
    formulario.innerHTML = `
    <h2 class="tituloForm">Informacion de pago</h2>
    <label for="">Nombre y apellido</label>
    <input type="text" class="inputForm" value="" id="nombre" required>
    
    <label for="">Numero de telefono</label>
    <input type="text" class="inputForm" value="" id="telefono" required>
    
    <label for="">Direccion</label>
    <input type="text" class="inputForm" id="direccion" value="" required>
    <h2 class="tituloForm">Metodo de pago</h2>
    <div class="tarjetasIconos">
        <i class='bx bxl-visa'></i>
        <i class='bx bxl-mastercard' ></i>
    </div>
    <input type="password" class="inputForm" placeholder="Numero de tarjeta" id="tarjeta" required>
    <div class="tarjetaInfo">
        <input type="text" placeholder="mm" class="inputForm sm" value="" id="tarjeta1" required>
        <input type="text" placeholder="yyyy" class="inputForm sm" value="" id="tarjeta2" required>
        <input type="text" placeholder="cvv" class="inputForm sm" value="" id="tarjeta3" required>
    </div>
    `
    productosEnCarrito.innerHTML = "";
    productosEnCarrito.appendChild(formulario);


    seccionTotal.innerHTML = `
    <button class="boton2" onclick="confirmarCompra1()">Confirmar compra</button>
    <h4>Total a pagar: $${compraTotal}</h4>
    `

    carritoProductos.length > 0 ? contadorCarrito.innerHTML = `${carritoProductos.length}` : 
    contadorCarrito.innerHTML = ""
    compraTotal = 0;
}

function validarForm(){
    seccionTotal.innerHTML = ``

    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");
    const tarjetaNumero = document.getElementById("tarjeta");
    const tarjeta1 = document.getElementById("tarjeta1");
    const tarjeta2 = document.getElementById("tarjeta2");
    const tarjeta3 = document.getElementById("tarjeta3"); 

    if(nombre.value == ""){
        seccionTotal.innerHTML = `
        <button class="boton2" onclick="confirmarCompra1()">Confirmar compra</button>
        <h4>Error: completa el campo nombre</h4>
        `
        }else if(telefono.value == ""){
            seccionTotal.innerHTML = `
            <button class="boton2" onclick="confirmarCompra1()">Confirmar compra</button>
            <h4>Error: completa el campo telefono</h4>
        `
        }else if(direccion.value == ""){
            seccionTotal.innerHTML = `
            <button class="boton2" onclick="confirmarCompra1()">Confirmar compra</button>
            <h4>Error: completa el campo direccion</h4>
        `
        }else if(tarjetaNumero.value == ""){
            seccionTotal.innerHTML = `
            <button class="boton2" onclick="confirmarCompra1()">Confirmar compra</button>
            <h4>Error: completa el campo tarjeta</h4>
        `
        }else if(tarjeta1.value == ""){
            seccionTotal.innerHTML = `
            <button class="boton2" onclick="confirmarCompra1()">Confirmar compra</button>
            <h4>Error: completa los datos de tu tarjeta</h4>
        `
        }else if(tarjeta2.value == ""){
            seccionTotal.innerHTML = `
            <button class="boton2" onclick="confirmarCompra1()">Confirmar compra</button>
            <h4>Error: completa los datos de tu tarjeta</h4>
        `
        }else if(tarjeta3.value == ""){
            seccionTotal.innerHTML = `
            <button class="boton2" onclick="confirmarCompra1()">Confirmar compra</button>
            <h4>Error: completa los datos de tu tarjeta</h4>
        `
    }else{
        productosEnCarrito.innerHTML = "";
        seccionTotal.innerHTML = `
        <h4>Compra confirmada! su pedido llegara a ${direccion.value} en los proximos dias.</h4>
        `
    }
}

function confirmarCompra1(){
    validarForm();
}

//Renderizado de productos
renderProductos();
