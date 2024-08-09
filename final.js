"use strict";

let h2Final = document.querySelector("h2");
let btnReiniciar = document.querySelector("button");

const ranking = Object.values(JSON.parse(localStorage.getItem("ranking")));
let puntuacion = localStorage.getItem("puntuacion");
h2Final.innerHTML = `Tu puntuación final es ${puntuacion}`;
console.log(ranking);
btnReiniciar.onclick = function () {
    if (window.confirm("Quieres recargar la pagina?")) {
        location.replace("index.html");
    }
};
