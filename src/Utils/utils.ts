import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with the required plugins
dayjs.extend(utc);
dayjs.extend(timezone);


export function formatDateFromEpoch(
    epochTime: number,
    timezone: string = 'America/Los_Angeles',
    datetimeFormat: string = 'DD/MM/YYYY HH:mm'
): string {
    return dayjs.unix(epochTime).tz(timezone).format(datetimeFormat);
}


export function unsecuredCopyToClipboard(copyText: string) {
    if (navigator.clipboard) { // If normal copy method available, use it
        navigator.clipboard.writeText(copyText);
    } else { // Otherwise fallback to the above function

        const textArea = document.createElement("textarea");
        textArea.value = copyText;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
        document.body.removeChild(textArea);
    }
}