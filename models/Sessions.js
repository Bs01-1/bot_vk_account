
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

    static async updateSession (user_id, type, time_exit, count) {
        let request = `UPDATE sessions SET time_exit = ${time_exit}`;
        if (count)
            request += `, count = ${count}`;
        request += ` WHERE user_id = ${user_id} AND type = '${type}'`;

        await connect.promise().query(request);
    }

    static async getOne (user_id, type) {
        return (await connect.promise().query(`SELECT * from sessions WHERE user_id = ${user_id} AND type = '${type}'`))[0][0];
    }

    static async checkSessionRunAndUpdate (user, contoller, session_name, session_time) {
        if (!await this.checkExist(user.id, session_name))
            if ((await Users.getOne(user.id))[contoller]){
                await this.add(user.id, session_name, new Date().getTime());
            }

        if (await this.checkTimeExit(user.id, session_name)) {
            this.updateSession(user.id, session_name, session_time);
            return true;
        }
        else {
            let result = (await Sessions.getOne(user.id, session_name))
             return {time: result.time_exit - new Date().getTime(), count: result.count};
        }
    }
};