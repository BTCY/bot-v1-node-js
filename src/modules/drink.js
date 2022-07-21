import Datastore from 'nedb';
import { getTimer } from '../common/getTimer';


/*
*   Возвращает сколько осталось до следующей пьянки.
*/
export const getDrink = (ctx) => {
    var db = new Datastore({ filename: './src/db/drink', autoload: true });
    db.loadDatabase();

    db.find({ key: 'eventTimestamp' }, function (err, eventTimestamp) {
        if (!eventTimestamp)
            ctx.replyWithHTML(`Ошибка`);
        else {
            let timerText = getTimer(eventTimestamp[0].value);
            if (timerText === false)
                ctx.replyWithHTML(`<b>Пьянка прошла! Теперь вспоминайте ее и плачьте 🤡</b>`);
            else
                ctx.replyWithHTML(`Пьем через:  <b>${timerText}</b>`);
        };
    });
};


/*
*   Устанавливает дату следующей пьянки.
*/
export const setDrink = (ctx) => {
    var dateReg = /^\d{2}([.])\d{2}\1\d{4}([ ])\d{2}([:])\d{2}$/;
    let [first, ...rest] = ctx.update.message.text.split(' ');
    let newEventTimestamp = rest.join(' ') || undefined;
    if (!!newEventTimestamp && dateReg.test(newEventTimestamp)) {
        var db = new Datastore({ filename: './src/db/drink', autoload: true });
        db.loadDatabase();
        ctx.replyWithHTML(`OK`);
        // db.insert({ key: 'eventTimestamp', value: newEventTimestamp });
        db.update({ key: 'eventTimestamp' }, { key: 'eventTimestamp', value: newEventTimestamp }, {});
    }
    else {
        ctx.replyWithHTML(`https://sun6-23.userapi.com/impg/0RBbNd1XIddiS6-t7ZDzutrIlUT_XHikLx5a6g/Kk2absAFwYg.jpg?size=604x484&quality=96&sign=cb51229e8451439c9fbff803598c4de8&type=album`);
        ctx.replyWithHTML(`<b>ОШИБКА</b>\nНеправильный формат даты / времени. Правильный формат - дд.мм.ггг чч.мм (прим. 31.12.2024 21:00)`);
    };
};

