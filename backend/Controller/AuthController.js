const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const getJwtToken = require("../Helper/GetJwtToken");
const {success} = require("../Helper/Response");

exports.register = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        return res
          .status(400)
          .json({ error: true, message: `${firstName} already exists` });
      }   
  
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password, 
      });
  
      return res
        .status(200)
        .json(success(`${firstName} ${lastName} is registered successfully`, { id: user._id }));
    } catch (err) {
      res.status(400).json({ error: true, message: err.message });
    }
  };
exports.login = async (req,res,next) => {
    try{
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                error:true,message:"Please provide all required fields"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json(success('User doest not Exist'));
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                error:true,message:"Password is Incorrect"
            });
        }
        const token = getJwtToken({id:user._id,Role:user.Role});
        const response = {
            id : user._id,
            firstName : user.firstName,
            lastName : user.lastName,
            email:user.email,
            token,
        };
        return res
        .status(200)
        .json(success(`${user.firstName} Login Successful`, response));
    }catch(error){
        res.status(400).json({error:true,message:error.message});
    }
}
