const schedule = require('node-schedule');

const runNameDayMethod = require('./scheduleNameDay');
const getFlagDaysByDate = require('./airtable');

const startSchedulers = () => {
  // Scheduler
  const runMorningSchedule = schedule.scheduleJob('*/10 * * * * *', () => {
    runNameDayMethod();
    getFlagDaysByDate();
  });
};

module.exports = startSchedulers;
