const Axios = require('axios');

const todayTemplate = require('../templates/block-today');
const namedayTemplate = require('../templates/block-nameday');

const matchingNamesHighlighted = require('./helpers/matchingNamesHighlighted');

const postTodayToSlack = (
  { todaysOfficialNames, todaysOrthodoxNames, todaysSwedishNames },
  currentFlagDay,
  currentChangingFlagDay,
  currentDayEmoji,
  slackUsers
) => {
  const highlightedOfficialNames = matchingNamesHighlighted(
    todaysOfficialNames,
    slackUsers
  );
  const highlightedOrthodoxNames = matchingNamesHighlighted(
    todaysOrthodoxNames,
    slackUsers
  );
  const highlightedSwedishNames = matchingNamesHighlighted(
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

module.exports = postTodayToSlack;
