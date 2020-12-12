const mysql = require('mysql2');
global.connect = mysql.createConnection({
    host: config.settings.mysql.host,
    user: config.settings.mysql.user,
    database: config.settings.mysql.database,
    password: config.settings.mysql.password
});
connect.connect( err => {
    if (!err)
        console.log('База данных подключена!');
});

/** Класс для работы с пользователем */
module.exports = class Users {
    /**
     *
     * @param {object} obj - controller или permission
     * @returns {Promise<[{object}]>} - Возращает всех польщователей
     */
    static async getAll (obj){
        let request =  'SELECT * from users';
        if (obj !== undefined) {
            request = ((obj.controller !== undefined) || (obj.permission !== undefined)) ? request += ' WHERE ' : request;
            request = ((obj.controller !== undefined) && (obj.permission !== undefined)) ? request += ` ${obj.controller} = 1 
                AND permission = '${obj.permission}'` : (obj.controller !== undefined) ? request += ` ${obj.controller} = 1` :
                ` permission = '${obj.permission}'`;
        }

        let result = await connect.promise().query(request);
        return result[0];
    }

    /**
     * Получить одного пользователя
     * @param {string|int}param
     * @returns {Promise<object>} - возращает пользователя
     */
    static async getOne (param) {
        if (typeof param == 'string')
            param = `permission = + '${param}'`;
        else if (typeof param == 'number')
            param = `id = + ${param}`;

        let result = await connect.promise().query(`SELECT * FROM users WHERE  ${param}`);
        return result[0][0];
    }

    /**
     * Добавляем нового пользователя
     * @param {int} user_id
     * @param {string} token
     * @param {string} message_token
     * @param {string} password
     * @param {boolean} status
     * @param {boolean} online
     * @param {boolean} messages
     * @param {boolean} biba
     * @param {boolean} iris
     * @param {string} permission
     * @param {int} reg_time
     * @returns {void}
     */
    static add (user_id, token, message_token, password, status, online, messages, biba, iris, permission, reg_time){
        status = (status == true) ? 1 : 0;
        online = (online == true) ? 1 : 0;
        messages = (messages == true) ? 1 : 0;
        biba = (biba == true) ? 1 : 0;
        iris = (iris == true) ? 1 : 0;

        connect.query(`INSERT INTO users (vk_id, token, message_token, password, status, online, message, biba, iris, permission, reg_time) 
            VALUES ('${user_id}', '${token}', '${message_token}', '${password}', '${status}', '${online}', '${messages}', '${biba}', '${iris}', '${permission}', '${reg_time}')`);
    }
};