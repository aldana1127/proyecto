
const botonBuscar = document.getElementById("buscarBtn");
const inputPersonaje = document.getElementById("personajeInput");
const tarjeta = document.getElementById("tarjeta");
const mensaje = document.getElementById("mensaje");

//event detectar el click
botonBuscar.addEventListener("click", buscarPersonaje);

//función principal
async function buscarPersonaje() {
//guardar lo que escribe el usuario
const personaje = inputPersonaje.value.trim();

//validar que lo que escribio el usuario no esta vacio
if (personaje === "") {

mostrarMensaje("Escribe un personaje");
return;

}

mensaje.innerHTML = " Buscando personaje...";
tarjeta.classList.add("oculto");

try {

//conexion con la api de rick y morty
const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?name=${personaje}`);

//si ponemos un personaje que no esta en la serie, pone personaje no encontrado
if (!respuesta.ok) {

throw new Error("Personaje no encontrado");

}
//convertir respuesta a JSON
const data = await respuesta.json();

const info = data.results[0];

//muestra los datos en pantalla
document.getElementById("imagenPersonaje").src =info.image;

document.getElementById("nombrePersonaje").innerText =info.name;

document.getElementById("estadoPersonaje").innerText ="Estado: " + info.status;

document.getElementById("especie").innerText =info.species;

document.getElementById("genero").innerText =info.gender;

document.getElementById("ubicacion").innerText =" Ubicación: " + info.location.name;


mensaje.innerHTML = "";
tarjeta.classList.remove("oculto");
//muestra error si algo falla
} catch (error) {

mostrarMensaje(error.message);

}

}


function mostrarMensaje(texto) {

mensaje.innerHTML = `<p class="error">⚠️ ${texto}</p>`;

}
