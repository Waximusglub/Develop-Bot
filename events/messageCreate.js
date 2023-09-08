const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(msg) {
    //if this do nothing
    if (msg.author.bot) return;
    if (!msg.content.startsWith("º")) return;


    //Text Command Handler
    try {
        const command = msg.content.toLowerCase().slice(1).split(" ")[0];
        const executeCom = require(`../commands/${command}.js`);
        executeCom(msg);

    } catch (error) {
        console.log(`Error on inline Command`)
        console.log(error)
    }
    },
};