const config = require('../config/config');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m'
};

const getTimestamp = () => {
  return new Date().toLocaleTimeString();
};

const log = (message, type = 'log') => {
  const types = {
    log: { color: colors.cyan, prefix: 'INFO' },
    error: { color: colors.red, prefix: 'ERROR' },
    warn: { color: colors.yellow, prefix: 'WARN' },
    success: { color: colors.green, prefix: 'SUCCESS' },
    debug: { color: colors.magenta, prefix: 'DEBUG' }
  };

  const { color, prefix } = types[type] || types.log;
  
  console.log(
    `${colors.blue}[${getTimestamp()}] ${color}[${prefix}]${colors.reset}` +
    ` ${color}${message}${colors.reset}`
  );
};

module.exports = {
  log: (message) => log(message, 'log'),
  error: (message) => log(message, 'error'),
  warn: (message) => log(message, 'warn'),
  success: (message) => log(message, 'success'),
  debug: (message) => log(message, 'debug'),
  
  // Log especial para comandos executados
  command: (username, command) => {
    log(`${colors.white}@${username} executou: ${command}`, 'debug');
  },
  
  // Log de inicialização do bot
  startup: (botName, version) => {
    console.log('\n' + colors.cyan + '='.repeat(50));
    log(`${botName} v${version}`, 'success');
    console.log(colors.cyan + '='.repeat(50) + colors.reset + '\n');
  }
};
