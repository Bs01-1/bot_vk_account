exports.Run = function (user) {
    console.log('Автостатус для ' + user.id + ' Включен!');
    setInterval(() => send_message(user, 'status.set', updateStatus(user)), 1000 * random.int(66, 80));
}

function updateStatus(user) {
    // Поиск рандомного статуса
    let statuses = [];

    for (let i = 0; i < config.statuses.length; i++){
        if (config.statuses[i].id == user.id){
            for (let j = 0; j < config.statuses[i].text.length; j++){
                statuses.push(config.statuses[i].text[j])
            }
        } else console.log('Статусы для ' + user.id + ' не найдены! Будут использоваться только страндартные статусы.')
    }
    for (let i = 0; i < Default.status.length; i++){
        statuses.push(Default.status[i]);
    }
    let random_status = statuses[random.int(0, statuses.length - 1)];
    // Делаем красивую дату/время
    let time = Time.get();

    let status_date;
    if (user.time == 8) user.time = random.int(1,7);
    if (user.time == 1) status_date = time.hour + 'H ' + time.minutes + ' M';
    if (user.time == 2) status_date = 'Время - ' + time.hour + ':' + time.minutes;
    if (user.time == 3) status_date = 'Time - ' + time.hour + ':' + time.minutes;
    if (user.time == 4) status_date = 'Date : ' + time.month + '-' + '-' + time.day + '-' + time.year;
    if (user.time == 5) status_date = 'Дата' + time.day + '-' + time.month + '-' + time.year;
    if (user.time == 6) status_date = 'Date : ' + time.month + '-' + time.day + '-' + time.year + ' | ' + time.hour + ':' + time.minutes;
    if (user.time == 7) status_date = 'Дата : ' + time.day + '-' + time.month + '-' + time.year + ' | ' + time.hour + ':' + time.minutes;
    status_date += ' || ';
    if (user.time == 9) status_date = '';

    // Показываем что работает в статус
    let auto_status = user.status ? 'T' : 'F';
    let online = user.online ? 'T' : 'F';
    let auto_message = user.messages ? 'T' : 'F';

    let the_information_in_the_status;
    if (config.settings.the_information_in_the_status === false) the_information_in_the_status = '';
    else the_information_in_the_status = ' || ' + auto_status + online + auto_message;

    let status  = status_date + random_status + the_information_in_the_status;

    return status;
}