const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;//We want commands only
        const command = client.commands.get(interaction.commandName);//We gate de  comand on the collection
        
        try {
            await command.execute(interaction);
        } catch (error) {
            console.log(`Error executing the command ${interaction.commandName}`);
            console.log(error)
        }
    },
};