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

function enviarDatosAlGrafico(valorProducto, comision) {
    const event = new CustomEvent('actualizarGrafico', {
        detail: { valorProducto, comision }
    });
    document.dispatchEvent(event);
}

/* simulador de ventas personal */
const productoSelected = document.getElementById('producto');
const precioProducto = document.getElementById('precioProducto');
const comisionSelect = document.getElementById("comision");

const precios = {
    productoA: 700000,
    productoB: 900000,
    productoC: 1100000,
    productoD: 1300000,
    productoE: 1500000,
    productoF: 1700000,
    productoJ: 1900000,
    productoH: 2100000
};

let valorProducto = 0;

function actualizarPrecio() {
    const productoSeleccionado = productoSelected.value;
    const precio = precios[productoSeleccionado];
    valorProducto = precio;
    precioProducto.textContent = "$" + precio.toLocaleString();

    enviarDatosAlGrafico(valorProducto, comisionSelect.value);
    actualizarDatos();
}

productoSelected.addEventListener('change', actualizarPrecio);
comisionSelect.addEventListener('change', actualizarDatos);

// comisionSelect.addEventListener('change', function() {
//     enviarDatosAlGrafico(valorProducto, comisionSelect.value);
// });


/* PANEL DERECHO - GANANCIA NETA HOY */
function actualizarDatos() {
    const porcentajeComision = parseFloat(comisionSelect.value) || 0;
    const gananciaNeta = calcularGananciaNeta(valorProducto, porcentajeComision);

    if (!isNaN(gananciaNeta)) {
        localStorage.setItem('gananciaNeta', gananciaNeta.toFixed(0));
        document.getElementById('gananciaNeta').innerText = `${gananciaNeta.toLocaleString("es-ES")}`;
        console.log('la ganancia: ' + gananciaNeta);
    } else {
        console.error('El cálculo de la ganancia neta falló. Revise los valores.');
    }

    enviarDatosAlGrafico(valorProducto, porcentajeComision);
}

function calcularGananciaNeta(valorProducto, porcentajeComision) {
    let valorNeto = valorProducto / 1.21;
    let comision = valorNeto * (porcentajeComision / 100);
    return parseFloat(comision.toFixed(0));
}

/* PANEL DERECHO - METAS MENSUALES */
let totalProductosGlobal = 0;

function calcularVentasMensuales() {
    const ingresos = parseFloat(document.getElementById("ingresos").value.replace(/\./g, "").replace(/,/g, ".")) || 0;
    const valorUsd = parseFloat(document.getElementById("valorUSD").value.replace(/\./g, "").replace(/,/g, ".")) || 1;
    const ticketPromedio = parseFloat(document.getElementById("ticketPromedio").value.replace(/\./g, "").replace(/,/g, ".")) || 1;

    const comisionMultiplicador = {
        10: 10,
        15: 6.6,
        20: 5,
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
        totalProductosGlobal = resultadoSeleccionado.totalProductos;

        document.getElementById("ventasMes").textContent = `$ ${resultadoSeleccionado.debeVender.toLocaleString("es-ES", { minimumFractionDigits: 0 })}`;
        document.getElementById("volumenUSD").textContent = `${resultadoSeleccionado.volumenUSD.toFixed(0)} USD`;
        document.getElementById("totalProductos").textContent = resultadoSeleccionado.totalProductos.toFixed(0);
    } else {
        console.error('No se encontró un resultado para la comisión seleccionada');
    }

    const event = new CustomEvent('actualizarGrafico', {
        detail: {
            valorProducto: valorProducto,
            comision: comisionSeleccionada
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
            const datosProspectar = totalProductosGlobal * 6;
            const presentacionesPorMes = totalProductosGlobal / tasa;
            const presentacionesPorSemana = presentacionesPorMes > 0 ? (presentacionesPorMes / 4) + 1 : 0;

            resultadoPlan.push({
                valorComision: valorComision,
                datosProspectar: datosProspectar % 1 >= 0.5 ? Math.ceil(datosProspectar) : Math.floor(datosProspectar),
                presentacionesPorMes: presentacionesPorMes % 1 >= 0.5 ? Math.ceil(presentacionesPorMes) : Math.floor(presentacionesPorMes),
                presentacionesPorSemana: Math.floor(presentacionesPorSemana)
            });
        }

        const comisionSeleccionada = parseInt(document.getElementById("comision").value);
        const resultadoSeleccionado = resultadoPlan.find(r => r.valorComision == comisionSeleccionada);


        if (resultadoSeleccionado) {
            document.getElementById("datos").textContent = `${resultadoSeleccionado.datosProspectar}`;
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





