export default class DateLabel {

    static dateLabel(date) {
        const time = new Date(date)
        let hours = ""
        let minutes = ""
        if (time.getHours() < 10) {
            hours = `0${time.getHours()}`
        } else {
            hours = `${time.getHours()}`
        }
        if (time.getMinutes() < 10) {
            minutes = `0${time.getMinutes()}`
        } else {
            minutes = `${time.getMinutes()}`
        }
        return `${hours}:${minutes}`
    }
}