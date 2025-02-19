const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()

        .setName('hi')
        .setDescription('Say Hi to everyone')
        .addUserOption(option =>
            option
                .setName('mention')
                .setDescription('Say hello to someone')),

    execute(interaction) {

        const mentionUser = interaction.options.getUser('mention');

        const file = new AttachmentBuilder('F:/Projects/Develop-Bot/files/hi.gif');

        if(mentionUser){
            
            const mentionEmbed = new EmbedBuilder()
            .setColor(0xcc0443)
            .setTitle(`${interaction.user.username} says hi to ${mentionUser.username}.`)
            .setImage('attachment://hi.gif')

            interaction.reply({ embeds: [mentionEmbed], files: [file] })

        }else{
            const nonmentionEmbed = new EmbedBuilder()
            .setColor(0xcc0443)
            .setTitle(`${interaction.user.username} Says hello to everyone.`)
            .setImage('attachment://hi.gif')

            interaction.reply({ embeds: [nonmentionEmbed], files: [file] })

        }




    },
};