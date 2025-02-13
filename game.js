document.addEventListener("DOMContentLoaded", function() {
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
});