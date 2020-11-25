
module.exports = class Sessions {
    static async checkExist (user_id, type) {
        let result = await connect.promise().query(`SELECT * from sessions WHERE user_id = ${user_id} AND type = '${type}'`);
        return (result[0].length === 1) ? true : false;
    }

    static async add (user_id, type, time_exit) {
        await connect.promise().query(`INSERT INTO sessions (user_id, type, time_exit) VALUES (${user_id}, '${type}', ${time_exit})`);
    }

    static async checkTimeExit (user_id, type) {
        let result = await this.getOne(user_id, type);
        let time = result.time_exit - new Date().getTime();
        return (time <= 0) ? true : false;
    }

    static async updateTimeExit (user_id, time_exit) {
        await connect.promise().query(`UPDATE sessions SET time_exit = ${time_exit} WHERE user_id = ${user_id}`);
    }

    static async getOne (user_id, type) {
        return (await connect.promise().query(`SELECT * from sessions WHERE user_id = ${user_id} AND type = '${type}'`))[0][0];
    }
};