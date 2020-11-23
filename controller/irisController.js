exports.Run = function (user) {
    console.log('Автоферма для ' + user.id + ' включена!');

    // sendMessage(user, 'wall.createComment', {owner_id: '-174105461', post_id: '35135', message: 'Ферма'});
    setInterval( function () {
        sendMessage(user, 'wall.createComment', {owner_id: '-174105461', post_id: '35135', message: 'Ферма'});
    }, (1000 * 60) * random.int(241, 243));
};

exports.timeCheck = async function () {
    let iris_time = await Db.get('session');
    let time = new Date().getTime();

    setTimeout(function () {
        if (iris_time.count < time){
            for (let i = 0; i < config.accounts.length; i++){
                if (config.accounts[i].iris === true) {
                    let user = config.accounts[i];

                    autoSendCoins(user);

                    Db.update_time('session', (new Date().getTime()) + 1000 * 60 * 60 * 24 * 7, 4)
                }
            }
        }else iris.timeCheck();
    }, 1000)
};

async function autoSendCoins(user) {
    // Пишем ирису и узнаем сколько у нас коинов
    await sendMessage(user, 'messages.send', {peer_id: '-174105461', message: 'кто я'});

    let iris_msg;
    setTimeout(async function () {
        iris_msg = await sendMessage(user, 'messages.getHistory', {user_id: '-174105461', count: 1})
        console.log(iris_msg)
        let msg_split = iris_msg.items[0].body;
        msg_split = msg_split.split('☢️ ')[1];
        msg_split = msg_split.split(' i¢')[0];

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
        if (user.id !== '133124411')
            if (user.id !== '620995064')
                 await sendMessage(user, 'messages.removeChatUser', {chat_id: chat_id, user_id: user.id})

    }, 10000);
}