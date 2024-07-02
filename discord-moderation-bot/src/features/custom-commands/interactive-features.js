const { Client, Message } = require('discord.js');
const { createCommand } = require('../custom-commands/create-command');

/**
 * Function to handle interactive features for the discord moderation bot.
 * @param {Client} client - The discord client.
 * @param {Message} message - The message triggering the interactive feature.
 */
const handleInteractiveFeatures = (client, message) => {
    if (message.content.startsWith('!createcommand')) {
        createCommand(client, message);
    }
};

module.exports = {
    handleInteractiveFeatures,
};