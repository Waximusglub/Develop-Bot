const Discord = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');


let commands = [];
fs.readdirSync('slash_commands')
    .forEach((file) => {
        const command = require(`./slash_commands/${file}`);
        commands.push(command.data.toJSON());
    });

const REST = new Discord.REST({ version: '9' }).setToken(token);

(async () => {

    try {
        await REST.put(
            Discord.Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('Comandos de / actualizados')
    } catch (error) {
        console.log(error);
    }

})();