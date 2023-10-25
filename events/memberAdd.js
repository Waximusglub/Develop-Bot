const { Events } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');


module.exports = {
	name: Events.GuildMemberAdd,
	async execute(interaction) {

        const wellcomeEmbed = new EmbedBuilder()
        .setColor(0xcc0443)
        .setTitle()
        .setAuthor()
        .setImage()
        .setDescription("Yow yoww")
        .setURL()
        .setTimestamp()
        .setFooter({ text: `Summary requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        member.guild.channels.get(1161678567042719754).send({ embeds: [wellcomeEmbed]});
	},
};