const GameModel = require("../models/gameModel.js")

const GameService = {
    async getFactors(type1,type2){
        try {
            let factor = await GameModel.getFactor(type1,type2);
            return factor;
        }catch(error){
            console.error(error)
        }
    }
}
module.exports = GameService;