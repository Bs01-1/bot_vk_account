const mysql = require('mysql2');
global.connect = mysql.createConnection({
    host: config.settings.mysql.host,
    user: config.settings.mysql.user,
    database: config.settings.mysql.database,
    password: config.settings.mysql.password
});
connect.connect( err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('База данных подключена!');
    }
});

module.exports = class Users {
    static async getAll (){
        return connect.promise().query('SELECT * from users')
    }

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