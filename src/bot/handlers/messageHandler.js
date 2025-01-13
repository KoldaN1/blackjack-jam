import logger from '../models/logger.js';
import * as db from '../../database/db.js';

const messageHandler = (bot) => async (msg) => {
    try {
        const userId = msg.from.id;

        const user = await db.getUser(userId);
        if (!user) await db.createUser(userId);
    } catch (error) {
        logger.error("messageHandler", error);
    }
}

export { messageHandler };