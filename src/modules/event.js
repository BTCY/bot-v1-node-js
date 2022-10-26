import Datastore from 'nedb';
import { getTimeBeforeEvent } from '../common/getTimeBeforeEvent';


/*
*   Возвращает сколько осталось до следующей пьянки.
*/
export const getEvent = (ctx) => {
    var db = new Datastore({ filename: './src/db/event', autoload: true });
    db.loadDatabase();

    db.find({ key: 'eventTimestamp' }, function (err, eventTimestamp) {
        if (!eventTimestamp)
            ctx.replyWithHTML(`Ошибка`);
        else {
            let timerText = getTimeBeforeEvent(eventTimestamp[0].value);
            if (timerText === false)
                ctx.replyWithHTML(`<b>Событие прошло!</b>`);
            else
                ctx.replyWithHTML(`До осталось <b>${timerText}</b>`);
        };
    });
};


/*
*   Устанавливает дату следующей пьянки.
*/
export const setEvent = (ctx) => {
    var dateReg = /^\d{2}([.])\d{2}\1\d{4}([ ])\d{2}([:])\d{2}$/;
    let [first, ...rest] = ctx.update.message.text.split(' ');
    let newEventTimestamp = rest.join(' ') || undefined;
    if (!!newEventTimestamp && dateReg.test(newEventTimestamp)) {
        var db = new Datastore({ filename: './src/db/event', autoload: true });
        db.loadDatabase();
        ctx.replyWithHTML(`OK`);
        // db.insert({ key: 'eventTimestamp', value: newEventTimestamp });
        db.update({ key: 'eventTimestamp' }, { key: 'eventTimestamp', value: newEventTimestamp }, {});
    }
    else {
        ctx.replyWithHTML(`<b>ОШИБКА</b>\nНеправильный формат даты / времени. Правильный формат - дд.мм.ггг чч.мм (прим. 31.12.2024 21:00)`);
    };
};

