const config = require('../config/config');

module.exports = {
  command: 'profile',
  description: 'Mostra informações do seu perfil',
  execute: async (ctx) => {
    try {
      const user = ctx.message.from;
      const chat = ctx.message.chat;
      
      // Formata os dados do usuário
      const profileInfo = `
👤 *Informações do Perfil*:

🆔 *ID*: \`${user.id}\`
👤 *Nome*: ${user.first_name}${user.last_name ? ' ' + user.last_name : ''}
🔖 *Username*: ${user.username ? '@' + user.username : 'Não definido'}
📝 *Bio*: ${user.bio || 'Não disponível'}

💬 *Chat*:
🆔 *ID do Chat*: \`${chat.id}\`
🏷 *Tipo*: ${chat.type}
📛 *Título*: ${chat.title || 'Chat privado'}
      `;

      // Envia a foto de perfil junto com as informações (se disponível)
      if (user.photo) {
        try {
          const photos = await ctx.bot.getUserProfilePhotos(user.id);
          if (photos.total_count > 0) {
            const fileId = photos.photos[0][0].file_id;
            return ctx.bot.sendPhoto(ctx.message.chat.id, fileId, {
              caption: profileInfo,
              parse_mode: 'Markdown'
            });
          }
        } catch (e) {
          console.error('Erro ao obter foto de perfil:', e);
        }
      }

      // Se não tiver foto ou ocorrer erro, envia apenas o texto
      ctx.reply(profileInfo, {
        parse_mode: 'Markdown'
      });

    } catch (error) {
      console.error('Erro no comando profile:', error);
      ctx.reply(config.MESSAGES.ERROR);
    }
  }
};
