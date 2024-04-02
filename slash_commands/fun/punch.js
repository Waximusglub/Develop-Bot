const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()

        .setName('punch')
        .setDescription('Punch')
        .addUserOption(option =>
            option
                .setName('mention')
                .setDescription('Punch someone')),

    execute(interaction) {






    },
};