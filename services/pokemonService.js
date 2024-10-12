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
    },
    async getFavoritePokemons(){
        let favoritesPokemons = await PokemonModel.getFavoritePokemons();
        return favoritesPokemons.rows;
    },
    async addToFavorite(id){
        let isFavoritePokemon = await PokemonModel.isFavoritePokemon(id)
        if(isFavoritePokemon){
            throw new Error('Pokemon already in favorites');
        }
        let addedToFavorite = await PokemonModel.addToFavorite(id);
        return addedToFavorite;
    }
}

module.exports = PokemonService