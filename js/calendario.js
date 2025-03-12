/*calendario*/
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

let currentDate = new Date();

const calendarDays = document.getElementById('calendar_days');
const monthYear = document.getElementById('month_year');

function generateCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const today = currentDate.getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = daysInMonth(month, year);

    monthYear.textContent = `${monthNames[month]} ${year}`;

    calendarDays.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        calendarDays.appendChild(emptyDay);
    }

    //genera los dias del mes
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;

        if (i === today) {
            dayElement.classList.add('selected');
        }
        
        dayElement.addEventListener('click', function () {
            document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
            dayElement.classList.add('selected');
        });

        calendarDays.appendChild(dayElement);
    }
}

document.getElementById('prev_month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
});

document.getElementById('next_month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
});

generateCalendar();