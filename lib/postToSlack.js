const Axios = require('axios');

const todayTemplate = require('../templates/block-today');
const namedayTemplate = require('../templates/block-nameday');

const postNameDaysToSlack = ({
  todaysOfficialNames,
  todaysOrthodoxNames,
  todaysSwedishNames,
}) => {
  const commaSeparatedOfficialNames = todaysOfficialNames.join(', ');
  const commaSeparatedOrhodoxNames = todaysOrthodoxNames.join(', ');
  const commaSeparatedSwedishNames = todaysSwedishNames.join(', ');
  Axios.post(process.env.WEBHOOK_URL, {
    blocks: [
      todayTemplate(),
      { type: 'divider' },
      ...namedayTemplate(
        commaSeparatedOfficialNames,
        commaSeparatedOrhodoxNames,
        commaSeparatedSwedishNames
      ),
      { type: 'divider' },
    ],
  });
};

module.exports = postNameDaysToSlack;
