module.exports = class Time {
    static get (){
        let date = new Date();
        let hours = this.timeZone(date)

        return {
            minutes: (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
            hour: hours,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
        }
    }
    static timeZone(date){
        date.setHours(date.getUTCHours() + config.settings.time_zone);
        return date.getHours().toString();
    }

    static getRandomDayAndCheckNightTime(from, to){
        let time = new Date().getTime() + 1000 * 60 * 60 * 24 * random.int(from, to);

        while (new Date(time).getUTCHours() + config.settings.time_zone >= 7){
            time += random.int(1000, 5000) * 60 * 60;
        }
        return time;
    }
}