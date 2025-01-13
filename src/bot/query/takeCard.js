import logger from '../models/logger.js';
import * as blackjack from '../services/blackjackService.js';
import * as keyboards from '../utils/keyboards.js';
import * as texts from '../utils/texts.js';

const takeCard = (bot, user) => async (query) => {
    try {
        if (user.userPassed) return bot.answerCallbackQuery(query.id, { text: 'Вы уже пассовали', show_alert: false });
        if (user.gameStarted == false) return bot.answerCallbackQuery(query.id, { text: 'Игра еще не началась', show_alert: false });
        if (user.cards.player.length >= 5) return bot.answerCallbackQuery(query.id, { text: 'Вы уже достигли лимита карт', show_alert: false });
        if (blackjack.getSum(user.cards.player) > 21) return bot.answerCallbackQuery(query.id, { text: 'У вас перебор карт.\nВы не можете взять новую карту!', show_alert: true });
        const userMove = await blackjack.userMove(user);

        await bot.sendMessage(user.id, `<i>🎴 Вы вытягиваете карту:</i> [ <b>${userMove.card}</b> ]`, {
            parse_mode: 'HTML',
            reply_markup: await keyboards.userCards(userMove.userCards, userMove.userSum)
        })

        const moveMessage = await bot.sendMessage(user.id, `<b>Ход ${userMove.move}</b> - Ходит диллер:\n\n<i>⏳ Ожидание хода диллера...</i>`, { parse_mode: 'HTML' });

        setTimeout(async () => {
            try {
                const dealerMove = await blackjack.dealerMove(user);
                const dealerAction = dealerMove ? dealerMove.card ? 'Диллер взял карту' : 'Диллер решил пассануть' : 'Диллер уже пассанул';

                await bot.editMessageText(moveMessage.text + `\n\n✅ <b>${dealerAction}</b>`,
                    { parse_mode: 'HTML', chat_id: user.id, message_id: moveMessage.message_id }
                );

                await bot.sendMessage(user.id, texts.gameText(user, userMove), {
                    parse_mode: 'HTML',
                    reply_markup: await keyboards.userMove(user.id)
                });
            } catch (error) {
                logger.error("takeCard", error);
            }
        }, user.dealerPassed ? 0 : 1500);
    } catch (error) {
        logger.error("takeCard", error);
    }
}

export { takeCard };