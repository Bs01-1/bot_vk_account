// Accounts
module.exports.settings = {
    mysql: {
        host: 'localhost',
        user: 'ilya',
        database: 'bot_vk_account',
        password: 'Qdwdqx1233!',
    },
    time_zone: 5, // Time Zone 0 == 0GMT (London)
    path: '/var/www/html/bot_vk_account_test/',
    start_send: true,
    iris_conversation: 'ЦОМ',
    iris_conversation_link: 'https://vk.me/join/OSmF_8DW1_/z4dX2NXsVlg7HsLAso5DBRM4='
};
module.exports.accounts = [
    // {
    //     token: '07d7fa695fcb7522236643f547dfdb46ba8a63366cb332a4e25d6af0e864d28f9f9caeca006f1c89d4575',
    //     message_token: '830400eef47762022e74f719d25053ee1a483585102ecbac54f7ccce5e3d87b6dd6aa85b4d1b3f06c036d',
    //     the_information_in_the_status: false,
    //     id: '133124411',
    //     status: true,
    //     online: false,
    //     messages: false,
    //     biba: true,
    //     iris: true,
    //     time: 1 // 1 - 9
    // },
    {
        token: '9f3ee1a99498c01fdcc3e7c4bea236ec7225715d6066d39445dd0c66c382687208394f2cecb9ec6dcbde5',
        message_token: 'f5794031892fefcd16260d83498679ac48505facde1afb23d69d1cb0c7e3fa0143accd26958e1b318a23e',
        the_information_in_the_status: true,
        id: '211845323', // Твинк
        status: true,
        online: true,
        messages: false,
        iris: true,
        biba: false,
        time: 8
    }
    ];
//     {
//         message_token: '7d09c07d83f5f1c4fe0824d0c97536f5c8f811c15daa162c73340d139e840de8c132e13f4e8dae700ba28',
//         id: '518724496', // Ilya
//         iris: true
//     },
//     {
//         message_token: '20d8520e6d2c574d281279c42a50413d5b5f336e7842ad80f26e02741272b9591f0b9e308abd1e9863440',
//         id: '215567165', // Даня
//         messages: false,
//     },
//     {
//         message_token: 'd0c96ed35d77c29a1c81826f9b72e3dbdf44b8df4ad5efaa5c699c1b04cefa36b9ea28e2779da04d82a15',
//         id: '559159807', // Леха
//         iris: true
//     },
//     {
//         message_token: 'bf4ee859b14635936af57dae2ca29941750c76ebf57eaa0d21d1453391375069eddf948f025e6b46ce367',
//         id: '593331982',  // Настя
//         iris: true,
//         biba: true
//     },
//     {
//         message_token: '55a74cb7ea41440ae2ed431e8b4b383a82af3386faec5c2aabb9bcd655b417847c9fe46bd37a9c871dd46',
//         id: '593341488', // Аня
//         iris: true,
//         biba: true
//     },
//     {
//         token: '186be94b382aa670d38a7842cb97e21615b5385bb02648d7531c60720c67d41a31fec6b6636f7baa32bb5',
//         message_token: '895f27f9c55320c5d090812f8cf7f2372f2fc4ecfba7afc56d76e7a9d9ce00eda2ad182c32ff1901ef2ed',
//         the_information_in_the_status: false,
//         id: '620995064',
//         status: true, // тестовый бот
//         online: true,
//         messages: true,
//         iris: true,
//         biba: true,
//         time: 8
//     },
//     {
//         message_token: '3002bc238d2159bc0d160863f515e103a339ebd8eb0e7ba57ef00c9c8baaa5e6c0c48a89522ba1368343b',
//         id: '567889204', // Фейк Марины.
//         iris: true,
//     },
//     {
//         message_token: 'c69ba8c0e2a55925dfca41e7a6d8f5e6ce135ea50b1f6a8a25376e9919b3d8c420e9bcc09b42282049076',
//         id: '506784803',
//         iris: true
//     },
//     {
//         message_token: 'b3e5a83a7f3fd40636bcb88e56444c54c4f46e10f64d907d7ccbcb3ad4db133c436128d6d4aa6a292d7f5',
//         id: '606713425',
//         status: true,
//         time: 2,
//         iris: true,
//     },
//     {
//         message_token: '5a4958db1a95c6e5a4dcc3f0af4c6f65a68802045041a6b3052f8a2c48455d4417a13ae2ee9f091e63414',
//         id: '517940196',
//         iris: true,
//     }
// ];
//
// /**
//  *
//  * @type {{id: string, config: {type: [string, number or array], key: string or message: string or array, peer_id: string}}[]}
//  */
// module.exports.message = [
//     {
//         id: '620995064', config : {
//             peer_id: '2000000001',
//             type: 'send_at_this_hour',
//             time: 0,
//             key: 'night_rule'
//         },
//     },
//     {
//         id: '620995064', config: {
//             peer_id: '2000000001',
//             type: 'send_at_this_hour',
//             time: 6,
//             key: 'good_morning'
//         }
//     },
//     {
//         id: '620995064', config: {
//             peer_id: '2000000001',
//             type: 'interval',
//             time: [900, 1500],
//             key: 'ferma'
//         }
//     }
//     // {
//     //     id: '211845323', config: {
//     //         type: 'sending_messages'
//     //     }
//     // }
// ];
//
// 2000000008