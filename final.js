"use strict";

let h2Final = document.querySelector("h2");
let btnReiniciar = document.querySelector("button");
const tabla = document.querySelector("table");
const tbody = document.querySelector("tbody");
const ranking = Object.values(JSON.parse(localStorage.getItem("ranking")));
const puntuacion = localStorage.getItem("puntuacion");
//console.log(puntuacion);
h2Final.innerHTML = `Tu puntuación final es ${puntuacion}`;
//console.log(ranking);
btnReiniciar.onclick = function () {
  if (window.confirm("Quieres recargar la pagina?")) {
    localStorage.removeItem("puntuacion");
    location.replace("index.html");
  }
};

ranking.forEach((element) => {
  //console.log(element);
  let newTr = document.createElement("tr"); //AÑADE FILA

  let nombreTd = document.createElement("td"); //AÑADE COLUMNA1
  nombreTd.setAttribute("class", "listaRanking");
  let nombreContent = document.createTextNode(`${element.nombre}`);
  nombreTd.appendChild(nombreContent); //AÑADE NOMBRE A LA COLUMNA 1
  newTr.appendChild(nombreTd);

  let puntosTd = document.createElement("td"); //AÑADE COLUMNA1
  puntosTd.setAttribute("class", "listaRanking");
  let puntosContent = document.createTextNode(`${element.puntos}`);
  puntosTd.appendChild(puntosContent); //AÑADE PUNTOS A LA COLUMNA 2
  newTr.appendChild(puntosTd);

  tbody.appendChild(newTr);
});
