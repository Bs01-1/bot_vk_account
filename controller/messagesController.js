exports.Run = async function (user) {
    let session = ['message-interval', 'message-sendAtThisHours'];
    let session_check = []
    for (let i = 0; i < session.length; i++){
        let db_session = await Messages.get(user.id, session[i]);
        if (db_session)
            session_check[i] = db_session;
    }

    if (session_check[0]){
        for (let i = 0; i < session_check[0].length; i++) {
            console.log('Интервал сообщений для ' + user.vk_id + ' Включен!');
            intervalMessage({
                session: session[0],
                db_session: session_check[0][i]
            }, user);
        }
    }
    if (session_check[1]){
        for (let i = 0; i < session_check[1].length; i++){
            console.log('Фиксированные сообщения для ' + user.vk_id + ' Включен');
            sendAtThisHourMessage({
                session: session[1],
                db_session: session_check[1][i]
            }, user);
        }
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

async function sendAtThisHourMessage(message_config, user) {
    let get_time = await Messages.getTime(message_config.db_session.m_key);
    if (get_time === false)
        return;

    // let time = new Date().getTime() + (1000 * 60 * (60 - new Date().getMinutes()));
    let time = new Date().getTime() + (1000 * 10);

    let result = await Sessions.checkSessionRunAndUpdate(user, 'message', message_config.session, time);
    if(typeof result == 'object') {
        setTimeout( () => sendAtThisHourMessage(message_config, user), result.time);
        return;
    }
    else if (result === true) {
        if (get_time != Time.get().hour) {
            await sendAtThisHourMessage(message_config, user);
            return;
        }
        await sendAtThisHourMessage(message_config, user);
    }

    let message_arr = render('auto-messages', {
        key: message_config.db_session.m_key
    });

    sendMessage(user, 'messages.send', {peer_id: message_config.db_session.peer_id, message: message_arr[random.int(0, message_arr.length - 1)]});
}