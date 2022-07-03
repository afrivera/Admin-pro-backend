const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require("../helpers/success");
const { getAllDoctors, createDoctor, updateDoctor, destroyDoctor} = require("../services/doctors");

module.exports = {
    getDoctors: catchAsync ( async (req, res, next )=> {
        try {
            const doctors = await getAllDoctors();
            endpointResponse({
                res,
                body: doctors,
                message: 'Doctors list retrieved successfully'
            })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Doctor list] - [Doctors - GET]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    postDoctor: catchAsync( async (req, res, next ) => {
    
        const { name, hospital } = req.body;
                
        try {

            const body = { name, hospital, user: req.uid };
            const doctor = await createDoctor( body );
            
        endpointResponse({
            code: 201,
            res,
            message: "Doctor Created",
            body: doctor,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Doctor Create] - [Doctors - POST]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    putDoctor: catchAsync( async (req, res, next ) => {
    
        const { id } = req.params;
        const { password, google, ...body } = req.body
                
        try {
            const doctor = await updateDoctor( id, body );
            
        endpointResponse({
            res,
            message: "Doctor Updated",
            body: doctor,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Doctor Update] - [Doctors - PUT]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    destroyDoctor: catchAsync( async (req, res, next ) => {
    
        const { id } = req.params;
                
        try {
            const dDoctor = await destroyDoctor( id );
            
        endpointResponse({
            res,
            message: "Doctor Deleted",
            body: dDoctor,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Doctor Delete] - [Doctors - DELETE]: ${ error.message }`
            )
            next( httpError )
        }
    }),
}
