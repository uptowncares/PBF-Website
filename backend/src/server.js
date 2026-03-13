// imports
const express = require('express');
const path = require('path');
const model = require('./model.js');
const cors = require('cors');

// constants
const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/public')));
app.use(cors({
    origin: function (origin, callback) {
    if (!origin || origin === 'null') {
        callback(null, true);
    } else {
        callback(null, true);
    }
    }
}));

// page routing
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/index.html'));
});
app.get('/about', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/about.html'));
});
app.get('/contact', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/contact.html'));
});
app.get('/donate', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/donate.html'));
});
app.get('/gallery', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/gallery.html'));
});
app.get('/more-info', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/more-info.html'));
});
app.get('/programs', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/programs.html'));
});
app.get('/volunteer', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/volunteer.html'));
});

// services
app.post('/contact-us', async(req, res) => {
    if(req.body["name"] && req.body["email"] && req.body["subject"] && req.body["message"]){
        const name = req.body["name"];
        const email = req.body["email"];
        const subject = req.body["subject"];
        const mssg = req.body["message"];
        try{
            const result = await model.add_new_contact(name, email, subject, mssg);
            if(result){
                res.status(201).json("success");
                return;
            }
            res.status(500).json({"error": "model issue adding that message"});
        }catch(error){
            console.log(error);
            res.status(500).json({"error": "server issue communicating to the model"});
        }
        return;
    }
    res.status(400).json({"error": "missing data in body"});
    return;

});


app.post('/volunteer-request', async(req, res) => {
    if(req.body["name"] && req.body["email"] && req.body["subject"] && req.body["message"]){
        const name = req.body["name"];
        const email = req.body["email"];
        const subject = req.body["subject"];
        const mssg = req.body["message"];
        try{
            const result = await model.add_new_contact(name, email, subject, mssg);
            if(result){
                res.status(201).json("success");
                return;
            }
            res.status(500).json({"error": "model issue adding that message"});
        }catch(error){
            console.log(error);
            res.status(500).json({"error": "server issue communicating to the model"});
        }
        return;
    }
    res.status(400).json({"error": "missing data in body"});
    return;

});

// express port binding
app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});