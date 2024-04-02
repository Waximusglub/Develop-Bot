const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()

        .setName('bye')
        .setDescription('Say Goodbye to Everyone')
        .addUserOption(option =>
            option
                .setName('mention')
                .setDescription('Say goodbye to someone')),

    execute(interaction) {

        const file = new AttachmentBuilder('D:/Develop Bot/files/bye.gif');

        const byeEmbed = new EmbedBuilder()
            .setColor(0xcc0443)
            .setTitle(`Bye -_-`)
            .setImage('attachment://bye.gif')



        interaction.reply({ embeds: [byeEmbed], files: [file] })
    },
};