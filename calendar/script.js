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

const renderCalendar = (fromYear, fromWeek, toYear, toWeek) => {
    const day = getMondayFromWeekNum(fromYear, fromWeek);

    let [iYear, iMonth, iWeek] =
        [fromYear, monthNames[day.getMonth()], fromWeek];
    while (iYear < toYear || iWeek < toWeek) {
        const week = [];
        let [notes, monthChange, yearChange] =
            [iWeek.toString(), false, false];

        // Construct week.
        for (let j = 0; j < 7; j++) {
            week.push(day.getDate());
            day.setDate(day.getDate() + 1);   

            // Check next month.
            const nextMonth = monthNames[day.getMonth()];
            if (iMonth !== nextMonth) {
                iMonth = nextMonth;
                monthChange = true;

                // Check next year.
                // qq: Why is the year check nested in the month check?
                const nextYear = day.getFullYear();
                if (iYear !== nextYear) {
                    [iYear, iWeek, yearChange] =
                        [nextYear, 1, true];
                }
            }

        }

        // Make notes display month if change or first.
        const isFirst = iYear == fromYear && iWeek == fromWeek;
        if (monthChange || isFirst) {
            notes = iMonth;
            if (yearChange || isFirst) {
                notes = iYear.toString() + " " + notes
            }
        }

        appendWeek(week, notes);
        iWeek++;
    }
}

const resetCalendar = () => {
    $(".cal").find("tr:gt(0)").remove();
    $(".notes").find("tr:gt(0)").remove();
}

const updateCalendar = () => {
    const [fromYear, fromWeek, toYear, toWeek] =
    [
        parseInt(inputFromYear.val()),
        parseInt(inputFromWeek.val()),
        parseInt(inputToYear.val()),
        parseInt(inputToWeek.val()),
    ];

    // Check bounds.
    if (fromYear >= toYear && fromWeek >= toWeek) { return };
    resetCalendar();
    renderCalendar(fromYear, fromWeek, toYear, toWeek);
}

let inputFromYear, inputFromWeek, inputToYear, inputToWeek;
$(document).ready(() => {
    [inputFromYear, inputFromWeek, inputToYear, inputToWeek] =
        [$("#fromYear"), $("#fromWeek"), $("#toYear"), $("#toWeek")];
    inputFromYear.change(updateCalendar);
    inputFromWeek.change(updateCalendar);
    inputToYear.change(updateCalendar);
    inputToWeek.change(updateCalendar);
    updateCalendar();
})