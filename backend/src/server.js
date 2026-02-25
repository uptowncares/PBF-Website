const express = require('express');
const { model } = require('mongoose');
const path = require('path');


const app = express();
const PORT = 3000;



app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/public')));


app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/index.html'));
});

app.get('/about', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../frontend/public/src/about.html'));
});


app.post('/contact-us', (req, res) => {
    if(req.body["name"] && req.body["email"] && req.body["subject"] && req.body["message"]){
        const name = req.body["name"];
        const email = req.body["email"];
        const subject = req.body["subject"];
        const mssg = req.body["message"];
        try{
            //const result = model.add_new_contact(name, email, subject, mssg);
            if(result){
                res.status(200).json("success");
                return;
            }
            res.status(500).json({"error": "server issue adding that message"});
        }catch(error){
            console.log(error);
            res.status(500).json({"error": "server issue adding that message"});
        }
        return;
    }
    res.status(400).json({"error": "missing data in body"});
    return;

});


app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});