exports.doctor = {
    name: {
        exists: {
            errorMessage: 'Name is required',
            options: { checkFalsy: true },
        },
    },    
    hospital: {
        exists: {
            errorMessage: 'id Hospital is required',
            options: { checkFalsy: true },
        },
        isMongoId: {
            errorMessage: 'id isn\'t a mongo id',
            options: { checkFalsy: true },
        }
    }    
}

exports.idDoctor = {
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