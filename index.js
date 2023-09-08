//Requirments
const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const { token } = require('./config.json');


//Client

const client = new Client({ intents: 3276799 });

//Connect
client.on('ready', async (client) => {
    console.log(`Bot token: ${token}`);
    console.log(`Bot is ready as: ${client.user.tag}`);
    client.user.setActivity("Skyrim")
})



// client.commands = new Collection();

// const foldersPath = path.join(__dirname, 'slash_commands');
// const commandFolders = fs.readdirSync(commandsPath);

// for (const folder of commandFolders) {

//     const commandPath = path.join(foldersPath, folder);
//     const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//     for (const file of commandFiles) {

//         const filePath = path.join(commandPath, file);
//         const command = fs.readFileSync(filePath)

//     }



// }




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

    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        const command = require(`./slash_commands/${commandName}`);
        command.execute(interaction);
    }

});

//Connect

client.login(token);