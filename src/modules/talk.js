/**
 *  The reaction to the phrase: "what's up" and its derivatives.
 */
const WHATS_UP_THERE =
    ["what's up", "what's up!", "whats up", "whats up!", "whatsup", "whatsup!",];

export const whatsUpThere = (ctx) => {
    ctx.reply("Wassup!");
};


/**
 *  The main function of calling dialogs.
 */
export const getTalk = (ctx) => {
    let message = ctx.update.message.text.toLowerCase();

    // The reaction to the phrase: "what's up" and its derivatives.
    if (WHATS_UP_THERE.includes(message)) {
        whatsUpThere(ctx);
    };
};
