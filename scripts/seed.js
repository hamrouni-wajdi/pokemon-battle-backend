const PokemonModel = require("../models/pokemonModel");

async function populateDatabase(){
    try {
        let existingPokemons = await PokemonModel.getAllPokemons();
        if(existingPokemons.rowCount >3){
            console.log("database already populated, skipping populating");
            console.log(existingPokemons.rows)
            return;
        }
        await PokemonModel.createBulkpokemons();
        console.log('Pokémon data inserted successfully.');
    }
    catch(error){
        console.error('Error during Pokémon bulk creation:', error);
        throw error;
    }
}
