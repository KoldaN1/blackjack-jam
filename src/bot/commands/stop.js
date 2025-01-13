import logger from '../models/logger.js';
import * as db from '../../database/db.js';

const stop = (bot) => async (msg) => {
    try {
        const user = await db.getUser(msg.from.id);
        if (!user) return;

        if (!user.gameStarted) return bot.sendMessage(msg.from.id, '<b>Игра еще не началась</b>\n\n<i>Начать новую?</i> /play', { parse_mode: 'HTML' });

        user.gameStarted = false;
        user.userPassed = false;
        user.dealerPassed = false;
        user.move = 0;
        user.cards = { player: [], dealer: [], deck: [] };

        return bot.sendMessage(msg.from.id, '<b>Игра завершена</b>\n\n<i>Начать новую?</i> /play', { parse_mode: 'HTML' });
    } catch (error) {
        logger.error("start", error);
    }
}

export { stop };