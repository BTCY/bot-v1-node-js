require('dotenv').config();
const { Telegraf, Markup } = require('telegraf')
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {})
bot.start((ctx) => {
    try {
        ctx.replyWithHTML(`<b>Привет, ${ctx.message.chat.first_name} 👋👋</b>\n\nБот успешно запущен.`)
    } catch (e) { }
})

bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.command('w', Telegraf.reply('λ'))

bot.command('/comands', async (ctx) => {
    try {
        ctx.replyWithHTML(`Бот поддерживает следущие команды:`)
        ctx.replyWithHTML(`<b>/w - погода</b>`)
    } catch (e) {
        console.log(e)
    }
})

// bot.on('message', async (ctx) => {
bot.command('w', async (ctx) => {
    let location = 'Izhevsk'
    try {
        var weather_data = (await axios.get(`${process.env.WEATHER_SERVICE_API_URL}${location}`)).data
        if (weather_data.error === null && weather_data.result.length !== 0) {
            var data = weather_data.result[0]
            // ctx.replyWithHTML(`Сегодня в Ижевске <b><u>${data.location.name}</u></b>\n\n<b>${data.current.skytext}</b>\n\nCurrent Temperature: <b>${data.current.temperature} °C</b>\nFeels like: <b>${data.current.feelslike} °C</b>\nHumidity : <b>${data.current.humidity} %</b><em>\n\nBrought you by @t_projects</em>`);
            ctx.replyWithHTML(`Сегодня погода в <b>Ижевске</b>\n\nТемпература: <b>${data.current.temperature} °C</b>\nОщущается как: <b>${data.current.feelslike} °C</b>`);
        } else {
            ctx.reply("Данные не найдены");
        }
    } catch (e) { console.log(e) }
})


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))