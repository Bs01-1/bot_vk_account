// Accounts
module.exports.settings = {
    mysql: {
        host: process.env.HOST,
        user: process.env.USER_HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
    },
    time_zone: 5, // Time Zone 0 == 0GMT (London)
    path: process.env.PWD + '/',
    iris_conversation: process.env.IRIS_CONVERSATION,
    iris_conversation_link: process.env.IRIS_CONVERSATION_LINK,
    bot: process.env.BOT
};
