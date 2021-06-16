import Airtable  from 'airtable';
import { DateTime } from 'luxon';
import { IEmoji } from './interfaces/IEmoji';
import { IFlagDays } from './interfaces/IFlagDays';
import { IUsers } from './interfaces/IUsers';
import { INotification } from './interfaces/INotification';

// Get the current date by local timezone
const currentDate = DateTime.now().setLocale('fi');

const dayNumber = currentDate.day;
const monthNumber = currentDate.month;
const yearNumber = currentDate.year;

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY}).base(<string>process.env.AIRTABLE_BASE);

const tableFlagDays = base('Flag days');
const tableChangingFlagDays = base('Flag days changing');
const tableEmojis = base('Emoji date');
const tableUsers = base('Slack Users');
const notifications = base('Notifications');

const getFlagDaysByDate = async (): Promise<IFlagDays[]> => {
  try {
    const records = await tableFlagDays
      .select({
        view: 'Grid view',
        filterByFormula: `AND({Day} = ${dayNumber},  {Month} = ${monthNumber})`,
      })
      .firstPage();
      // Instead of a Record[] return only fields of type IFlagDays
    return records.map((record): IFlagDays => record.fields);
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getChangingFlagDaysByDate = async (): Promise<IFlagDays[]> => {
  try {
    const records = await tableChangingFlagDays
      .select({
        view: 'Grid view',
        filterByFormula: `AND({Day} = ${dayNumber},  {Month} = ${monthNumber})`,
      })
      .firstPage();

    // Instead of a Record[] return only fields of type IFlagDays
    return records.map((record): IFlagDays => record.fields);
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getEmojiByDate = async () : Promise<IEmoji[]> => {
  try {
    const records = await tableEmojis
      .select({
        view: 'Grid view',
        filterByFormula: `AND({Day} = ${dayNumber},  {Month} = ${monthNumber}, {Year} = ${yearNumber})`,
      })
      .firstPage();

    // Instead of a Record[] return only fields of type IEmoji
    return records.map((record): IEmoji => record.fields);

  } catch (err) {
    console.log(err);
    return [];
  }
};

const getNotificationsByDate = async () : Promise<INotification[]> => {
  try {
    const records = await notifications
      .select({
        view: 'Grid view',
        filterByFormula: `IF({Type} = 'By date', AND({Date} = ${currentDate}))`,
      })
      .firstPage();

    // Instead of a Record[] return only fields of type IEmoji
    return records.map((record): INotification => record.fields);

  } catch (err) {
    console.log(err);
    return [];
  }
};

const getSlackUsers = async (): Promise<IUsers[]> => {
  try {
    const records = await tableUsers
      .select({
        view: 'Grid view',
      })
      .firstPage();

    // Instead of a Record[] return only fields of type IUsers
    return records.map((record): IUsers => record.fields) ;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export  {
  getFlagDaysByDate,
  getChangingFlagDaysByDate,
  getEmojiByDate,
  getSlackUsers,
  getNotificationsByDate,
};
