const { DateTime } = require("luxon");

const currentDate = DateTime.now()
    .setLocale("fi")
    .toLocaleString(DateTime.DATE_FULL);

const currentWeekNumber = DateTime.local().weekNumber;
console.log(
    "🚀 ~ file: today.js ~ line 8 ~ currentWeekNumber",
    currentWeekNumber
);

console.log("🚀 ~ file: today.js ~ line 6 ~ currentDate", currentDate);

const todayTemplate = () => {
    const template = {
        type: "section",
        text: {
            type: "mrkdwn",
            text: `\n\n *Tänään on  ${currentDate} / viikko ${currentWeekNumber}. *`,
        },
    };

    return template;
};

module.exports = todayTemplate;
