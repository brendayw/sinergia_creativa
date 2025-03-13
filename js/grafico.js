const cte = document.getElementById('comisionesChart').getContext('2d');

function calcularComision(valorProducto, porcentajeComision) {
    let valorNeto = valorProducto / 1.21;
    return valorNeto * (porcentajeComision / 100);
}

function actualizarGrafico() {
    const valorProducto = parseFloat(document.getElementById('precioProducto').value) || 0;
    const comisiones = [10, 15, 20, 25, 30, 35, 40];
    const comisionesCalculadas = comisiones.map(porcentaje => calcularComision(valorProducto, porcentaje));

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(cte, {
        type: 'bar',
        data: {
            labels: comisiones.map(porcentaje => `${porcentaje}%`),
            datasets: [{
                label: 'Comisión sobre el Producto',
                data: comisionesCalculadas,
                backgroundColor: '#f74b94',
                borderColor: '#f74b94',
                borderRadius: 20, 
                barThickness: 20,
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    max: 10
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                    },
                }
            }
        }
    });
}

document.getElementById('precioProducto').addEventListener('input', actualizarDatos);
document.getElementById('comision').addEventListener('change', actualizarDatos);

function cargarGananciaNeta() {
    const gananciaNeta = localStorage.getItem('gananciaNeta');
    if (gananciaNeta) {
        document.getElementById('gananciaNeta').innerText = `$${gananciaNeta}`;
    }
}
cargarGananciaNeta();

/*grafico objetivos*/
const ctx = document.getElementById('ventasChart').getContext('2d');
const productos = ["Producto A", "Producto B", "Producto C", "Producto D", "Producto E"];

const valorCambioUSD = parseFloat(document.getElementById('valorUSD').value) || 0;
const ticketPromedioUSD = parseFloat(document.getElementById('ticketPromedio').value) || 0;


