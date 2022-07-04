const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require("../helpers/success");
const { searchs, searchByCollection } = require('../services/searchs');

module.exports = {
    searchs: catchAsync ( async (req, res, next )=> {
        try {
            const param = req.params.search;
            const resSearch = await searchs( param )
            endpointResponse({
                res,
                body: resSearch,
                message: 'search retrieved successfully'
            })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving search list] - [Search - GET]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    searchByCollection: catchAsync ( async (req, res, next )=> {
        try {
            const param = req.params.search;
            const collection = req.params.collection;
            const resSearch = await searchByCollection( collection, param )
            endpointResponse({
                res,
                body: resSearch,
                message: 'search retrieved successfully'
            })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving search list] - [Search - GET]: ${ error.message }`
            )
            next( httpError )
        }
    }),
}