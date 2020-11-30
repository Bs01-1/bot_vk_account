// Accounts
module.exports.settings = {
    mysql: {
        host: 'localhost',
        user: 'ilya',
        database: 'bot_vk_account',
        password: 'Qdwdqx1233!',
    },
    time_zone: 5, // Time Zone 0 == 0GMT (London)
    path: '/var/www/html/bot_vk_account/',
    start_send: true,
    iris_conversation: 'ЦОМ',
    iris_conversation_link: 'https://vk.me/join/OSmF_8DW1_/z4dX2NXsVlg7HsLAso5DBRM4='
};

/**
 *
 * @type {{id: string, config: {type: [string, number or array], key: string or message: string or array, peer_id: string}}[]}
 */
module.exports.message = [
    {
        id: '620995064', config : {
            peer_id: '133124411',
            type: 'send_at_this_hour',
            time: 0,
            key: 'night_rule'
        },
    },
    {
        id: '620995064', config: {
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