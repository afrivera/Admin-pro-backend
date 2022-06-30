const { model, Schema} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject()
    object.uid = _id;
    return object
})

module.exports = model('User', userSchema );