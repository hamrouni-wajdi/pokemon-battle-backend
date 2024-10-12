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
    async getPokemons(){
        let {rows,rowCount} = await db.query(`SELECT * FROM pokemon`);
        return {rows,rowCount}
    },
    async getFavoritePokemons(){
        let {rows,rowCount} = await db.query(`SELECT * FROM pokemon p join favorite_pokemon f on p.id = f.pokemon_id;`);
        return {rows,rowCount};
    },
    async isFavoritePokemon(pokemonId){
        let {rows,rowCount} = await db.query(`SELECT * FROM favorite_pokemon WHERE pokemon_id=$1`,[pokemonId]);
        return rowCount > 0;
    }, 
    async addToFavorite(pokemonID){
        let {rows} = await db.query(`INSERT INTO favorite_pokemon(pokemon_id) VALUES($1)`,[pokemonID]);
        return rows[0]; 
    }
}
module.exports = PokemonModel;