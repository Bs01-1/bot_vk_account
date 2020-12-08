module.exports = class Messages {
    static async get (user_id, type){
        if(!await this.exist(user_id, type))
            return false;
        else {
            let result = (await connect.promise().query(`SELECT * from messages WHERE user_id = ${user_id} AND type = '${type}'`))[0];
            return (result[0].length >= 1) ? result : result[0]
        }
    };

    static async exist (user_id, type) {
        let result = await connect.promise().query(`SELECT * from messages WHERE user_id = ${user_id} AND type = '${type}'`);
        return (result[0].length >= 1) ? true : false;
    }

    static async getTime (key) {
        let fileContent = await fs.readFileSync(config.settings.path + 'message_time.txt', "utf8");
        if(!fileContent.includes(key))
            return false;

        fileContent = fileContent.split(key + '=')[1];
        fileContent = fileContent.split(';')[0];

        return (fileContent.includes(',')) ?
            random.int(Number(fileContent.split(',')[0]), Number(fileContent.split(',')[1])) :
            Number(fileContent);
    }
}