const createHttpError = require("http-errors");
const { catchAsync } = require("../helpers/catchAsync");


module.exports = {
    login: catchAsync( async (req, res, next ) => {
        try {
            const { email, password } = req.body
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Auth Login] - [auth - POST]: ${ error.message }`
            )
            next( httpError )
        }
    }),
}