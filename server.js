require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: 587,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});

app.post("/api/notify", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).send("Ungültig");

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Danke für deine Anmeldung",
      text: `Hallo ${name}, du bist eingetragen!`
    });
    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Mail konnte nicht gesendet werden");
  }
});

app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));