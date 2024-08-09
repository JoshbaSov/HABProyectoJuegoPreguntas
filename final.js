"use strict";

let h2Final = document.querySelector("h2");
let btnReiniciar = document.querySelector("button");

const ranking = Object.values(JSON.parse(localStorage.getItem("ranking")));
let puntuacion = localStorage.getItem("puntuacion");
h2Final.innerHTML = `Tu puntuación final es ${puntuacion}`;
//console.log(ranking);
btnReiniciar.onclick = function () {
    if (window.confirm("Quieres recargar la pagina?")) {
        location.replace("index.html");
    }
}
ranking.forEach(element => {
    console.log(element);
    let newLI = document.createElement("li")
    newLI.setAttribute("id", "listaRanking");
    let newContent = document.createTextNode(`${element.nombre} con un total de ${element.puntos} puntos`);
    newLI.appendChild(newContent);
    document.body.insertBefore(newLI, document.querySelector("ol"));


    //pRanking.textContent = element.toString();
})

