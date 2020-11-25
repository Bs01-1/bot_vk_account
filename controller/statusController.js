exports.Run = async function (user) {
    if (!await Sessions.checkExist(user.id, 'auto-status'))
        if ((await Users.getOne(user.id)).status){
            await Sessions.add(user.id, 'auto-status', new Date().getTime());
        }

    if (await Sessions.checkTimeExit(user.id, 'auto-status')) {
        sendMessage(user, 'status.set', await updateStatus(user));
        Sessions.updateTimeExit(user.id, 'auto-status',new Date().getTime() + (1000 * random.int(60, 70)));
        controllers.status.Run(user);
    }
    else {
        let time = (await Sessions.getOne(user.id, 'auto-status')).time_exit - new Date().getTime();
        setTimeout( () => controllers.status.Run(user), time);
    }
};

async function updateStatus(user) {
    let status_info = await Status.get(user);

    // Поиск рандомного статуса
    let user_status = render('auto-statuses', {
        user: user.vk_id
    });
    let new_status = user_status[random.int(0, user_status.length - 1)];

    // Делаем красивую дату/время
    let status_date;
    if (status_info.type_time !== 9) {
        let time = Time.get();
        if (status_info.type_time == 8) status_info.type_time = random.int(1, 7);
        if (status_info.type_time == 1) status_date = time.hour + 'H ' + time.minutes + ' M';
        if (status_info.type_time == 2) status_date = 'Время - ' + time.hour + ':' + time.minutes;
        if (status_info.type_time == 3) status_date = 'Time - ' + time.hour + ':' + time.minutes;
        if (status_info.type_time == 4) status_date = 'Date : ' + time.month + '-' + '-' + time.day + '-' + time.year;
        if (status_info.type_time == 5) status_date = 'Дата' + time.day + '-' + time.month + '-' + time.year;
        if (status_info.type_time == 6) status_date = 'Date : ' + time.month + '-' + time.day + '-' + time.year + ' | ' + time.hour + ':' + time.minutes;
        if (status_info.type_time == 7) status_date = 'Дата : ' + time.day + '-' + time.month + '-' + time.year + ' | ' + time.hour + ':' + time.minutes;
    } else status_date = '';

    // Показываем что работает в статус
    let the_information_in_the_status = '';
    if (status_info.the_information_in_the_status ){
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
            if (status_info.the_information_in_the_status)
                new_status += ' || ';
        } else
            if (status_info.the_information_in_the_status)
                status_date += ' || ';
    } else {
        if (new_status !== '')
            if (status_info.the_information_in_the_status)
                new_status += ' || ';
    }

    let status  = status_date + new_status + the_information_in_the_status;

    return {text: status};
}