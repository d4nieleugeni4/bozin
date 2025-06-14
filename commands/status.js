const config = require('../config/config');

module.exports = {
  command: 'status',
  description: 'Mostra o status do bot',
  execute: (ctx) => {
    // Verifica se o usuário é o dono
    if (ctx.message.from.id.toString() !== config.OWNER.ID) {
      return ctx.reply(config.MESSAGES.UNAUTHORIZED);
    }

    const startTime = Date.now();
    
    ctx.reply('🔄 Verificando status...').then((sentMessage) => {
      const latency = Date.now() - startTime;
      const statusMessage = `🤖 ${config.BOT_CONFIG.NAME} Status:\n` +
                           `Versão: ${config.BOT_CONFIG.VERSION}\n` +
                           `Usuário: ${config.BOT_CONFIG.USERNAME}\n` +
                           `Dono: ${config.OWNER.NAME} (${config.OWNER.USERNAME})\n` +
                           `Ping: ${latency}ms\n` +
                           `Status: Operacional ✅`;
      
      // Edita a mensagem anterior com o status completo
      ctx.bot.editMessageText(statusMessage, {
        chat_id: sentMessage.chat.id,
        message_id: sentMessage.message_id
      });
    }).catch(error => {
      console.error('Erro ao responder status:', error);
      ctx.reply(config.MESSAGES.ERROR);
    });
  }
};
