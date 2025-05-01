
const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === 'serena2025') {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/', async (req, res) => {
  try {
    await axios.post('https://hook.us2.make.com/vt7bxda3obrur71xlyxfg027p0or4yql', req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao encaminhar para Make:', error.message);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
