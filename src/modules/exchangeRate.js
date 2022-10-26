import Parser from 'rss-parser';


function cutTags(str) {
    var regex = /( |<([^>]+)>)/ig,
        result = str.replace(regex, "");

    return result;
}

/*
*   Get the ruble exchange rate.
*/
export const getExchangeRate = async (ctx) => {
    let parser = new Parser();
    let news = await parser.parseURL('https://currr.ru/rss/');
    let rate = '';
    rate = news.items[news?.items?.length - 1]
    let kurs = cutTags(rate.content).split('EUR:');

    ctx.replyWithHTML(`
<b>RUB (${(rate.title).toLowerCase()})</b>

USD: ${kurs[0].trim().split('USD:')[1]}
EUR: ${kurs[1].trim()}
`)
};


