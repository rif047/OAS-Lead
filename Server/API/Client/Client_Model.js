const Mongoose = require('mongoose');


let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);



const ClientSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    alt_phone: {
        type: Number
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    clientType: {
        type: String,
    },
    profession: {
        type: String,
    },
    comment: {
        type: String,
    },

    createdOn: {
        type: Date,
        default: timeStamp
    },
})

let Client = Mongoose.model('Client', ClientSchema)

module.exports = Client;