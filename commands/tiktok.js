const axios = require('axios');
const config = require('../config/config');

module.exports = {
  command: 'tiktok',
  description: 'Baixa vídeos do TikTok',
  execute: async (ctx) => {
    try {
      const url = ctx.message.text.split(' ')[1];
      
      if (!url) {
        return ctx.reply('⚠️ Por favor, envie o comando seguido da URL do TikTok.\nExemplo: /tiktok https://vm.tiktok.com/abc123');
      }

      // Verifica se é uma URL válida do TikTok
      if (!url.includes('tiktok.com') && !url.includes('vm.tiktok.com')) {
        return ctx.reply('❌ URL inválida. Por favor, envie um link do TikTok.');
      }

      // Mensagem de processamento
      const processingMsg = await ctx.reply('⏳ Processando seu vídeo...');

      // Configuração da API
      const apiUrl = 'https://api.spiderv.com.br/api/downloads/tik-tok';
      const apiKey = 'IXvMBo8BOZIfdQrkQ2co'; // Substitua por sua chave de API

      // Faz a requisição para a API
      const response = await axios.get(`${apiUrl}?url=${encodeURIComponent(url)}&api_key=${apiKey}`);
      
      if (!response.data || !response.data.download_link) {
        throw new Error('Resposta da API inválida');
      }

      // Envia o vídeo para o usuário
      await ctx.bot.sendVideo(ctx.message.chat.id, response.data.download_link, {
        caption: '🎵 Vídeo baixado do TikTok\n🔗 ' + url,
        reply_to_message_id: ctx.message.message_id
      });

      // Deleta a mensagem de processamento
      await ctx.bot.deleteMessage(processingMsg.chat.id, processingMsg.message_id);

      // Auto-delete da mensagem original se configurado
      if (config.OPTIONS.AUTO_DELETE) {
        setTimeout(() => {
          ctx.bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id).catch(() => {});
        }, config.OPTIONS.AUTO_DELETE_TIMEOUT);
      }

    } catch (error) {
      console.error('Erro no comando tiktok:', error);
      ctx.reply('❌ Ocorreu um erro ao baixar o vídeo. Verifique a URL ou tente novamente mais tarde.');
    }
  }
};
