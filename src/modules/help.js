
/*
*   Get help for the bot and commands. 
*/
export const getHelp = (ctx) => {
    ctx.replyWithHTML(`
The bot supports the following commands:

<b>WEATHER</b> 
/w <i>[city name in english]</i> - weather in selected city

<b>TIMERS</b>
/event - when is the next event
/set_event - set the date of the next event in the format dd.mm.yy hh.mm (note 12/31/2024 21:00)

<b>NEWS</b>
/news - news list (default source - mail)
/news <i>[news source]</i> - list of news from a specific source
    Available news source:
        r - rambler
        m - mail
/rub - ruble's exchange rate
`)
};

