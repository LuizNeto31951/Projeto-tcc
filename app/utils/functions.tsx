export const formatDueDate = (dueDate: string) => {
    if (dueDate) {
        const [day, month, year] = dueDate.split('-');
        return `${day}/${month}/${year}`;
    }
    return 'Sem data definida';
};


export const formatDate = (text: string) => {
    let cleaned = text.replace(/\D/g, '');

    if (cleaned.length > 2) cleaned = cleaned.slice(0, 2) + '-' + cleaned.slice(2);
    if (cleaned.length > 5) cleaned = cleaned.slice(0, 5) + '-' + cleaned.slice(5, 9);

    return cleaned;
};

export const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

export function isOneWeekPassed(dateString: string): boolean {
    const lastDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - lastDate.getTime();
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;

    return diffInMs >= oneWeekInMs;
}