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
const tableChangingFlagDays = base('Flag days changing');
const tableEmojis = base('Emoji date');
const tableUsers = base('Slack Users');

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

const getChangingFlagDaysByDate = async () => {
  try {
    const records = await tableChangingFlagDays
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

const getEmojiByDate = async () => {
  try {
    const records = await tableEmojis
      .select({
        view: 'Grid view',
        filterByFormula: `AND({Day} = ${dayNumber},  {Month} = ${monthNumber}, {Year} = ${yearNumber})`,
      })
      .firstPage();
    return records;
  } catch (err) {
    console.log(err);
  }
};

const getSlackUsers = async () => {
  try {
    const records = await tableUsers
      .select({
        view: 'Grid view',
      })
      .firstPage();

    return { records: records.map((record) => record.fields) };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getFlagDaysByDate,
  getChangingFlagDaysByDate,
  getEmojiByDate,
  getSlackUsers,
};
