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
    {
        token: '',
        message_token: '',
        id: '211845323',
        status: true,
        online: true,
        messages: false,
        time: 8
    },
    {
        message_token: '',
        id: '215567165',
        messages: false,
    }
];