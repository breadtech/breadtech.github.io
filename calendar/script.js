const appendWeek = (days = [], notes = ".") => {
    $(".cal tr:last").after(`<tr class="week-days">
        ${days.map(day => `<td>${day}</td>`).join()}
    </tr>`);
    $(".notes tr:last").after(`<tr class="week-days">
        <td>${notes}</td>
    </tr>`);
};

const getMondayFromWeekNum = (year, weekNum) => {
    var monday = new Date(year, 0, (1 + (weekNum - 1) * 7));
    while (monday.getDay() !== 1) {
        monday.setDate(monday.getDate() - 1);
    }
    return monday;
}

const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December",
];

const render = (from = 1, to = 52) => {
    const day = getMondayFromWeekNum(2022, from);
    let month = monthNames[day.getMonth()];
    for (let i = from; i <= to; i++) {
        const week = [];
        let notes = i.toString();
        let monthChange = false;

        // Construct week.
        for (let j = 0; j < 7; j++) {
            week.push(day.getDate());
            day.setDate(day.getDate() + 1);   
            const nextMonth = monthNames[day.getMonth()];
            if (month !== nextMonth) {
                month = nextMonth;
                monthChange = true;
            }
        }
        // Make notes display month if change or first.
        if (monthChange || i === from) notes = month;

        appendWeek(week, notes);
    }
}

$(document).ready(() => {
    render(36, 53);
})