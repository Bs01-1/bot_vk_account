Run();
async function Run() {
    let user;
    if (config.settings.bot == 'test'){
        Start(user = await Users.getOne(config.settings.bot));
    } else if (config.settings.bot == 'main'){
        let users = await Users.getAll();

        for (let i = 0; i < users.length; i++){
            user = users[i]

            if (user.permission != 'test')
                if (user.permission != 'group')
                    Start(user);
        }
    }
}

async function Start(user) {
    if (user.status) {
        console.log('Автостатус для ' + user.vk_id + ' Включен!');
        await controllers.status.Run(user);
    }
    if (user.online) {
        console.log('Вечный онлайн для ' + user.vk_id + ' Включен!');
        await controllers.online.Run(user);
    }
    if (user.iris) {
        console.log('Автоферма для ' + user.vk_id + ' включена!');
        await controllers.iris.Run(user);
    }
    if (user.biba) {
        console.log('Авто-биба для ' + user.vk_id + ' включена!');
        await controllers.biba.Run(user);
    }
    if (user.message) {
        await controllers.messages.Run(user);
    }
}
