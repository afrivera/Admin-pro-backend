const bcrypt = require('bcryptjs');
const { ErrorObject } = require("../helpers/error");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);
const { generateJWT } = require('../helpers/jwt');
const User = require("../models/user");


exports.getAllUsers = async( since, limit )=>{
    try {
        const [users, total ] = await Promise.all([
            User.find()
                .skip( since )
                .limit( limit ),
                User.count()
        ])
        if( !users || users.length === 0 ){
            throw new ErrorObject('No Users Found', 404)
        }
        return { users, total };
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
        const user = new User( body );
        const token = await generateJWT( user.id )
        await user.save();
        return {user, token};
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.updateUser = async ( id, body) => {
    try {
        const user = await User.findById( id );
        if( !user ){
            throw new ErrorObject('user doesn\'t exist', 404)
        }
        if( user.email === body.email || user.google){
            if( user.google && body.email !== user.email){
                throw new ErrorObject('google user can\'t change the email', 400)
            }
            delete body.email
        } else {
            const emailExist = await this.getUserByEmail( body.email );
            if( emailExist ){
                throw new ErrorObject('email already exist', 404)
            }
        }
        const userDb = await User.findByIdAndUpdate( id, body, { new: true} )
        return userDb;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.destroyUser = async ( id) => {
    try {
        const user = await User.findById( id );
        if( !user ){
            throw new ErrorObject('user doesn\'t exist', 404)
        }
        
        const userDb = await User.findByIdAndRemove( id )
        return userDb;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}

exports.login = async( email, password ) => {
    try {
        const user = await this.getUserByEmail( email );
        const validPassword = user && bcrypt.compareSync( password, user.password );
        if( !user || !validPassword ){
            throw new ErrorObject('Invalid Credentials', 401)
        }
        const token = await generateJWT( user.id )
        return {user, token};        
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.verifyGoogle = async( token ) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID,  
        });
        const payload = ticket.getPayload();
        const { name, email, picture} = payload;
        const userDB = await this.getUserByEmail( email);
        delete userDB.password
        if(!userDB) {
            const body = { name, email, image: picture, password: ':D', google: true }
            console.log('no')
            const {password, ...user} = await this.createUser( body );
            return user;
        } else {
            // user exist
            const token = await generateJWT( userDB.id )
            delete userDB.password
            return { userDB, token }
        }
    
    //   verifyGoogle().catch(console.error);  
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.getUserByEmail = async ( email ) => {
    const user = await User.findOne({ email })
    return user;
}

exports.renewToken = async( id ) => {
    try {
        const user = await User.findById( id );
        if( !user ){
            throw new ErrorObject('User No Found', 404)
        }
        const token = await generateJWT( user.id )
        return { user, token }
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}