import logger from '../models/logger.js';

const rules = (bot) => async (msg) => {
    try {
        const chatId = msg.chat.id;

        return bot.sendMessage(chatId, `<b>Правила игры:</b>\n\n<a href="https://www.shambalacasino.ru/blog/pravila-igri-v-blekdjek">ТЫК</a>\n\n/start`,
            { parse_mode: 'HTML' });
    } catch (error) {
        logger.error("start", error);
    }
}

export { rules };