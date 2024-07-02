const Discord = require('discord.js');
const { google } = require('googleapis');

const client = new Discord.Client();
const languageApi = google.language({ version: 'v1' });

client.on('message', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!analyze')) {
    const text = message.content.slice(9);

    const analyzeParams = {
      document: {
        content: text,
        type: 'PLAIN_TEXT',
      },
    };

    try {
      const analysis = await languageApi.documents.analyzeSentiment(analyzeParams);
      
      let response = '';
      response += `Sentiment Score: ${analysis.data.documentSentiment.score}\n`;
      response += `Sentiment Magnitude: ${analysis.data.documentSentiment.magnitude}\n`;

      message.channel.send(response);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      message.channel.send('Error analyzing sentiment. Please try again later.');
    }
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN');