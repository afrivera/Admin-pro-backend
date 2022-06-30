const { ErrorObject } = require("../helpers/error");
const User = require("../models/user");


exports.getAllUsers = async()=>{
    try {
        const users = await User.find()
        if( !users || users.length === 0 ){
            throw new ErrorObject('No Users Found', 404)
        }
        return users;
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.createUser = async ( body ) => {
    try {
        const emailExist = await this.getUserByEmail( body.email );
        if( emailExist ){
            throw new ErrorObject('Email already exist', 404)
        }
        const user = new User( body )
        await user.save();
        return user;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}

exports.getUserByEmail = async ( email ) => {
    const user = await User.findOne({ email })
    return user;
}