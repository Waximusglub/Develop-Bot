//Discord js 
const { Client, Collection, Intents } = require('discord.js');

//Tools
const fs = require('node:fs');
const path = require('node:path');

//Config
const { token } = require('./config.json');


//Client Object
//##################################################
const client = new Client({
    intents: 3276799 //https://discord-intents-calculator.vercel.app

    // intents: [
    //     Intents.FLAGS.GUILDS,
    //     Intents.FLAGS.GUILDS_MESSAGES,
    //     Intents.FLAGS.GUILDS_VOICE_STATES,
    // ]

});


//Collections
//###########################################
client.commands = new Collection(); //Commands
client.cooldowns = new Collection(); //Commands CD


//Slash Command Handler
//##################################################

const foldersPath = path.join(__dirname, 'slash_commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {

        const filePath = path.join(commandsPath, file);
        const command = require(filePath)

        if ('execute' in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.log(`Error File: ${filePath}`)
        }

    }

}

//Event Handler
//##################################################
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


//Connect
//##################################################
client.login(token);

