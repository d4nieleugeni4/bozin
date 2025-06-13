const config = require('../config/config');

module.exports = {
  command: 'status',
  description: 'Mostra o status do bot',
  execute: (ctx) => {
    // Verifica se o usuário é o dono
    if (ctx.message.from.id.toString() !== config.OWNER.ID) {
      return ctx.reply(config.MESSAGES.UNAUTHORIZED);
    }

    const statusMessage = `🤖 ${config.BOT_CONFIG.NAME} Status:\n` +
                         `Versão: ${config.BOT_CONFIG.VERSION}\n` +
                         `Usuário: ${config.BOT_CONFIG.USERNAME}\n` +
                         `Dono: ${config.OWNER.NAME} (${config.OWNER.USERNAME})\n` +
                         `Ping: ${Date.now() - ctx.message.date * 1000}ms\n` +
                         `Status: Operacional ✅`;
    
    ctx.reply(statusMessage);
  }
};
