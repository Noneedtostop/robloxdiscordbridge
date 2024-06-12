const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
  const { message } = req.body;

  // Send message to Discord channel using Discord bot
  axios.post('https://discord.com/api/v9/channels/1250497572120956971/messages', {
    content: message,
  }, {
    headers: {
      'Authorization': `Bot __`,
      'Content-Type': 'application/json'
    }
  })
  .then(() => {
    res.send('Message sent to Discord!');
  })
  .catch((error) => {
    console.error('Error sending message to Discord:', error);
    res.status(500).send('Failed to send message');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
