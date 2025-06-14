const express = require('express');
const TelegramService = require('./services/telegramService');
const logger = require('./utils/logger');
const config = require('./config/config');

process.title = `${config.BOT_CONFIG.NAME}_Bot`;

(async () => {
  const app = express();
  app.use(express.json());

  const telegramService = new TelegramService();

  app.post('/webhook', telegramService.getWebhookCallback());

  app.get('/', (req, res) => res.send('✅ Bot online via webhook!'));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    logger.log(`Servidor rodando na porta ${PORT}`);

    const webhookUrl = `${process.env.WEBHOOK_URL}/webhook`;
    await telegramService.setWebhook(webhookUrl);
    await telegramService.showStartupInfo();
  });

  process.on('SIGINT', () => {
    logger.log('\nDesligando o bot...');
    process.exit(0);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.stack}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });
})();
