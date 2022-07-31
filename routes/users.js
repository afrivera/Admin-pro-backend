/*
    Route: /api/users
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      getUsers:
 *          type: object
 *          properties:
 *              code:
 *                  type: integer
 *              status:
 *                  type: boolean
 *              message:
 *                  type: string
 *              body:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/user'
 *                      total:
 *                          type: integer
 *  
 */

 const { Router } = require('express');
 const { getUsers, postUser, putUser, destroyUser } = require('../controllers/users');
 const { validateJWT, isOwnerOrAdminRole } = require('../middlewares/validate-jwt');
 const { schemaValidator } = require('../middlewares/validator');
 const { user, idUser } = require('../schemas/user');
 
 const router = Router();
 
 /**
  * @swagger
  *  /users:
  *  get:
  *   summary: get a lis of users
  *   tags: [User]
  *   security:
  *      - ApiKeyAuth: []
  *   responses:
  *       200:
  *           description: Successful response - Users retrieved successfully
  *           content:
  *               application/json:
  *                   schema:
  *                       type: object
  *                       $ref: '#components/schemas/getUsers'
  *       401:
  *           description: Unauthorized there is no token in the request
  *       500:
  *           description: Arguments required
  *   
 */
 router.get('/', validateJWT,getUsers)

 /**
 * @swagger
 * /users:
 *  post:
 *      summary: create a new User
 *      tags: [User]
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
 *                              description: name of the new user
 *                              required: true
 *                          email:
 *                              type: string
 *                              description: the email of the user
 *                          password:
 *                              type: string
 *                              description: the password of the user
 *      responses:
 *          201:
 *              description: Successful Response - User successfully created
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
 *                                  $ref: '#components/schemas/user'
 *                                  
 *          401:
 *              description: fields required
 *          500:
 *              description: Arguments required
 *  
 *  
*/
 router.post('/', schemaValidator( user ), postUser)

 /**
 * @swagger
 * /users/{id}:
 *  put:
 *      summary: Update a User By Id
 *      tags: [User]
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
 *                              description: name of the User
 *                              required: true
 *                          email:
 *                              type: string
 *                              description: email of the User
 *      responses:
 *          200:
 *              description: successful response - User succesfully update
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
 *                               $ref: '#components/schemas/user'
 * 
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 *                      
 *  
 */
 router.put('/:id', [validateJWT, schemaValidator( idUser), isOwnerOrAdminRole], putUser)

 /**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: delete a User By Id
 *      tags: [User]
 *      parameters:
 *          - $ref: '#components/parameters/mongoId'
 *      security:
 *          - apiKeyAuth: []
 *      
 *      responses:
 *          200:
 *              description: successful response - User succesfully deleted
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
 *                               $ref: '#components/schemas/user'
 * 
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 *                      
 *  
 */
 router.delete('/:id', [validateJWT, schemaValidator( idUser), isOwnerOrAdminRole], destroyUser)
 
 module.exports = router;
 