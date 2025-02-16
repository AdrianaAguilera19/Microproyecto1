/*document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get("nombre");
    const nombreJugador = document.getElementById("nombre-jugador");
    const numeroRondas = document.getElementById("numero-rondas");
    let rondas = 0;

    if (nombre) {
        nombreJugador.textContent = nombre;
    }

    // Lógica del juego (boceto)
    const botonIniciar = document.getElementById("boton-iniciar");
    botonIniciar.addEventListener("click", function() {
        rondas++;
        numeroRondas.textContent = rondas;

        alert(`¡Juego terminado! Has completado ${rondas} rondas.`);
    });
});*/

const colorButtons = document.querySelectorAll('.botones-juego .boton');
const startButton = document.getElementById('boton-iniciar');
const resetButton = document.getElementById('boton-reiniciar');
const numeroRondas = document.getElementById('numero-rondas');

let secuencia = [];
let secuenciaJugador = [];
let nivel = 0;
let turnoJugador = false;

function randomizadorColor() {
    const colores = ['rojo', 'azul', 'verde', 'amarillo'];
    return colores[Math.floor(Math.random() * colores.length)];
}

function prenderBoton(color) {
    const button = document.getElementById(color);
    button.classList.add('activo_secuencia');
    setTimeout(() => {
        button.classList.remove('activo_secuencia');
    }, 600);
}

function prenderBotonClick(color) {
    const button = document.getElementById(color);
    button.classList.add('activo_click');
    setTimeout(() => {
        button.classList.remove('activo_click');
    }, 300);
}

function secuenciaJuego() {
    let i = 0;
    const intervalo = setInterval(() => {
        prenderBoton(secuencia[i]); // Usa el índice i
        i++;
        if (i >= secuencia.length) { // Corrige la condición del bucle
            clearInterval(intervalo);
            setTimeout(() => {
                turnoJugador = true;
            }, 500);
        }
    }, 800);
}

function siguienteNivel() {
    nivel++;
    numeroRondas.textContent = nivel; // Muestra el nivel actual
    turnoJugador = false;
    secuenciaJugador = [];
    secuencia.push(randomizadorColor());
    setTimeout(() => {
        secuenciaJuego();
    }, 1000);
}

function reseteo() {
    secuencia = [];
    secuenciaJugador = [];
    nivel = 0;
    numeroRondas.textContent = nivel; // Reinicia el contador de rondas
    turnoJugador = false;
}

function inicioJugador(color) {
    if (!turnoJugador) return;
    secuenciaJugador.push(color);
    prenderBotonClick(color);

    const actual = secuenciaJugador.length - 1;

    if (secuenciaJugador[actual] !== secuencia[actual]) { // Corrige el acceso al array
        document.body.classList.add('error');
        setTimeout(() => {
            document.body.classList.remove('error');
            alert(`Perdiste, llegaste al nivel ${nivel}`);
            reseteo();
        }, 500);
    } else {
        if (secuenciaJugador.length === secuencia.length) {
            turnoJugador = false;
            setTimeout(() => {
                siguienteNivel();
            }, 1000);
        }
    }
}

const guardarPuntuacion = () => {
    const nombre_jugador = nombre.value.trim();
    if (nombre_jugador) {
        const puntuacion = JSON.parse(localStorage.getItem("puntuacion")) || [];
        puntuacion.push({name: nombre_jugador, puntuacion: nivel});
        localStorage.setItem("puntuacion", JSON.stringify(puntuacion));
        actualizacion_puntuacion();
    }

};

const actualizacion_puntuacion = () => {
    const puntuacion = JSON.parse(localStorage.getItem("puntuacion")) || [];
    scoreList.innerHTML = puntuacion
        .sort((a,b) => b.puntuacion - a.puntuacion   )
        .map((puntuacion) => `<tr><td>${puntuacion.nombre}</td><td>${puntuacion.puntuacion}</td></tr>`)
        .join("");
}   


colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const color = e.target.id;
        inicioJugador(color);
    });
});



startButton.addEventListener('click', () => {
    console.log("¡Botón iniciar clickeado!"); // Para verificar si el botón está siendo clickeado
    reseteo();
    siguienteNivel();
});

resetButton.addEventListener('click', () => {
    reseteo();
    actualizacion_puntuacion();
});





actualizacion_puntuacion();

