import { IFlagDays } from "../lib/interfaces/IFlagDays";

// This is the template block for slack message
const namedaysTemplate = (officialNames: string, orthodoxNames: string, swedishNames: string) => {
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '\n\n *Nimipäiväänsä tänään viettävät*',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Suomalaiset nimet:*\n ${officialNames}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Ortodoksiset nimet:*\n ${orthodoxNames}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Ruotsinkieliset nimet:*\n ${swedishNames}`,
      },
    },
  ];

  return blocks;
};

export default namedaysTemplate;
