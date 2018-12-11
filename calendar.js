let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

let date = new Date();

let month = date.getMonth();
let year = date.getFullYear();

document.getElementById("year").innerHTML = year;
document.getElementById("week_days").innerHTML = weekday.map(day => `<th>${day}</th>`).join("");
document.getElementById("month").innerHTML = months[month];


function getDaysInMonth(month) {
    return new Date(year, month + 1, 0).getDate();
}

function displayFutureMonth() {
    if (++month == 12) {
        month = 0;
        document.getElementById("year").innerHTML = ++year;
    }

    document.getElementById("month").innerHTML = months[month];

    updateCalendar();
}

function displayPreviousMonth() {
    if (--month == -1) {
        month = 11;
        document.getElementById("year").innerHTML = --year;
    }

    document.getElementById("month").innerHTML = months[month];

    updateCalendar();
}

function updateCalendar() {
    let date = new Date(year, month, 1);
    let indexInWeekOfTheFirstDayOfThisMonth = date.getDay() - 1;

    let daysInCurrentMonth = getDaysInMonth(month);
    let daysInPreviousMonth = getDaysInMonth(month - 1);

    let tableBody = document.getElementById("date_day");
    let currentWeekBlock;

    tableBody.innerHTML = "";

    tableBody.insertAdjacentHTML("beforeend", "<tr></tr>");
    currentWeekBlock = tableBody.lastChild;

    let dateOfTheDayInThisWeekFromPreviousMonth = daysInPreviousMonth - indexInWeekOfTheFirstDayOfThisMonth;

    for (let dateFromPreviousMonth = dateOfTheDayInThisWeekFromPreviousMonth ; dateFromPreviousMonth < daysInPreviousMonth; dateFromPreviousMonth++) {
        currentWeekBlock.insertAdjacentHTML("beforeend", `<td class="dateFromOtherMonths">${dateFromPreviousMonth + 1}</td>`);
    }

    let indexInWeekOfTheCurrentDayOfThisMonth = indexInWeekOfTheFirstDayOfThisMonth;

    for (let dayOfMonth = 1; dayOfMonth <= daysInCurrentMonth; dayOfMonth++) {
        currentWeekBlock.insertAdjacentHTML("beforeend", `<td class ="date">${dayOfMonth}</td>`);
        indexInWeekOfTheCurrentDayOfThisMonth++;
        if (indexInWeekOfTheCurrentDayOfThisMonth == 7) {
            currentWeekBlock.insertAdjacentHTML("afterend", `<tr class ="demo"></tr>`);
            tableBody.insertAdjacentHTML("beforeend", "<tr></tr>");
            currentWeekBlock = tableBody.lastChild;
            indexInWeekOfTheCurrentDayOfThisMonth = 0;
        }
    }

    let indexInWeekOfTheFirstDayOfTheNextMonth = (daysInCurrentMonth + indexInWeekOfTheFirstDayOfThisMonth) % 7;
    let indexInWeekOfTheCurrentDayOfTheNextMonth = indexInWeekOfTheFirstDayOfTheNextMonth;
    let dateFromNextMonth = 1

    if (indexInWeekOfTheFirstDayOfTheNextMonth != 0) while (indexInWeekOfTheCurrentDayOfTheNextMonth++ < 7) {
        currentWeekBlock.insertAdjacentHTML("beforeend", `<td class="dateFromOtherMonths">${dateFromNextMonth++}</td>`);
    }
}

updateCalendar();
