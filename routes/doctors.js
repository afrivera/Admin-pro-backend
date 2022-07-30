/*
    Route: /api/doctors
*/

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: ApiKey
 *          in: header
 *          name: x-token
 *  schemas:
 *      doctorUser:
 *          type: object
 *          properties:
 *              _id: 
 *                  type: string
 *                  description: autogenereate by mongo
 *              name:
 *                  type: string
 *                  description: name of the user
 *              image: 
 *                  type: string
 *                  description: image of the user
 * 
 *      doctor:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: autogenerate by mongo
 *              name:
 *                  type: string
 *                  description: name of the doctor
 *              user:
 *                  type: object
 *                  $ref: '#components/schemas/responseUser'
 *              hospital:
 *                  type: object
 *                  $ref: '#components/schemas/responseUser'
 *              image:
 *                  type: string
 *                  description: image of the doctor
 * 
 *      doctorResponse:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: name of the doctor created
 *              user:
 *                  type: string
 *                  description: mongoId of the user
 *              hospital:
 *                  type: string
 *                  description: mongoId of the hospital
 *              _id:
 *                  type: string
 *                  description: mongoId of the new Doctor
 * 
 */
const { Router } = require('express');
const { postDoctor, getDoctors, putDoctor, destroyDoctor, getDoctorById } = require('../controllers/doctors');
const { validateJWT } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { doctor, idDoctor } = require('../schemas/doctor');

const router = Router();


/**
 * @swagger
 *  /doctors:
 *  get:
 *      summary: get a list of doctors
 *      tags: [Doctor]
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: Successful response - doctors retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: integer
 *                              status:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              body:
 *                                  type: array
 *                                  items: 
 *                                      $ref: '#components/schemas/doctor'
 * 
 *          401:
 *              description: Unauthorized there is no token in the request
 *          500:
 *              description: Arguments required
 * 
 *          
*/
router.get('/', validateJWT,  getDoctors)

/**
 * @swagger
 * /doctors/{id}:
 *  get:
 *      summary: get a doctor by Id
 *      tags: [Doctor]
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - $ref: '#components/parameters/mongoId'
 *      responses:
 *          200:
 *              description: Successful response - doctors retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: integer
 *                              status:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              body:
 *                                  type: object
 *                                  $ref: '#components/schemas/doctor'
 * 
 *          401:
 *              description: Unauthorized there is no token in the request
 *          500:
 *              description: Arguments required
*/
router.get('/:id', validateJWT,  getDoctorById)

/**
 * @swagger
 * /doctors:
 *  post:
 *      summary: create a new Doctor
 *      tags: [Doctor]
 *      security:
 *          - ApiKeyAuth: []
 *      
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: name of the new doctor
 *                              required: true
 *                          hospital:
 *                              type: string
 *                              description: mongoId of the hospital to associate
 *                              required: true
 *      responses:
 *          201:
 *              description: Successful Response - Hospital successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              properties:
 *                              code:
 *                                  type: integer
 *                              status:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              body:
 *                                  type: object
 *                                  $ref: '#components/schemas/doctorResponse'
 *                                  
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 *  
 *  
*/
router.post('/', validateJWT, schemaValidator( doctor ), postDoctor)

/**
 * @swagger
 * /doctors/{id}:
 *  put:
 *      summary: Update a Doctor By Id
 *      tags: [Doctor]
 *      parameters:
 *          - $ref: '#components/parameters/mongoId'
 *      security:
 *          - apiKeyAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: name of the doctor
 *                              required: true
 *      responses:
 *          200:
 *              description: successful response - Doctor succesfully update
 *              content:
 *                  application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           properties:
 *                           code:
 *                               type: integer
 *                           status:
 *                               type: boolean
 *                           message:
 *                               type: string
 *                           body:
 *                               type: object
 *                               $ref: '#components/schemas/doctorResponse'
 * 
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 *                      
 *  
 */
router.put('/:id', validateJWT, schemaValidator( idDoctor), putDoctor)

/**
 * @swagger
 * /doctors/{id}:
 *  delete:
 *      summary: delete a Doctor By Id
 *      tags: [Doctor]
 *      parameters:
 *          - $ref: '#components/parameters/mongoId'
 *      security:
 *          - apiKeyAuth: []
 *      
 *      responses:
 *          200:
 *              description: successful response - Doctor succesfully deleted
 *              content:
 *                  application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           properties:
 *                           code:
 *                               type: integer
 *                           status:
 *                               type: boolean
 *                           message:
 *                               type: string
 *                           body:
 *                               type: object
 *                               $ref: '#components/schemas/doctorResponse'
 * 
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 *                      
 *  
 */
router.delete('/:id', validateJWT, schemaValidator( idDoctor), destroyDoctor)

module.exports = router;
