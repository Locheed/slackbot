const Airtable = require('airtable');
const { DateTime } = require('luxon');

// Get the current date by local timezone
const currentDate = DateTime.now().setLocale('fi');

const dayNumber = currentDate.day;
const monthNumber = currentDate.month;
const yearNumber = currentDate.year;

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);

const tableFlagDays = base('Flag days');

let currentFlagDay = [];

const getFlagDaysByDate = async () => {
  try {
    const records = await tableFlagDays
      .select({
        view: 'Grid view',
        filterByFormula: `AND({Day} = ${dayNumber},  {Month} = ${monthNumber})`,
      })
      .firstPage();
    return records;
  } catch (err) {
    console.log(err);
  }
};

console.log(currentFlagDay);

module.exports = getFlagDaysByDate;
