//Capturo el evento de clic en el botón para descargar el CSV
document.getElementById('download-csv').addEventListener('click', function () {
    //Realizo la solicitud AJAX para obtener los datos de los buques
    fetch('/buques')//Reutilizo petición GET de popups del mapa.
        .then(response => response.json())
        .then(data => {
            //Genero el contenido CSV a partir de los datos obtenidos
            var csvContent = '';

            //Encabezados del CSV
            var headers = Object.keys(data.buques[0]);
            csvContent += headers.join(',') + '\n';

            //Itero sobre los buques y agrego cada fila al CSV
            data.buques.forEach(buque => {
                var rowContent = headers.map(header => {
                    var value = buque[header].toString().replace(/"/g, '""');
                    if (value.includes(',') || value.includes('\n')) {
                        value = '"' + value + '"';
                    }
                    return value;
                }).join(',');
                csvContent += rowContent + '\n';
            });

            //Creo el archivo CSV para descargar.
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'buques.csv';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => console.error('Error:', error));
});

//Integro data-tables y defino label de la tabla a español.
$(document).ready(function () {
    $("#tabla-buques").DataTable({
        language: {
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        info: "Mostrando página _PAGE_ de _PAGES_",
        infoEmpty: "No hay registros disponibles",
        infoFiltered: "(filtrado de _MAX_ registros totales)",
        search: "Buscar:",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior",
        },
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        },
    });
});