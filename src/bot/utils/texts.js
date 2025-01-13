import logger from "../models/logger.js";
import * as blackjack from "../services/blackjackService.js";

export const gameText = (user, gameInfo) => {
    try {
        return (
            `<b>Ход ${user.move}</b> - Вы ходите:\n\n` +
            `❔ Ваши карты: <b>${gameInfo.userCards.join(', ')}</b>\n` +
            `🃏 Сумма: <b>${gameInfo.userSum}${gameInfo.userSum > 21 ? ' (☑️ Перебор)' : ''}</b>\n\n` +
            `<i>Что будете делать?</i>`
        )
    } catch (error) {
        logger.error("gameText", error);
    }
}

export const gameDealerText = (user, gameInfo) => {
    try {
        if (!gameInfo) return;
        return (
            `<b>Ход ${user.move}</b> - Ходит диллер:\n\n` +
            `✅ ${gameInfo.card ? `Диллер вытягивает карту: ${gameInfo.card}` : 'Диллер пассанул...'}\n\n` +
            `❔ Карты диллера: <b>${gameInfo.dealerCards.join(', ')}</b>\n` +
            `🃏 Сумма: <b>${gameInfo.dealerSum}${gameInfo.dealerSum > 21 ? ' (☑️ Перебор)' : ''}</b>\n\n`
        )
    } catch (error) {
        logger.error("gameDealerText", error);
    }
}

export const gameEndText = async (user) => {
    try {
        const userSum = await blackjack.getSum(user.cards.player);
        const dealerSum = await blackjack.getSum(user.cards.dealer);
        const userCards = user.cards.player.map((card) => card.name);
        const dealerCards = user.cards.dealer.map((card) => card.name);

        let result = "";
        if (userSum > dealerSum) result = '🏆 Вы победили!';
        if (userSum < dealerSum) result = '☠️ Вы проиграли!';
        if (dealerSum > 21) result = '🏆 Вы победили!';
        if (userSum > 21) result = '☠️ Вы проиграли!';
        if (userSum > 21 && dealerSum > 21) result = '⚔️ Ничья!';

        return (
            `<b>Игра завершена</b>\n\n` +
            `❔ Ваши карты: <b>${userCards.join(', ')}</b>\n` +
            `🃏 Сумма: <b>${userSum}${userSum > 21 ? ' (☑️ Перебор)' : ''}</b>\n\n` +
            `❔ Карты диллера: <b>${dealerCards.join(', ')}</b>\n` +
            `🃏 Сумма: <b>${dealerSum}${dealerSum > 21 ? ' (☑️ Перебор)' : ''}</b>\n\n` +
            `Результат: <b>${result}</b>\n\n` +
            `/play`
        )
    } catch (error) {
        logger.error("gameEndText", error);
    }
}