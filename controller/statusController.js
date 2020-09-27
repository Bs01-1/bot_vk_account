exports.Run = function (user) {
    console.log('Автостатус для ' + user.id + ' Включен!');
    UpdateStatus(user);
    // setInterval(() => send_message(user, 'status.set', UpdateStatus(user)), 1000 * random.int(66, 80));
}

function UpdateStatus(user) {
    // Поиск рандомного статуса
    let statuses = [];

    for (let i = 0; i < config.statuses.length; i++){
        if (config.statuses[i].id == user.id){
            for (let j = 0; j < config.statuses[i].text.length; j++){
                statuses.push(config.statuses[i].text[j])
            }
        }
    }
    for (let i = 0; i < config.statuses[0].text.length; i++){
        statuses.push(config.statuses[0].text[i]);
    }
    let random_status = statuses[random.int(0, statuses.length - 1)];
    statuses = [];

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

    let status  = status_date + random_status + ' || ' + auto_status + online + auto_message;

    return status;
}