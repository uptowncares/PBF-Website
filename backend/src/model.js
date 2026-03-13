
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

const volunteerSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    event_title: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true}
})

const contactModel = mongoose.model('new-contact', contactSchema, 'Contact_requests');

const volunteerModel = mongoose.model('new-volunteer', volunteerSchema, 'Volunteers');


const add_new_volunteer = async(name, email, title, location, date, time) => {
    const newVolunteer = volunteerModel({name: name, email: email, event_title: title, location: location, date: date, time: time});
    try{
        newVolunteer.save();
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

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

module.exports = { add_new_contact, add_new_volunteer }

