import Parser from "rss-parser";

const SOURCES_LIST = {
    cnn: { name: "cnn.com", url: "http://rss.cnn.com/rss/edition_world.rss" },
    theverge: { name: "theverge.com", url: "https://www.theverge.com/rss/frontpage" }
};


/*
*   Get a list of news.
*/
export const getNewsList = async (ctx) => {
    let command = ctx.update.message.text.split(" ");
    let sourceName;
    let sourceURL;

    switch (command[1]) {
        case undefined:
            sourceName = SOURCES_LIST.theverge.name;
            sourceURL = SOURCES_LIST.theverge.url;
            break;
        case "c":
            sourceName = SOURCES_LIST.cnn.name;
            sourceURL = SOURCES_LIST.cnn.url;
            break;
        case "v":
            sourceName = SOURCES_LIST.theverge.name;
            sourceURL = SOURCES_LIST.theverge.url;
            break;
        default:
            sourceURL = "error";
            break;
    };

    if (sourceURL === "error") {
        ctx.replyWithHTML(` 
Invalid news source
Correct format: /news or /news <i>source</i> (example /news c)
Sources: c - cnn.com, v - theverge
`);
    }
    else {
        let parser = new Parser();
        let news = await parser.parseURL(sourceURL);
        let newsFeed = "";
        news.items.forEach(item => {
            newsFeed += `${item.title} - <a href="${item.link}">read</a>\n\n`;
        });
        ctx.replyWithHTML(`
<b>Last news</b>

${newsFeed}
${sourceName} 
`)
    }
};


