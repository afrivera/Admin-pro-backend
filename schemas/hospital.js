exports.hospital = {
    name: {
        exists: {
            errorMessage: 'Name is required',
            options: { checkFalsy: true },
        },
    }    
}

exports.idHospital = {
    id: {
        in: ['params'],
        exists: {
            errorMessage: 'id is required',
            options: { checkFalsy: true },
        },
        isMongoId: {
            errorMessage: 'id isn\'t a mongo id',
            options: { checkFalsy: true },
        }
    }
}