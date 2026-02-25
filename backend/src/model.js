
const mongoose = require('mongoose');
require('dotenv/config');


mongoose.connect(
    process.env['MONGO_DB_CONNECTION_STRING']
);
const db = mongoose.connection;

const contactSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true}
});

const contactModel = mongoose.model('new-contact', contactSchema, 'Contact_requests');

const add_new_contact = async(name, email, subject, message) => {
    const newContact = contactModel({name: name, email: email, subject: subject, message: message});
    try{
        newContact.save();
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

db.once("open", () => {
    console.log("Connected to MongoDB Database");
});

module.exports = { add_new_contact }

