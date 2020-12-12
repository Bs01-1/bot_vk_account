/**
 * Класс для управления конфигами сообщений
 */
module.exports = class Messages {
    /**
     * Получаем конфиги сообщения пользователя
     * @param {int} user_id - user.id
     * @param {string} type - тип отправки сообщения
     * @returns {Promise<false|{id: int, user_id: int, m_key: string, type: string}>} - false или message object
     */
    static async getMessageConfig (user_id, type){
        if(!await this.checkMessageConfigExist(user_id, type))
            return false;
        else {
            let result = (await connect.promise().query(`SELECT * from messages WHERE user_id = ${user_id} AND type = '${type}'`))[0];
            return (result.length >= 1) ? result : result[0]
        }
    };

    /**
     * Проверяем существует ли конфиги сообщения пользователя
     * @param {int} user_id - user id
     * @param {string} type - тип отправки сообщения
     * @returns {Promise<boolean>}
     */
    static async checkMessageConfigExist (user_id, type) {
        let result = await connect.promise().query(`SELECT * from messages WHERE user_id = ${user_id} AND type = '${type}'`);
        return (result[0].length >= 1) ? true : false;
    }

    /**
     * Получаем время для сообщения по ключу
     * @param {string} key - m_key
     * @returns {Promise<false|int>}
     */
    static async getMessageConfigTime (key) {
        let fileContent = await fs.readFileSync(config.settings.path + 'message_time.txt', "utf8");
        if(!fileContent.includes(key))
            return false;

        fileContent = fileContent.split(key + '=')[1];
        fileContent = fileContent.split(';')[0];

        return (fileContent.includes(',')) ?
            random.int(Number(fileContent.split(',')[0]), Number(fileContent.split(',')[1])) :
            Number(fileContent);
    }
};