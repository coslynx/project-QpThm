const { Client } = require('discord.js');

const client = new Client();

client.on('message', async message => {
  if (message.content.startsWith('!kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        try {
          await member.kick();
          message.channel.send(`${user.tag} has been kicked.`);
        } catch (error) {
          console.error(error);
          message.channel.send('I was unable to kick the member.');
        }
      } else {
        message.channel.send('That user is not in this server.');
      }
    } else {
      message.channel.send('You didn't mention the user to kick.');
    }
  }
});

client.login('your-bot-token-here');