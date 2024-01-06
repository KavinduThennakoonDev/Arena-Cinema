const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// MongoDB connection
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.5fimysd.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serving static files (like your HTML form)

// MongoDB schema and model
const userSchema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  phoneNo: String,
  email: String,
  password: String,
  gender: String,
  terms: Boolean,
});

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const Email = mongoose.model("Email", emailSchema);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arenacinema580@gmail.com",
    pass: "gunn vqnh byck uvzc",
  },
});

app.post("/sendemail", async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    // Save the email to MongoDB
    const newEmail = new Email({ email });
    await newEmail.save();

    // Send email using Nodemailer
    await transporter.sendMail({
      from: "arenacinema580@gmail.com",
      to: email,
      subject: "Arena Cinema confirmation mail",
      text: "Thank you for choosing us to purchase your cinema tickets! Your transaction is confirmed, and your tickets are on their way to your inbox. Get ready for an amazing cinematic experience! 🎬🍿 #MovieTime",
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

// app.get("/", (req, res) => {
//   res.sendFile(
//     __dirname + "/public/buy-movie-ticket - Avatar The Way Of Water.html"
//   );
// });

// Route to handle form submission
app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send("User registered successfully!");
  } catch (error) {
    res.status(500).send("Error registering user.");
  }
});

// Route to handle mailsend
// app.post("/sendemail", (req, res) => {
//   const userEmail = req.body.email;

//   // Call the sendEmail function with the user's email
//   sendEmail(userEmail);

//   res.send("Email sent successfully!");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
