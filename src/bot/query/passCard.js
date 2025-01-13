import logger from '../models/logger.js';
import * as blackjack from '../services/blackjackService.js';
import * as texts from '../utils/texts.js';

const passCard = (bot, user) => async (query) => {
    try {
        if (user.userPassed) return bot.answerCallbackQuery(query.id, { text: 'Вы уже пассовали', show_alert: false });
        if (user.gameStarted == false) return bot.answerCallbackQuery(query.id, { text: 'Игра еще не началась', show_alert: false });
        user.userPassed = true;
        await bot.sendMessage(user.id, '<b>🙅 Вы пассовали</b>', { parse_mode: 'HTML' });

        let text = ``;
        while (true) {
            var dealerMove = await blackjack.dealerMove(user);
            text += texts.gameDealerText(user, dealerMove);
            if (dealerMove.dealerPassed) break;
            text += "---\n\n";
        }

        await bot.sendMessage(user.id,
            text,
            { parse_mode: 'HTML' }
        );

        const gameEndText = await texts.gameEndText(user);
        await bot.sendMessage(user.id, gameEndText, { parse_mode: 'HTML', reply_markup: { keyboard: [] } });

        user.gameStarted = false;
        user.userPassed = false;
        user.dealerPassed = false;
        user.move = 0;
        user.cards = { player: [], dealer: [], deck: [] };
    } catch (error) {
        logger.error("passCard", error);
    }
}

export { passCard };