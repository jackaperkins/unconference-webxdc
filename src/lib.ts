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
    const start = new Date(event.fields.start.value)
    const end = new Date(event.fields.end.value)
    if (sameDay(start, today) || sameDay(end, today)) {
        return true
    }
}