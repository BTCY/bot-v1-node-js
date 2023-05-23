import Datastore from "nedb";
import { getTimeBeforeEvent } from "../common/getTimeBeforeEvent";


/**
 *  Get how much time is left before the set event.
 */
export const getEvent = (ctx) => {
    var db = new Datastore({ filename: "./src/db/event", autoload: true });
    db.loadDatabase();

    db.find({ key: "eventTimestamp" }, (_, eventTimestamp) => {
        if (!eventTimestamp)
            ctx.replyWithHTML("Error!");
        else {
            let timerText = getTimeBeforeEvent(eventTimestamp[0].value);
            if (timerText === false)
                ctx.replyWithHTML("<b>The event has passed!</b>");
            else
                ctx.replyWithHTML(`<b>${timerText}</b> left before the event.`);
        };
    });
};


/**
 *  Set the date of the event.
 */
export const setEvent = (ctx) => {
    var dateReg = /^\d{2}([.])\d{2}\1\d{4}([ ])\d{2}([:])\d{2}$/;
    let [first, ...rest] = ctx.update.message.text.split(" ");
    let newEventTimestamp = rest.join(" ").trim() || undefined;
    if (!!newEventTimestamp && dateReg.test(newEventTimestamp)) {
        var db = new Datastore({ filename: "./src/db/event", autoload: true });
        db.loadDatabase();
        ctx.replyWithHTML("OK");
        db.update({ key: "eventTimestamp" }, { key: "eventTimestamp", value: newEventTimestamp }, {});
    }
    else {
        ctx.replyWithHTML("<b>ERROR</b>\nWrong date/time format. The correct format is dd.mm.yy hh.mm (example /set_event 31.12.2024 21:00)");
    };
};

