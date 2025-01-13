import logger from "../models/logger.js";

export const userCards = async (cards, sum) => {
    try {
        return {
            resize_keyboard: true,
            keyboard: [[`❔ Ваши карты:`], [...cards], [`🃏 Сумма: ${sum}`]]
        }
    } catch (error) {
        logger.error("USER_CARDS_KEYBOARD", error);
        return null;
    }
}

export const userMove = async (userId) => {
    try {
        return {
            inline_keyboard: [[{ text: '✋ Взять карту', callback_data: `${userId};takeCard` }], [{ text: '✊ Пасс', callback_data: `${userId};passCard` }]]
        }
    } catch (error) {
        logger.error("USER_MOVE_KEYBOARD", error);
        return null;
    }
}