//declarovariables
let productos;
let compraTotal = 0;

//Clases y objetos

class celulares{
        constructor(marca, nombre, precio){
            this.marca = marca;
            this.nombre = nombre;
            this.precio = parseInt(precio);
            this.comprado = function(){alert("Agregaste al carrito: " + this.nombre + " por $" + this.precio)};
        }
}
const samsungS20 = new celulares ("Samsung", "Samsung S20", 180000);
const samsungA73 = new celulares ("Samsung", "Samsung A73", 110000);
const iphone13 = new celulares ("iPhone", "iPhone 13", 250000);
const iphone12 = new celulares ("iPhone", "iPhone 12", 200000);
const huaweiY9 = new celulares ("Huawei", "Huawei Y9", 90000);
const huaweiP40 = new celulares ("Huawei", "Huawei P40", 230000);
const xiaominote = new celulares("Xiaomi", "Xiaomi Note 11", 190000);
const xiaomipoco = new celulares("Xiaomi", "Xiaomi Poco M3", 140000)

//Arrays
let stock = [
    samsungS20,
    samsungA73,
    iphone13,
    iphone12,
    huaweiY9,
    huaweiP40,
    xiaominote,
    xiaomipoco,
];

const celularComprado = [];

//Funciones para Errores

function errorUsuario() {alert("Ingrese un usuario valido");}
function errorProducto() {alert("Ingrese producto valido");}

//Funciones de Saludo y despedida

function despedida(usuario){
    alert("Adios " + usuario + ", esperamos verte pronto por aqui :)");
}
function despedidaCompra(usuario, total){
    alert("Gracias por tu compra " + usuario + "!" + ", tu total a pagar es $" + total);
}
function saludoBienvenida(usuario){
    alert("Bienvenido " + usuario + " a nuestra tienda, aqui encontraras celulares al mejor precio!");
}

//Seleccion Samsung

function samsung (){
    let seleccionSamsung = parseInt(prompt("1- Celular Samsung S20 $" + samsungS20.precio + 
    "\n2- Celular Samsung A73 $" + samsungA73.precio + "\n3- Finalizar Compra"));
    if (seleccionSamsung == 1){
        celularComprado.push(samsungS20);
        samsungS20.comprado();
        compraTotal = compraTotal + samsungS20.precio;
    }
    if(seleccionSamsung == 2){
        celularComprado.push(samsungA73);
        samsungA73.comprado();
        compraTotal = compraTotal + samsungA73.precio;
    }
    if(seleccionSamsung == null){
        errorProducto();
    }else if (seleccionSamsung == ""){
        errorProducto();
    }
}

//Seleccion iPhone

function iPhone(){
    let seleccioniPhone = parseInt(prompt("1-Celular iPhone 13 $" + iphone13.precio 
    + "\n2-Celular iPhone 12 $" + iphone12.precio + "\n3-Finalizar Compra"));
    if(seleccioniPhone == 1){
        celularComprado.push(iphone13);
        iphone13.comprado();
        compraTotal = compraTotal + iphone13.precio;
    }
    if(seleccioniPhone == 2){
        celularComprado.push(iphone12);
        iphone12.comprado();
        compraTotal = compraTotal + iphone12.precio;
    }
    if(seleccioniPhone == null){
        errorProducto();
    }else if (seleccioniPhone == ""){
        errorProducto();
    }
}

//Seleccion Huawei

function huawei(){
    let seleccionHuawei = parseInt(prompt("1-Celular Huawei Y9 $" + huaweiY9.precio 
    + "\n2-Huawei P40 $" + huaweiP40.precio + "\n3-Finalizar Compra"));
    if(seleccionHuawei == 1){
        celularComprado.push(huaweiY9);
        huaweiY9.comprado();
        compraTotal = compraTotal + huaweiY9.precio;
    }
    if(seleccionHuawei == 2){
        celularComprado.push(huaweiP40);
        huaweiP40.comprado();
        compraTotal = compraTotal + huaweiP40.precio;
    }
    if(seleccionHuawei == null){
        errorProducto();
    }else if (seleccionHuawei == ""){
        errorProducto();
    }
}

//Seleccion Xiaomi

function xiaomi(){
    let seleccionXiaomi= parseInt(prompt("1-Celular Xiaomi Note 11 $" + xiaominote.precio 
    + "\n2-Celular Xiaomi Poco 3 $" + xiaomipoco.precio + "\n3-Finalizar Compra"));
    if(seleccionXiaomi== 1){
        celularComprado.push(xiaominote);
        xiaominote.comprado();
        compraTotal = compraTotal + xiaominote.precio;
    }
    if(seleccionXiaomi== 2){
        celularComprado.push(xiaomipoco);
        xiaomipoco.comprado();
        compraTotal = compraTotal + xiaomipoco.precio;
    }
    if(seleccionXiaomi == null){
        errorProducto();
    }else if (seleccionXiaomi== ""){
        errorProducto();
    }
}

//Funcion Mostrar Oferta

function mostrarOferta(){
    const ofertas = stock.filter((el) => el.precio < 100000);
    for ( const oferta of ofertas){
        alert(
            `La oferta de hoy es : Celular ${oferta.nombre} a un valor de $ ${oferta.precio}`
        );
    }
}

//Seleccion de producto
function seleccionProductos(){
    let productos = parseInt(prompt(`Porfavor seleccione la marca del producto que desea comprar: \n 1-Samsung\n 2-iPhone\n 3-Huawei\n 4-Xiaomi\n 5-Cancelar \n 6- Mostrar Oferta\n 7-Finalizar Compra`));
    while (productos !== 5){
        if(productos === 1){
            samsung();
            let opcion = prompt("Desea seguir comprando? Si/No");
            if(opcion == "Si" || opcion == "si"){
                seleccionProductos();
                productos = 5;
            }
            if(opcion == "No" || opcion == "no"){
                productos = 5;
            }
        }
        if(productos === 2){
            iPhone();
            let opcion = prompt("Desea seguir comprando? Si/No");
            if(opcion == "Si" || opcion == "si"){
                seleccionProductos();
                productos = 5;
            }
            if(opcion == "No" || opcion == "no"){
                productos = 5;
            }
        }
        if(productos === 3){
            huawei();
            let opcion = prompt("Desea seguir comprando? Si/No");
            if(opcion == "Si" || opcion == "si"){
                seleccionProductos();
                productos = 5;
            }
            if(opcion == "No" || opcion == "no"){
                productos = 5;
            }
        }
        if(productos === 4){
            xiaomi();
            let opcion = prompt("Desea seguir comprando? Si/No");
            if(opcion == "Si" || opcion == "si"){
                seleccionProductos();
                productos = 5;
            }
            if(opcion == "No" || opcion == "no"){
                productos = 5;
            }
        }
        if (productos == "6"){
            mostrarOferta();
            let opcion = prompt("Desea seguir comprando? Si/No");
            if(opcion == "Si" || opcion == "si"){
                seleccionProductos();
                productos = 5;
            }
            if(opcion == "No" || opcion == "no"){
                productos = 5;
            } 
        }
        if(productos === 7){
            productos = 5;
        }
    }
}

//Main
//Ingreso de usuario
let ingresoUsuario = prompt("Ingrese su nombre de usuario:");
if(ingresoUsuario == null){
    errorUsuario();
}else if(ingresoUsuario == ""){
    errorUsuario();
}

//Bienvenida al usuario
saludoBienvenida(ingresoUsuario);

//Compra
seleccionProductos();

//Despedida
if(compraTotal > 1){
    alert("Carrito de compras\n " + celularComprado.map((celular) => " " + celular.nombre + " por $" + celular.precio + "\n"));
    let confirmacion = prompt("Confirma su compra? (Si/No):");
    if(confirmacion == "si" || confirmacion == "Si"){
        despedidaCompra(ingresoUsuario, compraTotal);
    }else{
        despedida(ingresoUsuario);
    }
}else{
    despedida(ingresoUsuario);
} 
