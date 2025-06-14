const pingCommand = require('./ping');
const statusCommand = require('./status');
const profileCommand = require('./profile');
const tiktokCommand = require('./tiktok'); // Novo comando
const config = require('../config/config');

// Lista todos os comandos disponíveis
const allCommands = {
  [pingCommand.command]: pingCommand,
  [statusCommand.command]: statusCommand,
  [profileCommand.command]: profileCommand,
  [tiktokCommand.command]: tiktokCommand // Adiciona o novo comando
};

// Gera a mensagem de ajuda dinamicamente
function generateHelpMessage() {
  let helpText = `${config.MESSAGES.HELP}\n\n`;
  
  for (const [name, cmd] of Object.entries(allCommands)) {
    helpText += `${config.BOT_CONFIG.PREFIX}${name} - ${cmd.description}\n`;
  }
  
  return helpText;
}

// Atualiza a mensagem de ajuda no config
config.MESSAGES.HELP = generateHelpMessage();

module.exports = allCommands;
