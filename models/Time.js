/** Класс для работы со временем */
module.exports = class Time {
    /**
     * Получаем объект с текущим временем
     * @returns {{hour: int, month: int, year: int, minutes: int, day: int}}
     */
    static getObjectTime (){
        let date = new Date();
        let hours = this.timeZone(date)

        return {
            minutes: Number((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()),
            hour: hours,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
        }
    }

    /**
     * Устанавливаем часовой пояс
     * @param {object} date
     * @returns {string}
     */
    static timeZone(date){
        date.setHours(date.getUTCHours() + config.settings.time_zone);
        return date.getHours().toString();
    }

    /**
     * Получаем рандомный день и проверяем на ночное время
     * @param {int} from
     * @param {int} to
     * @returns {int}
     */
    static getRandomDayAndCheckNightTime(from, to){
        let time = new Date().getTime() + 1000 * 60 * 60 * 24 * random.int(from, to);

        while (new Date(time).getUTCHours() + config.settings.time_zone >= 7){
            time += random.int(1000, 5000) * 60 * 60;
        }
        return time;
    }
}