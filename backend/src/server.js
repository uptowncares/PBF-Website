require('dotenv/config');
const express = require('express');
const cors = require('cors');
const postmark = require('postmark');
const postmarkClient = new postmark.ServerClient(process.env["POSTMARK_TOKEN"]);
const app = express();
const model = require('./model.js');
const utils = require("./utils.js");
const PORT = process.env.PORT || 3000;


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

        const newVolunteer = await model.add_new_volunteer(name, email, event, date, description);
        if(newVolunteer){
            const volunteerHtml = `
                <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    role="presentation"
                    style="
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        background-color: #ffffff;
                        font-family: Arial, Helvetica, sans-serif;
                    "
                >
                    <tr>
                        <td
                            align="center"
                            style="
                                padding: 40px 15px;
                            "
                        >

                            <!-- Main Card -->
                            <table
                                width="600"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                role="presentation"
                                style="
                                    width: 100%;
                                    max-width: 600px;
                                    background-color: rgb(13, 204, 255);
                                    border-radius: 30px;
                                    overflow: hidden;
                                "
                            >

                                <!-- Header -->
                                <tr>
                                    <td
                                        align="center"
                                        style="
                                            padding: 45px 35px 25px 35px;
                                        "
                                    >

                                        <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            role="presentation"
                                        >
                                            <tr>

                                                <!-- Logo -->
                                                <td
                                                    valign="middle"
                                                    style="
                                                        padding-right: 20px;
                                                        font-size: 70px;
                                                        line-height: 70px;
                                                        color: #000000;
                                                    "
                                                >
                                                    ♡
                                                </td>

                                                <!-- Foundation Name -->
                                                <td
                                                    valign="middle"
                                                    align="left"
                                                    style="
                                                        color: #000000;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            font-size: 30px;
                                                            line-height: 32px;
                                                            font-weight: 700;
                                                        "
                                                    >
                                                        Peggy Beatrice
                                                    </div>

                                                    <div
                                                        style="
                                                            font-size: 30px;
                                                            line-height: 32px;
                                                            font-weight: 400;
                                                        "
                                                    >
                                                        Foundation
                                                    </div>
                                                </td>

                                            </tr>
                                        </table>

                                    </td>
                                </tr>


                                <!-- Greeting -->
                                <tr>
                                    <td
                                        align="center"
                                        style="
                                            padding: 25px 35px 10px 35px;
                                            color: #000000;
                                        "
                                    >

                                        <div
                                            style="
                                                font-size: 48px;
                                                line-height: 54px;
                                                font-weight: 700;
                                            "
                                        >
                                            Hi ${name}!
                                        </div>

                                    </td>
                                </tr>


                                <!-- Subtitle -->
                                <tr>
                                    <td
                                        align="center"
                                        style="
                                            padding: 0 45px 40px 45px;
                                            color: #000000;
                                        "
                                    >

                                        <div
                                            style="
                                                font-size: 25px;
                                                line-height: 34px;
                                                font-weight: 400;
                                            "
                                        >
                                            Here are your address instructions
                                            <br>
                                            for getting to us.
                                        </div>

                                    </td>
                                </tr>


                                <!-- Event / Date Card -->
                                <tr>
                                    <td
                                        style="
                                            padding: 0 45px 28px 45px;
                                        "
                                    >

                                        <table
                                            width="100%"
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            role="presentation"
                                            style="
                                                width: 100%;
                                                background-color: #f1fcff;
                                                border-radius: 25px;
                                            "
                                        >

                                            <!-- Event -->
                                            <tr>
                                                <td
                                                    width="105"
                                                    align="center"
                                                    valign="middle"
                                                    style="
                                                        padding: 30px 10px 15px 25px;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            width: 65px;
                                                            height: 65px;
                                                            line-height: 65px;
                                                            border-radius: 50%;
                                                            background-color: rgb(13, 204, 255);
                                                            color: #000000;
                                                            font-size: 30px;
                                                            text-align: center;
                                                        "
                                                    >
                                                        ▣
                                                    </div>
                                                </td>

                                                <td
                                                    valign="middle"
                                                    style="
                                                        padding: 30px 25px 15px 10px;
                                                        color: #000000;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            font-size: 16px;
                                                            line-height: 22px;
                                                            font-weight: 700;
                                                            letter-spacing: 4px;
                                                        "
                                                    >
                                                        EVENT
                                                    </div>

                                                    <div
                                                        style="
                                                            margin-top: 3px;
                                                            font-size: 25px;
                                                            line-height: 32px;
                                                            font-weight: 400;
                                                        "
                                                    >
                                                        ${event}
                                                    </div>
                                                </td>
                                            </tr>

                                            <!-- Date -->
                                            <tr>
                                                <td
                                                    width="105"
                                                    align="center"
                                                    valign="middle"
                                                    style="
                                                        padding: 15px 10px 30px 25px;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            width: 65px;
                                                            height: 65px;
                                                            line-height: 65px;
                                                            border-radius: 50%;
                                                            background-color: rgb(13, 204, 255);
                                                            color: #000000;
                                                            font-size: 30px;
                                                            text-align: center;
                                                        "
                                                    >
                                                        ▣
                                                    </div>
                                                </td>
                                                <td
                                                    valign="middle"
                                                    style="
                                                        padding: 15px 25px 30px 10px;
                                                        color: #000000;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            font-size: 16px;
                                                            line-height: 22px;
                                                            font-weight: 700;
                                                            letter-spacing: 4px;
                                                        "
                                                    >
                                                        DATE
                                                    </div>
                                                    <div
                                                        style="
                                                            margin-top: 3px;
                                                            font-size: 25px;
                                                            line-height: 32px;
                                                            font-weight: 400;
                                                        "
                                                    >
                                                        ${date}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Address Instructions -->
                                <tr>
                                    <td
                                        style="
                                            padding: 0 45px 40px 45px;
                                        "
                                    >
                                        <table
                                            width="100%"
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            role="presentation"
                                            style="
                                                width: 100%;
                                                background-color: #ffffff;
                                                border-radius: 25px;
                                            "
                                        >
                                            <tr>
                                                <!-- Location Icon -->
                                                <td
                                                    width="105"
                                                    align="center"
                                                    valign="top"
                                                    style="
                                                        padding: 35px 10px 35px 25px;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            width: 65px;
                                                            height: 65px;
                                                            line-height: 65px;
                                                            border-radius: 50%;
                                                            background-color: rgb(13, 204, 255);
                                                            color: #000000;
                                                            font-size: 32px;
                                                            text-align: center;
                                                        "
                                                    >
                                                        ●
                                                    </div>
                                                </td>

                                                <!-- Instructions -->
                                                <td
                                                    valign="top"
                                                    style="
                                                        padding: 35px 25px 35px 10px;
                                                        color: #000000;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            font-size: 16px;
                                                            line-height: 22px;
                                                            font-weight: 700;
                                                            letter-spacing: 4px;
                                                        "
                                                    >
                                                        ADDRESS INSTRUCTIONS
                                                    </div>
                                                    <div
                                                        style="
                                                            padding-top: 10px;
                                                            font-size: 22px;
                                                            line-height: 30px;
                                                            font-weight: 400;
                                                            word-break: break-word;
                                                        "
                                                    >
                                                        ${utils.addressInstructions[event]}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Thank You Message -->
                                <tr>
                                    <td
                                        align="center"
                                        style="
                                            padding: 0 50px 45px 50px;
                                            color: #000000;
                                        "
                                    >
                                        <div
                                            style="
                                                font-size: 21px;
                                                line-height: 32px;
                                                font-weight: 400;
                                            "
                                        >
                                            We're so grateful you're volunteering with us!
                                            <br>
                                            Your time and support make a real difference.
                                        </div>
                                    </td>
                                </tr>

                                <!-- Divider -->
                                <tr>
                                    <td
                                        style="
                                            padding: 0 50px;
                                        "
                                    >
                                        <table
                                            width="100%"
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            role="presentation"
                                        >
                                            <tr>
                                                <td
                                                    style="
                                                        border-top: 2px solid #ffffff;
                                                        font-size: 0;
                                                        line-height: 0;
                                                    "
                                                >
                                                    &nbsp;
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td
                                        align="center"
                                        style="
                                            padding: 30px 30px 45px 30px;
                                            color: #000000;
                                        "
                                    >

                                        <div
                                            style="
                                                font-size: 27px;
                                                line-height: 35px;
                                                padding-bottom: 15px;
                                            "
                                        >
                                            ♥
                                        </div>

                                        <div
                                            style="
                                                font-size: 17px;
                                                line-height: 25px;
                                                font-weight: 400;
                                            "
                                        >
                                            © PeggyBeatriceFoundation.org 2026
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                `;
            try{
                postmarkClient.sendEmail({
                    "From": "pierre@peggybeatricefoundation.org",
                    "To": email,
                    "Subject" :"PeggyBeatriceFoundation.org - Thank you for choosing to volunteer with us!" ,
                    "HtmlBody": volunteerHtml,
                    "TextBody": "Hello from Peggy Beatrice Foundation!",
                    "MessageStream": "Outbound"
                });
                res.sendStatus(201);
                console.log(`\nNEW VOLUNTEER: ${name} for ${event} on ${date}`);
            }catch(error){
                console.error("POSTMARK SERVER ERROR: ", error);
                res.status(502).json({"data": utils.addressInstructions[event]});
            }
            return;
        }
        console.error("DBMS ERROR");
        res.sendStatus(500);
        return;
    }
    res.sendStatus(400);
    return;
});

app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});