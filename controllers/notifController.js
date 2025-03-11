const cron = require("node-cron");
const nodemailer = require('nodemailer');
require("dotenv").config();





// transportaeur mail entre user et pass
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erreur d'envoi de l'email:", error);
        } else {
            console.log("Email envoyé: " + info.response);
        }
    });
};


cron.schedule("0 8 * * *", () => {
    console.log(" Envoi des rappels de prise de médicaments...");
   
    sendEmail("patient@example.com", "Rappel de prise de médicament", "N'oubliez pas de prendre votre médicament !");
});
//https://www.npmjs.com/package/twilio 
const twilio = require("twilio");

const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = (to, message) => {
    twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to
    }).then(message => console.log("SMS envoyé:", message.sid))
      .catch(error => console.error("Erreur d'envoi de SMS:", error));
};

// hedha lwa9t rappels :
cron.schedule("0 * * * *", () => {
    console.log("Envoi des rappels de rendez-vous...");
    sendSMS("+21612345678", "Rappel : Vous avez un rendez-vous médical dans 1 heure !");
});


const sendPushNotification = (deviceToken, title, body) => {
    const message = {
        notification: { title, body },
        token: deviceToken
    };

    admin.messaging().send(message)
        .then(response => console.log(" Notification envoyée :", response))
        .catch(error => console.error("Erreur d'envoi de la notification :", error));
};

//  notification chaque jour à 9h npm cron..
cron.schedule("0 9 * * *", () => {
    console.log("Envoi des notifications push...");
    sendPushNotification(
        "device_token_exemple",
        "Rappel médical",
        "N'oubliez pas votre rendez-vous aujourd'hui !"
    );
});

module.exports = { sendSMS, sendEmail, sendPushNotification }