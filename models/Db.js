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

module.exports = class Db {
    static async get (table){
        let reslt;
        await connect.promise().query('SELECT * from ' + table)
            .then(result => {
                res(result[0][0])
            })
            .catch(err => {
                console.log(err)
            });

        async function res (result) {
            reslt = result
        }
        return reslt;
    }

    static add (table, type, count){
        connect.query(`INSERT INTO ${table} (type, count) VALUES ('${type}', ${count})`)
    }

    static update_time (table, time, id){
        connect.query(`UPDATE ${table} SET count = ${time} WHERE id = ${id}`)
    }
}