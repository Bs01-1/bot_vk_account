exports.Run = (user) => {
    console.log('Вечный онлайн для ' + user.id + ' Включен!');
    setInterval(() => sendMessage(user ,'account.setOnline'), 1000 * random.int(250, 300));
};