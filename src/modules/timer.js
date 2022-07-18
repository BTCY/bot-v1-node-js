import * as dateFns from 'date-fns';
import ru from 'date-fns/locale/ru';

export const getTimer = (eventTimestamp) => {
    let currentTimestamp = new Date().getTime();
    let comparisonResult = eventTimestamp - currentTimestamp;

    if (comparisonResult > 0) {
        let duration = dateFns.intervalToDuration({
            start: new Date(currentTimestamp),
            end: new Date(eventTimestamp),
        });
        return `${dateFns.formatDuration(duration, { locale: ru })}`;
    }
    else
        return false;
};