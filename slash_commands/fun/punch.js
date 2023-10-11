const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
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