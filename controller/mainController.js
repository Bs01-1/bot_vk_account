Run(Users.getAll());

async function Run(users) {
    users = await users;

    // Убрать
    users = [users[1]];

    for (let i = 0; i < users.length; i++){
        let user = users[0];

        // let user = users[i];
        user.controller = 'status';
         if (users[i].status) {
             console.log('Автостатус для ' + user.vk_id + ' Включен!');
             await controllers.status.Run(user);
         }
         if (users[i].online) {
             console.log('Вечный онлайн для ' + user.vk_id + ' Включен!');
             await controllers.online.Run(user);
         }
         if (users[i].iris) {
             console.log('Автоферма для ' + user.vk_id + ' включена!');
             await controllers.iris.Run(user);
         }
         if (users[i].biba) {
             console.log('Авто-биба для ' + user.vk_id + ' включена!');
             await controllers.biba.Run(user);
         }
         if (users[i].message) {
             await controllers.messages.Run(user);
         }
    }
}
