
module.exports = class Status{
    static async get (user) {
        return (await connect.promise().query('SELECT * from statuses WHERE user_id = ' + user.id))[0][0];
    };

    static async exist (user) {

    }
};