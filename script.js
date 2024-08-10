"use strict";
let preguntasJson;

fetch("quiz.json")
  .then(function (respuesta) {
    return respuesta.json();
  })
  .then(function (obj) {
    //console.log(obj);
    preguntasJson = obj;

    let numeroPreguntas;
    do {
      numeroPreguntas = parseInt(
        prompt(
          "Inserte cuantas preguntas entre 1 y 50. PISTA: cuantas mas insertes mas opciones de ganar"
        )
      );
    } while (isNaN(numeroPreguntas) || numeroPreguntas < 1 || numeroPreguntas > 50);
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
        span.style.color = "black";

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
    const botonSiguiente = document.querySelector("#btnSiguiente");

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
            spanRespuesta.style.color = "green";
            spanRespuesta.innerText = respuestaCorrecta + "✅";
          } else {
            spanRespuesta.style.color = "red";
            spanRespuesta.innerText = spanRespuesta.innerText + "❌";
            buscarCorrecta(inputs, respuestaCorrecta); //esta es la respuesta correcta
          }
        }
      }
    }

    function buscarCorrecta(opciones, respuestaCorrecta) {
      const ul = document.getElementById("lista").getElementsByTagName("li");

      for (let i = 0; i < opciones.length; i++) {
        const li = ul[i];
        const span = li.querySelector("span");
        let spanActual = span.textContent;
        if (respuestaCorrecta === spanActual) {
          console.log(spanActual + " este");
          span.style.color = "green";
          span.innerText = span.innerText + "✅";
        }
      }
    }

    function guardarResultados(puntos) {
      const nombre = prompt(
        "Introduce tu nombre de usuario si quieres guardar la partida"
      );
      if (!nombre) return;
      const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
      ranking.push({ nombre, puntos });
      ranking.sort((a, b) => b.puntos - a.puntos); //esta funcion flecha lo que hace es guardar los /puntos
      localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 10))); //esta funcion nos guarda el top 10
      localStorage.removeItem("puntuacion");
      localStorage.setItem("puntuacion", aciertos);
      console.log(ranking);
    }
    function mostrarResultado() {
      //console.log("entro");

      /* const element = document.querySelector("#lista");
      element.remove();
      botonEnviar.remove(); */

      /*      let objetoEnpantalla = Object.values(preguntasJson[contador]);
      h2.innerHTML = `has acertado ${aciertos} de ${numeroPreguntas}`;
 */
      guardarResultados(aciertos);
      location.replace("final.html");
    }

    function recargarPagina() {
      if (window.confirm("Quieres recargar la pagina?")) {
        location.reload();
      }
    }

    hacerPregunta();

    botonEnviar.onclick = function () {
      comprobarRespuesta();
      botonEnviar.disabled = "disabled";
      botonSiguiente.disabled = false;
    };
    //console.log("hiciste clik");

    botonSiguiente.onclick = function () {
      contador++;
      botonEnviar.disabled = false;
      botonSiguiente.disabled = "disabled";
      //Se le hace -1 porque los humanos contamos desde 1 pero la maquina empieza desde 0
      if (contador > numeroPreguntas - 1) {
        mostrarResultado();
      } else {
        hacerPregunta();
      }
    };

    botonRecargar.onclick = function () {
      recargarPagina();
    };
  })
  .catch(function (e) {
    console.error("ha surgido el siguiente error: " + e);
  });
