// Accounts
module.exports.settings = {
    mysql: {
        host: 'localhost',
        user: 'root',
        database: 'bot_vk_account',
        password: '',
    },
    time_zone: 5, // Time Zone 0 == 0GMT (London)
    path: '/var/www/html/bot_vk_account/',
    start_send: true,
    iris_conversation: 'ЦОМ',
    iris_conversation_link: ''
};
module.exports.accounts = [
    {
        token: '',
        message_token: '',
        the_information_in_the_status: false,
        id: '133124411',
        status: true,
        online: false,
        messages: false,
        biba: true,
        iris: true,
        time: 1 // 1 - 9
    },
    {
        token: '',
        message_token: '',
        the_information_in_the_status: true,
        id: '211845323', // Твинк
        status: true,
        online: false,
        messages: false,
        iris: true,
        biba: false,
        time: 8
    },
    {
        message_token: '',
        id: '518724496', // Ilya
        iris: true
    },
    {
        message_token: '',
        id: '215567165', // Даня
        messages: false,
    },
    {
        message_token: '',
        id: '559159807', // Леха
        iris: true
    },
    {
        message_token: '',
        id: '593331982',  // Настя
        iris: true,
        biba: true
    },
    {
        message_token: '',
        id: '593341488', // Аня
        iris: true,
        biba: true
    },
    {
        token: '',
        message_token: '',
        the_information_in_the_status: false,
        id: '620995064',
        status: true, // тестовый бот
        online: true,
        messages: true,
        iris: true,
        biba: true,
        time: 8
    },
    {
        message_token: '',
        id: '567889204', // Фейк Марины.
        iris: true,
    },
    {
        message_token: 'b3e5a83a7f3fd40636bcb88e56444c54c4f46e10f64d907d7ccbcb3ad4db133c436128d6d4aa6a292d7f5',
        id: '606713425',
        status: true,
        time: 2,
        iris: true,
    },
    {
        message_token: '5a4958db1a95c6e5a4dcc3f0af4c6f65a68802045041a6b3052f8a2c48455d4417a13ae2ee9f091e63414',
        id: '517940196',
        iris: true,
    }
];

/**
 *
 * @type {{id: string, config: {type: [string, number or array], key: string or message: string or array, peer_id: string}}[]}
 */
module.exports.message = [
    {
        id: '620995064', config : {
            peer_id: '2000000001',
            type: 'send_at_this_hour',
            time: 0,
            key: 'night_rule'
        },
    },
    {
        id: '620995064', config: {
            peer_id: '2000000001',
            type: 'send_at_this_hour',
            time: 6,
            key: 'good_morning'
        }
    },
    {
        id: '620995064', config: {
            peer_id: '2000000001',
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