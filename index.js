const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/database");
const PokemonController = require("./controllers/pokemonController");
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/api",(req,res)=>{
    res.send(" pokemons api working")
})


app.post("/api/pokemons/:id/favorites", PokemonController.addToFavorites);
app.post('/api/pokemons',PokemonController.createPokemon);
app.get("/api/pokemons", PokemonController.getAllPokemons);
app.get("/api/pokemons/favorites", PokemonController.getFavoritesPokemons);


app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`)
})