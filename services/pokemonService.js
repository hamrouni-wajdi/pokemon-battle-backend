const PokemonModel = require("../models/pokemonModel");

const PokemonService = {
    async createPokemon(pokemon){
            let newPokemon = await PokemonModel.createPokemon(pokemon);
            if(!newPokemon){
                throw new Error('Error while creating pokemon');
            }
            return newPokemon;
    }
}

module.exports = PokemonService