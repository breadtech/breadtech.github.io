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
    let year = day.getFullYear();
    for (let i = from; i <= to; i++) {
        const week = [];
        let [notes, monthChange, yearChange] =
            [i.toString(), false, false];

        // Construct week.
        for (let j = 0; j < 7; j++) {
            week.push(day.getDate());
            day.setDate(day.getDate() + 1);   

            // Check next month.
            const nextMonth = monthNames[day.getMonth()];
            if (month !== nextMonth) {
                month = nextMonth;
                monthChange = true;

                // Check next year.
                // qq: Why is the year check nested in the month check?
                const nextYear = day.getFullYear();
                if (year !== nextYear) {
                    year = nextYear;
                    yearChange = true;
                }
            }

        }
        // Make notes display month if change or first.
        if (monthChange || i === from) {
            notes = month;
            if (yearChange || i === from) {
                notes = year.toString() + " " + notes
            }
        }

        appendWeek(week, notes);
    }
}

$(document).ready(() => {
    render(36, 53);
})