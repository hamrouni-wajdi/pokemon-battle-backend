const db = require("../config/database");


const TeamModel = {
    async createTeam(name){
        let {rows} = await db.query(`INSERT INTO team (name) VALUES ($1) RETURNING id`,[name]);
        return rows[0].id;
    },
    async isTeamComplete(teamId){
        let {rows} = db.query(`SELECT COUNT(*) FROM team_pokemon WHERE team_id=$1`,[team_id]);
        let count = parseInt(rows[0].count);
        console.log("========== count \n", count);
        return count >= 6;
    },
    async populateTeam(teamName,pokimonIds){

        try {
            if (pokimonIds.length !== 6) {
                throw new Error('A team must contain exactly 6 Pokémon.');
            }
            await db.query(
                `SELECT insert_team_with_pokemons($1, $2)`,
                [teamName, pokimonIds]
            );
            return { success: true, message: 'Team and Pokémon inserted successfully.' };
        }
        catch(error){
            console.error('Error creating team with Pokémon:', error);
            return { success: false, message: err.message };
        }
    },
    async getTeamByName(teamName){
        let {rows,rowCount} = await db.query(`SELECT * FROM team WHERE name=($1)`,[teamName]);
        return {rows,rowCount}
    },
    async getPokemonsInBattle(teamName){
        try {
            const query = `
                SELECT p.*
                FROM pokemon p
                JOIN team_pokemon tp ON p.id = tp.pokemon_id
                JOIN team t ON t.id = tp.team_id
                WHERE t.name = $1;
            `;
            const result = await db.query(query, [teamName]);
            return result.rows;  // This will return all Pokémon in the specified team
        } catch (err) {
            console.error('Error fetching Pokémon by team name:', err);
            throw err;
        }
    },
    async getTeamsOrderedByPower(){
        try {
            const result = await db.query('SELECT * FROM get_teams_ordered_by_power();');
            return result.rows; 
          } catch (error) {
            console.error('Error fetching teams ordered by power:', error);
            throw error; 
          }
        }
    }


module.exports = TeamModel;