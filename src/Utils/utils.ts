import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with the required plugins
dayjs.extend(utc);
dayjs.extend(timezone);


export function formatDateFromEpoch(epochTime: number): string {
    return dayjs.unix(epochTime).tz('America/Los_Angeles').format('DD/MM/YYYY HH:mm');
}