const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require("../helpers/success");
const { getAllUsers, createUser} = require("../services/users");

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
            const body = { name, email, password };
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
}
