const { DateTime } = require('luxon');

// Get the current date by local timezone
const currentDate = DateTime.now()
  .setLocale('fi')
  .toLocaleString(DateTime.DATE_FULL);

// Get weeknumber
const currentWeekNumber = DateTime.local().weekNumber;

// This is the template block for slack message
const todayTemplate = () => {
  const template = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `\n\n *Tänään on  ${currentDate} / viikko ${currentWeekNumber}. *`,
    },
  };

  return template;
};

module.exports = todayTemplate;
