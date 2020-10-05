exports.Run = function (user) {
    // Перебираем конфигурации сообщеий
    for (let i = 0; i < config.message.length; i++){
        if (config.message[i].id == user.id) {
            let message_config = config.message[i].config;
            if (config.message[i].config.type[0] == 'interval') {
                console.log('Интервал сообщений для ' + user.id + ' Включен!');
                intervalMessage(message_config, user);
            }
            if (config.message[i].config.type[0] == 'send_at_this_hour') {
                console.log('Фиксированное сообщение для ' + user.id + ' Включен!');
                sendAtThisHourMessage(message_config, user);
            }
            if (config.message[i].config.type[0] == 'biba'){
                console.log('Авто-биба для ' + user.id + ' Включена!');
                autoBiba(message_config, user);
            }
        }
    }
};

function intervalMessage(message_config, user) {
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