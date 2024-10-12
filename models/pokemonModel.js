const db = require("../config/database");

const PokemonModel = {
    async createPokemon(pokemon){
        let {rows} = await db.query(`INSERT INTO pokemon(name,type,image,power,life) VALUES($1,(SELECT id FROM pokemon_type WHERE name = $2),$3,$4,$5) RETURNING * `,[
            pokemon.name,pokemon.type,pokemon.image,pokemon.power,pokemon.life]) 
            return rows[0];
    }
}
module.exports = PokemonModel;