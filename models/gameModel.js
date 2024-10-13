const db = require("../config/database");

const GameModel = {
    async getFactor(type1,type2){
        let {rows} = await db.query(`SELECT factor FROM weakness WHERE type1=$1 AND type2=$2`,[type1,type2])
        return rows[0]
    }
}

module.exports = GameModel;