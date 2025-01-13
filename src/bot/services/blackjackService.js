import logger from '../models/logger.js';
import deepclone from 'deepclone';
import * as functions from '../utils/functions.js';

const cards = [
    { name: '❤ 2', value: 2 },
    { name: '❤ 3', value: 3 },
    { name: '❤ 4', value: 4 },
    { name: '❤ 5', value: 5 },
    { name: '❤ 6', value: 6 },
    { name: '❤ 7', value: 7 },
    { name: '❤ 8', value: 8 },
    { name: '❤ 9', value: 9 },
    { name: '❤ 10', value: 10 },
    { name: '❤ J', value: 10 },
    { name: '❤ Q', value: 10 },
    { name: '❤ K', value: 10 },
    { name: '❤ A', value: 11 },
    { name: '♠ 2', value: 2 },
    { name: '♠ 3', value: 3 },
    { name: '♠ 4', value: 4 },
    { name: '♠ 5', value: 5 },
    { name: '♠ 6', value: 6 },
    { name: '♠ 7', value: 7 },
    { name: '♠ 8', value: 8 },
    { name: '♠ 9', value: 9 },
    { name: '♠ 10', value: 10 },
    { name: '♠ J', value: 10 },
    { name: '♠ Q', value: 10 },
    { name: '♠ K', value: 10 },
    { name: '♠ A', value: 11 },
    { name: '♣ 2', value: 2 },
    { name: '♣ 3', value: 3 },
    { name: '♣ 4', value: 4 },
    { name: '♣ 5', value: 5 },
    { name: '♣ 6', value: 6 },
    { name: '♣ 7', value: 7 },
    { name: '♣ 8', value: 8 },
    { name: '♣ 9', value: 9 },
    { name: '♣ 10', value: 10 },
    { name: '♣ J', value: 10 },
    { name: '♣ Q', value: 10 },
    { name: '♣ K', value: 10 },
    { name: '♣ A', value: 11 },
    { name: '♦ 2', value: 2 },
    { name: '♦ 3', value: 3 },
    { name: '♦ 4', value: 4 },
    { name: '♦ 5', value: 5 },
    { name: '♦ 6', value: 6 },
    { name: '♦ 7', value: 7 },
    { name: '♦ 8', value: 8 },
    { name: '♦ 9', value: 9 },
    { name: '♦ 10', value: 10 },
    { name: '♦ J', value: 10 },
    { name: '♦ Q', value: 10 },
    { name: '♦ K', value: 10 },
    { name: '♦ A', value: 11 },
];

export const start = async (user) => {
    try {
        if (!user || user.gameStarted) return null;
        user.gameStarted = true;
        user.move = 1;
        user.cards.deck = deepclone(cards);

        const userCards = user.cards.player;
        const dealerCards = user.cards.dealer;

        for (let i = 0; i < 2; i++) {
            await addCard(user, userCards);
            await addCard(user, dealerCards);
        }

        return {
            userCards: userCards.map((card) => card.name),
            dealerCards: dealerCards.map((card) => card.name),
            userSum: getSum(userCards),
            dealerSum: getSum(dealerCards)
        };
    } catch (error) {
        logger.error("blackjackStart", error);
        return null;
    }
}

export const addCard = async (user, addingDeck) => {
    try {
        if (!user || !addingDeck) return null;
        const deck = user.cards.deck;
        const randIndex = functions.randInt(0, deck.length - 1);
        const card = deck[randIndex];
        await addingDeck.push(card);
        await deck.splice(randIndex, 1);

        return card;
    } catch (error) {
        logger.error("blackjackAddCard", error);
        return null;
    }
}

export const userMove = async (user) => {
    try {
        if (user.userPassed) return null;
        user.move += 1;
        const card = await addCard(user, user.cards.player);

        return {
            card: card.name,
            userSum: getSum(user.cards.player),
            userCards: user.cards.player.map((card) => card.name),
            dealerCards: user.cards.dealer.map((card) => card.name),
            dealerSum: getSum(user.cards.dealer),
            move: user.move
        };
    } catch (error) {
        logger.error("blackjackUserMove", error);
        return null;
    }
}

export const dealerMove = async (user) => {
    try {
        if (user.dealerPassed) return null;
        user.move += 1;
        const sum = getSum(user.cards.dealer);
        let card = null;
        let dealerPassed = false;
        if (sum < 17) {
            card = (await addCard(user, user.cards.dealer)).name;
        } else {
            user.dealerPassed = true;
            dealerPassed = true;
        }

        return {
            card: card,
            userSum: getSum(user.cards.player),
            userCards: user.cards.player.map((card) => card.name),
            dealerCards: user.cards.dealer.map((card) => card.name),
            dealerSum: getSum(user.cards.dealer),
            move: user.move,
            dealerPassed
        };
    } catch (error) {
        logger.error("blackjackDealerMove", error);
        return null;
    }
}

export const getSum = (cards) => {
    try {
        return cards.reduce((acc, card) => acc + card.value, 0);
    } catch (error) {
        logger.error("getSum", error);
        return null;
    }
}