const fs = require('fs');
const path = require('path');

// Posting functionality
const postNameDaysToSlack = require('./postToSlack');

// Load raw json content
const rawOfficialNames = fs.readFileSync(
  path.resolve(__dirname, '../data/names_official.json')
);
const rawOrthodoxNames = fs.readFileSync(
  path.resolve(__dirname, '../data/names_orthodox.json')
);
const rawSwedishNames = fs.readFileSync(
  path.resolve(__dirname, '../data/names_swedish.json')
);

// Parse the raw json
const officialNames = JSON.parse(rawOfficialNames);
const orthodoxNames = JSON.parse(rawOrthodoxNames);
const swedishNames = JSON.parse(rawSwedishNames);

/* eslint-disable */
// Loop the official namedays json and filter current day
const loopNamesAndFilter = (currentDateNumber, currentMonth, namelist) => {
  return namelist.filter((date) => {
    return (
      parseInt(date.month) === currentMonth &&
      parseInt(date.day) === currentDateNumber
    );
  });
};
/* eslint-enable */

// Construct the nameday data and run postNameDaysToSlack
const runNameDayMethod = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDateNumber = currentDate.getDate();

  const todaysOfficialNames = await loopNamesAndFilter(
    currentDateNumber,
    currentMonth,
    officialNames
  );

  const todaysOrthodoxNames = await loopNamesAndFilter(
    currentDateNumber,
    currentMonth,
    orthodoxNames
  );

  const todaysSwedishNames = await loopNamesAndFilter(
    currentDateNumber,
    currentMonth,
    swedishNames
  );

  postNameDaysToSlack(
    todaysOfficialNames,
    todaysOrthodoxNames,
    todaysSwedishNames
  );
};

module.exports = runNameDayMethod;
