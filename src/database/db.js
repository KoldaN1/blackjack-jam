import logger from '../bot/models/logger.js'
import users from './users.json' with { type: "json" };
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const saveDatabase = async () => {
    try {
        const filePath = path.join(__dirname, './users.json');
        fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));
        logger.debug('SAVE_USERS', 'Users has been saved!');
        return true;
    } catch (error) {
        logger.error('SAVE_USERS', `Ошибка сохранения пользователей: ${error}`);
        return false;
    }
};

export const getUser = async (userId) => {
    try {
        return users.find((user) => user.id === userId);
    } catch (error) {
        logger.error('GET_USER', `Ошибка получения пользователя: ${error}`);
        return null;
    }
};

export const createUser = async (userId) => {
    try {
        users.push({
            id: userId,
            gameStarted: false,
            userPassed: false,
            move: 0,
            cards: {
                player: [],
                dealer: [],
                deck: []
            }
        });
        return true;
    } catch (error) {
        logger.error('CREATE_USER', `Ошибка создания пользователя: ${error}`);
        return false;
    }
};