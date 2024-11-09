import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with the required plugins
dayjs.extend(utc);
dayjs.extend(timezone);


export function formatDateFromEpoch(epochTime: number): string {
    return dayjs.unix(epochTime).tz('America/Los_Angeles').format('DD/MM/YYYY HH:mm');
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