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
        localStorage.setItem('gananciaNeta', gananciaNeta.toFixed(0));
        document.getElementById('gananciaNeta').innerText = `${gananciaNeta.toFixed(0)}`;
    } else {
        console.error('El cálculo de la ganancia neta falló. Revise los valores.');
    }

    actualizarGrafico();
}

document.getElementById('precioProducto').addEventListener('input', actualizarDatos);
document.getElementById('comision').addEventListener('change', actualizarDatos);

/* PANEL DERECHO - METAS MENSUALES */
function calcularVentasMensuales() {
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

    const resultados = [];
    for (let valorComision in comisionMultiplicador) {
        const multiplicador = comisionMultiplicador[valorComision];
        const debeVender = ingresos * 1.21 * multiplicador;
        const volumenUSD = debeVender / valorUsd;
        const totalProductos = volumenUSD / ticketPromedio;
        
        resultados.push({
            valorComision: valorComision,
            debeVender: debeVender,
            volumenUSD: volumenUSD,
            totalProductos: totalProductos
        });
    }

    const comisionSeleccionada = parseInt(document.getElementById("comision").value);
    const resultadoSeleccionado = resultados.find(r => r.valorComision == comisionSeleccionada);

    if (resultadoSeleccionado) {
        document.getElementById("ventasMes").textContent = `$ ${resultadoSeleccionado.debeVender.toLocaleString("es-ES", { minimumFractionDigits: 0 })}`;
        document.getElementById("volumenUSD").textContent = `${resultadoSeleccionado.volumenUSD.toFixed(0)} USD`;
        document.getElementById("totalProductos").textContent = resultadoSeleccionado.totalProductos.toFixed(0);
    } else {
        console.error('No se encontró un resultado para la comisión seleccionada');
    }

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

/* plan de accion hoy */
document.addEventListener("DOMContentLoaded", function () {
    function actualizarPlanAccion() {
        let totalProductosElement = document.getElementById("totalProductos");
                
        if (!totalProductosElement) return;

        let totalVentas = parseInt(totalProductosElement.textContent) || 0;
        console.log("Total Ventas:", totalVentas);

        const tasasDeCierre = {
            10: 0.3,
            15: 0.35,
            20: 0.5,
            35: 0.5,
            40: 0.5
        };

        const resultadoPlan = [];
        for (let valorComision in tasasDeCierre) {
            const tasa = tasasDeCierre[valorComision];
            // const datosProspectar = totalVentas * 6;
            const presentacionesPorMes = totalVentas / tasa;
            const presentacionesPorSemana = (presentacionesPorMes / 4) + 1;

            resultadoPlan.push({
                valorComision: valorComision,
                // datosProspectar: datosProspectar,
                presentacionesPorMes: Math.floor(presentacionesPorMes),
                presentacionesPorSemana: Math.floor(presentacionesPorSemana)
            });
        }

        const comisionSeleccionada = parseInt(document.getElementById("comision").value);
        const resultadoSeleccionado = resultadoPlan.find(r => r.valorComision == comisionSeleccionada);


        if (resultadoSeleccionado) {
            // document.getElementById("datos_prospectar").textContent = datosProspectar;
            console.log("Resultado Seleccionado:", resultadoSeleccionado);
            document.getElementById("por_mes").textContent = `${resultadoSeleccionado.presentacionesPorMes}`;
            document.getElementById("por_semana").textContent = `${resultadoSeleccionado.presentacionesPorSemana}`;
        } else {
            console.error('No se encontró un resultado para la comisión seleccionada');
        }
    }

    let observer = new MutationObserver(actualizarPlanAccion);
    let totalProductosElement = document.getElementById("totalProductos");

    if (totalProductosElement) {
        observer.observe(totalProductosElement, { childList: true, subtree: true });
    }

    actualizarPlanAccion();
});





