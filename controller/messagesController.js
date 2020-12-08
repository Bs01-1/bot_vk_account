exports.Run = async function (user) {
    let session = ['message-interval', 'message-sendAtThisHours'];
    let session_check = []
    for (let i = 0; i < session.length; i++){
        let db_session = await Messages.get(26, session[i]);
        if (db_session)
            session_check[i] = db_session;
    }

    if (session_check[0]){
        console.log('Интервал сообщений для ' + user.vk_id + ' Включен!');
        intervalMessage({
            session: session[0],
            db_session: session_check[0]
        }, user);
    }
    if (session_check[1]){
        console.log('Фиксированные сообщения для ' + user.vk_id + ' Включен');
        sendAtThisHourMessage( {
            session: session[1],
            db_session: session_check[1]
        })
    }
};

async function intervalMessage(message_config, user) {
    let get_time = await Messages.getTime(message_config.db_session.m_key);
    if (get_time === false)
        return;

    let time = new Date().getTime() + (1000 * get_time) * 60;

    let result = await Sessions.checkSessionRunAndUpdate(user, 'message', message_config.session, time);
    if(typeof result == 'object') {
        setTimeout( () => intervalMessage(message_config, user), result.time);
        return;
    }
    else if (result === true)
        await intervalMessage(message_config, user);

    let message_arr = render('auto-messages', {
        key: message_config.db_session.m_key
    });

    sendMessage(user, 'messages.send', {peer_id: message_config.db_session.peer_id, message: message_arr[random.int(0, message_arr.length - 1)]});

}

function sendAtThisHourMessage(message_config, user) {


    // if (message_config.time == 0) message_config.time = 24;
    // setInterval( function () {
    //     if (Time.get().hour == message_config.time - 1)
    //         setTimeout( () => pre_send(message_config, user), 1000 * 60 * ( 60 - Time.get().minutes));
    // },1000 * 60 * 60);
}