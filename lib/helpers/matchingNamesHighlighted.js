const matchingNamesHighlighted = (todaysNames, slackUsers) => {
  // List of usernames from Airtable
  const realNames = slackUsers.records.map((user) => user.realName);

  const highlighted = [];
  // Loop all namedays and if there is a match with usernames from Airtable highlight name
  todaysNames.forEach((nameDay, i) => {
    if (realNames.includes(nameDay)) {
      highlighted[i] = `*${nameDay}*`;
    } else {
      highlighted[i] = nameDay;
    }
  });

  // Commaseparete returned result as string
  return highlighted.join(', ');
};

module.exports = matchingNamesHighlighted;
