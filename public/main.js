// src/public/js/map.js
// Inicializa el mapa
var map = L.map('mapa').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Función para añadir puntos al mapa
function addPuntos(data) {
    data.forEach((punto) => {
        L.marker([punto.latitud, punto.longitud])
            .bindPopup(`<b>${punto.nombre}</b>`)
            .addTo(mapa);
    });
}

// Obtener los datos del backend y añadirlos al mapa
$.getJSON("/puntos", function (data) {
    addPuntos(data);
});
