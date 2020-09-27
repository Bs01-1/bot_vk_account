exports.Run = function (user) {

    // Перебираем конфигурации сообщеий
    for (let i = 0; i < config.message.length; i++){
        if (config.message[i].id == user.id)
            if (config.message[i].config.type[0] == 'interval') {
                console.log('Интервал сообщений для ' + user.id + ' Включен!');
                let message_config = config.message[i].config;
                intervalMessage(message_config, user)
            };
    }
};

function intervalMessage(message_config, user) {
    let message;
    if (typeof message_config.message !== 'string') message = message_config.message[random.int(0, message_config.message.length - 1)];
    else message = message_config.message;


         setInterval( () => send_message(user, 'messages.send', {
         peer_id: message_config.peer_id, message: message
    }), 1000 * message_config.type[1] * 60)
}