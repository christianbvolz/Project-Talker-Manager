const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const validateLogin = require('./middlewares/validateLogin');
const generateToken = require('./helpers/generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8')
    .then((result) => JSON.parse(result));

  if (!talkers) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(talkers);
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8')
    .then((result) => JSON.parse(result));

  const talker = talkers.find((tal) => tal.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
}));

app.post('/login', validateLogin, (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: generateToken() });
});

app.listen(PORT, () => {
  console.log('Online');
});
