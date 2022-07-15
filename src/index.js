require('dotenv').config();
const { Telegraf, Markup } = require('telegraf')
const axios = require('axios');
const jsdom = require("jsdom");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {})

bot.start((ctx) => {
    try {
        ctx.replyWithHTML(`<b>Привет, ${ctx.message.chat.first_name} 👋👋</b>\n\nБот успешно запущен.`)
    } catch (e) { }
})


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

<b>РАЗВЛЕЧЕНИЯ</b>
/p - случайны пост с Pikabu
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
            ctx.replyWithHTML(`<b>${cityName} - прогноз погоды</b>\n\nТемпература: <b>${data.current.temperature} °C</b>\nОщущается как: <b>${data.current.feelslike} °C</b>`);
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
            ctx.replyWithHTML(`<b>Ягул - прогноз погоды</b>\n\nТемпература: <b>${data.current.temperature} °C</b>\nОщущается как: <b>${data.current.feelslike} °C</b>`);
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
    const time = 1657893600
    const currentTime = new Date().getTime() / 1000;
    const result = time - currentTime;
    let text = `${parseInt(result / 60 / 60)}:${parseInt(result / 60 % 60)}:${parseInt(result % 60)}`
    if (result > 0)
        ctx.replyWithHTML(`Пьем через:  <b>${text}</b>`)
    else
        ctx.replyWithHTML(`<b>Пьянка прошла! Теперь вспоминайте ее и плачьте 🤡</b>`)
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
        const time = 1657893600
        const currentTime = new Date().getTime() / 1000;
        const result = time - currentTime;
        let text = `${parseInt(result / 60 / 60)}:${parseInt(result / 60 % 60)}:${parseInt(result % 60)}`
        if (result > 0)
            ctx.replyWithHTML(`Еще <b>${text}</b> до бухыча`)
        else
            ctx.replyWithHTML(`<b>А все</b>`)
    }
});

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))