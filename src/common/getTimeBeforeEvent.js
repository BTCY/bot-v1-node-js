import * as dateFns from "date-fns";
import ru from "date-fns/locale/ru";


/**
 *  Get how much is left before the event.
 */
export const getTimeBeforeEvent = (eventDateTime) => {
    let currentTimestamp = new Date().getTime();
    let eventDate = eventDateTime.split(" ")[0].split(".");
    let eventTime = eventDateTime.split(" ")[1].split(":");
    let eventTimestamp = new
        Date(
            eventDate[2],
            +eventDate[1] - 1,
            eventDate[0],
            eventTime[0],
            eventTime[1],
        ).getTime();
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

