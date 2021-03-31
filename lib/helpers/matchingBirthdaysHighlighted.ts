// Import interfaces
import { IUsers } from '../interfaces/IUsers';

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentDateNumber = currentDate.getDate();

const matchingBirthdaysHighlighted = (slackUsers: IUsers[]) => {
  // List of usernames from Airtable
  const matchingBirthdays = slackUsers.filter((user: IUsers) => {
    if ((user.birthdayDay === currentDateNumber) && (user.birthdayMonth === currentMonth)) {
      return user;
    }
  });

  return matchingBirthdays;

};

module.exports = matchingBirthdaysHighlighted;
