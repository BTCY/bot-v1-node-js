require('dotenv').config();
const { Telegraf, Markup } = require('telegraf')
var validator = require('validator');
import Datastore from 'nedb';
import axios from 'axios';
import jsdom from 'jsdom';
import { getTimer } from './modules/timer.js'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {})

bot.start((ctx) => {
    try {
        ctx.replyWithHTML(`<b>Привет, ${ctx.message.chat.first_name} 👋👋</b>\n\nБот успешно запущен.`)
    } catch (e) { }
});


bot.on('sticker', (ctx) => ctx.reply('👍'))


bot.command('/comands', async (ctx) => {
    try {
        ctx.replyWithHTML(`
Бот поддерживает следущие команды:
<b>ПОГОДА</b>
/w - погода в Ижевске
/w_yagul - погода в Ягуле
/w [город на английском] - погода в выбранном городе

<b>ТАЙМЕРЫ</b>
/drink - когда следующая пьянка
/set_drink - установить даду следующей пьянки в формате дд.мм.ггг чч.мм (прим. 31.12.2024 21:00)

<b>РАЗВЛЕЧЕНИЯ</b>
/p - показывает самый лучший пост Пикабу
`)
    } catch (e) {
        console.log(e)
    }
})

// bot.on('message', async (ctx) => {
bot.command('w', async (ctx) => {
    let location = undefined;
    let [first, ...rest] = ctx.update.message.text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    let city = rest.join(' ') || undefined;
    let cityName = undefined;

    if (!city) {
        location = 'Izhevsk';
        cityName = 'Ижевск';
    }
    else {
        location = city;
        cityName = city;
    }
    try {
        var weather_data = (await axios.get(`${process.env.WEATHER_SERVICE_API_URL}${location}`)).data
        if (weather_data.error === null && weather_data.result.length !== 0) {
            var data = weather_data.result[0];
            ctx.replyWithHTML
                (`
<b>${cityName} - прогноз погоды</b>

Сейчас
------------
температура: <b>${data.current.temperature} °C</b>
ощущается как: <b>${data.current.feelslike} °C</b>
влажность: <b>${data.current.humidity} %</b>
скорость ветра: <b>${data.current.winddisplay}</b>
примечания: ${(data.current.skytext).toLowerCase()}

Завтра
------------
температура: <b>от ${data.forecast[2].low} до ${data.forecast[2].high} °C</b>
вероятность осадков: <b>${data.forecast[2].precip} %</b>
`);
        } else {
            ctx.reply("Данные не найдены");
        }
    } catch (e) { console.log(e) }
});


bot.command('w_yagul', async (ctx) => {
    let location = 'Yagul'
    try {
        var weather_data = (await axios.get(`${process.env.WEATHER_SERVICE_API_URL}${location}`)).data
        if (weather_data.error === null && weather_data.result.length !== 0) {
            var data = weather_data.result[0];
            ctx.replyWithHTML
                (`
<b>Ягул - прогноз погоды</b>

Сейчас
------------
температура: <b>${data.current.temperature} °C</b>
ощущается как: <b>${data.current.feelslike} °C</b>
влажность: <b>${data.current.humidity} %</b>
скорость ветра: <b>${data.current.winddisplay}</b>
примечания: ${(data.current.skytext).toLowerCase()}

Завтра
------------
температура: <b>от ${data.forecast[2].low} до ${data.forecast[2].high} °C</b>
вероятность осадков: <b>${data.forecast[2].precip} %</b>
`);
        } else {
            ctx.reply("Данные не найдены");
        }
    } catch (e) { console.log(e) }
});

bot.command('p', async (ctx) => {
    const response = await axios.request({
        method: 'GET',
        url: 'https://pikabu.ru/story/zanimatelnaya_matematika_9017937',
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    });

    const decoder = new TextDecoder('windows-1251');
    let html = decoder.decode(response.data)

    // console.log(html)
    // const resp = await axios.get('https://pikabu.ru/story/zanimatelnaya_matematika_9017937', { responseEncoding: 'utf8' })
    const dom = new jsdom.JSDOM(html)
    const elementTitle = dom.window.document.querySelector('span.story__title-link').textContent
    const elementImg = dom.window.document.querySelector('.story-image__content > a').getAttribute('href')
    if (elementTitle) {
        ctx.replyWithHTML(`<b>${elementTitle}</b>${elementImg}`)
    }
});

bot.command('/drink', async (ctx) => {
    var db = new Datastore({ filename: './src/db/timer', autoload: true });
    db.loadDatabase();

    db.find({ key: 'eventTimestamp' }, function (err, eventTimestamp) {
        if (!eventTimestamp)
            ctx.replyWithHTML(`Ошибка`)
        else {
            let timerText = getTimer(eventTimestamp[0].value);
            if (timerText === false)
                ctx.replyWithHTML(`<b>Пьянка прошла! Теперь вспоминайте ее и плачьте 🤡</b>`)
            else
                ctx.replyWithHTML(`Пьем через:  <b>${timerText}</b>`)
        }
    });
});

bot.command('/set_drink', async (ctx) => {
    var dateReg = /^\d{2}([.])\d{2}\1\d{4}([ ])\d{2}([:])\d{2}$/
    let [first, ...rest] = ctx.update.message.text.split(' ');
    let newEventTimestamp = rest.join(' ') || undefined;
    if (!!newEventTimestamp && dateReg.test(newEventTimestamp)) {
        var db = new Datastore({ filename: './src/db/timer', autoload: true });
        db.loadDatabase();
        ctx.replyWithHTML(`OK`)
        // db.insert({ key: 'eventTimestamp', value: newEventTimestamp });
        db.update({ key: 'eventTimestamp' }, { key: 'eventTimestamp', value: newEventTimestamp }, {});
    }
    else {
        ctx.replyWithHTML(`https://sun6-23.userapi.com/impg/0RBbNd1XIddiS6-t7ZDzutrIlUT_XHikLx5a6g/Kk2absAFwYg.jpg?size=604x484&quality=96&sign=cb51229e8451439c9fbff803598c4de8&type=album`)
        ctx.replyWithHTML(`<b>ОШИБКА</b>\nНеправильный формат даты / времени. Правильный формат - дд.мм.ггг чч.мм (прим. 31.12.2024 21:00)`)
    }
});

bot.command('/help', async (ctx) => {
    ctx.replyWithHTML(`<b>Сам себе помоги!</b>`)
});

bot.on('message', (ctx) => {
    let message = ctx.update.message.text.toLowerCase();
    if (message.includes('ты че пес')
        || message.includes('ты че пёс')
        || message.includes('ты че, пёс')
        || message.includes('ты че, пес')
        || message.includes('ты пес')
        || message.includes('ты, пес')
        || message.includes('ты пёс')
        || message.includes('ты, пёс')
        || message.includes('пёс')
        || message.includes('пес')
        || message.includes('псина')
    ) {
        ctx.reply('Гав!')
    };

    if (message.includes('ну че там')
        || message.includes('ну чё там')
        || message.includes('ну чо там')
    ) {
        var db = new Datastore({ filename: './src/db/timer', autoload: true });
        db.loadDatabase();

        db.find({ key: 'eventTimestamp' }, function (err, eventTimestamp) {
            if (!eventTimestamp)
                ctx.replyWithHTML(`Ошибка`)
            else {
                let timerText = getTimer(eventTimestamp[0].value);
                if (timerText === false)
                    ctx.replyWithHTML(`<b>А все</b>`);
                else
                    ctx.replyWithHTML(`Ещё <b>${timerText}</b> до бухыча`);
            }
        });
    }
});

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))