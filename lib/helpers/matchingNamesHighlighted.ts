import { INames } from '../interfaces/INames';

const matchingNamesHighlighted = (todaysNames: INames[], slackUsers:object[]) => {
  // List of usernames from Airtable
  const realNames = slackUsers.map((user: any) => user.realName);

  const highlighted: string[] = [];
  // Loop all namedays and if there is a match with usernames from Airtable highlight name
  todaysNames.forEach((nameDay: INames, i: number) => {
    if (realNames.includes(nameDay)) {
      highlighted[i] = `*${nameDay}*`;
    } else {
      highlighted[i] = nameDay.toString();
    }
  });

  // Commaseparete returned result as string
  return highlighted.join(', ');
};

module.exports = matchingNamesHighlighted;
