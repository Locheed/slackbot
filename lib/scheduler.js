const schedule = require('node-schedule');

const runNameDayMethod = require('./scheduleNameDay');
const {
  getFlagDaysByDate,
  getChangingFlagDaysByDate,
  getEmojiByDate,
  getSlackUsers,
} = require('./airtable');
// Posting functionality
const postTodayToSlack = require('./postToSlack');

const startSchedulers = () => {
  // Scheduler
  const runMorningSchedule = schedule.scheduleJob(
    '*/10 * * * * *',
    async () => {
      const currentNames = await runNameDayMethod();
      const currentFlagDay = await getFlagDaysByDate();
      const currentChangingFlagDay = await getChangingFlagDaysByDate();
      const currentDayEmoji = await getEmojiByDate();
      const slackUsers = await getSlackUsers();

      postTodayToSlack(
        currentNames,
        currentFlagDay[0],
        currentChangingFlagDay[0],
        currentDayEmoji[0],
        slackUsers
      );
    }
  );
};

module.exports = startSchedulers;
