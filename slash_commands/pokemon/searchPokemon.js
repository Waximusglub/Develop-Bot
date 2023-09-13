const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    //Data
    //###########################
    data: new SlashCommandBuilder()
        .setName('pokemon_serach')
        .setDescription('Search some pokemon.')
        .addStringOption(option =>
            option
                .setName('pokemon')
                .setDescription(`Insert the pokemon.`)
                .setRequired(true)
        ),

    //Execute
    //###########################
    async execute(interaction) {

        const pokemon = interaction.options.getString('pokemon');

        try {

            //Get Data from Pokeapi
            //##################################
            const options = {
                method: 'GET',
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
            };

            const response = await axios.request(options);
            const { name, height, weight, id, sprites, types } = response.data;

            const artwork= sprites.other["official-artwork"].front_default;

            const type=[];
            types.forEach(function(types) {
                type.push(types.type.name);
            });

            //Build Embed
            //##################################
            const embed = new EmbedBuilder()
                .setColor(0xcc0443)
                .setTitle(name)
                .setAuthor({ name: 'PokéApi', iconURL: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png', url: `https://pokeapi.co` })
                .setImage(artwork ? artwork : sprites.front_default)
                .setURL(`https://www.pokemon.com/es/pokedex/${name}`)
                .addFields(
                    { name: 'Nº Pokedex:', value: `${id}` ,inline: true},
                    { name: 'Height:', value: `${height}` ,inline: true},
                    { name: 'Wight:', value: `${weight}` ,inline: true},
                    { name: `${types.lenght>1 ? "Types:" : "Type:"}`, value: `${type}` ,inline: true},

                )
                .setTimestamp()
                .setFooter({ text: `Pokémon requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

            interaction.reply({ embeds: [embed] });

        } catch (error) {

            console.error(error);
            interaction.reply('Error on getting de data form PokéApi.');

        }
    },
};