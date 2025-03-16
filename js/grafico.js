const cte = document.getElementById('comisionesChart').getContext('2d');

function calcularComision(valorProducto, porcentajeComision) {
    let valorNeto = valorProducto / 1.21;
    return valorNeto * (porcentajeComision / 100);
}

//grafico de comisiones
function actualizarGrafico() {
    const valorProducto = parseFloat(document.getElementById('precioProducto').value) || 0;
    const comisiones = [10, 15, 20, 35, 40];
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

// grafico de objetivos
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('ventasChart').getContext('2d');

    const ventasChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10%', '15%', '20%', '35%', '40%'],
            datasets: [
                {
                    label: 'Debe Vender',
                    data: [0, 0, 0, 0, 0],
                    borderColor: 'rgb(255, 99, 133)',
                    fill: false,
                    yAxisID: 'y1'
                },
                {
                    label: 'Volumen en USD',
                    data: [0, 0, 0, 0, 0],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false,
                    yAxisID: 'y2'
                },
                {
                    label: 'Ventas del Mes',
                    data: [0, 0, 0, 0, 0],
                    borderColor: 'rgba(255, 206, 86, 1)',
                    fill: false,
                    yAxisID: 'y3'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y1: {
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                        display: false,
                        max: 60
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y2: {
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                        display: false,
                        max: 60
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y3: {
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                        display: false,
                        max: 30,
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    });

    document.addEventListener('actualizarGrafico', function(event) {
        const { resultados } = event.detail;
    
        console.log("Datos recibidos en el evento 'actualizarGrafico':", resultados);
    
        if (Array.isArray(resultados) && resultados.length === 5) {
            ventasChart.data.datasets[0].data = resultados.map(resultado => resultado.debeVender || 0); // debe vender
            ventasChart.data.datasets[1].data = resultados.map(resultado => resultado.volumenUSD || 0); // "volumen a sumar"
            ventasChart.data.datasets[2].data = resultados.map(resultado => resultado.totalProductos || 0); // "ventas del mes"
            
            ventasChart.update();
        } else {
            console.error("Los resultados no tienen el formato esperado o la longitud es incorrecta.");
        }
    });
    
});











