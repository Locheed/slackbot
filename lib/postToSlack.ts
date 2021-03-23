const Axios = require('axios');

import todayTemplate  from '../templates/block-today';
const namedayTemplate = require('../templates/block-nameday');

const matchingNamesHighlighted = require('./helpers/matchingNamesHighlighted');

import { INames } from './interfaces/INames'


interface IPostToSlack {
   todaysOfficialNames: Array<INames>
    todaysOrthodoxNames: Array<INames>
    todaysSwedishNames: Array<INames>
}

const postTodayToSlack = (
  {
    todaysOfficialNames,
    todaysOrthodoxNames,
    todaysSwedishNames,
  }: IPostToSlack,
    currentFlagDay: any,
  currentChangingFlagDay: any,
  currentDayEmoji: any,
  slackUsers: any
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

  Axios.post(process.env.WEBHOOK_URL, {
    text: 'Päivän tärkeät tiedot',
    blocks: [
      todayTemplate(currentFlagDay, currentChangingFlagDay, currentDayEmoji),
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
