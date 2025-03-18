/*grafico de ganancias*/
document.addEventListener('DOMContentLoaded', function () {
    const cte = document.getElementById('comisionesChart').getContext('2d');
    
    let valorProducto = 0;  
    let comisionSeleccionada = 10;

    document.addEventListener('actualizarGrafico', function(event) {
        const { valorProducto: nuevoValorProducto, comision: nuevaComision } = event.detail;
        valorProducto = nuevoValorProducto;
        comisionSeleccionada = nuevaComision;

        actualizarGrafico(); 
    });

    function calcularComision(valorProducto, porcentajeComision) {
        let valorNeto = valorProducto / 1.21;
        return valorNeto * (porcentajeComision / 100);
    }

    function actualizarGrafico() {
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
                    label: 'Ganancia neta sobre el producto',
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
});

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
            maintainAspectRatio: false,
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

//-----------------------------------------
const ctx = document.getElementById('myChart').getContext('2d');

let myChart = new Chart(ctx, {
    type: 'line', // Tipo de gráfico
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My Dataset',
            data: [10, 20, 15, 30, 25, 35, 40],
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 12 // Tamaño inicial de los labels
                    },
                    autoSkip: false // Esto hará que los labels no se salten, se muestran todos
                }
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            }
        }
    }
});

// Función para actualizar las opciones del gráfico según el tamaño de la ventana
function updateChartForScreenSize() {
    const width = window.innerWidth;

    // Si la ventana tiene un ancho menor o igual a 768px (pantalla pequeña)
    if (width <= 768) {
        // Cambiar la disposición de los labels en el eje X para que estén en una sola fila
        myChart.options.scales.x.ticks.autoSkip = true; // Permite que los labels se ajusten mejor

        // Cambiar el tamaño de la fuente de los labels
        myChart.options.scales.x.ticks.font.size = 10;

        // Cambiar la orientación de los labels, si se desea en una sola fila
        myChart.options.scales.x.ticks.minRotation = 0;  // Asegura que los labels estén en una sola fila (sin rotar)
    } else {
        // Si la ventana tiene un ancho mayor que 768px (pantalla grande)
        myChart.options.scales.x.ticks.autoSkip = false; // Los labels no se saltan
        myChart.options.scales.x.ticks.font.size = 14; // Tamaño de fuente más grande
        myChart.options.scales.x.ticks.minRotation = 0; // Los labels se mantienen en una sola fila
    }

    // Vuelve a renderizar el gráfico con las nuevas configuraciones
    myChart.update();
}

// Detecta cuando cambia el tamaño de la ventana
window.addEventListener('resize', updateChartForScreenSize);

// Llama a la función para aplicar las configuraciones iniciales
updateChartForScreenSize();
