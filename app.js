const express = require('express');
const config = require('./config/config');
const TelegramService = require('./services/telegramService');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

// Inicia o bot (isso registra o webhook internamente)
const telegramService = new TelegramService();

// Cria endpoint que o Telegram usará
app.post(`/bot${config.BOT_CONFIG.TOKEN}`, (req, res) => {
  telegramService.bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  logger.log(`Servidor rodando na porta ${port}`);
});
