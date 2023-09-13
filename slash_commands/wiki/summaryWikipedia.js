const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  //Data
  //###########################
  data: new SlashCommandBuilder()
    .setName('summary')
    .setDescription('Search something on wikipedia.')
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
    .addStringOption(option =>
      option
        .setName('term')
        .setDescription(`Insert the subject`)
        .setRequired(true)
    ),

  //Execute
  //###########################
  async execute(interaction) {

    const lang = interaction.options.getString('lang');
    const term = interaction.options.getString('term');

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
        .setImage(thumbnail ? thumbnail.source : '')
        .setDescription(extract)
        .setURL(content_urls.desktop.page)
        .addFields(
          { name: 'Link:', value: `${content_urls.desktop.page}` },
          { name: '\u200B', value: '\u200B' },//Unicode empty space
        )
        .setTimestamp()
        .setFooter({ text: `Summary requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

      interaction.reply({ embeds: [embed] });

    } catch (error) {

      console.error(error);
      interaction.reply('Error on getting de data form Wikipedia.');

    }
  },
};