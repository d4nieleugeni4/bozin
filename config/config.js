module.exports = {
  BOT_CONFIG: {
    TOKEN: '8193776420:AAE0rHpcYxkicl57txUG6e1g1o23aGvMKq0',
    PREFIX: '/',
    VERSION: '1.0.2',
    NAME: 'ZENTRIX',
    USERNAME: '@zentrix01_bot',
    LOG_CHANNEL: '-1001234567890',
    WEBHOOK_URL: 'https://zentrix-3m7s.onrender.com'
  },

  OWNER: {
    ID: '6037121105',
    USERNAME: '@D4NIEL_EUGENIA',
    NAME: 'Daniel',
  },

  OPTIONS: {
    PROTECTED_COMMANDS: ['status'],
    AUTO_DELETE: true,
    AUTO_DELETE_TIMEOUT: 5000,
  },

  MESSAGES: {
    START: '🤖 Olá! Eu sou um bot Telegram!\nDigite /help para ver meus comandos.',
    HELP: '📚 Lista de comandos disponíveis:\n\n/ping - Testa o bot\n/status - Mostra status',
    ERROR: '❌ Ocorreu um erro!',
    UNAUTHORIZED: '⚠️ Você não tem permissão para usar este comando!',
  }
};
