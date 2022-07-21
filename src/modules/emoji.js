/*
*   Emoji: нравится
*/
export const like = (ctx) => {
    ctx.reply('👍');
};


/*
*   Главная функция вызова emoji.
*/
export const getEmoji = (ctx) => {
    like(ctx);
};


