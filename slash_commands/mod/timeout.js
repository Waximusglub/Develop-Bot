const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Select a memebr to timeout someone.')
        .addMentionableOption(option =>
            option
                .setName('target')
                .setDescription('The member you want to timeout.')
                .setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('sec')
                .setDescription('Seconds timeout.')
                .setRequired(true))
        .setDMPermission(false),


    async execute(interaction) {

        const target = interaction.options.getMember('target');
        const sec = interaction.options.getInteger('sec');

        await interaction.reply(`The user ${target} was timeout ${sec} sec.`);
        await target.timeout(sec);
    },
};