exports.Run = function (user) {
    let count = 1;
    let run = function () {
        setTimeout(function () {
            if (count >= 27) {
                setTimeout(function () {
                    count = 1;
                    message_config.message = 'фап';
                    pre_send(message_config, user);
                    message_config.message = 'бигбон';
                    pre_send(message_config, user);
                    run();
                }, 1000 * 60 * 100);
            } else {
                message_config.message = 'бибон';
                pre_send(message_config, user);
                count += 1;
                run();
            }
        }, 2000 * 60);
    };
    run();
};
