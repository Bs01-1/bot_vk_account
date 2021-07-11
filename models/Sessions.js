/** Класс для работы с сессиями */
module.exports = class Sessions {
    /**
     * Проверяем существует ли сессия
     * @param {int} user_id - user id
     * @param {string} type - название сессии
     * @returns {Promise<boolean>}
     */
    static async checkExist (user_id, type) {
        let result = await connect.promise().query(`SELECT * from sessions WHERE user_id = ${user_id} AND type = '${type}'`);
        return (result[0].length === 1) ? true : false;
    }

    /**
     * Побавляем одну новую сессию
     * @param {int} user_id - user id
     * @param {string} type - название сессии
     * @param {int} time_exit - time exit
     * @returns {Promise<void>}
     */
    static async addOneSession (user_id, type, time_exit) {
        await connect.promise().query(`INSERT INTO sessions (user_id, type, time_exit) VALUES (${user_id}, '${type}', ${time_exit})`);
    }

    /**
     * Проверяем время исхода
     * @param {int} user_id - user id
     * @param {string} type - название сессии
     * @returns {Promise<boolean>}
     */
    static async checkTimeExit (user_id, type) {
        let result = await this.getOne(user_id, type);
        let time = result.time_exit - new Date().getTime();
        return (time <= 0) ? true : false;
    }

    /**
     * Обновляем сессию
     * @param {int} user_id - user id
     * @param {string} type - название сессии
     * @param {int} time_exit - время исхода
     * @param {int} count - колличество
     * @returns {Promise<void>}
     */
    static async updateOneSession (user_id, type, time_exit, count) {
        let request = `UPDATE sessions SET time_exit = ${time_exit}`;
        if (count)
            request += `, count = ${count}`;
        request += ` WHERE user_id = ${user_id} AND type = '${type}'`;

        await connect.promise().query(request);
    }

    /**
     * Получаем одну сессию по user id
     * @param {int} user_id - user id
     * @param {string} type - название сессии
     * @returns {Promise<void>}
     */
    static async getOne (user_id, type) {
        return (await connect.promise().query(`SELECT * from sessions WHERE user_id = ${user_id} AND type = '${type}'`))[0][0];
    }

    /**
     * Проверяем существует ли сессия
     * @param {object} user
     * @param {string} contoller
     * @param {string} session_name - название сессии
     * @param {int} session_time
     * @returns {true|{time: int, count: int}} - Если время вышло возращает true, если нет, то объект с временем и количеством
     */
    static async checkSessionRunAndUpdate (user, contoller, session_name, session_time) {
        if (!await this.checkExist(user.id, session_name))
            if (user.id !== 1) {
                if ((await Users.getOne(user.id))[contoller])
                    await this.addOneSession(user.id, session_name, new Date().getTime());
            } else
                await this.addOneSession(user.id, session_name, new Date().getTime());

        if (await this.checkTimeExit(user.id, session_name)) {
            this.updateOneSession(user.id, session_name, session_time);
            return true;
        }
        else {
            let result = (await Sessions.getOne(user.id, session_name))
             return {time: result.time_exit - new Date().getTime(), count: result.count};
        }
    }
};