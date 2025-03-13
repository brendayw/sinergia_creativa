/* calendario */
const mesesNombre = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const diasEnMes = (mes, anio) => new Date(anio, mes + 1, 0).getDate();

let fechaActual = new Date();

const diasCalendario = document.getElementById('calendar_days');
const mesAnio = document.getElementById('month_year');

function generateCalendar() {
    const mes = fechaActual.getMonth();
    const anio = fechaActual.getFullYear();
    const hoy = fechaActual.getDate();

    const primerDia = new Date(anio, mes, 1).getDay();
    const diasEnElMesActual = diasEnMes(mes, anio);

    mesAnio.textContent = `${mesesNombre[mes]} ${anio}`;

    diasCalendario.innerHTML = '';

    for (let i = 0; i < primerDia; i++) {
        const diaVacio = document.createElement('div');
        diasCalendario.appendChild(diaVacio);
    }

    for (let i = 1; i <= diasEnElMesActual; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;

        if (i === hoy) {
            dayElement.classList.add('selected');
        }
        
        dayElement.addEventListener('click', function () {
            document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
            dayElement.classList.add('selected');
        });

        diasCalendario.appendChild(dayElement);
    }

    // Actualizar el mes en el elemento .mes-actual
    document.querySelector(".mes-actual span:nth-child(2)").textContent = mesesNombre[mes];
}


document.getElementById('prev_month').addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    generateCalendar();
});


document.getElementById('next_month').addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    generateCalendar();
});

generateCalendar();
