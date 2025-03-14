const toggle = document.querySelector(".toggle");
const menuDashboard = document.querySelector(".menu_dashboard");
const iconoMenu = toggle.querySelector("i");
const enlacesMenu = document.querySelectorAll(".enlace");

toggle.addEventListener("click", () => {
    menuDashboard.classList.toggle("open");
    iconoMenu.textContent = iconoMenu.textContent === "menu" ? "close" : "menu";
});

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menuDashboard.classList.remove("open");
        iconoMenu.textContent = "menu";
    });
});

/* PANEL DERECHO - GANANCIA NETA HOY */
function calcularGananciaNeta(valorProducto, porcentajeComision) {
    let valorNeto = valorProducto / 1.21;
    let comision = valorNeto * (porcentajeComision / 100);
    return parseFloat(comision.toFixed(0));
}

function actualizarDatos() {
    const valorProducto = parseFloat(document.getElementById('precioProducto').value) || 0;
    const porcentajeComision = parseFloat(document.getElementById('comision').value) || 0;
    const gananciaNeta = calcularGananciaNeta(valorProducto, porcentajeComision);

    if (!isNaN(gananciaNeta)) {
        localStorage.setItem('gananciaNeta', gananciaNeta.toFixed(2));
        document.getElementById('gananciaNeta').innerText = `${gananciaNeta.toFixed(2)}`;
    } else {
        console.error('El cálculo de la ganancia neta falló. Revise los valores.');
    }

    actualizarGrafico();
}

document.getElementById('precioProducto').addEventListener('input', actualizarDatos);
document.getElementById('comision').addEventListener('change', actualizarDatos);

/* Calcular metas mensuales */
// function calcularVentasMensuales() {
//     const ingresos = parseFloat(document.getElementById("ingresos").value.replace(/\./g, "").replace(/,/g, ".")) || 0;
//     const valorUsd = parseFloat(document.getElementById("valorUSD").value.replace(/\./g, "").replace(/,/g, ".")) || 1;
//     const ticketPromedio = parseFloat(document.getElementById("ticketPromedio").value.replace(/\./g, "").replace(/,/g, ".")) || 1;

//     const comisionSelect = parseInt(document.getElementById("comision").value);

//     const comisionMultiplicador = {
//         10: 10,
//         15: 6.6,
//         20: 5,
//         25: 4,
//         30: 3.3,
//         35: 2.85,
//         40: 1.8
//     }[comisionSelect] || 1;

//     const debeVender = ingresos * 1.21 * comisionMultiplicador;
//     const volumenUSD = debeVender / valorUsd;
//     const totalProductos = volumenUSD / ticketPromedio;
    
//     document.getElementById("ventasMes").textContent = `$ ${debeVender.toLocaleString("es-ES", { minimumFractionDigits: 0 })}`;
//     document.getElementById("volumenUSD").textContent = `${volumenUSD.toFixed(0)} USD`;
//     document.getElementById("totalProductos").textContent = Math.floor(totalProductos);

//     const event = new CustomEvent('actualizarGrafico', {
//         detail: {
//             ventasMensuales: debeVender,
//             volumenUSD: volumenUSD,
//             totalProductos: totalProductos,
//             comisionSelect: comisionSelect
//         }
//     });
//     document.dispatchEvent(event);
// }

// document.addEventListener("DOMContentLoaded", function () {
//     const inputs = document.querySelectorAll("#ingresos, #comision, #valorUSD, #ticketPromedio");
//     inputs.forEach(input => {
//         input.addEventListener("input", calcularVentasMensuales);
//     });

//     // Detectar cambios en el select de comisión
//     document.getElementById("comision").addEventListener("change", calcularVentasMensuales);
// });

function calcularVentasMensuales() {
    // Obtener valores del formulario y limpiar separadores incorrectos
    const ingresos = parseFloat(document.getElementById("ingresos").value.replace(/\./g, "").replace(/,/g, ".")) || 0;
    const valorUsd = parseFloat(document.getElementById("valorUSD").value.replace(/\./g, "").replace(/,/g, ".")) || 1;
    const ticketPromedio = parseFloat(document.getElementById("ticketPromedio").value.replace(/\./g, "").replace(/,/g, ".")) || 1;

    const comisionMultiplicador = {
        10: 10,
        15: 6.6,
        20: 5,
        25: 4,
        30: 3.3,
        35: 2.85,
        40: 1.8
    };

    // Calcular los valores para todas las comisiones
    const resultados = [];
    for (let comision in comisionMultiplicador) {
        const multiplicador = comisionMultiplicador[comision];
        const debeVender = ingresos * 1.21 * multiplicador;
        const volumenUSD = debeVender / valorUsd;
        const totalProductos = volumenUSD / ticketPromedio;
        
        resultados.push({
            comision: comision,
            debeVender: debeVender,
            volumenUSD: volumenUSD,
            totalProductos: totalProductos
        });
    }

    // Mostrar valores en la interfaz
    document.getElementById("ventasMes").textContent = `$ ${resultados[0].debeVender.toLocaleString("es-ES", { minimumFractionDigits: 0 })}`;
    document.getElementById("volumenUSD").textContent = `${resultados[0].volumenUSD.toFixed(0)} USD`;
    document.getElementById("totalProductos").textContent = resultados[0].totalProductos.toFixed(1);


    // Emitir evento con los resultados
    const event = new CustomEvent('actualizarGrafico', {
        detail: {
            resultados: resultados
        }
    });
    document.dispatchEvent(event);
}

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("#ingresos, #comision, #valorUSD, #ticketPromedio");
    inputs.forEach(input => {
        input.addEventListener("input", calcularVentasMensuales);
    });

    document.getElementById("comision").addEventListener("change", calcularVentasMensuales);
});










