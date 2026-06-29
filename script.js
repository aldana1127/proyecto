const API_KEY = "a22fb87a";

const allMovies = [
"Inception",
"Titanic",
"Avatar",
"Gladiator",
"The Dark Knight",
"Interstellar",
"Joker",
"The Matrix",
"Forrest Gump",
"Avengers: Endgame",
"The Godfather",
"Fight Club",
"Shrek",
"Toy Story",
"The Lion King",
"Iron Man",
"Spider-Man: No Way Home",
"The Avengers",
"The Incredibles",
"Madagascar",
"Kung Fu Panda",
];

let movieTitles = [];
let movies = [];
let selected = [];

const moviesContainer = document.getElementById("movies");
const checkBtn = document.getElementById("checkBtn");
const modal = document.getElementById("modal");
const modalResult = document.getElementById("modalResult");
const playAgainBtn = document.getElementById("playAgainBtn");
const topBtn = document.getElementById("topBtn");

function randomMovies() {
movieTitles = [...allMovies]
.sort(() => Math.random() - 0.5)
.slice(0, 8);
}

async function loadMovies() {

randomMovies();

selected = [];
movies = [];

try {

const promises = movieTitles.map(title => fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`).then(res => res.json()));
movies = await Promise.all(promises);

showMovies();

} catch (err) {
console.error("Error API:", err);
}
}

function showMovies() {

moviesContainer.innerHTML = "";

movies.forEach(movie => {

const card = document.createElement("div");
card.classList.add("card");

const poster = movie.Poster !== "N/A"
    ? movie.Poster
    : "img/no-image.png";

const year = movie.Year !== "N/A"
    ? movie.Year
    : "Sin información";

const actors = movie.Actors !== "N/A"
    ? movie.Actors
    : "Actores desconocidos";

card.innerHTML = `
<img src="${poster}" alt="${movie.Title}">
<h3>${movie.Title}</h3>
<p>${year}</p>
<p>${actors}</p>
`;
;

card.addEventListener("click", () => toggle(movie, card));

moviesContainer.appendChild(card);
});
}

function toggle(movie, card) {

if (card.classList.contains("selected")) {
card.classList.remove("selected");
selected = selected.filter(
m => m.imdbID !== movie.imdbID
);
return;
}

if (selected.length >= 2) {
alert("Solo podés elegir 2 películas.");
return;
}

card.classList.add("selected");
selected.push(movie);
}

checkBtn.addEventListener("click", () => {

if (selected.length !== 2) {
alert("Elegí 2 películas.");
return;
}

const top2 = [...movies]
.sort((a, b) =>
parseFloat(b.imdbRating) -
parseFloat(a.imdbRating)
)
.slice(0, 2);

const topIDs = top2.map(m => m.imdbID);

let score = 0;

selected.forEach(m => {
if (topIDs.includes(m.imdbID)) {
score++;
}
});


const color = score === 2 ? "#2ecc71" : "#e74c3c";
modalResult.innerHTML = `
<h2 style="color:${color};">Resultado</h2>
<p style="color:${color}; font-size:20px;">
Acertaste ${score} de 2
</p>
`;

;

moviesContainer.classList.add("blur");
modal.classList.remove("hidden");
topBtn.classList.remove("hidden");
});

playAgainBtn.addEventListener("click", () => {
modal.classList.add("hidden");
topBtn.classList.add("hidden");
moviesContainer.classList.remove("blur");
loadMovies();
});

topBtn.addEventListener("click", () => {

    const ranking = [...movies]
        .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));

    let html = `
        <h2>🏆 Top Real</h2>
    `;

    ranking.forEach((movie, index) => {
        html += `
            <p>${index + 1}. ${movie.Title} ⭐ ${movie.imdbRating}</p>
        `;
    });

    modalResult.innerHTML = html;
});

loadMovies();