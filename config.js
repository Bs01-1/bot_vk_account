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
        messages: false,
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
        id: '0', text: [
            'Welcome to my profile',
            'У меня тут статус каждую минуту меняется...',
            'Авто статус - On',
            'vk.com/biba_bot',
            'Авто-статус, гучи флип флап'
        ],
    },
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
        type: ['interval' - sending messages by interval, num - time interval in minutes],
        message: string or array
    }
*/
module.exports.message = [
    {
        id: '211845323', config : {
            peer_id: '2000000008',
            type: ['interval', 1],
            message: 'Проверочка'
        },
    },
];

