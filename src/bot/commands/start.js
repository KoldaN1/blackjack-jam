import logger from '../models/logger.js';

const start = (bot) => async (msg) => {
    try {
        const chatId = msg.chat.id;

        return bot.sendMessage(chatId,
            `♠️ Welcome to <b>Blackjack</b>\n\n` +
            `<blockquote>Готовы сыграть в классическую карточную игру, где ваша задача - набрать 21 очко?</blockquote>\n\n` +
            `<b>Сыграть?</b> /play\n\n` +
            `<b>Правила?</b> /rules\n\n` +
            `/start`,
            { parse_mode: 'HTML' });
    } catch (error) {
        logger.error("start", error);
    }
}

export { start };