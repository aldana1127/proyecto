const inputPelicula = document.getElementById("inputPelicula");
const btnAgregar = document.getElementById("btnAgregar");
const listaPeliculas = document.getElementById("listaPeliculas");
const contador = document.getElementById("contador");
const filtro = document.getElementById("filtro");

let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];


function guardarPeliculas() {
localStorage.setItem("peliculas", JSON.stringify(peliculas));
}


function actualizarContador() {
contador.textContent = "Total de películas: " + peliculas.length;
}


function mostrarPeliculas() {
listaPeliculas.innerHTML = "";

let peliculasFiltradas = peliculas;

if (filtro.value === "vistas") {
peliculasFiltradas = peliculas.filter(p => p.vista);
} else if (filtro.value === "pendientes") {
peliculasFiltradas = peliculas.filter(p => !p.vista);
}

peliculasFiltradas.forEach((pelicula, index) => {

const li = document.createElement("li");
const texto = document.createElement("span");

texto.innerHTML = `${pelicula.nombre}

<span class="${pelicula.vista? 'estado-vista': 'estado-pendiente'}">

${pelicula.vista? '✔ VISTA': '⏳ PENDIENTE'}</span>`;

texto.style.color =
pelicula.vista
? "lightgreen"
: "white";


const contenedorBotones =
document.createElement("div");


const botonVista =
document.createElement("button");

botonVista.textContent =
pelicula.vista
? "Quitar vista"
: "Marcar vista";

botonVista.style.backgroundColor =
pelicula.vista
? "green"
: "orange";

botonVista.style.color = "white";

botonVista.addEventListener("click", () => {
marcarVista(index);
});

const botonEliminar =
document.createElement("button");

botonEliminar.textContent = "Eliminar";

botonEliminar.style.backgroundColor = "crimson";

botonEliminar.style.color = "white";

botonEliminar.addEventListener("click", () => {
eliminarPelicula(index);
});


contenedorBotones.appendChild(botonVista);
contenedorBotones.appendChild(botonEliminar);

li.appendChild(texto);
li.appendChild(contenedorBotones);

listaPeliculas.appendChild(li);

});

actualizarContador();
}

function agregarPelicula(){

const nuevaPelicula =
inputPelicula.value.trim();


if(nuevaPelicula === ""){

alert("Escribi una película");

return;
}

const formatoValido =!/[@#$%^&*()_+=\[\]{};:"\\|<>\/?]+/.test(nuevaPelicula);

if(!formatoValido || nuevaPelicula.length > 1){

document.body.style.backgroundColor = "red";
document.body.innerHTML = `<h1 style="color:white; text-align:center; margin-top:200px; font-size:50px;">❌ ERROR: NO ES VÁLIDO</h1>`;

return;
}


peliculas.push({
nombre: nuevaPelicula,
vista: false
});


guardarPeliculas();

mostrarPeliculas();

inputPelicula.value = "";
}


function eliminarPelicula(index) {

peliculas =
peliculas.filter((_, i) => i !== index);

guardarPeliculas();

mostrarPeliculas();
}


function marcarVista(index) {

peliculas[index].vista =
!peliculas[index].vista;

guardarPeliculas();

mostrarPeliculas();
}


btnAgregar.addEventListener(
"click",
agregarPelicula
);

filtro.addEventListener(
"change",
mostrarPeliculas
);

mostrarPeliculas();