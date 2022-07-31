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
 router.post('/', schemaValidator( user ), postUser)
 router.put('/:id', [validateJWT, schemaValidator( idUser), isOwnerOrAdminRole], putUser)
 router.delete('/:id', [validateJWT, schemaValidator( idUser), isOwnerOrAdminRole], destroyUser)
 
 module.exports = router;
 