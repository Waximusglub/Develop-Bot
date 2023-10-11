const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    //Data
    //###########################
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Search some pokemon.')
        .addSubcommand(subcommand => subcommand.setName("search")
            .setDescription('Search a pokemon.')
            .addStringOption(option => option.setName("pokemon")
                .setDescription("Select the pokemon you want to search on the pokedex.")
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName("random")
            .setDescription('Search a random pokemon.')),


    //Execute
    //###########################
    async execute(interaction) {


        if (interaction.options.getSubcommand() === "search") {

            const {options} = interaction;

            const pokemon = options.getString("pokemon");

            //Get Data from Pokeapi
            //##################################
            const get = {
                method: 'GET',
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
            };

            
            const response = await axios.request(get);
            const { species, height, weight, id, sprites, types } = response.data;

            const artwork = sprites.other["official-artwork"].front_default;

            const type = [];
            types.forEach(function (types) {
                type.push(types.type.name);
            });

            //Build Embed
            //##################################
            const embed = new EmbedBuilder()
                .setColor(0xcc0443)
                .setTitle(species.name)
                .setAuthor({ name: 'PokéApi', iconURL: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png', url: `https://pokeapi.co` })
                .setImage(artwork ? artwork : sprites.front_default)
                .setURL(`https://www.pokemon.com/es/pokedex/${species.name}`)
                .addFields(
                    { name: 'Nº Pokedex:', value: `${id}`, inline: true },
                    { name: 'Height:', value: `${height}`, inline: true },
                    { name: 'Wight:', value: `${weight}`, inline: true },
                    { name: `${types.lenght > 1 ? "Types:" : "Type:"}`, value: `${type}`, inline: true },

                )
                .setTimestamp()
                .setFooter({ text: `Pokémon requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

            interaction.reply({ embeds: [embed], ephemeral: true });

        }else if(interaction.options.getSubcommand() === "random"){

            var randomInt = Math.floor(Math.random() * 1010)+1;

            //Get Data from Pokeapi
            //##################################
            const get = {
                method: 'GET',
                url: `https://pokeapi.co/api/v2/pokemon/${randomInt}/`
            };

            
            const response = await axios.request(get);
            const { species, height, weight, id, sprites, types } = response.data;

            const artwork = sprites.other["official-artwork"].front_default;

            const type = [];
            types.forEach(function (types) {
                type.push(types.type.name);
            });

            //Build Embed
            //##################################
            const embed = new EmbedBuilder()
                .setColor(0xcc0443)
                .setTitle(species.name)
                .setAuthor({ name: 'PokéApi', iconURL: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png', url: `https://pokeapi.co` })
                .setImage(artwork ? artwork : sprites.front_default)
                .setURL(`https://www.pokemon.com/es/pokedex/${species.name}`)
                .addFields(
                    { name: 'Nº Pokedex:', value: `${id}`, inline: true },
                    { name: 'Height:', value: `${height}`, inline: true },
                    { name: 'Wight:', value: `${weight}`, inline: true },
                    { name: `${types.lenght > 1 ? "Types:" : "Type:"}`, value: `${type}`, inline: true },

                )
                .setTimestamp()
                .setFooter({ text: `Pokémon requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

            interaction.reply({ embeds: [embed], ephemeral: true });

        }

    },
};