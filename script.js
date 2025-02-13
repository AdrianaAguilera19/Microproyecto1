document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir que el formulario se envíe y la página se recargue

        const nombre = document.getElementById("nombre").value;
        window.location.href = `game.html?nombre=${encodeURIComponent(nombre)}`; // Redirigir a game.html con el nombre como parámetro
    });
});