//Discord js 
const { Client, Collection, Intents } = require('discord.js');

//Tools
const fs = require('node:fs');
const path = require('node:path');

const { token } = require('./config.json');


//Client
const client = new Client({
    intents: 3276799 //https://discord-intents-calculator.vercel.app

    // intents: [
    //     Intents.FLAGS.GUILDS,
    //     Intents.FLAGS.GUILDS_MESSAGES,
    //     Intents.FLAGS.GUILDS_VOICE_STATES,
    // ]

});

//Connect
client.on('ready', async (client) => {
    console.log(`Bot token: ${token}`);
    console.log(`Bot is ready as: ${client.user.tag}`);
    client.user.setActivity(`is programing me`, {type: 'WAXII'})
    const deployCommands =require('./deploy-commands.js');
    deployCommands.execute();
})



client.commands = new Collection();

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




client.on('messageCreate', async (msg) => {

    //if this do nothing
    if (msg.author.bot) return;
    if (!msg.content.startsWith("º")) return;


    //Text Command Handler
    try {
        const command = msg.content.toLowerCase().slice(1).split(" ")[0];
        const executeCom = require(`./commands/${command}.js`);
        executeCom(msg);

    } catch (error) {

    }
});


client.on('interactionCreate', async (interaction) => {

    if (!interaction.isChatInputCommand()) return;//We want commands only
    const command = client.commands.get(interaction.commandName);//we gate de  comand on the collection
    command.execute(interaction);

});

//Connect

client.login(token);