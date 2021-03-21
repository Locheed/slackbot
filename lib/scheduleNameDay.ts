const fs = require('fs');
const path = require('path');

import { INames } from './interfaces/INames'

// Load raw json content
const rawOfficialNames: string = fs.readFileSync(
  path.resolve(__dirname, '../data/names_official.json')
);
const rawOrthodoxNames: string = fs.readFileSync(
  path.resolve(__dirname, '../data/names_orthodox.json')
);
const rawSwedishNames: string = fs.readFileSync(
  path.resolve(__dirname, '../data/names_swedish.json')
);


// Parse the raw json
const officialNames: Array<INames> = JSON.parse(rawOfficialNames);
const orthodoxNames: Array<INames> = JSON.parse(rawOrthodoxNames);
const swedishNames: Array<INames> = JSON.parse(rawSwedishNames);

/* eslint-disable */
// Loop the official namedays json and filter current day
const loopNamesAndFilter = (currentDateNumber: number, currentMonth: number, namelist: Array<INames>) => {
  return namelist.filter((date) => {
    return (
      parseInt(date.month, 10) === currentMonth &&
      parseInt(date.day, 10) === currentDateNumber
    );
  });
};
/* eslint-enable */


// Construct the nameday data
const runNameDayMethod = async (): Promise<any> => {
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

  const currentNameDays = {
    todaysOfficialNames: todaysOfficialNames[0].official_names,
    todaysOrthodoxNames: todaysOrthodoxNames[0].orthodox_names,
    todaysSwedishNames: todaysSwedishNames[0].swedish_names,
  }

  return currentNameDays;
};

export default runNameDayMethod;
