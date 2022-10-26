import Parser from 'rss-parser';

const SOURCES_LIST = {
    mail: { name: 'mail.ru', url: 'https://news.mail.ru/rss/main/' },
    rambler: { name: 'rambler.ru', url: 'https://news.rambler.ru/rss/Russia/?limit=20' }
};


/*
*   Get a list of news.
*/
export const getNewsList = async (ctx) => {
    let command = ctx.update.message.text.split(' ');
    let sourceName;
    let sourceURL;

    switch (command[1]) {
        case undefined:
            sourceName = SOURCES_LIST.mail.name;
            sourceURL = SOURCES_LIST.mail.url;
            break;
        case 'm':
            sourceName = SOURCES_LIST.mail.name;
            sourceURL = SOURCES_LIST.mail.url;
            break;
        case 'r':
            sourceName = SOURCES_LIST.rambler.name;
            sourceURL = SOURCES_LIST.rambler.url;
            break;
        default:
            sourceURL = 'error';
            break;
    };

    if (sourceURL === 'error') {
        ctx.replyWithHTML(` 
Не верно указан источник новостей
Правильный формат: /news или или /news <i>источник</i> (прим. /news r)
Источники: m - mail.ru, r - rambler
`);
    }
    else {
        let parser = new Parser();
        let news = await parser.parseURL(sourceURL);
        let newsFeed = '';
        news.items.forEach(item => {
            newsFeed += `${item.title} - <a href='${item.link}'>читать</a>\n\n`;
        });
        ctx.replyWithHTML(`
<b>Новости</b>

${newsFeed}
${sourceName} 
`)
    }
};


