exports.Run = function (user) {
    console.log('Автостатус для ' + user.id + ' Включен!');
    setInterval(() => sendMessage(user, 'status.set', updateStatus(user)), 1000 * random.int(66, 80));
};

function updateStatus(user) {
    // Поиск рандомного статуса
    let user_status = render('auto-statuses', {
        user: user.id
    });
    let new_status = user_status[random.int(0, user_status.length - 1)];

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
    if (user.time == 9) status_date = '';

    // Показываем что работает в статус
    let the_information_in_the_status = '';
    if (user.the_information_in_the_status === true){
        let auto_status = user.status ? 'T' : 'F';
        let online = user.online ? 'T' : 'F';
        let auto_message = user.messages ? 'T' : 'F';
        let auto_biba = user.biba ? 'T' : 'F';
        the_information_in_the_status = auto_status + online + auto_message + auto_biba;
    }

    if (new_status === undefined) {
        new_status = '';
    }
    if (status_date !== '') {
        if (new_status !== '') {
            status_date += ' || ';
            if (user.the_information_in_the_status === true)
                new_status += ' || ';
        } else
            if (user.the_information_in_the_status === true)
                status_date += ' || ';
    } else {
        if (new_status !== '')
            if (user.the_information_in_the_status === true)
                new_status += ' || ';
    }


    let status  = status_date + new_status + the_information_in_the_status;

    return {text: status};
}