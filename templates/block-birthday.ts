import { IUsers } from "../lib/interfaces/IUsers";

const imageTemplate = (user: IUsers) => {
  return {
    accessory: {
      type: 'image',
      image_url: user.image ? `https://res.cloudinary.com/${process.env.CLOUDINARY_ID}/image/fetch/${user.image}` : `https://res.cloudinary.com/${process.env.CLOUDINARY_ID}/image/upload/v1617216470/birthday-cake_qnocyk.png`,
      alt_text: 'Paljon onnea',
    },
  }
};


const template = (birthdays: IUsers[]) => {
  return birthdays.map((user: IUsers) => {
    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `\n\n *Syntymäpäiväänsä tänään viettää:*
        Paljon onnea <@${user.slackID}>! :cake:`,
      },
      ...imageTemplate(user)
    }

  });
}

// This is the template block for slack message
const birthdaysTemplate = (birthdays: IUsers[]) => {

  const blocks = [
    ...template(birthdays),
    {
      type: 'divider',
    },
  ];

  return blocks;
};

export default birthdaysTemplate;
