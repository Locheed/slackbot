const Axios = require('axios');

import todayTemplate  from '../templates/block-today';
import namedayTemplate from '../templates/block-nameday';

const matchingNamesHighlighted = require('./helpers/matchingNamesHighlighted');
const matchingBirthdaysHighlighted = require('./helpers/matchingBirthdaysHighlighted');

// Import interfaces
import { ICurrentNameDays } from './interfaces/ICurrentNameDays';
import { IEmoji } from './interfaces/IEmoji';
import { IFlagDays } from './interfaces/IFlagDays';
import { IUsers } from './interfaces/IUsers';


const postTodayToSlack = (
  {
    todaysOfficialNames,
    todaysOrthodoxNames,
    todaysSwedishNames,
  }: ICurrentNameDays,
    currentFlagDay: IFlagDays,
  currentChangingFlagDay: IFlagDays,
  currentDayEmoji: IEmoji,
  slackUsers: IUsers[]
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

  const birthdays: string = matchingBirthdaysHighlighted(slackUsers);

  Axios.post(process.env.WEBHOOK_URL, {
    text: 'Päivän tärkeät tiedot',
    blocks: [
      todayTemplate(currentFlagDay, currentChangingFlagDay, currentDayEmoji, birthdays),
      { type: 'divider' },
      ...namedayTemplate(
        highlightedOfficialNames,
        highlightedOrthodoxNames,
        highlightedSwedishNames
      ),
      { type: 'divider' },
    ],
  });
};

export default postTodayToSlack;
