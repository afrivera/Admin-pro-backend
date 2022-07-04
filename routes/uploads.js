/*
    Route: /api/uploads/:collection/:id
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileUpload')
const { fileUpload, getImage } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use( expressFileUpload() );
router.put('/:collection/:id', validateJWT, fileUpload)
router.get('/:collection/:file',  getImage)

module.exports = router;
