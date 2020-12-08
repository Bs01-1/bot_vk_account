exports.Run = function (user) {
    let session = ['biba-bibon', 'biba-bigbon-fap'];
    let session_time_arr = [
        (time) => {
            return time + 2000 * random.int(61, 64);
        },
        (time) => {
            return time + 1000 * 60 * random.int(61, 63);
        }
    ];
    let configs = {peer_id: '-194038078'};

    autoBibon(user, session[0], session_time_arr[0], configs);
    autoBignonAndFap(user, session[1], session_time_arr[1], configs);
};

async function autoBibon(user, session, session_arr, configs) {
    let session_time = await session_arr(new Date().getTime());

    let result = await Sessions.checkSessionRunAndUpdate(user, 'biba', session, session_time);
    if(typeof result == 'object') {
        setTimeout( () => autoBibon(user, session, session_arr, configs), result.time);
        return;
    }
    else if (result === true) {
        let session_count = (await Sessions.getOne(user.id, session)).count += 1;

        if (session_count >= 27) {
            await Sessions.updateSession(user.id, session, new Date().getTime() + 1000 * 60 * 100, 1);
            console.log("Ждем")
        } else
            await Sessions.updateSession(user.id, session, session_time, session_count);

        await autoBibon(user, session, session_arr, configs);
    }

    configs.message = 'бибон';
    sendMessage(user, 'messages.send', configs);
}

async function autoBignonAndFap(user, session, session_arr, configs) {
    let session_time = await session_arr(new Date().getTime());

    let result = await Sessions.checkSessionRunAndUpdate(user, 'biba', session, session_time);
    if(typeof result == 'object') {
        setTimeout( () => autoBignonAndFap(user, session, session_arr, configs), result.time);
        return;
    }
    else if (result === true)
        await autoBignonAndFap(user, session, session_arr, configs);

    configs.message = 'бигбон';
    sendMessage(user, 'messages.send', configs);
    configs.message = 'фап';
    sendMessage(user, 'messages.send', configs);
}