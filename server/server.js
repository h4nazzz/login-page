const User = require("./models/user");
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sanuhanas47:sanuhanas@cluster0.sjx79bh.mongodb.net/?appName=Cluster0")
.then(() => {
   console.log("MongoDB connected");
})
.catch((error) => {
   console.log(error);
});
const express =require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello world");
});
app.get("/login", (req, res) => {
  res.send("Login route works");
});
app.post("/login", async (req, res) => {
    try {
        console.log("Register request body:", req.body);
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({
            email: req.body.email,
            password: req.body.password, 
        });
        await user.save();
        return res.json({ message: "new user created" });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/check", async (req, res) => {
    try {
        console.log("Check request body:", req.body);
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ message: "user not found" });
        }   
        
        if (user.password === req.body.password) {
            return res.json({ message: "login successful" });
        } else {
            return res.json({ message: "login failed" });
        }   
    } catch (error) {
        console.error("Check error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
});