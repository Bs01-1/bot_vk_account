
module.exports = class Status{
    static async Get (user) {
        let result = await connect.promise().query('SELECT * from statuses WHERE user_id = ' + user.vk_id);
        result[0][0].the_information_in_the_status = (1) ? true : false;
        return result[0][0];
    };
};