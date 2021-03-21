const { DateTime } = require('luxon');

// Get the current date by local timezone
const currentDate = DateTime.now()
  .setLocale('fi')
  .toLocaleString(DateTime.DATE_FULL);

// Get weeknumber
const currentWeekNumber = DateTime.local().weekNumber;

// Flag template if it's a flagday
const flagTemplate = {
  accessory: {
    type: 'image',
    image_url:
      'https://cdn.pixabay.com/photo/2013/06/08/15/08/flag-of-finland-123273_960_720.jpg',
    alt_text: 'Liputuspäivä',
  },
};

// This is the template block for slack message
const todayTemplate = (
  currentFlagDay = '',
  currentChangingFlagDay = '',
  currentDayEmoji = ''
) => {
  const template = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `\n\n *Tänään on  ${currentDate} / viikko ${currentWeekNumber}. *\n\n ${
        currentFlagDay && currentFlagDay.fields.Name
      }\n\n${
        currentChangingFlagDay && currentChangingFlagDay.fields.Name
      }\n\n ${currentDayEmoji && currentDayEmoji.fields.Emoji}`,
    },
    // Include the flagday template if it's a flagday
    ...((currentFlagDay || currentChangingFlagDay) && flagTemplate),
  };

  return template;
};

module.exports = todayTemplate;
