const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/database");
const PokemonController = require("./controllers/pokemonController");
const TeamController = require("./controllers/teamController")

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/api",(req,res)=>{
    res.send(" pokemons api working")
})


app.post("/api/pokemons/:id/favorites", PokemonController.addToFavorites);
app.delete("/api/pokemons/:id/favorites", PokemonController.removeFromFavorites);
app.post("/api/team/populate",TeamController.populateTeam);
app.post("/api/team",TeamController.createTeam);
app.post("/api/team/getPokemonsInBattle", TeamController.getPokemonsInBattle)
app.post('/api/pokemons',PokemonController.createPokemon);
app.get("/api/pokemons", PokemonController.getAllPokemons);
app.get("/api/pokemons/favorites", PokemonController.getFavoritesPokemons);


app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`)
})