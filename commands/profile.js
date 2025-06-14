const config = require('../config/config');

module.exports = {
  command: 'profile',
  description: 'Mostra informações do seu perfil',
  execute: async (ctx) => {
    try {
      const user = ctx.message.from;
      
      // Formata os dados do usuário (sem Markdown problemático)
      const profileInfo = `
👤 *Seu Perfil*

🆔 ID: \`${user.id}\`
👤 Nome: ${user.first_name}${user.last_name ? ' ' + user.last_name : ''}
🔖 Username: ${user.username ? '@' + user.username : 'Não definido'}
📅 Conta criada em: ${new Date(user.date * 1000).toLocaleDateString('pt-BR')}
      `;

      // Envia a resposta com parse_mode Markdown
      await ctx.reply(profileInfo, {
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      });

    } catch (error) {
      console.error('Erro no comando profile:', error);
      
      // Tenta enviar uma versão simplificada se o Markdown falhar
      try {
        const user = ctx.message.from;
        await ctx.reply(
          `👤 Seu Perfil\n\n` +
          `🆔 ID: ${user.id}\n` +
          `👤 Nome: ${user.first_name}${user.last_name ? ' ' + user.last_name : ''}\n` +
          `🔖 Username: ${user.username ? '@' + user.username : 'Não definido'}`,
          { disable_web_page_preview: true }
        );
      } catch (simpleError) {
        await ctx.reply(config.MESSAGES.ERROR);
      }
    }
  }
};
