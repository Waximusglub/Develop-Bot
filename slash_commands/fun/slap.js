const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()

        .setName('slap')
        .setDescription('Slap')
        .addUserOption(option =>
            option
                .setName('mention')
                .setDescription('Slap someone')),

    execute(interaction) {






    },
};