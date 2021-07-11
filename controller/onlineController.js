exports.Run = async (user) => {
    if (!await Sessions.checkExist(user.id, 'online'))
        if ((await Users.getOne(user.id)).online){
            await Sessions.addOneSession(user.id, 'online', new Date().getTime());
        }

    if (await Sessions.checkTimeExit(user.id, 'online')) {
        sendMessage(user ,'account.setOnline')
        Sessions.updateOneSession(user.id, 'online', new Date().getTime() + (1000 * random.int(300, 305)));
        controllers.online.Run(user);
    }
    else {
        let time = (await Sessions.getOne(user.id, 'online')).time_exit - new Date().getTime();
        setTimeout( () => controllers.online.Run(user), time);
    }
};