const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a memebr to kick someone.')
        .addMentionableOption(option =>
            option
                .setName('target')
                .setDescription('The member you want to kick out of the server.')
                .setRequired(true)),

    async execute(interaction) {

        const target = interaction.options.getMember('target');

        await interaction.reply(`The user ${target} was kicked.`);
        await target.kick(target);
    },
};