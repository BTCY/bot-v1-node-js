require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
// var validator = require('validator'); 
import { getDrink, setDrink } from './modules/drink';
import { getTalk } from './modules/talk';
import { getWeather } from './modules/weather';
import { getRandomPikabuPost } from './modules/pikabu';
import { getHelp } from './modules/help';
import { getEmoji } from './modules/emoji';
import { getNewsList } from './modules/news';
import { getExchangeRate } from './modules/exchangeRate';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {})

bot.start((ctx) => {
    try {
        ctx.replyWithHTML(`<b>Привет, ${ctx.message.chat.first_name} 👋👋</b>\n\nБот успешно запущен.`);
    } catch (e) { }
});

/*
*   --------------------------------------------------
*/


/*
*   Возвращает справку по боту и командам.
*   Модуль /modules/help.js
*/
bot.command('help', (ctx) => getHelp(ctx))


/*
*   Возвращает прогноз погоды.
*   Модуль /modules/weather.js
*/
bot.command('w', async (ctx) => await getWeather(ctx));


/*
*   Возвращает прогноз погоды для Ягул.
*   Модуль /modules/weather.js
*/
bot.command('w_yagul', async (ctx) => await getWeather(ctx, 'Yagul'));


/*
*   Возвращает случайны пост с Pikabu.
*   Модуль /modules/pikabu.js
*/
bot.command('p', async (ctx) => await getRandomPikabuPost(ctx));


/*
*   Возвращает сколько осталось до следующей пьянки.
*   Модуль /modules/drink.js
*/
bot.command('drink', (ctx) => getDrink(ctx));

/*
*   Устанавливает дату следующей пьянки.
*   Модуль /modules/drink.js
*/
bot.command('set_drink', (ctx) => setDrink(ctx));


/*
*   Возвращает список новостей.
*   Модуль /modules/news.js
*/
bot.command('news', async (ctx) => await getNewsList(ctx));


/*
*   Возвращает курс рубля.
*   Модуль /modules/exchangeRate.js
*/
bot.command('rub', async (ctx) => await getExchangeRate(ctx));


/*
*   Возвращает реакцию бота на стикеры и emoji.
*   Модуль /modules/emoji.js
*/
bot.on('sticker', (ctx) => getEmoji(ctx));


/*
*   Возвращает реакцию бота на определенные диалоги (модуль разговоров).
*   Модуль /modules/talk.js
*/
bot.on('message', (ctx) => getTalk(ctx));


/*
*   --------------------------------------------------
*/

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));