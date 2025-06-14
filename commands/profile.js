const config = require('../config/config');

module.exports = {
  command: 'profile',
  description: 'Mostra informações do seu perfil',
  execute: async (ctx) => {
    try {
      const user = ctx.message.from;
      
      // Formata os dados do usuário
      const profileInfo = `
👤 *Seu Perfil*:

🆔 *ID*: \`${user.id}\`
👤 *Nome*: ${user.first_name}${user.last_name ? ' ' + user.last_name : ''}
🔖 *Username*: ${user.username ? '@' + user.username : 'Não definido'}
📅 *Conta criada em*: ${new Date(user.date * 1000).toLocaleDateString()}
      `;

      // Envia a resposta
      await ctx.reply(profileInfo, {
        parse_mode: 'Markdown'
      });

    } catch (error) {
      console.error('Erro no comando profile:', error);
      await ctx.reply(config.MESSAGES.ERROR);
    }
  }
};
