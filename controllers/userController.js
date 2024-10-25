const UserService = require("../services/userService")

const UserController = {
  async createUser(req,res){
    let user = req.body
    try{
        let createdUser = await UserService.createUser(user);
        res.status(201).send(createdUser);
    }catch(error){
        res.status(500).json({ message: error.message });
        throw error;
    }
  },
  async deleteUser(req,res){
    let userId = req.params.id;
    try{
        let result = await UserService.deleteUser(userId);
        result?res.status(200).send("succes: user deleted"):res.send("failed: user was not delete succefully")
    }catch(error){
        res.status(500).json({ message: "An error occurred while deleting user" });
        throw error;
    }
  },
  async getUsers(req,res){
    try{
        let result = await UserService.getUsers();
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({ message: "An error occurred while getting users" });
        throw error;
    }
  }
  
}

module.exports = UserController;