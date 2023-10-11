const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        console.log(`Bot is ready as: ${client.user.tag}`);
        client.user.setPresence({ activities: [{ name: 'Always Ready' }], status: 'online' });
	},
};