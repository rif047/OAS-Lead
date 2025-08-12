const Mongoose = require('mongoose');


let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);



const LeadSchema = Mongoose.Schema({
    propertyType: {
        type: String
    },
    selectedExtensions: {
        type: Array
    },
    buildingRegulations: {
        type: String
    },
    architecturalDesigns: {
        type: String
    },
    planningPermission: {
        type: String
    },
    whenStart: {
        type: String
    },
    budget: {
        type: String
    },
    fullName: {
        type: String
    },
    postcode:
    {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    hearAboutUs: {
        type: String
    },
    acceptTerms: {
        type: Boolean
    },
    acceptUpdate: {
        type: Boolean,
        default: true
    },
    workDone: {
        type: Boolean
    },



    createdOn: {
        type: Date,
        default: timeStamp
    },
})

let Lead = Mongoose.model('Lead', LeadSchema)

module.exports = Lead;