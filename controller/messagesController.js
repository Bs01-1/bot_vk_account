exports.Run = function (user) {
    // Перебираем конфигурации сообщеий
    for (let i = 0; i < config.message.length; i++){
        if (config.message[i].id == user.id) {
            let message_config = config.message[i].config;
            if (message_config.type == 'interval') {
                console.log('Интервал сообщений для ' + user.vk_id + ' Включен!');
                intervalMessage(message_config, user);
            }
            if (message_config.type == 'send_at_this_hour') {
                console.log('Фиксированное сообщение для ' + user.vk_id + ' Включен!');
                sendAtThisHourMessage(message_config, user);
            }
        }
    }
};

function intervalMessage(message_config, user) {
    if (message_config.time === undefined) message_config.time = 5;
    setInterval( () => pre_send(message_config, user),
        1000 * (typeof message_config.time == "number" ? message_config.time : random.int(message_config.time[0], message_config.time[1])) * 60);
}

function sendAtThisHourMessage(message_config, user) {
    if (message_config.time == 0) message_config.time = 24;
    setInterval( function () {
        if (Time.get().hour == message_config.time - 1)
            setTimeout( () => pre_send(message_config, user), 1000 * 60 * ( 60 - Time.get().minutes));
    },1000 * 60 * 60);
}