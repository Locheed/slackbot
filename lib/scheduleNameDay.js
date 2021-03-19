const fs = require("fs");
const path = require("path");
const schedule = require("node-schedule");

// Posting functionality
const postNameDaysToSlack = require("./postToSlack");

// Load raw json content
const rawOfficialNames = fs.readFileSync(
    path.resolve(__dirname, "../data/names_official.json")
);
const rawOrthodoxNames = fs.readFileSync(
    path.resolve(__dirname, "../data/names_orthodox.json")
);

// Parse the raw json
const officialNames = JSON.parse(rawOfficialNames);
const orthodoxNames = JSON.parse(rawOrthodoxNames);

// Schedule namedays posting to slack once a day
const scheduleNameDay = () => {
    // Current time with timezone
    const currentLocalTime = new Date().toLocaleTimeString("fi-FI", {
        timeZone: "Europe/Helsinki",
    });

    // Scheduler
    const runMorningNameSchedule = schedule.scheduleJob(
        "*/10 * * * * *",
        () => {
            runNameDayMethod();
        }
    );
};

// Construct the nameday data and run postNameDaysToSlack
const runNameDayMethod = async () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDateNumber = currentDate.getDate();
    const currentHour = currentDate.getHours();

    const todaysOfficialNames = await loopOfficialNames(
        currentDateNumber,
        currentMonth
    );
    const todaysOrthodoxNames = await loopOrthodoxNames(
        currentDateNumber,
        currentMonth
    );

    postNameDaysToSlack(todaysOfficialNames, todaysOrthodoxNames);
};

// Loop the official namedays json and filter current day
const loopOfficialNames = (currentDateNumber, currentMonth) => {
    return officialNames.filter((date) => {
        return (
            parseInt(date.month) === currentMonth &&
            parseInt(date.day) === currentDateNumber
        );
    });
};

// Loop the orthodox namedays json and filter current day
const loopOrthodoxNames = (currentDateNumber, currentMonth) => {
    return orthodoxNames.filter((date) => {
        return (
            parseInt(date.month) === currentMonth &&
            parseInt(date.day) === currentDateNumber
        );
    });
};

module.exports = scheduleNameDay;
