const jwt = require('jsonwebtoken');

exports.generateJWT = ( uid ) => {

    return new Promise( (resolve, reject ) => {

        const payload = { uid };
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                reject( err )
            } else {
                resolve( token );
            }
        });

    })

}

exports.validToken = token => jwt.verify(token, process.env.JWT_SECRET)