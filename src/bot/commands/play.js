import logger from '../models/logger.js';
import * as blackjack from '../services/blackjackService.js';
import * as db from '../../database/db.js';
import * as keyboards from '../utils/keyboards.js';
import * as texts from '../utils/texts.js';

const play = (bot) => async (msg) => {
    try {
        const userId = msg.from.id;
        const user = await db.getUser(userId);

        if (!user) return;
        if (user.gameStarted) return bot.sendMessage(userId, '<b>Вы уже в партии!</b>\n\n<i>Хотите закончить игру?</i> /stop', { parse_mode: 'HTML' });

        const gameInfo = await blackjack.start(user);

        await bot.sendMessage(userId, '<i>🃏 Игра начинается...</i>', {
            parse_mode: 'HTML',
            reply_markup: await keyboards.userCards(gameInfo.userCards, gameInfo.userSum),
        });

        return bot.sendMessage(userId, texts.gameText(user, gameInfo),
            { parse_mode: 'HTML', reply_markup: await keyboards.userMove(userId) }
        );
    } catch (error) {
        logger.error("play", error);
    }
}

export { play };