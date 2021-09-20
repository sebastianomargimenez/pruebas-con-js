// creacion, guardado y validacion del usuario

class Usuario {
    constructor(usuario,nombre,apellido,edad) {
        this.usuario = usuario;
        this.nombre  = nombre;
        this.apellido  = apellido;
        this.edad = edad;
    }

}

let resp = confirm("Ya estas registrado ? ");
if (resp) {

    let usuario = prompt("Ingrese su usuario");

    let user = buscar_usuario(usuario);

    if (user != false) {

    alert("Bienvenido "+user.nombre + " " + user.apellido );

    }else{

    alert("El usuario no existe !");
    }
    
    

}else{

    let resp = confirm("Desea registrarse ?");
    if (resp){
    
    let user = prompt("Ingrese usuario");
    let nombre = prompt("Ingrese nombre");
    let apellido = prompt("Ingrese apellido");
    let edad = prompt("Ingrese edad");

    let msj = checkear_datos (user,nombre,apellido,edad);
    if (msj == "") {

        let usuario_nuevo = new Usuario(user,nombre,apellido,parseInt(edad));
        
        guardar_usuario(usuario_nuevo);

        alert("Usuario registrado con exito");

        

    } else{

        alert(msj);

    }

    

    }
}

function checkear_datos(user,nombre,apellido,edad){

    let msj = "";
    if ( (user) && (nombre) && (apellido) && (edad) ){

    if (isNaN(parseInt(edad))){

        msj = "No ingresate un numero en edad" ;

    }

    let dato = buscar_usuario(user);
    if (dato != false){

        msj = "Ya existe el usuario";
    }
    
    }
    else {

    msj = "Debes ingresar todos los datos. " ;

    }

    return msj ;
}

function buscar_usuario(user){

    if ( !localStorage.getItem("listaUsuarios") ){
    return false;
    }

    let almacenados = JSON.parse(localStorage.getItem("listaUsuarios"));
    let encontrado = false;
    let i = 0;
    while (!encontrado && i != almacenados.length ){

    if (almacenados[i].usuario == user) {

        encontrado = almacenados[i];

    }

    i++;

    }

    return encontrado;

}

function guardar_usuario(usuario_nuevo){

    let item = localStorage.getItem("listaUsuarios");
    if (item){

    let almacenados = JSON.parse(localStorage.getItem("listaUsuarios"));
    almacenados.push(usuario_nuevo);

    let almacenados_string = JSON.stringify(almacenados);
    localStorage.setItem("listaUsuarios",almacenados_string);

    }else{

    let almacenados = new Array();
    almacenados.push(usuario_nuevo);
    let almacenados_string = JSON.stringify(almacenados);
    localStorage.setItem("listaUsuarios",almacenados_string);


    }
}

// desde aca empieza la logica de programacion de la pagina 

const container = document.querySelector(".flex-container");

const button = document.querySelector(".send-button");
let oldvalue = button.value;
button.value = oldvalue.toUpperCase();

function createkey (name,model,price){
    img= "<img class='key-img' src='key.png'>";
    name = `<h2>${name}</h2>`;
    model =`<h3>${model}</h3>`;
    price =`<p>Precio: <b>${price}</b></p>`;
    return [img,name,model,price]
}

const changeHidden = (number) =>{
    document.querySelector(".key-data").value = number
}

let documentFragment = document.createDocumentFragment();

for (i = 1; i <= 20; i++){
    let randomModel = Math.round(Math.random()*10000);
    let randomPrice = Math.round(Math.random()*10+30);
    let key = createkey(`llave ${i}`,`modelo ${randomModel}`,randomPrice);
    let div = document.createElement("DIV");
    div.addEventListener("click",()=>{changeHidden(randomModel)});
    div.tabIndex = i;
    div.classList.add(`item-${i}`,'flex-item');
    div.innerHTML = key[0] + key[1] + key[2] + key[3];
    documentFragment.appendChild(div);
}

container.appendChild(documentFragment);