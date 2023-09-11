const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a memebr to ban him.')

        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member you want to ban')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The ban reason')
        )
        .setDEfaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction) {

        const target = interaction.options.getUser('target');

        const reason = interaction.options.getUser('reason') ?? `The administrator don't provided a reason`;


        await interaction.replay(`Banning ${target.username} for reason: \n ${reason}`)
        await interaction.guild.members.ban(target);
    },
};