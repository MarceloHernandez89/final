var mimapa = L.map("mapa").setView([-40, -59], 4);
L.tileLayer(
  "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
  {
    attribution:
      '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="http://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2" target="_blank">Instituto Geográfico Nacional</a> + <a href="http://www.osm.org/copyright" target="_blank">OpenStreetMap</a>',
    minZoom: 3,
    maxZoom: 18,
  }
).addTo(mimapa);

// Realiza una solicitud AJAX para obtener los datos de los buques
fetch('/buques')
  .then(response => response.json())
  .then(data => {
    data.buques.forEach(buque => {
      var marker = L.marker([buque.latitud, buque.longitud]).addTo(mimapa);
      marker.bindPopup(
        '<b>Nombre:</b> ' + buque.nombre + '<br>' +
        '<b>Bandera:</b> ' + buque.bandera + '<br>' +
        '<b>MMSI:</b> ' + buque.mmsi + '<br>' +
        '<b>IMO:</b> ' + buque.imo + '<br>' +
        '<b>Call Sign:</b> ' + buque.call_sign + '<br>' +
        '<b>Lat.:</b> ' + buque.latitud + '<br>' +
        '<b>Long.:</b> ' + buque.longitud
      );
    });
  })
  .catch(error => console.error('Error:', error));
