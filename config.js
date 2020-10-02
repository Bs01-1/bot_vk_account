// Accounts
module.exports.settings = {
    time_zone: 5, // Time Zone 0 == 0GMT (London)
};
module.exports.accounts = [
    {
        token: '',
        id: '',
        status: true,
        online: true,
        messages: true,
        time: 6
        /*
            1 - 0H 00M
            2 - Время - 0:00
            3 - Time - 0:00
            4 - Date : 0.00.0000
            5 - Дата : 00.0.0000
            6 - Date : 0.00.0000 | 0:00
            7 - Дата : 00.0.0000 | 0:00
            8 - random 1 - 7
            9 - Отключить
         */
    },
];
// Statuses
module.exports.statuses = [
    {
        id: '', text: [
            '',
        ],
    }
]
// Messages
/*
    id: id, config: {
        peer_id: user or conversation,
        type: ['interval' - sending messages by interval, num or array - time interval in minutes],
        type: ['At_this_hour' - Отправка сообщений в определенный час, num - в какой час
        message: string or array
    }
*/
module.exports.message = [
    {
        id: '211845323', config : {
            peer_id: '2000000008',
            type: ['Interval', [300, 500]],
        },
    },
    {
        id: '211845323', config: {
            peer_id: '2000000008',
            type: ['Send_at_this_hour', 0],
            message: 'Наступила ночь, а это значит ночные правила!'
        }
    },
    {
        id: '211845323', config: {
            peer_id: '2000000008',
            type: ['Send_at_this_hour', 6],
            message: 'С добрым утром, ночные правила больше не действуют!'
        }
    },
    {
        id: '133124411', config: {
            peer_id: '-194038078',
            type: ['Interval', 2],
            message: 'бибон'
        }
    }
];

