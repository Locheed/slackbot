const Axios = require('axios');

const todayTemplate = require('../templates/block-today');
const namedayTemplate = require('../templates/block-nameday');

const postNameDaysToSlack = (
  todaysOfficialNames,
  todaysOrthodoxNames,
  todaysSwedishNames
) => {
  const commaSeparatedOfficialNames = todaysOfficialNames[0].official_names.join(
    ', '
  );
  const commaSeparatedOrhodoxNames = todaysOrthodoxNames[0].orthodox_names.join(
    ', '
  );
  const commaSeparatedSwedishNames = todaysSwedishNames[0].swedish_names.join(
    ', '
  );
  Axios.post(process.env.WEBHOOK_URL, {
    // text: commaSeparatedOfficialNames,
    // blocks: [
    //   //   todayTemplate(),
    //   {
    //     type: 'divider',
    //   },
    //   namedayTemplate(commaSeparatedOfficialNames, commaSeparatedOrhodoxNames),
    //   {
    //     type: 'divider',
    //   },
    // ],
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
