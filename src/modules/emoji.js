
/*
*   Emoji: like
*/
export const like = (ctx) => {
    ctx.reply('👍');
};


/*
*   The main function of calling emotions.
*/
export const getEmoji = (ctx) => {
    like(ctx);
};


