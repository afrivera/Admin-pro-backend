exports.user = {
    name: {
        exists: {
            errorMessage: 'Name is required',
            options: { checkFalsy: true },
        },
    },
    email: {
        exists: {
            errorMessage: 'Email is required',
            options: { checkFalsy: true },
        },
        isEmail: {
            errorMessage: 'Please provide email valid'
        }
    },
    password: {
        exists: {
            errorMessage: 'Password is required',
            options: { checkFalsy: true },
        },
        isString: {
            errorMessage: 'Password should be a string'
        },
        isLength: {
            errorMessage: 'Password should be at least 7 chars long',
            options: { min: 7 }
        },
    },
    
}

exports.idUser = {
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