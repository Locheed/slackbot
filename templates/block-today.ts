import { DateTime } from 'luxon';
import { IEmoji } from '../lib/interfaces/IEmoji';
import { IFlagDays } from '../lib/interfaces/IFlagDays';

// Get the current date by local timezone
const currentDate: string = DateTime.now()
  .setLocale('fi')
  .toLocaleString(DateTime.DATE_FULL);

// Get weeknumber
const currentWeekNumber: number = DateTime.local().weekNumber;


// Flag template if it's a flagday
const flagTemplate: object = {
  accessory: {
    type: 'image',
    image_url:
      'https://cdn.pixabay.com/photo/2013/06/08/15/08/flag-of-finland-123273_960_720.jpg',
    alt_text: 'Liputuspäivä',
  },
};

// This is the template block for slack message
const todayTemplate = (
  currentFlagDay: IFlagDays,
  currentChangingFlagDay: IFlagDays,
  currentDayEmoji: IEmoji,
) => {

  const template: object = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `\n\n *Tänään on  ${currentDate} / viikko ${currentWeekNumber}. * ${
        currentFlagDay ? '\n\n' + currentFlagDay.Name : ''
      } ${
        currentChangingFlagDay ? '\n\n' + currentChangingFlagDay.Name : ''
      } ${currentDayEmoji ? '\n\n' + currentDayEmoji.Emoji : ''}`,
    },
    // Include the flagday template if it's a flagday
    ...((currentFlagDay || currentChangingFlagDay) && flagTemplate),
  };

  return template;
};

export default todayTemplate;
