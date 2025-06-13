const logger = require('./utils/logger');
const TelegramService = require('./services/telegramService');
const config = require('./config/config');

process.title = `${config.BOT_CONFIG.NAME}_Bot`;

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.stack}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

try {
  logger.log(`Iniciando ${config.BOT_CONFIG.NAME} v${config.BOT_CONFIG.VERSION}...`);
  new TelegramService();
  
  // Evento de desligamento gracioso
  process.on('SIGINT', () => {
    logger.log('\nDesligando o bot...');
    process.exit(0);
  });
} catch (error) {
  logger.error(`Falha crítica ao iniciar o bot: ${error.stack}`);
  process.exit(1);
}
