const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display you avatar')
        .addUserOption(option =>
            option
                .setName('mention')
                .setDescription('Mention someone')),


    execute(interaction) {

        const user = interaction.options.getUser('mention') || interaction.user;;

        const avatar = {
            title: `${user.username}'s Avatar`,
            image: { url: user.displayAvatarURL({ dynamic: true, size: 1024 }) }
        }

        interaction.reply({ embeds: [avatar] });
    },
};