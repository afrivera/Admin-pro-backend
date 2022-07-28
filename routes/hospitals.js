/*
    Route: /api/hospitals
*/

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: x-token
 * 
 *  schemas:
 *      hospitalUser:
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
 *      hospital:
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
 *              user:
 *                  type: object
 *                  $ref: '#components/schemas/hospitalUser'
 *      hospitalResponse:
 *          type: object
 *          properties:
 *               code:
 *                   type: integer
 *               status:
 *                   type: boolean
 *               message:
 *                   type: string
 *               body:
 *                   type: object
 *                   properties:
 *                       _id: 
 *                           type: string
 *                           description: autogenereate by mongo
 *                       name:
 *                           type: string
 *                           description: name of the user
 *                       user:
 *                           type: string
 *                           description: id of user
 * 
 *  parameters:
 *      hospitalId:
 *          in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Mongo id of hospital      
 *      
 */


const { Router } = require('express');
const { postHospital, getHospitals, putHospital, destroyHospital } = require('../controllers/hospitals');
const { validateJWT } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { hospital, idHospital } = require('../schemas/hospital');

const router = Router();

/**
 * @swagger
 *  /hospitals:
 *  get:
 *      summary: get a list of hospitals
 *      tags: [Hospital]
 *      security:
 *          - ApiKeyAuth: []
 * 
 *      responses:
 *          200:
 *              description: Successful response - Hospitals retrieved successfully
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
 *                                      $ref: '#components/schemas/hospital'
 * 
 *          401:
 *              description: Unauthorized there is no token in the request
 *          500:
 *              description: Arguments required
 * 
 * 
 */
router.get('/',  validateJWT,  getHospitals)

/**
 * @swagger
 *  /hospitals:
 *  post:
 *      summary: create a new Hospital
 *      tags: [Hospital]
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
 *                              description: name of the new hospital
 *                              required: true
 *      responses:
 *          201:
 *              description: Successful Response - Hospital successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/hospitalResponse'
 * 
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 *                                  
 * 
 */
router.post('/', validateJWT, schemaValidator( hospital ), postHospital)

/**
 * @swagger
 * /hospitals/{id}:
 *  put:
 *      summary: Update a Hospital By Id
 *      tags: [Hospital]
 *      parameters:
 *          - $ref: '#components/parameters/hospitalId'
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
 *                              description: name of the hospital
 *                              required: true
 * 
 *      responses:
 *          200:
 *              description: successful response - Hospital succesfully update
 *              content:
 *                  application/json:
 *                   schema:
 *                       type: object
 *                       $ref: '#components/schemas/hospitalResponse'
 * 
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 *                      
 *  
 */
router.put('/:id', validateJWT, schemaValidator( idHospital), putHospital)

/**
 * @swagger
 * /hospitals/{id}:
 *  delete:
 *      summary: Delete a hospital by Id
 *      tags: [Hospital]
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - $ref: '#components/parameters/hospitalId'
 *      responses:
 *          200:
 *              description: successful response - Hospital succesfully update
 *              content:
 *                  application/json:
 *                   schema:
 *                       type: object
 *                       $ref: '#components/schemas/hospitalResponse'
 * 
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 *              
 */
router.delete('/:id', validateJWT, schemaValidator( idHospital), destroyHospital)

module.exports = router;
