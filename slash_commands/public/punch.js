const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()

        .setName('punch')
        .setDescription('Punch someone very hard  c:<')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Who will recive the punch')
                .setRequired(true)),
                
    execute(interaction) {

        const targetUser = interaction.options.getUser('target');

        const mentionEmbed = new EmbedBuilder()
        .setColor(0xcc0443)
        .setTitle(`${interaction.user.tag} punched very hard ${targetUser.tag}!`)

        interaction.reply({ embeds: [mentionEmbed] })
    },
};

