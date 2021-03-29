// Import interfaces
import { IUsers } from '../interfaces/IUsers';

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentDateNumber = currentDate.getDate();

const matchingBirthdaysHighlighted = (slackUsers: IUsers[]) => {
  // List of usernames from Airtable
  const matchingBirthdays = slackUsers.map((user: IUsers) => {
    if (user.birthdayDay === currentDateNumber && user.birthdayMonth === currentMonth) {
      return user;
    }
  });

  if (!matchingBirthdays) return '';

  let highlighted: string[] = [];
  // Loop all namedays and if there is a match with usernames from Airtable highlight name
  highlighted = matchingBirthdays.map((user: IUsers, i): string => {

      return highlighted[i] = `Paljon onnea, <@${user.slackID}>!\n\n`;

  });

  // Commaseparete returned result as string
  return highlighted.join(', ');
};

module.exports = matchingBirthdaysHighlighted;
