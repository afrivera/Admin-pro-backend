const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require("../helpers/success");
const { getAllHospitals, createHospital, updateHospital, destroyHospital, login} = require("../services/hospitals");

module.exports = {
    getHospitals: catchAsync ( async (req, res, next )=> {
        try {
            const Hospitals = await getAllHospitals();
            endpointResponse({
                res,
                body: Hospitals,
                message: 'Hospitals list retrieved successfully'
            })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Hospital list] - [Hospitals - GET]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    postHospital: catchAsync( async (req, res, next ) => {
    
        const { name, email, password } = req.body;
                
        try {

            const body = { name, email, password: encryptPassword };
            const Hospital = await createHospital( body );
            
        endpointResponse({
            code: 201,
            res,
            message: "Hospital Created",
            body: Hospital,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Hospital Create] - [Hospitals - POST]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    putHospital: catchAsync( async (req, res, next ) => {
    
        const { id } = req.params;
        const { password, google, ...body } = req.body
                
        try {
            const Hospital = await updateHospital( id, body );
            
        endpointResponse({
            res,
            message: "Hospital Updated",
            body: Hospital,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Hospital Update] - [Hospitals - PUT]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    destroyHospital: catchAsync( async (req, res, next ) => {
    
        const { id } = req.params;
                
        try {
            const Hospital = await destroyHospital( id );
            
        endpointResponse({
            res,
            message: "Hospital Deleted",
            body: Hospital,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Hospital Delete] - [Hospitals - DELETE]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    login: catchAsync( async (req, res, next ) => {
        try {
            const { email, password } = req.body

            const Hospital = await login(email, password);
            
            endpointResponse({
                res,
                message: 'Hospital login succesfully',
                body: Hospital
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Auth Login] - [auth - POST]: ${ error.message }`
            )
            next( httpError )
        }
    }),
}
