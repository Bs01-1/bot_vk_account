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

/**
 *
 * @type {{id: string, config: {type: [string, number or array], key: string or message: string or array, peer_id: string}}[]}
 */
module.exports.message = [
    {
        id: '211845323', config : {
            peer_id: '133124411',
            type: 'send_at_this_hour',
            time: 0,
            key: 'night_rule'
        },
    },
    {
        id: '211845323', config: {
            peer_id: '133124411',
            type: 'send_at_this_hour',
            time: 6,
            key: 'good_morning'
        }
    },
    {
        id: '620995064', config: {
            peer_id: '133124411',
            type: 'interval',
            time: [900, 1500],
            key: 'ferma'
        }
    }
    // {
    //     id: '211845323', config: {
    //         type: 'sending_messages'
    //     }
    // }
];
// 2000000008