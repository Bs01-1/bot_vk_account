const axios = require('axios');
global.random = require('random');
const pug = require('pug');

global.Time = require ('./models/Time');
global.online = require ('./controller/onlineController');
global.status = require('./controller/statusController');
global.message = require('./controller/messagesController');
global.config = require ('./config.js');

console.log('Запустился!');
// Проверяем пользователей и включаем им нужные функции
for (let i = 0; i < config.accounts.length; i++){
    let user = config.accounts[i];
    for (let type in user){
        if (type == 'status'){
            if (user.status === true) status.Run(user);
        }
        if (type == 'online'){
            if (user.online === true) online.Run(user);
        }
        // if (type == 'messages'){
        //     if (user.messages === true) message.Run(user);
        // }
    }
}

// Отправка сообщений
global.send_message = (user, method, params) => {
    let https = 'https://api.vk.com/method/';
    method += '?';
    let token;
    let v = '&v=5.45';
    let path;

    if (method == 'account.setOnline?'){
        token = 'access_token=' + user.token;
        path = encodeURI(https + method + token + v);
    }else if (method == 'messages.send?'){
        token = 'access_token=' + user.message_token;
        path = encodeURI(https + method + 'peer_id=' + params.peer_id + '&message=' + params.message + '&' + token + v);
    }else if (method == 'status.set?'){
        token = 'access_token=' + user.token;
        path = encodeURI(https + method + 'text=' + params + '&' + token + v);
    }

    axios.get(path)
        .then(res => {
            console.log('Работает! ' + method);
            console.log(res.data);
        })
        .catch(err => {
            console.log('Что-то пошло не так!' + method);
            console.log(err);
        });
};

global.render = (name, data) => {
    if (data === undefined || data.template === undefined){
        if (data === undefined) data = {};
        let arr = [];
        let length = 1;
        for (let i = 1; length !== 0; i++){
            data.template = i;
            arr.push(pug.renderFile(`./view/${name}.pug`, data));
            length = arr[arr.length - 1].length;
        }
        arr.splice(arr.length - 1, arr.length);
        return arr;
    } else return pug.renderFile(`./view/${name}.pug`, data);
};

