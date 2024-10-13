const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/database");
const PokemonController = require("./controllers/pokemonController");
const TeamController = require("./controllers/teamController");
const GameController = require("./controllers/gameController");

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/api",(req,res)=>{
    res.send(" pokemons api working")
})


app.post("/api/pokemons/:id/favorites", PokemonController.addToFavorites);
app.delete("/api/pokemons/:id/favorites", PokemonController.removeFromFavorites);
app.post("/api/teams/populate",TeamController.populateTeam);
app.post("/api/teams",TeamController.createTeam);
app.post("/api/teams/getPokemonsInBattle", TeamController.getPokemonsInBattle);
app.get("/api/teams", TeamController.getTeamsOrderedByPower);
app.post('/api/pokemons',PokemonController.createPokemon);
app.post("/api/pokemons/:id",PokemonController.updatePokemon)
app.get("/api/pokemons", PokemonController.getAllPokemons);
app.get("/api/pokemons/favorites", PokemonController.getFavoritesPokemons);
app.post("/api/game/factor",GameController.getFatcor)

app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`)
})