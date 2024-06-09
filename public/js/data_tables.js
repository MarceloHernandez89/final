document.getElementById('download-csv').addEventListener('click', function() {
    var table = document.getElementById('tabla-buques');
    var rows = Array.from(table.rows);
    var csvContent = '';

    rows.forEach(function(row) {
        var cells = Array.from(row.cells);
        var rowContent = cells.map(function(cell) {
            return cell.innerText;
        }).join(',');
        csvContent += rowContent + '\n';
    });

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'buques.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

$(document).ready(function () {
    $('#tabla-buques').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
        }
    });
});