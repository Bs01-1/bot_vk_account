
module.exports = class Status{
    static async get (user) {
        if (await this.exist(user.id))
            return (await connect.promise().query('SELECT * from statuses WHERE user_id = ' + user.id))[0][0];
        else {
            await this.add(user.id);
            return (await connect.promise().query('SELECT * from statuses WHERE user_id = ' + user.id))[0][0];
        }
    };

    static async exist (user_id) {
        let result = await connect.promise().query(`SELECT * from statuses WHERE user_id = ${user_id}`);
        return (result[0].length === 1) ? true : false;
    }

    static async add (user_id) {
        connect.promise().query(`INSERT INTO statuses (user_id, the_information_in_the_status, type_time) 
            VALUES (${user_id}, '0', '9')`);
    }
};