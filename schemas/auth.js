exports.auth = {
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