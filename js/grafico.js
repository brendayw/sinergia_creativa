/*grafico de ventas*/
const ctx = document.getElementById('graficoVentas').getContext('2d');
    const graficoVentas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
            datasets: [{
                label: 'Ventas Actuales',
                data: [10000, 15000, 20000, 25000],
                backgroundColor: 'rgb(54, 163, 235)',
                borderRadius: 20,
                barThickness: 20,
            }, {
                label: 'Objetivo de Ventas',
                data: [20000, 20000, 30000, 35000],
                backgroundColor: 'rgb(255, 99, 133)',
                borderRadius: 20, 
                barThickness: 20,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                }
                
            }
        }

    });

    /*grafico de comisiones*/
    const ctxComisiones = document.getElementById('graficoComisiones').getContext('2d');
    const graficoComisiones = new Chart(ctxComisiones, {
        type: 'line', // Tipo de gráfico: línea
        data: {
            labels: ['10%', '15%', '20%', '35%', '40%'], // Porcentajes de comisión
            datasets: [{
                label: 'Ganancia Neta',
                data: [826, 1240, 1653, 2893, 4000], // Ganancia neta correspondiente
                borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
                fill: false, // No llenar el área bajo la línea
                tension: 0.1 // Suavizar la curva
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                        drawBorder: false,
                    }
                }
            }
        }
    });