const PokemonService = require("../services/pokemonService");

const PokemonController = {
    async createPokemon(req,res){
        console.log("body",req.body)
        try{
            let newPokemon = await PokemonService.createPokemon(req.body);
            res.status(201).json(newPokemon)
        }
        catch(error){
            console.error("Error creating Pokemon:", error.message);
            res.status(500).json({ message: "An error occurred while creating the Pokemon" });
        }
    },
    async getAllPokemons(req,res){
        try{
            let pokemons = await PokemonService.getPokemons();
            res.status(200).json(pokemons);
        }
        catch(error){
            console.error("Error getting Pokemon:", error.message);
            res.status(500).json({ message: "An error occurred while getting Pokemons" });
        }
    },
    async getFavoritesPokemons(req,res){
        try{
            let pokemons = await PokemonService.getFavoritePokemons();
            res.status(200).json(pokemons);
        }
        catch(error){
            console.error("Error getting Favorites Pokemon:", error.message);
            res.status(500).json({ message: "An error occurred while getting Favorites Pokemons" });
        }
    },
    async addToFavorites(req,res){
        try{
            let favPokemon = await PokemonService.addToFavorite(req.params.id);
            res.status(200).json({message:"added to favorites"});
        }
        catch(error){
            console.error("Error adding to favorites Pokemon:", error.message);
            res.status(500).json({ message: "An error occurred while adding to favorites Pokemons" });
        }
    },
    async removeFromFavorites(req,res){
        try{
            let result = await PokemonService.removeFromFavorites(req.params.id);
            if(!result){
                res.status(404).json({message:"record not found"});
            }
            res.status(200).json({message:"Pokemon removed from favorites"})
         }
         catch(error){
            console.error("Error removing pokemon from favorites:", error.message);
            res.status(500).json({ message: "An error occurred while  removing pokemon from favorites" });
         }
    }
}

module.exports = PokemonController;