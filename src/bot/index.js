import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import * as handlers from './handlers/index.js';
import logger from './models/logger.js';
import * as commands from './commands/index.js';
import * as db from '../database/db.js';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

setInterval(() => db.saveDatabase(), 5 * 1000);

bot.onText(/\/start/, commands.start(bot));
bot.onText(/\/stop/, commands.stop(bot));
bot.onText(/\/play/, commands.play(bot));
bot.onText(/\/rules/, commands.rules(bot));

bot.on('message', handlers.messageHandler(bot));

bot.on('callback_query', handlers.callbackHandler(bot));

logger.debug("BOT", "Has been started!");