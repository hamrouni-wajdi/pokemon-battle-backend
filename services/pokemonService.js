const PokemonModel = require("../models/pokemonModel");

const PokemonService = {
    async createPokemon(pokemon){
            let newPokemon = await PokemonModel.createPokemon(pokemon);
            if(!newPokemon){
                throw new Error('Error while creating pokemon');
            }
            return newPokemon;
    },
    async getPokemons(){
        let pokemons = await PokemonModel.getPokemons()
        console.log(" all pokemon from services")
        return pokemons;
    }
}

module.exports = PokemonService