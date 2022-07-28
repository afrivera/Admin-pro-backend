/*
    Route: /api/auth
*/

const { Router } = require('express');
const { login, loginGoogle, renewToken } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { auth } = require('../schemas/auth');

const router = Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: x-token
 *  schemas:
 *      
 *      user:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: autogenerate by mongo
 *              name:
 *                  type: string
 *                  description: the name of the user
 *              email:
 *                  type: string
 *                  description: the email of the user
 *              password:
 *                  type: string
 *                  description: the password of the user
 *              image:
 *                  type: string
 *                  description: Image of user
 *              role: 
 *                  type: string
 *                  description: role of user
 *              google:
 *                  type: boolean
 *  
 *          required:
 *              - name
 *              - email
 *              - password
 *          example:
 *              name: example name
 *              email: example@emailexample.com
 *              password: Passsword1.
 *
 *      LoginUser:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: the email of the user
 *              password:
 *                  type: string
 *                  description: the password of the user
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: example@emailexample.com
 *              password: Passsword1.
 *
 *      submenu: 
 *          type: object
 *          properties:
 *              title: 
 *                  type: string
 *              url: 
 *                  type: string
 *  
 *      menu:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              icon:
 *                  type: string
 *              submenu:
 *                  type: array
 *                  items:
 *                      $ref: '#components/schemas/submenu'
 */

/**
 * @swagger
 *  /auth/login:
 *  post:
 *      summary: login a user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/LoginUser'
 *      responses:
 *          200:
 *              description: user logged in successfully
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
 *                                  properties:
 *                                      User: 
 *                                          type: object
 *                                          $ref: '#/components/schemas/user'
 *                              token:
 *                                  type: string
 *                              menu:
 *                                  type: object  
 *                                  $ref: '#components/schemas/menu'   
 *                        
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 */
router.post('/login',[
    schemaValidator( auth )
], login );


/**
 * @swagger
 *  /auth/login/google:
 *  post:
 *      summary: login a user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: string
 *      responses:
 *          200:
 *              description: user logged in successfully
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
 *                                  properties:
 *                                      User: 
 *                                          type: object
 *                                          $ref: '#/components/schemas/user'
 *                              token:
 *                                  type: string
 *                              menu:
 *                                  type: object  
 *                                  $ref: '#components/schemas/menu'   
 *                        
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 */
router.post('/login/google',[
], loginGoogle )

/**
 * @swagger
 *  /auth/renew:
 *  get:
 *      summary: renew token
 *      tags: [User]
 *      security:
 *          - ApiKeyAuth: []
 *      
 *      responses:
 *          200:
 *              description: user logged in successfully
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
 *                                  properties:
 *                                      User: 
 *                                          type: object
 *                                          $ref: '#/components/schemas/user'
 *                              token:
 *                                  type: string
 *                              menu:
 *                                  type: object  
 *                                  $ref: '#components/schemas/menu'   
 *                        
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Arguments required
 */
router.get('/renew', validateJWT, renewToken )

module.exports = router;
