const Axios = require('axios');

import todayTemplate  from '../templates/block-today';
import namedayTemplate from '../templates/block-nameday';
import birthdaysTemplate from '../templates/block-birthday';


const matchingNamesHighlighted = require('./helpers/matchingNamesHighlighted');
const matchingBirthdaysHighlighted = require('./helpers/matchingBirthdaysHighlighted');

// Import interfaces
import { ICurrentNameDays } from './interfaces/ICurrentNameDays';
import { IEmoji } from './interfaces/IEmoji';
import { IFlagDays } from './interfaces/IFlagDays';
import { IUsers } from './interfaces/IUsers';
import { INotification } from './interfaces/INotification';


const postTodayToSlack = (
  {
    todaysOfficialNames,
    todaysOrthodoxNames,
    todaysSwedishNames,
  }: ICurrentNameDays,
    currentFlagDay: IFlagDays,
  currentChangingFlagDay: IFlagDays,
  currentDayEmoji: IEmoji,
  slackUsers: IUsers[],
  currentDateNotifications: INotification[]
): void => {
  const highlightedOfficialNames: string = matchingNamesHighlighted(
    todaysOfficialNames,
    slackUsers
  );
  const highlightedOrthodoxNames: string = matchingNamesHighlighted(
    todaysOrthodoxNames,
    slackUsers
  );
  const highlightedSwedishNames: string = matchingNamesHighlighted(
    todaysSwedishNames,
    slackUsers
  );

  const birthdays: IUsers[] | undefined = matchingBirthdaysHighlighted(slackUsers);

  const payload = {
    text: 'Päivän tärkeät tiedot',
    blocks: [
      todayTemplate(currentFlagDay, currentChangingFlagDay, currentDayEmoji, currentDateNotifications),
      ...(birthdays ? birthdaysTemplate(birthdays) : []),
      ...namedayTemplate(
        highlightedOfficialNames,
        highlightedOrthodoxNames,
        highlightedSwedishNames
      ),
      { type: 'divider' },
    ],
  };

  Axios.post(process.env.WEBHOOK_URL, payload)
   .then((response: any) => {
      console.info(`Message posted successfully: ${response.status}`);
    })
    .catch((error: any) => {
      console.error(`Error posting message to Slack API: ${error.response}`);
    });
};

export default postTodayToSlack;
