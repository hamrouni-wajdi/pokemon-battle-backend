const GameService = require("../services/gameService")

const GameController = {
    async getFatcor(req,res){
        console.log(req.body)
        try{
            let results = await GameService.getFactors(req.body.type1, req.body.type2);
            console.log(results)
            res.status(200).json(results.factor)
        }
        catch(error){
            console.error("Error getting factors:", error.message);
            res.status(500).json({ message: "An error occurred while getting factors" });  
        }   
    }
}

module.exports = GameController;