const Axios = require('axios');

const todayTemplate = require('../templates/block-today');
const namedayTemplate = require('../templates/block-nameday');

const matchingNamesHighlighted = require('./helpers/matchingNamesHighlighted');

import { INames } from './interfaces/INames'

interface ISlackUSers {
  readlName: string,
  slackID: string,
  birthdayMonth: number,
  birthdayDay: number
}

interface IFlagDay {
  Name: string,
  Day: string,
  Month: string,
  Year?: string
}

interface IEmoji {
  Name: string,
  Day: string,
  Month: string,
  Emoji: string,
  Year: string
}

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
