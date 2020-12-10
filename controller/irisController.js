exports.Run = async function (user) {
    let session = ['iris-farm', 'iris-conversation'];
    let dont_leave = ['133124411', '620995064', '606713425', '447053323', '334456986'];

    autoFarmCoins(user, session[0]);
    autoSendCoinsInconversation(user, session[1], dont_leave);

};

async function autoFarmCoins(user, session){
    let session_time = (time) => {
        return time + 1000 * 60 * (random.int(240, 242));
    };

    let result = await Sessions.checkSessionRunAndUpdate(user, 'iris', session, session_time(new Date().getTime()));
    if(result === true) {
        sendMessage(user, 'wall.createComment', {owner_id: '-174105461', post_id: '35135', message: 'Ферма'});
        await autoFarmCoins(user, session);
    }
    else
        setTimeout( () => autoFarmCoins(user, session), result.time);
}

async function autoSendCoinsInconversation(user, session, dont_leave) {
    let session_time = await Time.getRandomDayAndCheckNightTime(5, 7);

    let result = await Sessions.checkSessionRunAndUpdate(user, 'iris', session, session_time);
    if(typeof result == 'object') {
        setTimeout( () => autoSendCoinsInconversation(user, session, dont_leave), result.time);
        return;
    }
    else if (result === true)
        await autoSendCoinsInconversation(user, session, dont_leave);

    // Пишем ирису и узнаем сколько у нас коинов
    await sendMessage(user, 'messages.send', {peer_id: '-174105461', message: 'кто я'});

    let iris_msg;
    setTimeout(async function () {
        iris_msg = await sendMessage(user, 'messages.getHistory', {user_id: '-174105461', count: 1})

        let msg_split = iris_msg.items[0].body;
        msg_split = msg_split.split('☢️ ')[1];
        msg_split = msg_split.split(' i¢')[0];
        msg_split = msg_split.replace(' ', '');

        // Заходим в беседу, узнаем id беседы
        await sendMessage(user, 'messages.joinChatByInviteLink', {link: config.settings.iris_conversation_link});
        let conversation = await sendMessage(user, 'messages.getConversations', {count: 20, filter: 'all'});
        let chat_id;
        for (let i = 0; i < conversation.items.length; i++){
            if (conversation.items[i].conversation.peer.type == 'chat')
                if (conversation.items[i].conversation.chat_settings.title == config.settings.iris_conversation){
                    chat_id = conversation.items[i].conversation.peer.id;
                }
        }

        // Пишем сообщение в беседе и выходим из нее
        await sendMessage(user, 'messages.send', {peer_id: chat_id, message: 'б-коин ' + msg_split});
        chat_id = chat_id - 2000000000;

        let bool = true;
        for (let i = 0; i < dont_leave.length; i++)
            if (user.vk_id == dont_leave[i])
                bool = false;

        if (bool)
            await sendMessage(user, 'messages.removeChatUser', {chat_id: chat_id, user_id: user.vk_id})

    }, 10000);
}