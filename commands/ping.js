const config = require('../config/config');

module.exports = {
  command: 'ping',
  description: 'Testa a resposta do bot',
  execute: (ctx) => {
    const startTime = Date.now();
    
    ctx.reply('🏓 Pong!').then(() => {
      const latency = Date.now() - startTime;
      ctx.reply(`⏱ Latência: ${latency}ms\n` +
                `🤖 Bot: ${config.BOT_CONFIG.NAME}\n` +
                `🛠 Versão: ${config.BOT_CONFIG.VERSION}`);
    }).catch(error => {
      console.error('Erro ao responder ping:', error);
      ctx.reply(config.MESSAGES.ERROR);
    });
  }
};
