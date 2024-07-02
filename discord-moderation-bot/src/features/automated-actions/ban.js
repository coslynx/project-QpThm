const Discord = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a user from the server',
  execute(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('You do not have permission to use this command');
    }

    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: 'Banned by moderator',
          })
          .then(() => {
            message.reply(`${user.tag} has been banned`);
          })
          .catch((err) => {
            message.reply('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.reply('That user is not in this server');
      }
    } else {
      message.reply('You need to mention a user to ban');
    }
  },
};