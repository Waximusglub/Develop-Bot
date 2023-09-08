const Discord = require('discord.js');

//Config
const { clientId, guildId, token } = require('./config.json');

//Tools
const fs = require('node:fs');
const path = require('node:path');


let commands = [];

const foldersPath = path.join(__dirname, 'slash_commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`Deploy Command Error on File: ${filePath}`);
        }
    }
}

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