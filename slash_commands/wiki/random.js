const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wiki_random')
    .setDescription('Gets a random portal from wikipedia.')
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
    ),

  async execute(interaction) {

    try {

      const lang = interaction.options.getString('lang');

      const options = {
        method: 'GET',
        url: `https://${lang}.wikipedia.org/api/rest_v1/page/random/summary`
      };

      const response = await axios.request(options);

      const { title, extract, thumbnail } = response.data;

      const embed = {
        title: title,
        description: extract,
        thumbnail: { url: thumbnail ? thumbnail.source : '' }
      };

      interaction.reply({ embeds: [embed] });

    } catch (error) {

    }




  },
};