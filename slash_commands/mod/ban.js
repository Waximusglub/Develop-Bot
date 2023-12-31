const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a memebr to ban him.')

        .addSubcommand(subcommand => subcommand.setName("ban")
            .setDescription('Ban a member.')
            .addUserOption(option => option.setName("target")
                .setDescription("Select the user you wish to add the role to.")
                .setRequired(true))
            .addStringOption(option => option.setName("reason")
                .setDescription("The reason to ban the user.")))

        .addSubcommand(subcommand => subcommand.setName("unban")
            .setDescription('Removes the ban from an user.')
            .addUserOption(option => option.setName("target")
                .setDescription("Select the user you wish to remove the ban.")
                .setRequired(true))
            .addStringOption(option => option.setName("reason")
                .setDescription("The reason to unban the user.")))

        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction) {

        const { guild, options } = interaction

        const user = options.getUser("target");
        const reason = options.getString('reason') ?? `The administrator don't provided a reason`;

        const errEmbed = new EmbedBuilder()
            .setDescription('Something went wrong. Please try again later.')
            .setColor(0xc72c3b)

        if (interaction.options.getSubcommand() === "ban") {
            const successEmbed = new EmbedBuilder()
                .setTitle("**:white_check_mark: Ban Done**")
                .setDescription(`Succesfully added the role to the ${user}. \n Reason: ${reason}.`)
                .setColor(0x5fb041)
                .setTimestamp();


            if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });


            try {
                await guild.members.ban(user);

                interaction.reply({ embeds: [successEmbed], ephemeral: true });

            } catch (err) {
                console.log(err);
            }
        }
        else if (interaction.options.getSubcommand() === "unban") {
            const successEmbed = new EmbedBuilder()
                .setTitle("**:white_check_mark: Ban Removed **")
                .setDescription(`Succesfully removed the Ban from the ${user}.  \n Reason: ${reason}`)
                .setColor(0x5fb041)
                .setTimestamp();


            if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers))
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });


            try {
                await guild.members.unban(user);

                interaction.reply({ embeds: [successEmbed], ephemeral: true });

            } catch (err) {
                console.log(err);
            }
        }

    },
};