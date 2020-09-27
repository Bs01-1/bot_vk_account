exports.Run = function (user) {
    console.log('Вечный онлайн для ' + user.id + ' Включен!');
    setInterval(() => send_message(user ,'account.setOnline'), 1000 * random.int(250, 300));
}