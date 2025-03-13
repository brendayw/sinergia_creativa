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


