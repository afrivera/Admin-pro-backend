const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require("../helpers/success");
const { getAllDoctors, createDoctor, updateDoctor, destroyDoctor, login} = require("../services/doctors");

module.exports = {
    getDoctors: catchAsync ( async (req, res, next )=> {
        try {
            const Doctors = await getAllDoctors();
            endpointResponse({
                res,
                body: Doctors,
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
    
        const { name, email, password } = req.body;
                
        try {

            const body = { name, email, password: encryptPassword };
            const Doctor = await createDoctor( body );
            
        endpointResponse({
            code: 201,
            res,
            message: "Doctor Created",
            body: Doctor,
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
            const Doctor = await updateDoctor( id, body );
            
        endpointResponse({
            res,
            message: "Doctor Updated",
            body: Doctor,
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
            const Doctor = await destroyDoctor( id );
            
        endpointResponse({
            res,
            message: "Doctor Deleted",
            body: Doctor,
        })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving Doctor Delete] - [Doctors - DELETE]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    login: catchAsync( async (req, res, next ) => {
        try {
            const { email, password } = req.body

            const Doctor = await login(email, password);
            
            endpointResponse({
                res,
                message: 'Doctor login succesfully',
                body: Doctor
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
