const Discord = require('discord.js');

class VotingSystem {
  constructor(client) {
    this.client = client;
    this.votes = new Map();
  }

  startVote(voteMessage, options) {
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Voting System')
      .setDescription(voteMessage)
      .addFields(
        options.map((option, index) => {
          return { name: `${index + 1}. ${option}`, value: '\u200B' };
        })
      );

    const channel = this.client.channels.cache.get('your_channel_id');
    if (!channel) return;

    channel.send(embed).then((message) => {
      options.forEach((_, index) => {
        message.react(`${index + 1}\u20e3`);
      });

      this.votes.set(message.id, {
        options,
        votes: new Array(options.length).fill(0),
      });
    });
  }

  handleReaction(reaction, user, add) {
    if (user.bot) return;

    const message = reaction.message;
    const vote = this.votes.get(message.id);

    if (!vote) return;

    const optionIndex = parseInt(reaction.emoji.name) - 1;
    if (isNaN(optionIndex) || optionIndex < 0 || optionIndex >= vote.options.length) return;

    const member = message.guild.members.cache.get(user.id);
    if (!member) return;

    if (add) {
      vote.votes[optionIndex]++;
    } else {
      vote.votes[optionIndex]--;
    }
  }

  endVote(messageId) {
    const message = this.client.channels.cache.get('your_channel_id').messages.cache.get(messageId);
    if (!message) return;

    const vote = this.votes.get(messageId);
    if (!vote) return;

    const winnerIndex = vote.votes.indexOf(Math.max(...vote.votes));
    const winner = vote.options[winnerIndex];

    message.channel.send(`The winner is: ${winner}`);
    this.votes.delete(messageId);
  }
}

module.exports = VotingSystem;