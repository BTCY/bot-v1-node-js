import axios from 'axios';
import jsdom from 'jsdom';


/*
*   Возвращает случайны пост с Pikabu. 
*/
export const getRandomPikabuPost = async (ctx) => {
    const response = await axios.request({
        method: 'GET',
        url: 'https://pikabu.ru/story/zanimatelnaya_matematika_9017937',
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    });

    const decoder = new TextDecoder('windows-1251');
    let html = decoder.decode(response.data);

    // console.log(html)
    // const resp = await axios.get('https://pikabu.ru/story/zanimatelnaya_matematika_9017937', { responseEncoding: 'utf8' })
    const dom = new jsdom.JSDOM(html);
    const elementTitle = dom.window.document.querySelector('span.story__title-link').textContent;
    const elementImg = dom.window.document.querySelector('.story-image__content > a').getAttribute('href');
    if (elementTitle) {
        ctx.replyWithHTML(`<b>${elementTitle}</b>${elementImg}`);
    };
};


