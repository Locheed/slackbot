import { IFlagDays } from "../lib/interfaces/IFlagDays";

// This is the template block for slack message
const birthdaysTemplate = (birthdays: string | undefined = ' ') => {
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '\n\n *Syntymäpäiväänsä tänään viettävät*',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${birthdays}`,
      },
    },

  ];

  return blocks;
};

export default birthdaysTemplate;
