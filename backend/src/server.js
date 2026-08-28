const express = require('express');
const model = require('./model.js');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin : "uptowncares.github.io",
    methods : ["POST", "OPTIONS"]
}));

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

app.post('/volunteer-registration', async(req, res) => {
    if(req.body["name"] && req.body["email"] && req.body["date"] && req.body["event"]){
        const name = req.body["name"];
        const email = req.body["email"];
        const date = req.body["date"];
        const event = req.body["event"];
        const description = req.body["description"];
        try{
            const result = await model.add_new_volunteer(name, email, event, date, description);
            if(result){
                res.status(201).json("success");
                return;
            }
            res.status(500).json({"error": "model issue adding registering that volunteer"});
        }catch(error){
            console.log(error);
            res.status(500).json({"error": "server issue communicating to the model"});
        }
        return;
    }
    res.status(400).json({"error": "missing data in body"});
    return;
});

app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});