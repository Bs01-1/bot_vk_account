global.config = require ('./config.js');
global.Time = require ('./classes/Time');
const axios = require('axios');
const random = require('random');
console.log('Запустился!');

for (let i = 0; i < config.accounts.length; i++){
    let user = config.accounts[i]
    for (let type in user){
        if (type == 'status'){
            if (user.status === true) status(user);
        }
        if (type == 'online'){
            if (user.online === true) online(user);
        }
        if (type == 'messages'){
            if (user.messages === true) messages(user);
        }
    }
}

function status(user){
    console.log('Автостатус для ' + user.id + ' Включен!');
    // Поиск рандомного статуса
    let statuses = config.statuses[0].text;

    for (let i = 0; i < config.statuses.length; i++){
        if (config.statuses[i].id == user.id){
            for (let j = 0; j < config.statuses[i].text.length; j++){
                statuses.push(config.statuses[i].text[j])
            }
        }
    }
    let random_status = statuses[random.int(0, statuses.length - 1)];

    // Делаем красивую дату/время
    let time = Time.get();

    let status_date;
    if (user.time == 8) user.time = random.int(1,7);
    if (user.time == 1) status_date = time.hour + 'H ' + time.minutes + ' M';
    if (user.time == 2) status_date = 'Время - ' + time.hour + ':' + time.minutes;
    if (user.time == 3) status_date = 'Time - ' + time.hour + ':' + time.minutes;
    if (user.time == 4) status_date = 'Date : ' + time.month + '-' + '-' + time.day + '-' + time.year;
    if (user.time == 5) status_date = 'Дата' + time.day + '-' + time.month + '-' + time.year;
    if (user.time == 6) status_date = 'Date : ' + time.month + '-' + time.day + '-' + time.year + ' | ' + time.hour + ':' + time.minutes;
    if (user.time == 7) status_date = 'Дата : ' + time.day + '-' + time.month + '-' + time.year + ' | ' + time.hour + ':' + time.minutes;
    status_date += ' || ';
    if (user.time == 9) status_date = '';

    // Показываем что работает в статус
    let auto_status = user.status ? 'T' : 'F';
    let online = user.online ? 'T' : 'F';
    let auto_message = user.messages ? 'T' : 'F';

    let status = status_date + random_status + ' || '
        + auto_status + online + auto_message;

    setInterval(() => send_message(user, 'status.set', status), 1000 * random.int(66, 80));
}

function online(user){
    console.log('Вечный онлайн для ' + user.id + ' Включен!');
    setInterval(() => send_message(user ,'account.setOnline'), 1000 * random.int(250, 300));
}

function messages(user){
    console.log('Авто сообщения для ' + user.id + ' Включен!');
}

async function send_message(user, method, params){
    let https = 'https://api.vk.com/method/';
    method += '?';
    let token = 'access_token=' + user.token;
    let v = '&v=5.45';
    let path;

    if (method == 'account.setOnline?'){
        path = encodeURI(https + method + token + v);
    }else if (method == 'messages.send?'){
        path = encodeURI(https + method + 'peer_id=' + params.peer_id + '&message=' + params.message + '&' + token + v);
    }else if (method == 'status.set?'){
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

