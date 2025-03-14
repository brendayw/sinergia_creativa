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
// document.addEventListener('DOMContentLoaded', function () {
//     const ctx = document.getElementById('ventasChart').getContext('2d');

//     const ventasChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: ['Debe vender', 'Volumen en USD', 'Ventas del mes'],
//             datasets: [
//                 {
//                     label: 'Comisión 10%',
//                     data: [0, 0, 0],
//                     borderColor: 'rgb(255, 99, 133)',
//                     backgroundColor: 'rgb(255, 99, 133)',
//                     fill: true,
//                     tension: 0.1
//                 },
//                 {
//                     label: 'Comisión 15%',
//                     data: [0, 0, 0], // Inicialmente en 0
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     backgroundColor: 'rgb(54, 163, 235)',
//                     fill: true,
//                     tension: 0.1
//                 },
//                 {
//                     label: 'Comisión 20%',
//                     data: [0, 0, 0], // Inicialmente en 0
//                     borderColor: 'rgba(255, 206, 86, 1)',
//                     backgroundColor: 'rgb(255, 207, 86)',
//                     fill: true,
//                     tension: 0.1
//                 },
//                 {
//                     label: 'Comisión 25%',
//                     data: [0, 0, 0], // Inicialmente en 0
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     backgroundColor: 'rgb(75, 192, 192)',
//                     fill: true,
//                     tension: 0.1
//                 },
//                 {
//                     label: 'Comisión 30%',
//                     data: [0, 0, 0], // Inicialmente en 0
//                     borderColor: 'rgba(153, 102, 255, 1)',
//                     backgroundColor: 'rgb(153, 102, 255)',
//                     fill: true,
//                     tension: 0.1
//                 },
//                 {
//                     label: 'Comisión 35%',
//                     data: [0, 0, 0], // Inicialmente en 0
//                     borderColor: 'rgba(255, 159, 64, 1)',
//                     backgroundColor: 'rgb(255, 160, 64)',
//                     fill: true,
//                     tension: 0.1
//                 },
//                 {
//                     label: 'Comisión 40%',
//                     data: [0, 0, 0], // Inicialmente en 0
//                     borderColor: 'rgb(208, 255, 99)',
//                     backgroundColor: 'rgb(255, 99, 133)',
//                     fill: true,
//                     tension: 0.1
//                 }
//             ]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             },
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'top',
//                 },
//                 tooltip: {
//                     mode: 'index',
//                     intersect: false,
//                 }
//             }
//         }
//     });

//     // Escuchar el evento 'actualizarGrafico' y actualizar el gráfico
//     document.addEventListener('actualizarGrafico', function(event) {
//         const { ventasMensuales, volumenUSD, totalProductos, comisionSelect } = event.detail;

//         // Definir multiplicadores de comisión
//         const comisiones = [10, 15, 20, 25, 30, 35, 40];
        
//         comisiones.forEach((comision, index) => {
//             const multiplicador = {
//                 10: 10,
//                 15: 6.6,
//                 20: 5,
//                 25: 4,
//                 30: 3.3,
//                 35: 2.85,
//                 40: 1.8
//             }[comision] || 1;

//             const ventas = ventasMensuales * multiplicador;
//             const volumen = volumenUSD * multiplicador;
//             const productos = totalProductos * multiplicador;

//             // Si la comisión coincide con la seleccionada, se actualizan los datos para esa comisión
//             ventasChart.data.datasets[index].data = [ventas, volumen, productos];
//         });

//         // Actualizar el gráfico con los nuevos datos
//         ventasChart.update();
//     });
// });

// grafico de objetivos
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('ventasChart').getContext('2d');

    const ventasChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10%', '15%', '20%', '25%', '30%', '35%', '40%'],
            datasets: [
                {
                    label: 'Debe Vender',
                    data: [0, 0, 0, 0, 0, 0, 0],
                    borderColor: 'rgb(255, 99, 133)',
                    fill: false,
                    yAxisID: 'y1'
                },
                {
                    label: 'Volumen en USD',
                    data: [0, 0, 0, 0, 0, 0, 0],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false,
                    yAxisID: 'y2'
                },
                {
                    label: 'Ventas del Mes',
                    data: [0, 0, 0, 0, 0, 0, 0],
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

    // Escuchar el evento 'actualizarGrafico' y actualizar el gráfico
    document.addEventListener('actualizarGrafico', function(event) {
        const { resultados } = event.detail;

        // Verificar el tamaño de 'resultados' y asegurarse de que hay 7 elementos
        if (resultados.length === 7) {
            console.log("Actualizando gráfico con los siguientes datos: ");
            console.log(resultados); // Verifica los datos que estamos pasando

            // Actualizar los datos de cada dataset
            ventasChart.data.datasets[0].data = resultados.map(resultado => resultado.debeVender); // "Debe Vender"
            ventasChart.data.datasets[1].data = resultados.map(resultado => resultado.volumenUSD); // "Volumen en USD"
            ventasChart.data.datasets[2].data = resultados.map(resultado => resultado.totalProductos); // "Ventas del mes"
            
            // Actualizar el gráfico con los nuevos datos
            ventasChart.update();
        } else {
            console.error("Los resultados no tienen el formato esperado.");
        }
    });
});











