module.exports = class Time {
    static get (){
        let date = new Date();
        let hours = this.timeZone(date)

        return {
            minutes: date.getMinutes(),
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
}