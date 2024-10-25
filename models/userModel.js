const db = require("../config/database");

const UserModel = {
   async createUser(user){
        let {us}=user
        console.log(us)
        try{        
        let {rows}= await db.query(`INSERT INTO users(username,email,password_hash) VALUES($1,$2,$3) RETURNING *`,[user.username,user.email,user.password_hash]);
        await db.query('COMMIT');
        return rows[0];
        } catch(error){
            await db.query('ROLLBACK');
            if (error instanceof Error) {
                if (error.message.includes('users_username_key')) {
                    throw new Error('Username already exists');
                }
                if (error.message.includes('users_email_key')) {
                    throw new Error('Email already exists');
                }
            }
            throw error;
        }
    },
   async deleteUser(userId){
    try{
        let {rows,rowCount}=await db.query(`DELETE FROM users WHERE id=$1`,[userId]);
        return rowCount > 0;
    } catch(error) {
        throw error
    }
   },
   async getUsers(){
    let {rows,rowCount} = await db.query(`SELECT * FROM users`);
    return {rows}
}

}

module.exports = UserModel