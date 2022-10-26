import Datastore from 'nedb';
import { getTimeBeforeEvent } from '../common/getTimeBeforeEvent';


/*
*   Реакция на фразу: "Ты че пес" и ее производные.
*/
const WHAT_ARE_YOU_DOG =
    ['ты че пес', 'ты че пёс', 'ты че, пес', 'ты че, пес', 'ты пес', 'ты, пес', 'ты пёс', 'ты, пёс', 'пёс', 'пес', 'псина'];

export const whatAreYouDog = (ctx) => {
    ctx.reply('Гав!');
};


/*
*   Реакция на фразу: "Ну че там" и ее производные.
*/
const WHATS_UP_THERE =
    ['ну че там', 'ну чё там', 'ну чо там'];

export const whatsUpThere = (ctx) => {
    var db = new Datastore({ filename: './src/db/drink', autoload: true });
    db.loadDatabase();

    db.find({ key: 'eventTimestamp' }, function (err, eventTimestamp) {
        if (!eventTimestamp)
            ctx.replyWithHTML(`Ошибка`);
        else {
            let timerText = getTimeBeforeEvent(eventTimestamp[0].value);
            if (timerText === false)
                ctx.replyWithHTML(`<b>А все</b>`);
            else
                ctx.replyWithHTML(`Ещё <b>${timerText}</b> до бухыча`);
        }
    });
};


/*
*   Главная функция вызова диалогов.
*/
export const getTalk = (ctx) => {
    let message = ctx.update.message.text.toLowerCase();

    // Реакция на фразу: "Ты че пес" и ее производные.
    if (WHAT_ARE_YOU_DOG.includes(message)) {
        whatAreYouDog(ctx);
    };

    // Реакция на фразу: "Ну че там" и ее производные.
    if (WHATS_UP_THERE.includes(message)) {
        whatsUpThere(ctx);
    };
};




