const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/send-message", async (req, res) => {
  const { name, email, phone, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: "New Contact Form Message",
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});