const { ErrorObject } = require("../helpers/error");
const User = require("../models/user")
const Hospital = require("../models/hospital")
const Doctor = require("../models/doctor")


exports.searchs = async( search )=>{
    try {
        const regex = new RegExp(search, 'i');
        const [users, hospitals, doctors] = await Promise.all ([
            User.find({ name: regex }),
            Hospital.find({ name: regex }),
            Doctor.find({ name: regex })
        ])
        return { users, hospitals, doctors };
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}

exports.searchByCollection = async( collection, search )=>{
    try {
        const regex = new RegExp(search, 'i');
        let data;
        
        switch (collection) {
            case 'doctors':
                data = await Doctor.find({ name: regex })
                                    .populate('user', 'name image')
                                    .populate('hospital', 'name, image');
                break;
            case 'hospitals':
                data = await Hospital.find({ name: regex })
                                    .populate('user', 'name image');
                break;
            case 'users':
                data = await User.find({ name: regex });
                break;
        
            default:
                throw new ErrorObject('collection should be: doctors, hospitals or users', 403);
        }
        
        return data;
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}