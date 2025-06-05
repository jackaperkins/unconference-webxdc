import { Event } from "p2p/operation";

export function offsetDay(startDay: Date | null, offset: number) {
    if (!startDay) {
        return null
    }
    const next = new Date(startDay)
    next.setDate(startDay.getDate() + offset);
    return next
}

export function yearMonthDay(d) {
    if (!d) {
        return null
    }
    const date = new Date(d)

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
}

export function sameDay(d1: Date, d2: Date) {
    return d1.toDateString() === d2.toDateString()
}

export function eventOverlapsToday(today: Date, event: Event) {
    const start = yearMonthDay(new Date(event.fields.start.value)) || ''
    const end = yearMonthDay(new Date(event.fields.end.value)) || ''
    const todayDay = yearMonthDay(today) || ''
    if (
        start <= todayDay && todayDay <= end ||
        start == todayDay
    ) {
        return true
    }
}

export function dayAndDayName(date: string) {
    const theDate = new Date(date)
    const lang = navigator.language || navigator.languages[0];
    const weekday = theDate.toLocaleString(lang, { weekday: 'long' })
    const day = theDate.getDate()
    return `${weekday} ${getOrdinalSuffix(day)}`

}

export function getOrdinalSuffix(n: number) {
    if (n >= 11 && n <= 13) return `${n}th`;
    switch (n % 10) {
        case 1: return `${n}st`;
        case 2: return `${n}nd`;
        case 3: return `${n}rd`;
        default: return `${n}th`;
    }
};