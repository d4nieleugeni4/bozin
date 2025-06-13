module.exports = {
  // Configurações básicas do bot
  BOT_CONFIG: {
    TOKEN: '8193776420:AAE0rHpcYxkicl57txUG6e1g1o23aGvMKq0',       // Token do bot
    PREFIX: '/',                          // Prefixo dos comandos
    VERSION: '1.0.0',                     // Versão do bot
    NAME: 'ZENTRIX',                       // Nome do bot
    USERNAME: '@zentrix01_bot',         // @username do bot
    LOG_CHANNEL: '-1001234567890',        // ID do canal para logs (opcional)
  },
  
  // Configurações do dono
  OWNER: {
    ID: '123456789',                      // Seu ID do Telegram
    USERNAME: '@seu_username',            // Seu @username
    NAME: 'Seu Nome',                     // Seu nome
  },
  
  // Configurações de funcionamento
  OPTIONS: {
    PROTECTED_COMMANDS: ['status'],       // Comandos restritos
    AUTO_DELETE: true,                    // Auto-delete mensagens
    AUTO_DELETE_TIMEOUT: 5000,            // Tempo em ms
  },
  
  // Mensagens padrão
  MESSAGES: {
    START: '🤖 Olá! Eu sou um bot Telegram!\nDigite /help para ver meus comandos.',
    HELP: '📚 Lista de comandos disponíveis:\n\n/ping - Testa o bot\n/status - Mostra status',
    ERROR: '❌ Ocorreu um erro!',
    UNAUTHORIZED: '⚠️ Você não tem permissão para usar este comando!',
  }
};
