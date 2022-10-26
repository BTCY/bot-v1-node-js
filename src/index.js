require('dotenv').config();
import { Telegraf } from 'telegraf';
import { getEvent, setEvent } from './modules/event';
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
        ctx.replyWithHTML(`<b>${ctx.message.chat.first_name} 👋👋</b>`);
    }
    catch (e) { }
});

/*
*   --------------------------------------------------
*/


/*
*   Get help on bot commands.
*   Module /modules/help.js
*/
bot.command('help', (ctx) => getHelp(ctx))


/*
*   Get the weather forecast.
*   Module /modules/weather.js
*/
bot.command('w', async (ctx) => await getWeather(ctx));


/*
*   Get the weather forecast for Yagul.
*   Module /modules/weather.js
*/
bot.command('w_yagul', async (ctx) => await getWeather(ctx, 'Yagul'));


/*
*   Get a random post from Pikabu (TODO).
*   Module /modules/pikabu.js
*/
bot.command('pikabu', async (ctx) => await getRandomPikabuPost(ctx));


/*
*   Get how much time is left before the set event (in setEvent()).
*   Module /modules/event.js
*/
bot.command('event', (ctx) => getEvent(ctx));

/*
*   Set the date of the event.
*   Module /modules/event.js
*/
bot.command('set_event', (ctx) => setEvent(ctx));


/*
*   Get the news list.
*   Module /modules/news.js
*/
bot.command('news', async (ctx) => await getNewsList(ctx));


/*
*   Get exchange rate of the ruble.
*   Module /modules/exchangeRate.js
*/
bot.command('rub', async (ctx) => await getExchangeRate(ctx));


/*
*   Get the bot's reaction to stickers and emoji.
*   Module /modules/emoji.js
*/
bot.on('sticker', (ctx) => getEmoji(ctx));


/*
*   Get the bot's reaction to certain dialogs.
*   Module /modules/talk.js
*/
bot.on('message', (ctx) => getTalk(ctx));


/*
*   --------------------------------------------------
*/

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));