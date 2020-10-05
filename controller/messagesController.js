exports.Run = function (user) {
    // Перебираем конфигурации сообщеий
    for (let i = 0; i < config.message.length; i++){
        if (config.message[i].id == user.id) {
            let message_config = config.message[i].config;
            if (config.message[i].config.type[0] == 'Interval') {
                console.log('Интервал сообщений для ' + user.id + ' Включен!');
                intervalMessage(message_config, user);
            }
            if (config.message[i].config.type[0] == 'Send_at_this_hour') {
                console.log('Фиксированное сообщение для ' + user.id + ' Включен!');
                sendAtThisHourMessage(message_config, user);
            }
            if (config.message[i].config.type[0] == 'Biba'){
                console.log('Авто-биба для ' + user.id + ' Включена!');
                autoBiba(message_config, user);
            }
            if (config.message[i].config.type[0] == 'test'){
                test(message_config, user);
            }
        }
    }
};

function test(message_config, user) {
    message_config.message = render('auto-messages');
    setTimeout( () => pre_send(message_config, user), 1000);
}
function intervalMessage(message_config, user) {
    if (message_config.message === undefined) message_config.message = Default.message;
    if (message_config.type[1] === undefined) message_config.type[1] = 5;
    setInterval( () => pre_send(message_config, user),
        1000 * (typeof message_config.type[1] == "number" ? message_config.type[1] : random.int(message_config.type[1][0], message_config.type[1][1])) * 60);
}

function sendAtThisHourMessage(message_config, user) {
    if (message_config.type[1] == 0) message_config.type[1] = 24;
    setInterval( function () {
        if (Time.get().hour == message_config.type[1] - 1)
            setTimeout( () => pre_send(message_config, user), 1000 * 60 * ( 60 - Time.get().minutes));
    },1000 * 60 * 60);
}

function autoBiba(message_config, user) {
    let count = 1;
    let run = function () {
        setTimeout(function () {
            if (count >= 27) {
                setTimeout(function () {
                    count = 1;
                    message_config.message = 'фап';
                    pre_send(message_config, user);
                    message_config.message = 'бигбон';
                    pre_send(message_config, user);
                    run();
                    }, 1000 * 60 * 100);
            } else {
                message_config.message = 'бибон';
                pre_send(message_config, user);
                count += 1;
                run();
            }
        }, 2000 * 60);
    }
    run();
}

function pre_send(message_config, user) {
    send_message(user, 'messages.send', {
        peer_id: message_config.peer_id, message:
            (typeof message_config.message == 'string') ? message_config.message : message_config.message
                [random.int(0, message_config.message.length - 1)]
    })
}