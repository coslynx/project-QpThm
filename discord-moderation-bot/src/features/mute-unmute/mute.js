const Discord = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Mute a user in the server',
  execute(message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.channel.send('You do not have permission to use this command.');
    }

    const target = message.mentions.users.first();
    if (!target) {
      return message.channel.send('User not found. Please mention a user to mute.');
    }

    const mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

    const member = message.guild.members.cache.get(target.id);

    if (!args[1]) {
      member.roles.add(muteRole.id);
      member.roles.remove(mainRole.id);
      message.channel.send(`<@${member.user.id}> has been muted.`);
    } else {
      const time = parseInt(args[1]);
      if (isNaN(time)) {
        return message.channel.send('Please provide a valid duration in minutes.');
      }

      member.roles.add(muteRole.id);
      member.roles.remove(mainRole.id);
      message.channel.send(`<@${member.user.id}> has been muted for ${time} minutes.`);

      setTimeout(() => {
        member.roles.remove(muteRole.id);
        member.roles.add(mainRole.id);
        message.channel.send(`<@${member.user.id}> has been unmuted after ${time} minutes.`);
      }, time * 60000);
    }
  },
};