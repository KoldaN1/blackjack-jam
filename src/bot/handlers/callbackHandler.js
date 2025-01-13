import logger from '../models/logger.js';
import * as db from '../../database/db.js';
import * as querys from '../query/index.js';

const callbackHandler = (bot) => async (query) => {
    try {
        const action = query.data.split(";");
        const fromUser = query.from;
        const user = await db.getUser(fromUser.id);

        const userClickedId = action[0]
        if (userClickedId != parseInt(user.id)) {
            return bot.answerCallbackQuery(query.id,
                { text: 'Вы не являетесь отправителем сообщения', show_alert: false }
            );
        }

        const queryf = querys[action[1]];
        if (!queryf) return bot.answerCallbackQuery(query.id, { text: 'WIP', show_alert: false });
        await queryf(bot, user)(query);

    } catch (error) {
        logger.error("callbackHandler", error);
    }
}

export { callbackHandler };