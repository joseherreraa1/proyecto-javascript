// funcion saludar
function saludar() {
  alert(
    "Bienvenido a la tienda de Celulares " +
      nombre + 
    " a continuacion puede escoger productos de la tienda"
  );
}
//funcion comprar producto
function comprarProducto() {
  producto = prompt(
    "elija una marca de celular \n 1: iPhone \n 2: Samsung \n 3: LG"
  );

  if(producto === "1"){
    alert("elegiste iPhone para tu compra");
  } else if(producto ==="2"){
    alert("elegiste Samsung para tu compra");
  } else if(producto === "3"){
    alert("elegiste LG para tu compra");
  }
  //opcion para terminar el proceso
  opcion = prompt(" ingresa una opcion \n 1:seguir comprando \n 2: terminar")
}

//declaro variables
let producto;
let nombre = prompt("ingrese su nombre");
//funcion saludar
saludar();
let opcion = prompt(
  "ingrese una opcion: \n 1: comprar producto \n 2: Finalizar compra \n 3: Terminar"
);
// agrego bucle while
while (opcion !== "3") {
  if (opcion === "1") {
    comprarProducto();
  }
  if (opcion === "2") {
    opcion = "3";
  }
}
alert("gracias por su compra")