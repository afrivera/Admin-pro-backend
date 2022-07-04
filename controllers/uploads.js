const createHttpError = require("http-errors");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { catchAsync } = require("../helpers/catchAsync");
const { ErrorObject } = require("../helpers/error");
const { endpointResponse } = require("../helpers/success");
const { updateImage } = require("../services/uploads");


module.exports = {
    fileUpload: catchAsync( async (req, res, next )=> {
        try {
            const { collection, id } = req.params;
            const validTypes = ['hospitals', 'doctors', 'users'];
            if(!validTypes.includes( collection )){
                throw new ErrorObject(`collection  should be doctors, hospitals or users`, 400)
            }

            // valid if exist any file
            if( !req.files || Object.keys( req.files).length === 0){
                throw new ErrorObject(`there is no any file in the request`, 400)
            }

            const file = req.files.image
            
            const separeName = file.name.split('.');
            const extFile = separeName[ separeName.length - 1];

            // valid extension
            const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
            if( !validExtensions.includes( extFile )){
                throw new ErrorObject(`extension file invalid`, 400)                
            }

            // generate name file
            const nameFile = `${ uuidv4()}.${ extFile }`;

            // path to save images
            const path = `./uploads/${ collection }/${ nameFile }`;

            // move the image
            file.mv( path, err => {
                if( err ){
                    throw new ErrorObject(`there is an error trying to move the image`, 500)
                }
            })

            const response = await updateImage( collection, id, nameFile)

            endpointResponse({
                res,
                body: response,
                message: 'fileupload retrieved successfully'
            })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving uploadFile] - [uploads - PUT]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    getImage: catchAsync( async (req, res, next) => {
        const { collection, file } = req.params;

        const pathImg = path.join( __dirname, `../uploads/${ collection }/${ file }`);
        // image by default
        if( fs.existsSync( pathImg) ){
            res.sendFile( pathImg )
        } else {
            const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
            res.sendFile( pathImg)
        }



    })
}