const axios = require('axios');
global.random = require('random');
const pug = require('pug');

global.config = require ('./config.js');
global.Db = require ('./models/Db');
global.Time = require ('./models/Time');
global.online = require ('./controller/onlineController');
global.status = require('./controller/statusController');
global.message = require('./controller/messagesController');
global.auto_biba = require ('./controller/bibaController');
global.iris = require ('./controller/irisController');

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
global.sendMessage = async (user, method, obj_params, result) => {
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
        console.log( user.id + ' ' + method)
        console.log(res.data);
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
for (let i = 0; i < config.accounts.length; i++) {
    let user = config.accounts[i];
    for (let type in user) {
        if (type == 'status') {
            if (user.status === true) status.Run(user);
        }
        if (type == 'online') {
            if (user.online === true) online.Run(user);
        }
        if (type == 'messages') {
            if (user.messages === true) message.Run(user);
        }
        if (type == 'biba') {
            if (user.biba === true) auto_biba.Run(user);
        }
        if (type == 'iris') {
            if (user.iris === true) iris.Run(user);
        }
    }
}
iris.timeCheck()