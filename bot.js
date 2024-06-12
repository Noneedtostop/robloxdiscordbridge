const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

app.post('/send-message', (req, res) => {
  const { message } = req.body;

  const channel = client.channels.cache.get('YOUR_CHANNEL_ID');
  if (channel) {
    channel.send(message)
      .then(() => {
        res.send('Message sent to Discord!');
      })
      .catch((error) => {
        console.error('Error sending message to Discord:', error);
        res.status(500).send('Failed to send message');
      });
  } else {
    res.status(404).send('Channel not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

client.login('Token');
