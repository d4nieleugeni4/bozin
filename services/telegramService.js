const Telegram = require('node-telegram-bot-api');
const config = require('../config/config');
const commands = require('../commands');
const logger = require('../utils/logger');

class TelegramService {
  constructor() {
    this.bot = new Telegram(config.BOT_CONFIG.TOKEN, { 
      polling: true,
      request: {
        timeout: 60000
      }
    });
    
    this.registerMiddlewares();
    this.registerCommands();
    this.registerEvents();
    this.showStartupInfo();
  }

  showStartupInfo() {
    logger.startup(config.BOT_CONFIG.NAME, config.BOT_CONFIG.VERSION);
    logger.log(`Bot iniciado como @${this.bot.getMe().username}`);
    logger.log(`Dono: ${config.OWNER.NAME} (${config.OWNER.USERNAME})`);
    logger.success(`Pronto para receber comandos! Prefixo: ${config.BOT_CONFIG.PREFIX}`);
  }

  registerMiddlewares() {
    // Middleware para log de comandos
    this.bot.on('message', (msg) => {
      if (msg.text && msg.text.startsWith(config.BOT_CONFIG.PREFIX)) {
        const username = msg.from.username || msg.from.first_name;
        logger.command(username, msg.text.split(' ')[0]);
      }
    });
  }

  registerCommands() {
    for (const [commandName, command] of Object.entries(commands)) {
      const regex = new RegExp(`^\\${config.BOT_CONFIG.PREFIX}${commandName}(?:@${this.bot.getMe().username})?$`);
      
      this.bot.onText(regex, async (msg) => {
        const chatId = msg.chat.id;
        
        try {
          // Verificação de comandos protegidos
          if (config.OPTIONS.PROTECTED_COMMANDS.includes(commandName) && 
              msg.from.id.toString() !== config.OWNER.ID) {
            return this.bot.sendMessage(chatId, config.MESSAGES.UNAUTHORIZED);
          }
          
          // Executa o comando
          await command.execute({
            reply: (text, options) => this.bot.sendMessage(chatId, text, options),
            message: msg,
            bot: this.bot
          });
          
          // Auto-delete se configurado
          if (config.OPTIONS.AUTO_DELETE) {
            setTimeout(() => {
              this.bot.deleteMessage(chatId, msg.message_id).catch(e => {});
            }, config.OPTIONS.AUTO_DELETE_TIMEOUT);
          }
        } catch (error) {
          logger.error(`Erro no comando ${commandName}: ${error.stack}`);
          this.bot.sendMessage(chatId, config.MESSAGES.ERROR);
        }
      });
    }
  }

  registerEvents() {
    // Comandos padrão
    this.bot.onText(/^\/start$/, (msg) => {
      this.bot.sendMessage(msg.chat.id, config.MESSAGES.START);
    });

    this.bot.onText(/^\/help$/, (msg) => {
      this.bot.sendMessage(msg.chat.id, config.MESSAGES.HELP, {
        parse_mode: 'Markdown'
      });
    });

    // Tratamento de erros
    this.bot.on('polling_error', (error) => {
      logger.error(`Polling error: ${error.message}`);
    });

    this.bot.on('webhook_error', (error) => {
      logger.error(`Webhook error: ${error.message}`);
    });

    // Log de eventos
    this.bot.on('new_chat_members', (msg) => {
      logger.log(`Novo membro no chat ${msg.chat.title}: ${msg.new_chat_members.map(u => u.username).join(', ')}`);
    });
  }
}

module.exports = TelegramService;
