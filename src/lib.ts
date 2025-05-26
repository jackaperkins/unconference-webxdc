export function offsetDay(startDay:Date | null, offset: number) {
    if(!startDay) {
        return null
    }   
    const next = new Date(startDay)
    next.setDate(startDay.getDate() + offset);
    return next
}

export function yearMonthDay(d){
    if(!d){
        return null
    }
    const date = new Date(d)

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
}