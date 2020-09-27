const axios = require('axios');
const random = require('random');

global.random = random;

global.Time = require ('./classes/Time');
global.status = require('./controller/statusController');
global.config = require ('./config.js');

console.log('Запустился!');

for (let i = 0; i < config.accounts.length; i++){
    let user = config.accounts[i]
    for (let type in user){
        if (type == 'status'){
            if (user.status === true) status.Run(user);
        }
        if (type == 'online'){
            if (user.online === true) UpdateOnline(user);
        }
        if (type == 'messages'){
            if (user.messages === true) Messages(user);
        }
    }
}

function UpdateOnline(user){
    console.log('Вечный онлайн для ' + user.id + ' Включен!');
    setInterval(() => send_message(user ,'account.setOnline'), 1000 * random.int(250, 300));
}

function Messages(user){
    console.log('Авто сообщения для ' + user.id + ' Включен!');
    send_message(user, 'messages.send', {peer_id: config.message[0].config.peer_id, message: config.message[0].config.message});
}

global.send_message = function(user, method, params){
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
}

