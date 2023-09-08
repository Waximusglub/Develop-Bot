const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        console.log(`Bot token: ${token}`);
        console.log(`Bot is ready as: ${client.user.tag}`);
        client.user.setActivity(`si estoy jugando k miras`)
	},
};