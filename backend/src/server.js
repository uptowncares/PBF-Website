require('dotenv/config');
const express = require('express');
const model = require('./model.js');
const cors = require('cors');
const postmark = require('postmark');
const postmarkClient = new postmark.ServerClient(process.env["POSTMARK_TOKEN"]);
const app = express();
const PORT = process.env.PORT || 3000;
const utils = require("./utils.js");

app.use(express.json());
app.use(cors({
    origin : "https://peggybeatricefoundation.org",
    methods : ["POST", "OPTIONS"],
    allowedHeaders : ["Content-Type"]
}));

app.post('/contact-us', async(req, res) => {
    if(req.body["name"] && req.body["email"] && req.body["subject"] && req.body["message"]){
        const name = req.body["name"];
        const email = req.body["email"];
        const subject = req.body["subject"];
        const mssg = req.body["message"];
        const result = await model.add_new_contact(name, email, subject, mssg);
        if(result){
            res.status(201).json("success");
            return;
        }
        res.status(500).json({"error": "model issue adding that message"});
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
            const newVolunteer = await model.add_new_volunteer(name, email, event, date, description);
            if(newVolunteer){
                try{
                    postmarkClient.sendEmail({

                        "From": "pierre@peggybeatricefoundation.org",
                        "To": email,
                        "Subject" :"PeggyBeatriceFoundation.org - Thank you for choosing to volunteer with us!" ,
                        "HtmlBody": `
                            <table 
                                width="100%" 
                                cellpadding="0" 
                                cellspacing="0" 
                                border="0"
                                style="
                                    margin-top: 20vh;
                                    background-color: rgba(13, 204, 255, 1);
                                    color: rgb(0, 0, 0);
                                    border-radius: 20px;
                                "
                            >
                                <tr>
                                    <td 
                                        align="center"
                                        style="
                                            padding: 10%;
                                            text-align: center;
                                        "
                                    >
                                        <h1 style="
                                            font-size: 3vw;
                                            margin: 0 0 20px 0;
                                        ">
                                            Hi ${name}! Here are your address instructions for getting to us.
                                        </h1>

                                        <h2 style="
                                            font-size: 1vw;
                                            margin: 0 0 20px 0;
                                        ">
                                            Just so you remember, you signed up for "${event}" on ${new Date(date).toDateString()}.
                                        </h2>

                                        <h2 style="
                                            font-size: 1vw;
                                            margin: 0;
                                        ">
                                            ${utils.addressInstructions[event]}
                                        </h2>
                                    </td>
                                </tr>
                            </table>

                            <table 
                                width="100%" 
                                cellpadding="0" 
                                cellspacing="0" 
                                border="0"
                                style="
                                    background-color: rgba(231, 22, 197, 1);
                                    border-radius: 20px
                                "
                            >
                                <tr>
                                    <td style="
                                        font-size: 0.75vw;
                                        padding: 2%;
                                    ">
                                        &copy; PeggyBeatriceFoundation.org 2026
                                    </td>
                                </tr>                                
                                <tr>
                                    <td style="
                                        font-size: 0.75vw;
                                        padding: 2%;
                                    ">
                                    <a href="https://peggybeatricefoundation.org/">
                                        PeggyBeatriceFoundation.org
                                    </a>
                                    </td>
                                </tr>                                
                                <tr>
                                    <td style="
                                        font-size: 0.75vw;
                                        padding: 2%;
                                    ">
                                        socials
                                    </td>
                                </tr>
                            </table>
                        `,
                        "TextBody": "Hello from PBF!",
                        "MessageStream": "Outbound"

                    });
                    res.status(201).json("success");
                    console.log(`\nNEW VOLUNTEER: ${name} for ${event} on ${date}`);
                }catch(error){
                    console.error(error);
                    await model.remove_volunteer(name, email, event, date);
                    res.status(500).json({"error": "unable to send confirmation email to volunteer"})
                }
                return;
            }
            res.status(500).json({"error": "model issue registering that volunteer"});
        }catch(error){
            console.log(error);
            res.status(500).json({"error": "server issue communicating with the model"});
        }
        return;
    }
    res.status(400).json({"error": "missing data in body"});
    return;
});

app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});