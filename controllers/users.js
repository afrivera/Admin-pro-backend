const bcrypt = require('bcryptjs');
const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require("../helpers/success");
const { getAllUsers, createUser, updateUser, destroyUser} = require("../services/users");

module.exports = {
    getUsers: catchAsync ( async (req, res, next )=> {
        try {
            const users = await getAllUsers();
            endpointResponse({
                res,
                body: users,
                message: 'Users list retrieved successfully'
            })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving User list] - [users - GET]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    postUser: catchAsync( async (req, res, next ) => {
    
        const { name, email, password } = req.body;
                
        try {
            // encrypt password
            const encryptPassword = bcrypt.hashSync( password, 10);

            const body = { name, email, password: encryptPassword };
            const user = await createUser( body );
            
        endpointResponse({
            code: 201,
            res,
            message: "User Created",
            body: user,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving User Create] - [users - POST]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    putUser: catchAsync( async (req, res, next ) => {
    
        const { id } = req.params;
        const { password, google, ...body } = req.body
                
        try {
            const user = await updateUser( id, body );
            
        endpointResponse({
            res,
            message: "User Updated",
            body: user,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving User Update] - [users - PUT]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    destroyUser: catchAsync( async (req, res, next ) => {
    
        const { id } = req.params;
                
        try {
            const user = await destroyUser( id );
            
        endpointResponse({
            res,
            message: "User Deleted",
            body: user,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving User Delete] - [users - DELETE]: ${ error.message }`
            )
            next( httpError )
        }
    }),
}
