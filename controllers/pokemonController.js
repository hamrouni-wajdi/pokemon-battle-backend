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
    }
}

module.exports = PokemonController;