/*
    Route: /api/uploads/:collection/:id
*/

const { Router } = require('express');
const fileUpload = require('express-fileupload')
const { fileUpload, getImage } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use( fileUpload() );
router.put('/:collection/:id', validateJWT, fileUpload)
router.get('/:collection/:file',  getImage)

module.exports = router;
