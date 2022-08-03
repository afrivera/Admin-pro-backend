const { ErrorObject } = require("../helpers/error");
const { validToken } = require("../helpers/jwt");
const User = require("../models/user");


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


exports.isOwnerOrAdminRole = async( req, res, next ) => {
    const uid = req.uid;
    const { id } = req.params;

    try {
        const userDB = await User.findById( uid );

        if(!userDB){
            throw new ErrorObject('User unauthorized', 401); 
        }
    
        if( userDB.role !== 'ADMIN_ROLE' && uid !== id){
            throw new ErrorObject('Elevation Required', 401); 
        }

        next();
        
    } catch (error) {
        next( new ErrorObject( error.message, error.statusCode || 500 ));
    }
}