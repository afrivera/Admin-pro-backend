const { ErrorObject } = require("../helpers/error");
const { validToken } = require("../helpers/jwt");


exports.validateJWT = async (req, res, next ) => {

    // read header to get token
    const token = req.header('x-token');

    try {
        if ( !token ){
            throw new ErrorObject('there is no token in the request', 401);        
        }

        try {
            const { uid } = validToken( token )
            req.uid = uid;
            
        } catch (error) {
            throw new ErrorObject(error.message, 401);
        }
        

        next();
        
    } catch (error) {
        next( new ErrorObject( error.message, error.statusCode || 500 ));
    }

}