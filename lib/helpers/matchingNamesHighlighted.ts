// Import interfaces
import { INames } from '../interfaces/INames';
import { IUsers } from '../interfaces/IUsers';

const matchingNamesHighlighted = (todaysNames: INames[], slackUsers: IUsers[]) => {
  // List of usernames from Airtable
  const realNames = slackUsers.map((user: IUsers) => user.realName);

  const highlighted: string[] = [];
  // Loop all namedays and if there is a match with usernames from Airtable highlight name
  todaysNames.forEach((nameDay: INames, i) => {
    if (realNames.includes(nameDay.toString())) {
      highlighted[i] = `*${nameDay}*`;
    } else {
      highlighted[i] = nameDay.toString();
    }
  });

  // Commaseparete returned result as string
  return highlighted.join(', ');
};

module.exports = matchingNamesHighlighted;
