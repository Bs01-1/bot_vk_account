const axios = require('axios');
global.random = require('random');
const pug = require('pug');
const fs = require('fs');

global.config = require ('./config.js');
global.Users = require ('./models/Users');
global.Status = require ('./models/Status');
global.Time = require ('./models/Time');
global.Sessions = require ('./models/Sessions');
global.controllers = {};

let path = config.settings.path + 'controller';
fs.readdir(path, function (err, items) {
    for (let i = 0; i < items.length; i++) {
        let controller = items[i].split('Controller.js')[0];
        let req = items[i].split('.js')[0];
        controllers[controller] = require('./controller/' + req);
    }
});

console.log('Запустился!');

global.pre_send = (message_config, user) => {
    let message;
    if (message_config.key === undefined){
        message = (typeof message_config.message == 'string') ? message_config.message : message_config.message
            [random.int(0, message_config.message.length - 1)];
    } else {
        let message_arr = render('auto-messages', {
            key: message_config.key
        });
        message = message_arr[random.int(0, message_arr.length - 1)];
    }
    sendMessage(user, 'messages.send', {
        peer_id: message_config.peer_id, message: message
    })
}

// Отправка сообщение Вк
global.sendMessage = async (user, method, obj_params) => {
    let https = 'https://api.vk.com/method/';
    method += '?';
    let token = 'access_token=';
    let v = '&v=5.45';
    let params = '';

    if (method == 'online') token += user.token;
    else token += user.message_token;

    if (obj_params !== null) {
        if (obj_params !== undefined) {
            let obj_keys = Object.keys(obj_params);
            for (let i = 0; i < obj_keys.length; i++) {
                params += obj_keys[i] + '=' + obj_params[obj_keys[i]] + '&';
            }
        }
    }

    let path = encodeURI(https + method + params + token + v);

    try {
        const res = await axios.get(path);
        console.log(new Date());
        console.log(user.vk_id + ' ' + method);
        console.log(res.data);
        console.log('--------------');
        return res.data.response;
    } catch (e) {
        console.log(e);
    }
};

global.render = (name, data) => {
    // Если не указывать кейс, то он вернет весь кейс в массиве обратно
    if (data === undefined || data.template === undefined){
        if (data === undefined) data = {};
        let arr = [];
        let length = 1;
        for (let i = 1; length !== 0; i++){
            data.template = i;
            arr.push(pug.renderFile(`${config.settings.path}view/${name}.pug`, data));
            length = arr[arr.length - 1].length;
        }
        arr.splice(arr.length - 1, arr.length);
        return arr;
    } else return pug.renderFile(`${config.settings.path}view/${name}.pug`, data);
};


// Проверяем пользователей и включаем им нужные функции

// setTimeout( async () => {
//     let users = await Users.getAll();
//
//     for (let i = 0; i < users.length; i++) {
//         let user = users[i];
//
//         for (let type in user) {
//             if (type == 'status') {
//                 if ((user.status === 1) && (user.vk_id == '211845323')) pathes['status'].Run(user);
//             }
//             if (type == 'online') {
//                 if (user.online === true) pathes['online'].Run(user);
//             }
//             if (type == 'messages') {
//                 if (user.messages === true) pathes['message'].Run(user);
//             }
//             if (type == 'biba') {
//                 if (user.biba === true) pathes['auto_biba'].Run(user);
//             }
//             if (type == 'iris') {
//                 if (user.iris === true) pathes['iris'].Run(user);
//             }
//         }
//     }
// }, 1000);


// let pass = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'q', 'A', 'B', 'R', 'T', 't', 'O', '!', '@', 'l'];
// let password = '';
// for (let j = 0; j < config.accounts.length; j++){
//     let user = config.accounts[j];
//     for (let i = 0; i < 10; i++){
//         password += pass[random.int(0, pass.length-1)]
//     }
//     let reg = new Date().getTime();
//
//     Db.add_user(user.id, user.token, user.message_token, password, user.status, user.online, user.messages, user.biba, user.iris, 'user', reg);
//     password = '';
// }

// iris.timeCheck()