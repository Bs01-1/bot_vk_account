require('dotenv').config();
const axios = require('axios');
global.random = require('random');
const pug = require('pug');
global.fs = require('fs');

global.config = require ('./config.js');
global.Users = require ('./models/Users');
global.Status = require ('./models/Status');
global.Time = require ('./models/Time');
global.Sessions = require ('./models/Sessions');
global.Messages = require ('./models/Messages');

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

        if (res.data.error !== undefined){
            sendMessage(
                await Users.getOne('group'),
                'messages.send',
                {
                    peer_id: '133124411',
                    message: render('error_response', {
                        date: new Date(),
                        user: user.vk_id,
                        error_code: res.data.error.error_code,
                        error_msg: res.data.error.error_msg
                    })
                }
            )
        }

        return res.data.response;
    } catch (e) {
        console.log(e);
    }
};

global.render = (name, data) => {
    // Если не указывать кейс, то он вернет весь кейс в массиве обратно
    if (data === undefined) {
        return pug.renderFile(`${config.settings.path}view/${name}.pug`);
    } else {
        if (data.template === undefined && ((data.user !== undefined) || (data.key !== undefined))) {
            let arr = [];
            let length = 1;
            for (let i = 1; length !== 0; i++) {
                data.template = i;
                arr.push(pug.renderFile(`${config.settings.path}view/${name}.pug`, data));
                length = arr[arr.length - 1].length;
            }
            arr.splice(arr.length - 1, arr.length);
            return arr;
        } else
            return pug.renderFile(`${config.settings.path}view/${name}.pug`, data);
    }
};