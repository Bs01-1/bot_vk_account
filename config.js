// Accounts
module.exports.settings = {
    mysql: {
        host: '',
        user: '',
        database: '',
        password: '',
    },
    time_zone: 5, // Time Zone 0 == 0GMT (London)
    path: '',
    start_send: true,
    iris_conversation: '',
    iris_conversation_link: ''
};

/**
 *
 * @type {{id: string, config: {type: [string, number or array], key: string or message: string or array, peer_id: string}}[]}
 */
module.exports.message = [
];