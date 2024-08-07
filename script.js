"use strict";
let preguntasJson;


fetch("quiz.json").then(function (respuesta) {
  return respuesta.json();

}).then(function (obj) {
  //console.log(obj);
  preguntasJson = obj;


  let contador = 0;
  let aciertos = 0;
  const h2 = document.querySelector("h2");

  //const respuesta = document.querySelector("span");

  function recorrerLi(opciones) {
    const ul = document.getElementById("lista").getElementsByTagName("li");
    for (let i = 0; i < opciones.length; i++) {
      const li = ul[i];
      const span =
        li.querySelector(
          "span"
        ); /* Se ingresa la respuesta en SPAN para no sobreescribir el INPUT RADIO */
      span.textContent = opciones[i];
    }
  }


  function hacerPregunta() {
    let objetoEnpantalla = Object.values(preguntasJson[contador]);
    //console.log(objetoEnpantalla[0]);
    h2.innerHTML = `${objetoEnpantalla[0]}`;

    //console.log(objetoEnpantalla[1]);
    let opciones = objetoEnpantalla[1];
    recorrerLi(opciones);
  }

  const botonEnviar = document.querySelector("#btnEnviar");
  const botonRecargar = document.querySelector("#btnRecargar");

  function comprobarRespuesta() {
    let objetoEnpantalla = Object.values(preguntasJson[contador]);
    let respuestaCorrecta = objetoEnpantalla[2];
    const inputs = document.querySelectorAll("#lista input");
    //console.log(inputs)

    let respuestaSeleccionada = null;
    let spanRespuesta = null;

    //recorremos los inputs para ver cual esta checkeado

    for (const j of inputs) {
      //comprobamos si esta seleccionado
      if (j.checked) {
        //el .parentNode es para coger al padre es decir al li
        respuestaSeleccionada = j.parentNode;
        console.log(respuestaSeleccionada);

        //Cogemos el span del li seleccionado
        spanRespuesta = respuestaSeleccionada.querySelector("span");
        //En el siguiente console log tenemos la respuesta correcta
        console.log(spanRespuesta.innerText);

        if (spanRespuesta.innerText === respuestaCorrecta) {
          console.log("acertaste");
          aciertos++;
          console.log(aciertos);
        }
      }
    }

    //esta es la respuesta correcta 
    console.log(objetoEnpantalla[2]);
  }

  function mostrarResultado() {
    const element = document.querySelector("#lista");
    element.remove();
    boton.remove();

    let objetoEnpantalla = Object.values(preguntasJson[contador]);
    h2.innerHTML = `has acertado ${aciertos} de 50`;
  }


  function recargarPagina() {
    if (window.confirm("Quieres recargar la pagina?")) {
      location.reload();
    }
  }

  hacerPregunta();

  botonEnviar.onclick = function () {
    comprobarRespuesta();

    //console.log("hiciste clik");

    contador++;
    hacerPregunta();
    if (contador >= 49) {
      mostrarResultado();

    }
  };
  botonRecargar.onclick = function () {
    recargarPagina();
  }






}).catch(function (e) {
  console.error("ha surgido el siguiente error: " + e)
});







