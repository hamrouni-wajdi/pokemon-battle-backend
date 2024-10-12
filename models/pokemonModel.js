const db = require("../config/database");
const pokemonData = require("../sampleData/pokemon.json");
const fs = require("fs");
const path = require("path")

const PokemonModel = {
    async createPokemon(pokemon){
        let {rows} = await db.query(`INSERT INTO pokemon(name,type,image,power,life) VALUES($1,(SELECT id FROM pokemon_type WHERE name = $2),$3,$4,$5) RETURNING * `,[
            pokemon.name,pokemon.type,pokemon.image,pokemon.power,pokemon.life]) 
            return rows[0];
    },
    async createBulkpokemons(){
        const data = fs.readFileSync(path.join(__dirname,'../sampleData/pokemon.json'),"utf8");
        let pokemons = JSON.parse(data);
        for(let pokemon of pokemons){
            await this.createPokemon(pokemon);
        }
    },
    async getAllPokemons(){
        let {rows,rowCount} = await db.query(`SELECT * FROM pokemon`);
        return {rows,rowCount}
    }
}
module.exports = PokemonModel;