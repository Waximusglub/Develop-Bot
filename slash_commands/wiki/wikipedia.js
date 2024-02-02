const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wikipedia')
    .setDescription('Wikipedia command.')

    .addSubcommand(subcommand => subcommand.setName("search")
      .setDescription('Search something on Wikipedia.')
      .addStringOption(option => option.setName("topic")
        .setDescription("Introduce the topic you want to search on Wikipedia.")
        .setRequired(true))
      .addStringOption(option =>
        option
          .setName('lang')
          .setDescription(`Insert you'r lenguage`)
          .setRequired(true)
          .addChoices(
            { name: 'English', value: 'en' },
            { name: 'Spanish', value: 'es' },
            { name: 'Catalan', value: 'ca' },
          )
      ))

      .addSubcommand(subcommand => subcommand.setName("random")
        .setDescription("Get's a random portal from Wikipedia.")
        .addStringOption(option =>
          option
            .setName('lang')
            .setDescription(`Insert you'r lenguage`)
            .setRequired(true)
            .addChoices(
              { name: 'English', value: 'en' },
              { name: 'Spanish', value: 'es' },
              { name: 'Catalan', value: 'ca' },
            )
        )
      )
      .setDMPermission(false),

      async execute(interaction) {

        const {options} = interaction;

        const term = options.getString("topic");
        const lang = options.getString("lang");

        const errEmbed = new EmbedBuilder()
            .setDescription('Something went wrong. Please try again later.')
            .setColor(0xc72c3b)


        if (interaction.options.getSubcommand() === "search") {

          try {

            //Get Data from Wikipedia API
            //##################################
            const options = {
              method: 'GET',
              url: `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${term}`
            };
      
            const response = await axios.request(options);
            const { title, extract, thumbnail, content_urls } = response.data;
      
            //Build Embed
            //##################################
            const embed = new EmbedBuilder()
              .setColor(0xcc0443)
              .setTitle(title)
              .setAuthor({ name: 'Wikipedia', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Wikipedia_W_favicon_on_white_background.png', url: `https://${lang}.wikipedia.org/wiki/Main_Page` })
              .setImage((thumbnail ? thumbnail.source : null))
              .setDescription(extract)
              .setURL(content_urls.desktop.page)
              .addFields(
                { name: 'Link:', value: `${content_urls.desktop.page}` },
                { name: '\u200B', value: '\u200B' },//Unicode empty space
              )
              .setTimestamp()
              .setFooter({ text: `Summary requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
      
            interaction.reply({ embeds: [embed], ephemeral: true });
      
          } catch (error) {
      
            console.error(error);
            interaction.reply({ embeds: [errEmbed], ephemeral: true });
      
          }

        }
        else if (interaction.options.getSubcommand() === "random") {

          try {

            //Get Data from Wikipedia API
            //##################################
    
            const options = {
              method: 'GET',
              url: `https://${lang}.wikipedia.org/api/rest_v1/page/random/summary`
            };
    
            const response = await axios.request(options);
    
            const { title, extract, thumbnail, content_urls } = response.data;
    
            //Build Embed
            //##################################
            const embed = new EmbedBuilder()
              .setColor(0xcc0443)
              .setTitle(title)
              .setAuthor({ name: 'Wikipedia', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Wikipedia_W_favicon_on_white_background.png', url: `https://${lang}.wikipedia.org/wiki/Main_Page` })
              .setImage(thumbnail ? thumbnail.source : null)
              .setDescription(extract)
              .setURL(content_urls.desktop.page)
              .addFields(
                { name: 'Link:', value: `${content_urls.desktop.page}` },
                { name: '\u200B', value: '\u200B' },//Unicode empty space
              )
              .setTimestamp()
              .setFooter({ text: `Random requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    
            interaction.reply({ embeds: [embed], ephemeral: true });
    
          } catch(error) {
    
            console.error(error);
            interaction.reply({ embeds: [errEmbed], ephemeral: true });
    
          }

        }



    },
};