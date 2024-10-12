const TeamService = require("../services/teamService");

const TeamController = {
    async populateTeam(req,res){
        let teamName = req.body.teamName;
        let pokemonIds = req.body.pokemonIds;
        console.log("team id ----------",teamName);
        console.log('pokemons id-------------',pokemonIds);
        try{
            let result = await TeamService.populateTeam(teamName,pokemonIds)
            res.json(result)
        }
        catch(error){
            console.error("Error populating team:", error.message);
            res.status(500).json({ message: "An error occurred while populating team" });  
        }
    },
    async createTeam(req,res){
        let teamName = req.body.teamName;
        try {
            let created = await TeamService.createTeam(teamName);
            res.status(201).json(created)
        } catch(error){
            console.error("Error creating team:", error.message);
            res.status(500).json({ message: "An error occurred while creating team" });  
        }
    },
    async getPokemonsInBattle(req,res){
        let {firstTeamName,secondTeamName} = req.body;
        try{
            let teams = await TeamService.getPokemonsInBattle(firstTeamName,secondTeamName);
            console.log(teams)
            res.status(200).json({teams});
        }
        catch(error){
            console.error("Error getting teams:", error.message);
            res.status(500).json({ message: "An error occurred while getting teams" });  
        }       
    }
}

module.exports = TeamController;