const UserModel = require("../models/userModel")

const UserService = {
    async createUser(user){
        try{
            let createdUser = await UserModel.createUser(user);
            return createdUser;
        }
        catch(error){
            throw error;
        }
    },
    async deleteUser(userId){
        try {
            let result = await UserModel.deleteUser(userId);
            return result
        }catch(error){
            throw new Error('Error deleting user');
        }
    },
    async getUsers(){
        try {
            let result = await UserModel.getUsers();
            return result
        }catch(error){
            throw new Error('Error getting users');
        }
    }
}
module.exports = UserService;