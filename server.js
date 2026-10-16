const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS } 
});

app.post("/api/notify", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).send("Ungültig");
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Danke für deine Anmeldung",
    text: `Hallo ${name}, du bist eingetragen!`
  });
  res.send("OK");
});

app.listen(3000);