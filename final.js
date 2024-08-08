"use strict";

let h2Final = document.querySelector("h2");
let btnReiniciar = document.querySelector("button");
//console.log(typeof (localStorage.getItem("puntuacion")));
h2Final.innerHTML = `Tu puntuación final es ${localStorage.getItem(
  "puntuacion"
)}`;
btnReiniciar.onclick = function () {
  if (window.confirm("Quieres recargar la pagina?")) {
    location.replace("index.html");
  }
};
