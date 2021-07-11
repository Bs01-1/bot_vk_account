/** Класс для работы с конфигами статуса */
module.exports = class Status{
    /**
     * Получаем конфиги статуса пользователя
     * @param {int} user_id -
     * @returns {Promise<{id: int, user_id: int, the_information_in_the_status: int, type_time: int}>}
     */
    static async getOne (user_id) {
        if (await this.checkExist(user_id))
            return (await connect.promise().query('SELECT * from statuses WHERE user_id = ' + user_id))[0][0];
        else {
            await this.add(user_id);
            return (await connect.promise().query('SELECT * from statuses WHERE user_id = ' + user_id))[0][0];
        }
    };

    /**
     * Проверяем существуют ли конфиги статуса
     * @param {int} user_id
     * @returns {Promise<boolean>}
     */
    static async checkExist (user_id) {
        let result = await connect.promise().query(`SELECT * from statuses WHERE user_id = ${user_id}`);
        return (result[0].length === 1) ? true : false;
    }

    /**
     * Добавляем новые конфиги статуса для пользователя
     * @param {int} user_id
     * @returns {Promise<void>}
     */
    static async add (user_id) {
        connect.promise().query(`INSERT INTO statuses (user_id, the_information_in_the_status, type_time) 
            VALUES (${user_id}, '0', '9')`);
    }
};