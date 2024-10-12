const PokemonModel = require("../models/pokemonModel");
const TeamModel = require("../models/teamModel");

const TeamService = {
    async populateTeam(teamName,pokimonIds) {
        try{
            let team = await this.getTeamByName(teamName);
            if(team.rowCount>=1){
                console.log("team exists",team.rows )
                return team.rows[0]
            }
            let result = await TeamModel.populateTeam(teamName,pokimonIds);
            return result;
         }
         catch(error){
              console.error("Error populating team", error)  
         }       
    },
    async getTeamByName(teamName){
        let result = await TeamModel.getTeamByName(teamName)
        return result;
    },
    async createTeam(teamName){
        let createdTeam = TeamModel.createTeam(teamName);
        return createdTeam;
    }
}

module.exports = TeamService;