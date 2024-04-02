const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()

        .setName('punch')
        .setDescription('Slap someone very hard  c:<')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Who will recive the slap')
                .setRequired(true)),
                
    async execute(interaction) {

        const targetUser = interaction.options.getUser('target');
        await interaction.reply(``);

        const mentionEmbed = new EmbedBuilder()
        .setColor(0xcc0443)
        .setTitle(`${interaction.user.tag} slaped very hard ${targetUser.tag}!`)

        interaction.reply({ embeds: [mentionEmbed], files: [file] })
    },
};

