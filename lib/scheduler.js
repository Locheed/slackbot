const schedule = require('node-schedule');

const runNameDayMethod = require('./scheduleNameDay');
const getFlagDaysByDate = require('./airtable');
// Posting functionality
const postNameDaysToSlack = require('./postToSlack');

const startSchedulers = () => {
  // Scheduler
  const runMorningSchedule = schedule.scheduleJob(
    '*/10 * * * * *',
    async () => {
      const currentNames = await runNameDayMethod();
      const currentFlagDay = await getFlagDaysByDate();
      postNameDaysToSlack(currentNames, currentFlagDay);
    }
  );
};

module.exports = startSchedulers;
