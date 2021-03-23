import schedule from 'node-schedule';

import runNameDayMethod from './scheduleNameDay';
import {
  getFlagDaysByDate,
  getChangingFlagDaysByDate,
  getEmojiByDate,
  getSlackUsers,
} from './airtable';

import { INames } from './interfaces/INames';

// Posting functionality
import postTodayToSlack from './postToSlack';

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

export default startSchedulers;
